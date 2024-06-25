import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { InterfaceProduct } from '@/types/IProduct';

interface InterfaceProductExtended extends InterfaceProduct {
  quantity: number;
}

interface InterfaceState {
  cart: InterfaceProductExtended[];
  totalCardPrice: number;
  discount: number;
}

interface InterfaceActions {
  addToCart: (product: InterfaceProduct) => void;
  decreaseQuantityInCart: (id: number) => void;
  resetCart: (id: number) => void;
}

export const useCart = create<InterfaceState & InterfaceActions>()(
  devtools(
    persist(
      immer((set) => ({
        cart: [],
        totalCardPrice: 0,
        discount: 0,
        addToCart: (product) =>
          set((state) => {
            const existingProduct = state.cart.find((p) => p.id === product.id);
            if (existingProduct) {
              // Якщо продукт вже є, збільшуємо його кількість
              existingProduct.quantity = (existingProduct.quantity || 0) + 1;
            } else {
              // Якщо продукту ще немає, додаємо його з quantity = 1
              state.cart.push({ ...product, quantity: 1 });
            }
          }),
        decreaseQuantityInCart: (id) =>
          set((state) => {
            const existingProduct = state.cart.find((p) => p.id === id);
            if (existingProduct && existingProduct.quantity > 1) {
              existingProduct.quantity -= 1;
            }
          }),
        resetCart: (id) =>
          set((state) => {
            state.cart = state.cart.filter((product) => product.id !== id);
          })
      })),
      { name: 'cart' }
    )
  )
);
