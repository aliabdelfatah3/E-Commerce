import { create } from "zustand";
import toast from "react-hot-toast";

export const useWishlistStore = create((set, get) => ({
  wishlist: (() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch {
      return [];
    }
  })(),

  toggleWishlist: (product) => {
    const { wishlist } = get();
    const exists = wishlist.some((p) => p.id === product.id);
    const updated = exists
      ? wishlist.filter((p) => p.id !== product.id)
      : [...wishlist, product];
    localStorage.setItem("wishlist", JSON.stringify(updated));
    set({ wishlist: updated });
    if (exists) {
      toast("Removed from wishlist", { icon: "💔" });
    } else {
      toast.success("Added to wishlist! ❤️");
    }
  },

  isWishlisted: (id) => get().wishlist.some((p) => p.id === id),

  clearWishlist: () => {
    localStorage.setItem("wishlist", JSON.stringify([]));
    set({ wishlist: [] });
  },
}));
