/**
 * Cart Store (Zustand)
 *
 * This keeps track of what's in the shopping cart.
 * It persists across page navigation so items don't
 * disappear when you click around the site.
 *
 * Uses localStorage so the cart survives page refreshes too.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// What a cart item looks like
export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string; // URL to the product image
}

// The cart store's shape
interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed-ish helpers
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      // Add an item to the cart (or increase quantity if already there)
      addItem: (newItem) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === newItem.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === newItem.id
                  ? { ...i, quantity: i.quantity + newItem.quantity }
                  : i
              ),
              isCartOpen: true,
            };
          }
          return {
            items: [...state.items, newItem],
            isCartOpen: true,
          };
        }),

      // Remove an item entirely
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      // Change the quantity of an item (remove if quantity hits 0)
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) =>
                  i.id === id ? { ...i, quantity } : i
                ),
        })),

      // Empty the cart (after successful checkout, for example)
      clearCart: () => set({ items: [] }),

      // Cart drawer open/close
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      // How many total items in the cart
      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      // Total price of everything in the cart
      totalPrice: () =>
        get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "shitfriedrice-cart", // localStorage key
      // Only persist the items, not the open/close state
      partialize: (state) => ({ items: state.items }),
    }
  )
);
