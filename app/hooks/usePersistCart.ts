import { useEffect } from "react";
import { useSelector } from "react-redux";

const usePersistCart = () => {
  const cartItems = useSelector((state: any) => state.cart.items);

  useEffect(() => {
    const saveCartToLocalStorage = (cart: any) => {
      try {
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem("cart", serializedCart);
      } catch (error) {
        console.error("Error saving cart:", error);
      }
    };

    saveCartToLocalStorage(cartItems);
  }, [cartItems]);
};

export default usePersistCart;
