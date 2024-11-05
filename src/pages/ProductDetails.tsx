// src/pages/ProductDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Grid,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { Product } from "../types/product";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <LoadingSpinner />;

  if (!product) return <Typography>No product found</Typography>;

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
          sx={{ height: 400, objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {product.description}
          </Typography>

          <Typography variant="h5" color="secondary" gutterBottom>
            Price: ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Discount: {product.discountPercentage}%
          </Typography>

          <Box my={2}>
            <Typography variant="h6">Product Details</Typography>
            <Divider />
            <List>
              <ListItem>Category: {product.category}</ListItem>
              <ListItem>Brand: {product.brand}</ListItem>
              <ListItem>SKU: {product.sku}</ListItem>
              <ListItem>Rating: {product.rating}</ListItem>
              <ListItem>Stock: {product.stock} units</ListItem>
              <ListItem>Availability: {product.availabilityStatus}</ListItem>
              <ListItem>
                Minimum Order Quantity: {product.minimumOrderQuantity}
              </ListItem>
            </List>
          </Box>

          <Box my={2}>
            <Typography variant="h6">Dimensions</Typography>
            <Divider />
            <List>
              <ListItem>Width: {product.dimensions?.width} cm</ListItem>
              <ListItem>Height: {product.dimensions?.height} cm</ListItem>
              <ListItem>Depth: {product.dimensions?.depth} cm</ListItem>
              <ListItem>Weight: {product.weight} kg</ListItem>
            </List>
          </Box>

          <Box my={2}>
            <Typography variant="h6">Shipping and Warranty</Typography>
            <Divider />
            <List>
              <ListItem>
                Shipping Information: {product.shippingInformation}
              </ListItem>
              <ListItem>Warranty: {product.warrantyInformation}</ListItem>
              <ListItem>Return Policy: {product.returnPolicy}</ListItem>
            </List>
          </Box>

          <Box my={2}>
            <Typography variant="h6">Tags</Typography>
            <Divider />
            <List>
              {product.tags.map((tag, index) => (
                <ListItem key={index}>{tag}</ListItem>
              ))}
            </List>
          </Box>

          <Box my={2}>
            <Typography variant="h6">Reviews</Typography>
            <Divider />
            {product.reviews.length > 0 ? (
              <List>
                {product.reviews.map((review, index) => (
                  <Box key={index} my={1}>
                    <Typography variant="subtitle1">
                      {review.reviewerName} (
                      {new Date(review.date).toLocaleDateString()})
                    </Typography>
                    <Typography variant="body2">
                      Rating: {review.rating}
                    </Typography>
                    <Typography variant="body2">
                      Comment: {review.comment}
                    </Typography>
                    <Divider />
                  </Box>
                ))}
              </List>
            ) : (
              <Typography>No reviews available</Typography>
            )}
          </Box>

          <Box my={2}>
            <Typography variant="h6">Product Metadata</Typography>
            <Divider />
            <List>
              <ListItem>
                Created At: {new Date(product.meta.createdAt).toLocaleString()}
              </ListItem>
              <ListItem>
                Updated At: {new Date(product.meta.updatedAt).toLocaleString()}
              </ListItem>
              <ListItem>Barcode: {product.meta.barcode}</ListItem>
              <ListItem>
                QR Code:{" "}
                <img
                  src={product.meta.qrCode}
                  alt="QR Code"
                  style={{ height: 100, marginLeft: 10 }}
                />
              </ListItem>
            </List>
          </Box>

          <Box my={2}>
            <Typography variant="h6">Additional Images</Typography>
            <Divider />
            <Grid container spacing={2} mt={2}>
              {product.images.map((image, index) => (
                <Grid item xs={6} md={4} key={index}>
                  <CardMedia
                    component="img"
                    image={image}
                    alt={`Product Image ${index + 1}`}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
