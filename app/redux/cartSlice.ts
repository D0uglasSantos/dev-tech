import { createSlice } from "@reduxjs/toolkit"; // Importa a função para criar um slice

// Define a interface para o estado do carrinho
interface CartState {
  items: {
    id: number; // ID do item
    title: string; // Título do item
    price: number; // Preço do item
    quantity: number; // Quantidade do item no carrinho
    image: string; // URL da imagem do item
  }[];
}

// Estado inicial do carrinho
const initialState: CartState = {
  items: [],
};

// Cria o slice do carrinho
const cartSlice = createSlice({
  name: "cart", // Nome do slice
  initialState, // Estado inicial
  reducers: {
    // Adiciona um item ao carrinho
    addToCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id); // Busca o item
      if (item) {
        item.quantity += 1; // Incrementa a quantidade se o item já existir
      } else {
        // Adiciona um novo item com quantidade 1 se não existir
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // Remove um item do carrinho
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload.id); // Filtra o item a ser removido
    },
    // Incrementa a quantidade de um item
    incrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload); // Busca o item
      if (item) item.quantity += 1; // Incrementa a quantidade
    },
    // Decrementa a quantidade de um item
    decrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload); // Busca o item
      if (item && item.quantity > 1) item.quantity -= 1; // Decrementa se a quantidade for maior que 1
    },
    // Limpa o carrinho
    clearCart: (state) => {
      state.items = []; // Define o carrinho como vazio
    },
  },
});

// Exporta as ações geradas pelo slice
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

// Exporta o redutor do slice
export default cartSlice.reducer;
