import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/global.css";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

// Created once outside render — prevents QueryClient reset on hot reload
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:        5 * 60 * 1000,  // Data stays fresh 5 min — no refetch on nav
      gcTime:          10 * 60 * 1000,  // Keep unused cache 10 min
      retry:            1,              // Retry failed requests once
      refetchOnWindowFocus: false,      // Don't refetch when user tabs back
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-right" />
        <App />
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
