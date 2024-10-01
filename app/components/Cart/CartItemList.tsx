import { useDispatch } from "react-redux";
import Link from "next/link";
import CartItem from "./CartItem";

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
    <div className="max-h-96 w-max overflow-auto">
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} dispatch={dispatch} />
      ))}
      <div className="flex flex-col gap-1 border-t-3 border-gray-300">
        <p className="font-normal text-lg text-right py-2">
          Total: R$ {total.toFixed(2)}
        </p>
        <Link href="/checkout">
          <button
            className="bg-gray-900 rounded-xl text-white py-3 w-full transition-all hover:bg-gray-800"
            onClick={() => setCartOpen(false)}
          >
            Continuar a compra
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartItemsList;
