import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { InterfaceProduct } from '@/types/IProduct';

interface InterfaceState {
  likes: InterfaceProduct[];
}

interface InterfaceActions {
  toggleLike: (product: InterfaceProduct) => void;
}

export const useLike = create<InterfaceState & InterfaceActions>()(
  devtools(
    persist(
      immer((set) => ({
        likes: [],
        toggleLike: (product) =>
          set((state) => {
            const existingProductIndex = state.likes.findIndex(
              (p) => p.id === product.id
            );
            if (existingProductIndex === -1) {
              state.likes.push(product);
            } else {
              state.likes.splice(existingProductIndex, 1);
            }
          })
      })),
      { name: 'likes' }
    )
  )
);
