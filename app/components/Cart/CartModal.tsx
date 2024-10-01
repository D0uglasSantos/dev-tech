import { useDispatch } from "react-redux";
import Link from "next/link";
import { BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import useCartTotal from "../../hooks/useCartTotal";
import useClickOutside from "../../hooks/useClickOutside";
import EmptyCartMessage from "./EmptyCartMessage";
import CartItemsList from "./CartItemList";

interface CartModalProps {
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartModal = ({ setCartOpen }: CartModalProps) => {
  const { cartItems, total } = useCartTotal();
  const modalRef = useClickOutside(() => setCartOpen(false));

  return (
    <div className="fixed inset-0 z-50">
      <div
        ref={modalRef}
        className="bg-white shadow-2xl rounded-md p-6 absolute top-24 right-32"
      >
        <h2 className="text-xl font-normal py-2 border-b-3 border-gray-300">
          Carrinho
        </h2>
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

export default CartModal;
