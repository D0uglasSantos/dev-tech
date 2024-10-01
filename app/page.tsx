"use client";
import useFetchProducts from "./hooks/useFetchProducts";
import usePersistCart from "./hooks/usePersistCart";

import ProductGrid from "./components/Products/ProductGrid";
import Sidebar from "./components/Sidebar";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Home = () => {
  const products = useFetchProducts();
  usePersistCart();

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
