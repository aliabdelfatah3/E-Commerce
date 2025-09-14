import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductCategory from "./pages/ProductCategory";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import { Helmet } from "react-helmet-async";
import { CartProvider } from "./context/CartProvider";

function App() {
  return (
    <>
      <Helmet>
        <title>HexaShop</title>
        <link rel="icon" href="/public/Icon.png" />
        <meta
          name="description"
          content="Shop the latest fashion, and home essentials at Hexashop. Enjoy fast shipping, secure checkout, and exclusive deals."
        />
      </Helmet>
      <CartProvider>
        <Router>
          <Routes>
            {/* Main Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route
                path="/products/category/:category"
                element={<ProductCategory />}
              />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            {/* Authentication Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
