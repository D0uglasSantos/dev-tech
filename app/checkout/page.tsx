"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddressByZip } from "../services/viaCepApi";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import { toast } from "react-toastify";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { BiTrash } from "react-icons/bi";
import Navbar from "../components/Navbar";

const Checkout = () => {
  const dispatch = useDispatch();

  // Estados de API CEP
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState({ street: "", city: "", state: "" });

  // Estados de cupom
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [usedCoupons, setUsedCoupons] = useState(new Set());

  // Estado do carrinho
  const cartItems = useSelector((state: any) => state.cart.items);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  // Manipulador de cupom
  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(e.target.value);
  };

  // Aplicar cupom
  const applyCoupon = () => {
    const coupons = { EOS11: 10, "11OFF": 20 } as { [key: string]: number };
    const appliedDiscount = coupons[coupon] || 0;

    // Verificar se o cupom já foi utilizado
    if (usedCoupons.has(coupon)) {
      toast.error("Este cupom já foi utilizado!", { position: "bottom-left" });
      return;
    }

    setDiscount(appliedDiscount);

    const toastMessage =
      appliedDiscount > 0
        ? `${appliedDiscount}% de desconto adicionado`
        : "Cupom inválido!!";
    const toastType = appliedDiscount > 0 ? toast.success : toast.error;

    toastType(toastMessage, { position: "bottom-left" });

    if (appliedDiscount > 0) {
      // Adicionar o cupom aos já utilizados
      setUsedCoupons((prev) => new Set(prev).add(coupon));
    }

    setCoupon("");
  };

  // Manipular mudança de CEP e buscar endereço
  const handleZipChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zip = e.target.value;
    setZipCode(zip);

    if (zip.length === 8) {
      try {
        const data = await fetchAddressByZip(zip);
        setAddress({
          street: data.logradouro,
          city: data.localidade,
          state: data.uf,
        });
      } catch (error) {
        console.error("Falha ao buscar endereço", error);
      }
    }
  };

  // Navegação entre itens
  const handlePreviousItem = () => {
    setCurrentItemIndex((prev) => (prev > 0 ? prev - 1 : cartItems.length - 1));
  };

  const handleNextItem = () => {
    setCurrentItemIndex((prev) => (prev < cartItems.length - 1 ? prev + 1 : 0));
  };

  // Cálculo de total com e sem desconto
  const totalWithoutDiscount = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );
  const totalWithDiscount = totalWithoutDiscount * ((100 - discount) / 100);
  const currentItem = cartItems[currentItemIndex];

  const handleRemoveItem = (item: any) => {
    dispatch(removeFromCart(item));

    // Atualiza o índice atual se necessário
    if (currentItemIndex >= cartItems.length - 1) {
      setCurrentItemIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  return (
    <section>
      <Navbar />
      <div className="px-8 py-28 bg-white text-white flex items-center justify-center">
        <div className="w-4/5 space-y-8">
          {/* Header */}
          <header className="flex flex-col gap-1">
            <h1 className="text-4xl text-black">Finalizando a compra</h1>
            <p className="text-sm text-violet-600">Você está quase lá!</p>
          </header>

          {/* Formulário de Localização */}
          <div>
            <h2 className="text-black text-2xl">Localização:</h2>
            <div className="grid grid-cols-2 gap-4 text-black">
              <input
                className="p-2 rounded-md border-0.3 border-violet-500 placeholder:text-black"
                placeholder="Informe o CEP"
                value={zipCode}
                onChange={handleZipChange}
              />
              <input
                className="p-2 rounded-md border-0.3 border-violet-500 placeholder:text-black"
                placeholder="Endereço"
                value={address.street}
                readOnly
              />
              <input
                className="p-2 rounded-md border-0.3 border-violet-500 placeholder:text-black"
                placeholder="Cidade"
                value={address.city}
                readOnly
              />
              <input
                className="p-2 rounded-md border-0.3 border-violet-500 placeholder:text-black"
                placeholder="Estado"
                value={address.state}
                readOnly
              />
            </div>
          </div>

          {/* Produtos do carrinho */}
          <div className="py-4 w-3/5 h-max flex flex-col gap-10 items-start justify-center">
            <header>
              <p className="text-2xl text-black">Produtos do carrinho:</p>
              <p className="text-sm text-violet-600">
                Navege entre os seus produtos selecionados
              </p>
            </header>

            {cartItems.length > 0 ? (
              <div className="flex gap-6">
                {/* Imagem e navegação */}
                <div className="flex flex-col items-center gap-4">
                  {currentItem ? (
                    <>
                      <img
                        src={currentItem.image}
                        alt={currentItem.title}
                        className="w-40 h-45 object-cover rounded-lg shadow-md"
                      />
                      <div className="text-white text-lg flex items-center justify-between gap-4 bg-gray-800 rounded-md px-4 py-2">
                        <button
                          onClick={handlePreviousItem}
                          className="p-2 bg-white text-gray-800 rounded-full shadow transition-all hover:bg-violet-500 hover:text-white"
                        >
                          <IoIosArrowBack />
                        </button>
                        <button
                          onClick={handleNextItem}
                          className="p-2 bg-white text-gray-800 rounded-full shadow transition-all hover:bg-violet-500 hover:text-white"
                        >
                          <IoIosArrowForward />
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-violet-600">Nenhum item disponível</p>
                  )}
                </div>

                {/* Detalhes do produto */}
                <div className="space-y-4 w-full">
                  {currentItem && (
                    <>
                      <div>
                        <h2 className="text-gray-800 text-2xl font-semibold">
                          {currentItem.title}
                        </h2>
                        <p className="text-gray-500 text-md line-clamp-2">
                          {currentItem.description}
                        </p>
                        <span className="block text-gray-800 text-3xl font-bold mt-4">
                          R${" "}
                          {(currentItem.price * currentItem.quantity).toFixed(
                            2
                          )}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="border border-gray-300 rounded-lg flex items-center shadow-sm">
                          <button
                            onClick={() =>
                              dispatch(decrementQuantity(currentItem.id))
                            }
                            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-l-lg transition-all hover:bg-red-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 text-gray-700 font-medium">
                            {currentItem.quantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(incrementQuantity(currentItem.id))
                            }
                            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-r-lg transition-all hover:bg-green-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(currentItem)}
                          className="text-red-400 transition-all hover:text-red-600"
                        >
                          <BiTrash className="text-2xl" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-violet-600 uppercase">
                  Não existe itens no carrinho
                </p>
                <Link href="/">
                  <button className="bg-violet-600 rounded-md text-white px-4 py-2 transition-all hover:bg-violet-400">
                    Voltar
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Seção de cupom */}
          <div>
            <input
              className="p-2 rounded-md border-0.3 text-black border-violet-500 placeholder:text-black"
              placeholder="Insira seu cupom"
              value={coupon}
              onChange={handleCouponChange}
            />
            <button
              onClick={applyCoupon}
              className="bg-violet-600 rounded-md text-white px-4 py-2 transition-all hover:bg-violet-400 ml-2"
            >
              Aplicar
            </button>
          </div>

          {/* Cálculo de total */}
          <div className="bg-gray-800 rounded-md px-8 py-4 text-white">
            <div className="flex justify-between">
              <span>Total Sem Desconto:</span>
              <span>R$ {totalWithoutDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Desconto:</span>
              <span>{discount}%</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>R$ {totalWithDiscount.toFixed(2)}</span>
            </div>
          </div>

          {/* Botão de finalizar compra */}

          <button className="bg-violet-600 rounded-md text-white px-4 py-2 transition-all hover:bg-violet-400">
            Finalizar compra
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
