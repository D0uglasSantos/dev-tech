"use client"; // Indica que este componente deve ser renderizado no lado do cliente
import { useState, useEffect } from "react"; // Importa o hook useState e useEffect do React
import Link from "next/link"; // Importa o componente Link do Next.js
import { motion } from "framer-motion"; // Importa o motion para animações

// Redux
import { useSelector } from "react-redux"; // Importa o hook useSelector do Redux

// Componentes
import CartModal from "./CartModal"; // Importa o componente CartModal
import Search from "./Search"; // Importa o componente Search

// Ícones
import { FaRegUser } from "react-icons/fa"; // Ícone de usuário
import { FaRegHeart } from "react-icons/fa"; // Ícone de coração
import { LuShoppingCart } from "react-icons/lu"; // Ícone de carrinho

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const [cartOpen, setCartOpen] = useState(false); // Estado para controlar a abertura do modal do carrinho
  const [isMounted, setIsMounted] = useState(false); // Estado para verificar se o componente já foi montado
  const cartItems = useSelector((state: any) => state.cart.items); // Obtém os itens do carrinho do Redux

  // Usa useEffect para indicar que o componente foi montado no lado do cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalItems = cartItems.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  ); // Calcula o total de itens no carrinho

  // Animação para o surgimento do Navbar
  const navbarAnimation = {
    hidden: { opacity: 0, y: -50 }, // Inicialmente invisível e fora da tela (para cima)
    visible: { opacity: 1, y: 0 }, // Visível e na posição final
  };

  // Se o componente ainda não estiver montado, retorna null para evitar renderização durante SSR
  if (!isMounted) {
    return null;
  }

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navbarAnimation}
      transition={{ duration: 0.6, ease: "easeOut" }} // Duração e tipo de transição
      className="bg-white shadow-md flex justify-around items-center py-5 px-8 fixed w-full z-10 transition-colors ease-out"
    >
      <div className="text-semibold">
        <Link href={"/"}>
          <p className="uppercase font-semibold text-violet-400">
            Store <span className="text-violet-600">dev__</span>
          </p>
        </Link>
      </div>
      <Search />
      <div className="flex justify-around items-center gap-4">
        <FaRegUser className="text-white w-auto h-auto p-3 bg-violet-600 hover:bg-violet-400 transition-all shadow-md rounded-sm cursor-pointer" />
        <FaRegHeart className="text-white w-auto h-auto p-3 bg-violet-600 hover:bg-violet-400 transition-all shadow-md rounded-sm cursor-pointer" />

        {/* Botão do carrinho */}
        <span
          onClick={() => setCartOpen(true)} // Abre o modal do carrinho ao clicar
          className="relative text-white w-auto h-auto p-3 bg-violet-600 hover:bg-violet-400 transition-all shadow-md rounded-sm cursor-pointer"
        >
          <LuShoppingCart />
          {totalItems > 0 && ( // Exibe o contador de itens se houver
            <span className="absolute -top-2 -right-2 bg-blue-400 text-white text-xs rounded-full px-2 py-1">
              {totalItems}
            </span>
          )}
        </span>

        {/* Modal do carrinho */}
        {cartOpen && <CartModal setCartOpen={setCartOpen} />}
      </div>
    </motion.header>
  );
};

export default Navbar; // Exporta o componente Navbar
