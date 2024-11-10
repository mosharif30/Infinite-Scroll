import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  // CardContent,
  Box,
  Grid,
  List,
  ListItem,
  Divider,
  Snackbar,
  Alert,
  Chip,
  Rating,
} from "@mui/material";
import { Product } from "../types/product";
import LoadingSpinner from "../components/LoadingSpinner";
import { getProductById } from "../API/GetProductById";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response.data);
      } catch (error: unknown) {
        let errorMessage =
          "Failed to fetch product details. Please try again later.";
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (
          typeof error === "object" &&
          error !== null &&
          "response" in error
        ) {
          const err = error as { response: { data: { message: string } } };
          if (err.response?.data?.message) {
            errorMessage = err.response.data.message;
          }
        }
        console.error("Error fetching product details:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleCloseSnackbar = () => setError(null);

  if (loading) return <LoadingSpinner />;

  if (!product)
    return (
      <Container>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
        <Typography> No product found</Typography>
      </Container>
    );

  return (
    <Container sx={{ marginTop: 4, marginBottom: 4 }}>
      {/* Snackbar for error messages */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Grid container spacing={4}>
        {/* Left - Product Image */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3 }}>
            <CardMedia
              component="img"
              image={product.thumbnail}
              alt={product.title}
              sx={{ height: 500, objectFit: "contain", borderRadius: 2 }}
            />
          </Card>
        </Grid>

        {/* Right - Product Details */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {product.description}
            </Typography>

            <Typography variant="h5" color="primary" gutterBottom>
              Price: ${product.price.toFixed(2)}
            </Typography>
            <Chip
              label={`Discount: ${product.discountPercentage}%`}
              color="secondary"
            />

            <Box my={2}>
              <Typography variant="h6">Product Details</Typography>
              <Divider />
              <List>
                <ListItem>
                  <CategoryIcon sx={{ marginRight: 1 }} /> Category:{" "}
                  {product.category}
                </ListItem>
                <ListItem>
                  <InventoryIcon sx={{ marginRight: 1 }} /> Stock:{" "}
                  {product.stock} units
                </ListItem>
                <ListItem>Brand: {product.brand}</ListItem>
                <ListItem>SKU: {product.sku}</ListItem>
                <ListItem>
                  <Rating name="read-only" value={product.rating} readOnly />
                </ListItem>
                <ListItem>Availability: {product.availabilityStatus}</ListItem>
                <ListItem>
                  Minimum Order Quantity: {product.minimumOrderQuantity}
                </ListItem>
              </List>
            </Box>

            <Box my={2}>
              <Typography variant="h6">Dimensions & Weight</Typography>
              <Divider />
              <List>
                <ListItem>Width: {product.dimensions.width} cm</ListItem>
                <ListItem>Height: {product.dimensions.height} cm</ListItem>
                <ListItem>Depth: {product.dimensions.depth} cm</ListItem>
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
              <Typography variant="h6">Product Metadata</Typography>
              <Divider />
              <List>
                <ListItem>
                  Created At:{" "}
                  {new Date(product.meta.createdAt).toLocaleString()}
                </ListItem>
                <ListItem>
                  Updated At:{" "}
                  {new Date(product.meta.updatedAt).toLocaleString()}
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
              <Typography variant="h6">Tags</Typography>
              <Divider />
              <List>
                {product.tags.map((tag, index) => (
                  <ListItem key={index}>{tag}</ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Additional Images Section */}
      <Box mt={4}>
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

      {/* Reviews Section */}
      <Box my={4}>
        <Typography variant="h6">Customer Reviews</Typography>
        <Divider />
        {product.reviews.length > 0 ? (
          <List>
            {product.reviews.map((review, index) => (
              <Box key={index} my={1}>
                <Typography variant="subtitle1">
                  {review.reviewerName} (
                  {new Date(review.date).toLocaleDateString()})
                </Typography>
                <Rating name="read-only" value={review.rating} readOnly />
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
    </Container>
  );
};

export default ProductDetails;
