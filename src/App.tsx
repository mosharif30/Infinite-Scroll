import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import ProductsPage from "./pages/productsPage";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
