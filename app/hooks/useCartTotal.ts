import { useSelector } from "react-redux";

const useCartTotal = () => {
  const cartItems = useSelector(
    (state: { cart: { items: any[] } }) => state.cart.items
  );

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return { cartItems, total };
};

export default useCartTotal;
