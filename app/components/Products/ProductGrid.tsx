"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import useProductLoading from "../../hooks/useProductLoading";
import { Product } from "../../types/Product";
import ProductSkeleton from "./ProductSkeleton";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const dispatch = useDispatch();
  const loading = useProductLoading(2000);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.info("Produto adicionado ao carrinho.", {
      position: "bottom-left",
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-6">
      {loading
        ? Array(12)
            .fill(0)
            .map((_, index) => <ProductSkeleton key={index} />)
        : products.map((product) => (
            <div
              key={product.id}
              className="text-left flex flex-col gap-5 items-center rounded-lg mx-auto p-2 h-96 w-64"
            >
              <img
                className="p-2 rounded-xl w-full h-60 object-contain"
                src={product.image}
                alt={`Imagem do produto: ${product.title}`}
              />

              <div className="flex items-end w-full gap-4">
                <div className="w-3/5 space-y-1">
                  <p className="uppercase font-medium text-left text-gray-800 text-sm leading-4 line-clamp-1">
                    {product.title}
                  </p>
                  <p className="text-gray-600 text-[10px] text-justify line-clamp-3">
                    {product.description}
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-2 w-2/5">
                  <h2 className="text-black text-sm">
                    R$
                    <span className="text-2xl">{product.price.toFixed(2)}</span>
                  </h2>
                  <button
                    className="bg-black font-medium text-white text-xs uppercase py-2 px-4 w-max rounded-sm hover:bg-gray-800 transition-all"
                    onClick={() => handleAddToCart(product)}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default ProductGrid;
