// src/components/ProductList.tsx
import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "../types/product";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Grid container spacing={4} justifyContent="flex-start">
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} display="flex">
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
