"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import Link from "next/link";
import Navbar from "../components/Navbar";
import ProductSidebar from "../components/Products/Productsidebar";
import useFetchProducts from "../hooks/useFetchProducts";
import usePersistCart from "../hooks/usePersistCart";
import useAddress from "../hooks/useAddress";
import useCoupon from "../hooks/useCoupon";

// Icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { IoIosRemove, IoIosAdd } from "react-icons/io";
import { TiLocation } from "react-icons/ti";
import { FaTag } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import useIsMounted from "../hooks/useIsMounted";

const Checkout = () => {
  const isMounted = useIsMounted();
  const dispatch = useDispatch();
  const products = useFetchProducts();
  usePersistCart();

  const { zipCode, address, buscarCep } = useAddress();
  const { coupon, handleCouponChange, applyCoupon } = useCoupon();

  const cartItems = useSelector((state: any) => state.cart.items);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalWithoutDiscount = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );
  const currentItem = cartItems[currentItemIndex];

  const handlePreviousItem = () => {
    setCurrentItemIndex((prev) => (prev > 0 ? prev - 1 : cartItems.length - 1));
  };

  const handleNextItem = () => {
    setCurrentItemIndex((prev) => (prev < cartItems.length - 1 ? prev + 1 : 0));
  };

  const handleRemoveItem = (item: any) => {
    dispatch(removeFromCart(item));
    if (currentItemIndex >= cartItems.length - 1) {
      setCurrentItemIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  if (!isMounted) return null;

  return (
    <section className="bg-zinc-300 h-max">
      <Navbar />
      <div className="px-8 py-4">
        <h1 className="text-2xl text-black font-medium py-4">
          Você está quase lá...!
        </h1>
        <div className="flex justify-between gap-6">
          <div className="w-3/4 flex gap-4 bg-white px-4 py-8 rounded-md shadow-md">
            {/* Div lateral com ícones */}
            <div className="flex flex-col items-center relative">
              <div className="absolute h-[550px] border-black border-dotted border-e-2 left-1/2 transform -translate-x-1/2"></div>
              <span className="bg-black text-3xl text-white p-2 rounded-full flex items-center justify-center z-10 mb-36">
                <TiLocation />
              </span>
              <span className="bg-black text-3xl text-white p-2 rounded-full flex items-center justify-center z-10 mb-[270px]">
                <FaTag />
              </span>
              <span className="bg-black text-3xl text-white p-2 rounded-full flex items-center justify-center z-10">
                <IoIosCheckmarkCircle />
              </span>
            </div>

            <div className="space-y-4">
              {/* Formulário de Localização */}
              <div className="space-y-4">
                <h2 className="text-black text-xl font-semibold">
                  Adicione seu endereço para entrega:
                </h2>
                <div className="flex">
                  <input
                    className="px-2 py-1 border-2 border-black text-black"
                    value={zipCode}
                    onChange={buscarCep}
                    maxLength={8}
                  />
                  <button className="bg-black text-white font-semibold flex items-center justify-between gap-3 px-2 hover:bg-gray-800">
                    Buscar CEP <BiSearch />
                  </button>
                </div>
                <div className="text-black flex gap-4">
                  <div className="flex flex-col gap-2">
                    <label>Endereço</label>
                    <input
                      className="p-2 border-2 border-black text-black"
                      value={address.endereco}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Número</label>
                    <input
                      className="p-2 border-2 border-black w-20 text-black"
                      value={address.numero}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-32">
                    <label>Complemento</label>
                    <input
                      className="p-2 border-2 border-black text-black"
                      value={address.complemento}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-36">
                    <label>Estado</label>
                    <input
                      className="p-2 border-2 border-black text-black"
                      value={address.estado}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Cidade</label>
                    <input
                      className="p-2 border-2 border-black text-black"
                      value={address.cidade}
                    />
                  </div>
                </div>
              </div>

              {/* Produtos do carrinho */}
              <div className="py-4 w-4/5 h-max flex flex-col gap-2 items-start justify-center">
                <header>
                  <p className="text-black text-xl font-semibold">
                    Itens do carrinho:
                  </p>
                </header>
                {cartItems.length > 0 ? (
                  <div className="flex space-x-3">
                    {currentItem ? (
                      <div className="min-w-80 items-end flex flex-col h-full">
                        <img
                          src={currentItem.image}
                          alt={currentItem.title}
                          className="w-full h-48 object-contain shadow-md"
                        />
                        <div className="flex justify-between bg-zinc-900 px-2 py-2 w-full">
                          <span className="space-x-2">
                            <button
                              onClick={handlePreviousItem}
                              className="p-1 bg-gray-400 text-white rounded-full shadow transition-all hover:bg-gray-700"
                            >
                              <IoIosArrowBack />
                            </button>
                            <button
                              onClick={handleNextItem}
                              className="p-1 bg-gray-400 text-white rounded-full shadow transition-all hover:bg-gray-700"
                            >
                              <IoIosArrowForward />
                            </button>
                          </span>
                          <div className="flex items-center">
                            <button
                              onClick={() => {
                                if (currentItem.quantity === 1) {
                                  handleRemoveItem(currentItem); // Exclui o item
                                } else {
                                  dispatch(decrementQuantity(currentItem.id)); // Decrementa a quantidade
                                }
                              }}
                              className="bg-zinc-600 text-white px-3 py-1 rounded-l-2xl transition-all hover:text-white cursor-pointer"
                            >
                              <IoIosRemove />
                            </button>
                            <span className="px-4 text-gray-700 font-medium bg-gray-300">
                              {currentItem.quantity}
                            </span>
                            <button
                              onClick={() =>
                                dispatch(incrementQuantity(currentItem.id))
                              }
                              className="bg-zinc-600 text-white px-3 py-1 rounded-r-2xl transition-all hover:text-white cursor-pointer"
                            >
                              <IoIosAdd />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-black font-medium">
                        Nenhum item disponível
                      </p>
                    )}

                    <div className="w-ful">
                      {currentItem && (
                        <>
                          <div className="flex flex-col justify-between h-full">
                            <div className="space-y-3">
                              <h2 className="text-gray-800 text-2xl font-semibold">
                                {currentItem.title}
                              </h2>
                              <span className="block text-gray-800 text-2xl font-bold">
                                {currentItem.price.toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </span>
                            </div>

                            <div className="flex">
                              <input
                                className="px-2 py-1 border-2 border-black text-black"
                                value={coupon}
                                onChange={handleCouponChange}
                              />
                              <button
                                onClick={applyCoupon}
                                className="bg-black text-white font-semibold flex items-center justify-between gap-3 px-2 hover:bg-gray-800"
                              >
                                Aplicar cupom
                              </button>
                            </div>
                            <p className="text-gray-800">
                              Total:
                              <span className="text-lg font-bold">
                                R$
                                <span className="text-2xl">
                                  {totalWithoutDiscount.toLocaleString({
                                    style: "currency",
                                    currency: "BRL",
                                  })}
                                </span>
                              </span>
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <p className="text-black uppercase font-semibold">
                      Não existe itens no carrinho!!
                    </p>
                    <Link href="/">
                      <button className="bg-black rounded-md text-white px-4 py-2 transition-all hover:bg-gray-800">
                        Voltar
                      </button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Botão de finalização */}
              <div className="space-y-3 ">
                <h2 className="text-black text-xl font-semibold">
                  Finalizar Compra:
                </h2>
                <button className="bg-black rounded-sm text-white px-32 py-2 transition-all hover:bg-gray-800">
                  Comprar
                </button>
              </div>
            </div>
          </div>
          {/* sidebar de produtos aleatórios */}
          <div className="w-3/12 bg-white px-4 py-8 rounded-md shadow-md">
            <ProductSidebar products={products} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
