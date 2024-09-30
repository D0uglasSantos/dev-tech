import { configureStore } from "@reduxjs/toolkit"; // Importa a função para configurar a store
import cartReducer from "./cartSlice"; // Importa o redutor do carrinho

const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (error) {
    console.error("Erro ao carregar carrinho:", error);
    return [];
  }
};

// Configura a store do Redux
export const store = configureStore({
  reducer: {
    cart: cartReducer, // Define o redutor do carrinho
  },
  preloadedState: {
    cart: {
      items: loadCartFromLocalStorage(),
    },
  },
});

// Tipos para o estado da aplicação e despachante
export type RootState = ReturnType<typeof store.getState>; // Tipo para o estado da store
export type AppDispatch = typeof store.dispatch; // Tipo para a função de despachar ações
