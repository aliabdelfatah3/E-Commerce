import { create } from "zustand";
import { cartAPI } from "../services/api";
import { useAuthStore } from "./authStore";
import toast from "react-hot-toast";

const saveToLocalStorage = (items) =>
  localStorage.setItem("cartItems", JSON.stringify(items));

export const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem("cartItems")) || [],

  // Called after login to sync cart from API
  syncCart: async () => {
    try {
      const { data } = await cartAPI.getCart();
      const formattedItems = data.map((c) => ({
        ...c.product,
        quantity: c.quantity,
        size: c.size || "",
      }));
      saveToLocalStorage(formattedItems);
      set({ items: formattedItems });
    } catch (err) {
      console.error("Error fetching cart from API", err);
    }
  },

  addToCart: async (product) => {
    const { items } = get();
    const existingIndex = items.findIndex(
      (item) => item.id === product.id && item.size === product.size
    );
    let updatedItems;
    if (existingIndex !== -1) {
      updatedItems = items.map((item, i) =>
        i === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedItems = [...items, { ...product, quantity: 1 }];
    }
    saveToLocalStorage(updatedItems);
    set({ items: updatedItems });
    toast.success(`${product.title} (${product.size}) added to cart!`);
    const user = useAuthStore.getState().user;
    if (user) {
      try {
        await cartAPI.addToCart(product.id, 1, product.size);
      } catch (err) {
        console.error("API error", err);
      }
    }
  },

  removeFromCart: async (id, size) => {
    const updatedItems = get().items.filter(
      (item) => !(item.id === id && item.size === size)
    );
    saveToLocalStorage(updatedItems);
    set({ items: updatedItems });
    const user = useAuthStore.getState().user;
    if (user) {
      try {
        await cartAPI.removeFromCart(id);
      } catch (err) {
        console.error("API error", err);
      }
    }
  },

  increaseQuantity: async (id, size) => {
    const { items } = get();
    const updatedItems = items.map((item) =>
      item.id === id && item.size === size
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    saveToLocalStorage(updatedItems);
    set({ items: updatedItems });
    const user = useAuthStore.getState().user;
    if (user) {
      try {
        const item = items.find((i) => i.id === id && i.size === size);
        if (item) await cartAPI.updateCartItem(id, item.quantity + 1);
      } catch (err) {
        console.error("API error", err);
      }
    }
  },

  decreaseQuantity: async (id, size) => {
    const { items } = get();
    const updatedItems = items
      .map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    saveToLocalStorage(updatedItems);
    set({ items: updatedItems });
    const user = useAuthStore.getState().user;
    if (user) {
      try {
        const item = items.find((i) => i.id === id && i.size === size);
        if (item && item.quantity > 1) {
          await cartAPI.updateCartItem(id, item.quantity - 1);
        } else if (item && item.quantity === 1) {
          await cartAPI.removeFromCart(id);
        }
      } catch (err) {
        console.error("API error", err);
      }
    }
  },

  clearCart: async () => {
    saveToLocalStorage([]);
    set({ items: [] });
    const user = useAuthStore.getState().user;
    if (user) {
      try {
        await cartAPI.clearCart();
      } catch (err) {
        console.error("API error", err);
      }
    }
  },
}));
