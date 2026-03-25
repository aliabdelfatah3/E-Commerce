import React, { createContext, useState, useCallback } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch {
      return [];
    }
  });

  const save = (items) => {
    setWishlist(items);
    localStorage.setItem("wishlist", JSON.stringify(items));
  };

  const toggleWishlist = useCallback((product) => {
    const exists = wishlist.some((p) => p.id === product.id);
    const updated = exists
      ? wishlist.filter((p) => p.id !== product.id)
      : [...wishlist, product];
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlist(updated);
    if (exists) {
      toast("Removed from wishlist", { icon: "💔" });
    } else {
      toast.success("Added to wishlist! ❤️");
    }
  }, [wishlist]);

  const isWishlisted = useCallback(
    (id) => wishlist.some((p) => p.id === id),
    [wishlist]
  );

  const clearWishlist = () => save([]);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
