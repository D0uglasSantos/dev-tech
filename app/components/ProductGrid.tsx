"use client"; // Indica que este componente deve ser renderizado no lado do cliente
import { useDispatch } from "react-redux"; // Importa o hook useDispatch do Redux
import { addToCart } from "../redux/cartSlice"; // Importa a ação addToCart
import { toast } from "react-toastify"; // Importa a biblioteca de notificações
import { useState, useEffect } from "react"; // Importa useState e useEffect do React

// Define o tipo Product
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

// Componente Skeleton para simular o carregamento
const ProductSkeleton = () => (
  <div className="bg-gray-200 animate-pulse rounded-lg mx-auto shadow-xl p-2 h-60 w-full">
    <div className="h-32 bg-gray-300 rounded-xl mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/5"></div>
      <div className="h-3 bg-gray-300 rounded w-4/5"></div>
      <div className="h-4 bg-gray-300 rounded w-2/5 mt-4"></div>
    </div>
  </div>
);

// Componente ProductGrid
const ProductGrid = ({ products }: { products: Product[] }) => {
  const dispatch = useDispatch(); // Obtém a função dispatch do Redux
  const [loading, setLoading] = useState(true); // Estado para verificar se está carregando

  // Simula o carregamento dos produtos com useEffect
  useEffect(() => {
    // Simulando um carregamento (você pode substituir pelo fetch real de dados)
    const timer = setTimeout(() => {
      setLoading(false); // Define que o carregamento terminou
    }, 2000); // Tempo de 2 segundos para simulação

    return () => clearTimeout(timer); // Limpa o temporizador quando o componente desmonta
  }, []);

  // Função para adicionar um produto ao carrinho
  const addProductToCart = (product: Product) => {
    dispatch(addToCart(product)); // Despacha a ação para adicionar o produto
    toast.info("Produto adicionado ao carrinho.", {
      // Exibe a notificação
      position: "bottom-left",
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
      {/* Se estiver carregando, renderiza os skeletons */}
      {loading
        ? Array(12) // Renderiza 6 skeletons enquanto os produtos são carregados
            .fill(0)
            .map((_, index) => <ProductSkeleton key={index} />)
        : products.map((product) => (
            <div
              key={product.id}
              className="bg-white flex gap-5 items-center rounded-lg mx-auto shadow-xl p-2 h-60"
            >
              <div className="w-2/5">
                <img
                  className="p-2 rounded-xl w-4/5"
                  src={product.image}
                  alt={`Imagem do produto: ${product.title}`} // Melhora a acessibilidade da imagem
                />
              </div>

              <div className="space-y-2 w-3/5">
                <p className="uppercase font-medium text-left text-gray-600 text-xs leading-4 line-clamp-2">
                  {product.title}
                </p>
                <p className="text-gray-600 text-xs leading-6 mr-6 mb-3 text-justify line-clamp-3">
                  {product.description}
                </p>
                <div className="flex flex-col gap-1">
                  <h2 className="text-violet-600 text-lg font-bold">
                    R$ {product.price.toFixed(2)}
                  </h2>
                  <button
                    className="bg-violet-600 text-white uppercase text-xs py-2 px-4 rounded-sm hover:bg-violet-400 transition duration-400"
                    onClick={() => {
                      addProductToCart(product); // Adiciona o produto ao carrinho
                    }}
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

export default ProductGrid; // Exporta o componente ProductGrid
