import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/global.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartProvider.jsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={new QueryClient()}>
        <CartProvider>
          <App />
        </CartProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
