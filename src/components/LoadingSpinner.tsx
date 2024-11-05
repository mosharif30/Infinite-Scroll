// src/components/LoadingSpinner.tsx
import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={4}>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default LoadingSpinner;
