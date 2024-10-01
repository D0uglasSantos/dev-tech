import { useState, useEffect } from "react";
import { fetchProducts } from "../services/fakeStoreApi";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      }
    };

    getProducts();
  }, []);

  return products;
};

export default useFetchProducts;
