import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — cached forever
          "vendor-react": ["react", "react-dom"],
          // Routing
          "vendor-router": ["react-router-dom"],
          // Data fetching & HTTP
          "vendor-query": ["@tanstack/react-query", "axios"],
          // Icons library
          "vendor-icons": ["react-icons"],
        },
      },
    },
    // Modern browsers only — smaller bundle
    target: "es2020",
    // Raise warning threshold so we see real problems
    chunkSizeWarningLimit: 600,
  },
  // Prevent full-page reload on CSS changes in dev
  css: {
    devSourcemap: true,
  },
});

