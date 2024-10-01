import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/app/redux/cartSlice";

//icons
import { IoIosRemove } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";

const ItemActions = ({ item, dispatch }: { item: any; dispatch: any }) => {
  return (
    <div className="flex flex-col items-center h-max gap-1">
      <div className="rounded-full flex">
        <button
          onClick={() => dispatch(decrementQuantity(item.id))}
          className="text-white bg-gray-950 px-3 py-1 rounded-l-2xl transition-all  cursor-pointer"
        >
          <IoIosRemove />
        </button>
        <span className="px-4 py-1 text-black font-medium bg-gray-300">
          {item.quantity}
        </span>
        <button
          onClick={() => dispatch(incrementQuantity(item.id))}
          className="text-white bg-gray-950 px-3 py-1 rounded-r-2xl transition-all  cursor-pointer"
        >
          <IoIosAdd />
        </button>
      </div>
      <button
        onClick={() => dispatch(removeFromCart(item))}
        className="text-gray-400 text-[10px] transition-all hover:text-gray-500"
      >
        limpar
      </button>
    </div>
  );
};

export default ItemActions;
