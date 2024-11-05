import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Pagination,
} from "@mui/material";
import useInfiniteScroll from "./useInfiniteScroll";

const PRODUCTS_PER_PAGE = 20;
const TOTAL_PAGES = 10;
const TOTAL_PRODUCTS = PRODUCTS_PER_PAGE * TOTAL_PAGES;

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [paginationVisible, setPaginationVisible] = useState<boolean>(false);

  useInfiniteScroll(() => {
    if (hasMore && !paginationVisible) {
      setPage((prevPage) => prevPage + 1);
    }
  }, hasMore);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get<Product[]>(
          `https://fakestoreapi.com/products?limit=${PRODUCTS_PER_PAGE}&page=${page}`
        );
        setProducts((prevProducts) => [...prevProducts, ...result.data]);
        if (products.length + result.data.length >= TOTAL_PRODUCTS) {
          setHasMore(false);
          setPaginationVisible(true);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
    setHasMore(true);
    setPaginationVisible(false);
    setProducts([]);
  };

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Infinite Scroll Products
      </Typography>
      <Grid container spacing={4} justifyContent="flex-start">
        {products.map((product) => (
          <Grid
            item
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            display="flex"
          >
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: "contain", height: 300 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="body1" color="secondary" gutterBottom>
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {paginationVisible && (
        <Pagination
          count={TOTAL_PAGES}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ marginTop: 4, display: "flex", justifyContent: "center" }}
        />
      )}
    </Container>
  );
};

export default App;
