import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setHasMore(true);
    setPaginationVisible(false);
    setProducts([]);
  };

  return (
    <div className="App">
      <h1>Infinite Scroll Products</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <div className="product-details">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <p className="product-description">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
      {paginationVisible && (
        <div className="pagination">
          {[...Array(TOTAL_PAGES).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => handlePageChange(number + 1)}
            >
              {number + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
