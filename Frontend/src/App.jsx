import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Code-split: each page is a separate bundle loaded on demand
const Home           = lazy(() => import("./pages/Home"));
const Products       = lazy(() => import("./pages/Products"));
const ProductCategory= lazy(() => import("./pages/ProductCategory"));
const ProductDetail  = lazy(() => import("./pages/ProductDetail"));
const Cart           = lazy(() => import("./pages/Cart"));
const Orders         = lazy(() => import("./pages/Orders"));
const Checkout       = lazy(() => import("./pages/Checkout"));
const About          = lazy(() => import("./pages/About"));
const Contact        = lazy(() => import("./pages/Contact"));
const Login          = lazy(() => import("./pages/Login"));
const SignUp         = lazy(() => import("./pages/SignUp"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword  = lazy(() => import("./pages/ResetPassword"));
const Wishlist       = lazy(() => import("./pages/Wishlist"));
const NotFound       = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <div className="min-h-[80vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-[#F63232]" />
  </div>
);

import ScrollToTop from "./components/ui/ScrollToTop";

function App() {
  return (
    <>
      <Helmet>
        <title>HexaShop</title>
        <link rel="icon" href="/public/Icon.png" />
        <meta
          name="description"
          content="Shop the latest fashion and home essentials at Hexashop. Enjoy fast shipping, secure checkout, and exclusive deals."
        />
      </Helmet>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Main Routes */}
            <Route element={<MainLayout />}>
              <Route path="/"                            element={<Home />} />
              <Route path="/products"                    element={<Products />} />
              <Route path="/products/category/:category" element={<ProductCategory />} />
              <Route path="/products/:id"                element={<ProductDetail />} />
              <Route path="/cart"                        element={<Cart />} />
              <Route path="/orders"                      element={<Orders />} />
              <Route path="/checkout"                    element={<Checkout />} />
              <Route path="/wishlist"                    element={<Wishlist />} />
              <Route path="/about"                       element={<About />} />
              <Route path="/contact"                     element={<Contact />} />
            </Route>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login"           element={<Login />} />
              <Route path="/sign-up"         element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password"  element={<ResetPassword />} />
            </Route>
            {/* 404 Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
