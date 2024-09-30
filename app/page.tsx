"use client";
import { useState, useEffect } from "react"; // Importa os hooks useState e useEffect do React
import { fetchProducts } from "./services/fakeStoreApi"; // Importa a função para buscar produtos da API

import ProductGrid from "./components/ProductGrid";
import Sidebar from "./components/Sidebar";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";

const Home = () => {
  // Estado para armazenar a lista de produtos
  const [products, setProducts] = useState([]);
  const cartItems = useSelector((state: any) => state.cart.items);

  useEffect(() => {
    // Função assíncrona para buscar os produtos ao carregar a página
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Falha ao carregar produtos", error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const saveCartToLocalStorage = (cart: any) => {
      try {
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem("cart", serializedCart);
      } catch (error) {
        console.error("Erro ao salvar carrinho:", error);
      }
    };

    saveCartToLocalStorage(cartItems);
  }, [cartItems]);

  return (
    <div className="flex-grow">
      <Navbar />
      <Banner />
      <section className="flex">
        <div className="w-1/6">
          <Sidebar />
        </div>
        <div className="w-5/6">
          <ProductGrid products={products} />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
