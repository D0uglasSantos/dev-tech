import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";

interface CartModalProps {
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartModal = ({ setCartOpen }: CartModalProps) => {
  const cartItems = useSelector(
    (state: { cart: { items: any[] } }) => state.cart.items
  );
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  // Calcula o total do carrinho
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    // Fecha o modal ao clicar fora dele
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCartOpen]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div
        ref={modalRef}
        className="bg-white shadow-lg rounded-md p-6 absolute top-16 right-16 w-1/3"
      >
        <h2 className="text-lg font-bold mb-4">Carrinho</h2>

        {cartItems.length === 0 ? (
          <EmptyCartMessage />
        ) : (
          <CartItemsList
            cartItems={cartItems}
            total={total}
            setCartOpen={setCartOpen}
          />
        )}
      </div>
    </div>
  );
};

// Componente para mensagem de carrinho vazio
const EmptyCartMessage = () => (
  <>
    <p className="font-semibold text-base text-gray-600">
      Seu carrinho está vazio
    </p>
    <p className="text-xs text-gray-500">
      Volte às compras e adicione algum item ao carrinho!
    </p>
  </>
);

// Componente para listar os itens do carrinho
const CartItemsList = ({
  cartItems,
  total,
  setCartOpen,
}: {
  cartItems: any[];
  total: number;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();

  return (
    <div className="max-h-96 overflow-auto">
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} dispatch={dispatch} />
      ))}
      <div className="flex flex-col gap-4 mt-4">
        <p className="font-medium text-lg">Total: R$ {total.toFixed(2)}</p>
        <Link href="/checkout">
          <button
            className="bg-violet-600 rounded-lg text-white py-2 px-4 w-full transition-all hover:bg-violet-700"
            onClick={() => setCartOpen(false)}
          >
            Continuar a compra
          </button>
        </Link>
      </div>
    </div>
  );
};

// Componente para um item do carrinho
const CartItem = ({ item, dispatch }: { item: any; dispatch: any }) => (
  <div className="flex justify-between gap-4 my-4 pb-2 border-b border-gray-300">
    <div className="flex gap-4">
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 rounded-md shadow-sm"
      />
      <div className="flex flex-col items-start justify-center">
        <p className="text-sm font-semibold line-clamp-1 w-48">{item.title}</p>
        <p className="text-md font-bold text-gray-800">
          R$ {(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
    <ItemActions item={item} dispatch={dispatch} />
  </div>
);

// Componente para ações do item (incrementar, decrementar e remover)
const ItemActions = ({ item, dispatch }: { item: any; dispatch: any }) => {
  const handleRemove = () => {
    dispatch(removeFromCart(item));
    toast.warn(`"${item.title}" removido do carrinho.`, {
      position: "bottom-left",
    });
  };

  return (
    <div className="flex items-center h-max gap-2">
      <div className="border border-gray-300 rounded-lg flex">
        <button
          onClick={() => dispatch(decrementQuantity(item.id))}
          className="text-white bg-red-500 px-3 py-1 rounded-l-lg transition-all hover:bg-red-600"
        >
          -
        </button>
        <span className="px-4 py-1 text-gray-700">{item.quantity}</span>
        <button
          onClick={() => dispatch(incrementQuantity(item.id))}
          className="text-white bg-green-500 px-3 py-1 rounded-r-lg transition-all hover:bg-green-600"
        >
          +
        </button>
      </div>
      <button
        onClick={handleRemove}
        className="text-red-400 transition-all hover:text-red-600"
      >
        <BiTrash className="text-2xl" />
      </button>
    </div>
  );
};

export default CartModal;
