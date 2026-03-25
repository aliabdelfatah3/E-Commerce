import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,

  login: (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    if (token) localStorage.setItem("auth_token", token);
    set({ user: userData });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
    set({ user: null });
  },
}));
