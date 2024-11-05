// src/components/ProductCard.tsx
import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
  );
};

export default ProductCard;
