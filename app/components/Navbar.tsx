"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LuShoppingCart } from "react-icons/lu";
import CartModal from "./Cart/CartModal";
import Search from "./Search";
import useCartState from "../hooks/useCartState";
import useIsMounted from "../hooks/useIsMounted";
import useNavbarAnimation from "../hooks/useNavbarAnimation";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const { cartOpen, setCartOpen, totalItems } = useCartState();
  const isMounted = useIsMounted();
  const navbarAnimation = useNavbarAnimation();

  if (!isMounted) return null;

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navbarAnimation}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-zinc-900 flex justify-around items-center h-32 py-5 px-8  w-full transition-colors ease-out shadow-md"
    >
      <div className="text-semibold">
        <Link href={"/"}>
          <p className=" text-3xl font-semibold text-white">DevTech</p>
        </Link>
      </div>

      <Search />

      <div className="flex justify-around items-center gap-4">
        <p className="flex items-center gap-2 text-white text-xl font-light w-auto h-auto p-3 shadow-md rounded-sm cursor-pointer">
          Sair
        </p>

        {/* Botão do carrinho */}
        <p
          onClick={() => setCartOpen(true)}
          className="flex items-center gap-2 text-white text-xl font-light w-auto h-auto p-3 shadow-md rounded-sm cursor-pointer"
        >
          Carrinho
          <span className="relative">
            <LuShoppingCart />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-[7px] text-white rounded-full w-3 h-3 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </span>
        </p>

        {/* Modal do carrinho */}
        {cartOpen && <CartModal setCartOpen={setCartOpen} />}
      </div>
    </motion.header>
  );
};

export default Navbar;
