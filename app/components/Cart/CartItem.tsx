import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cartSlice";
import { toast } from "react-toastify";
import ItemActions from "./ItemActions";

const CartItem = ({ item, dispatch }: { item: any; dispatch: any }) => {
  const handleRemove = () => {
    dispatch(removeFromCart(item));
    toast.warn(`"${item.title}" removido do carrinho.`, {
      position: "bottom-left",
    });
  };

  return (
    <div className="flex items-center justify-between gap-10 my-3">
      <div className="flex gap-3 max-w-60">
        <img
          src={item.image}
          alt={item.title}
          className="w-14 max-h-20 rounded-md shadow-sm object-contain"
        />
        <div className="flex flex-col items-start justify-center">
          <p className="text-sm font-normal line-clamp-1">{item.title}</p>
          <p className="text-[7px] line-clamp-3 text-gray-500 max-h-44">
            {item.description}
          </p>
          <p className="text-[10px] font-semibold text-gray-800">
            R$
            <span className="text-sm">
              {(item.price * item.quantity).toFixed(2)}
            </span>
          </p>
        </div>
      </div>
      <ItemActions item={item} dispatch={dispatch} />
    </div>
  );
};

export default CartItem;
