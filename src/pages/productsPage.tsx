// src/App.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Pagination } from "@mui/material";
import ProductList from "../components/ProductList";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { Product } from "../types/product";
import LoadingSpinner from "../components/LoadingSpinner";

const PRODUCTS_PER_PAGE = 20;
const TOTAL_PAGES = 10;

const ProductsPage: React.FC = () => {
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
      <ProductList products={products} />
      {loading && <LoadingSpinner />}
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

export default ProductsPage;
