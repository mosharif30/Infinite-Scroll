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

type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  description: string;
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationVisible, setPaginationVisible] = useState<boolean>(false);

  useInfiniteScroll(() => {
    if (!loading && hasMore && !paginationVisible) {
      setPage((prevPage) => prevPage + 1);
    }
  }, hasMore);

  useEffect(() => {
    const fetchProducts = async () => {
      if (loading) return;

      setLoading(true);
      try {
        const result = await axios.get(
          `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${
            (page - 1) * PRODUCTS_PER_PAGE
          }`
        );
        setProducts((prevProducts) => [
          ...prevProducts,
          ...result.data.products,
        ]);
        if (page >= TOTAL_PAGES) {
          setHasMore(false);
          setPaginationVisible(true);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
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
                image={product.thumbnail}
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
