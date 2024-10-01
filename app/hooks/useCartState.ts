import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useCartState = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = useSelector((state: any) => state.cart.items);

  const totalItems = cartItems.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );

  return { cartOpen, setCartOpen, totalItems, cartItems };
};

export default useCartState;
