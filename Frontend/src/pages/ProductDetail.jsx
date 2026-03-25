import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct, getProductsByCategory } from "../services/productService";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { FiShoppingBag, FiTruck, FiShield, FiArrowLeft, FiHeart, FiMinus, FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import ProductGrid from "../components/product/ProductGrid";

function ProductDetail() {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const [adding, setAdding] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    staleTime: 5 * 60 * 1000,
  });

  // Related products (same category, different id)
  const { data: relatedData } = useQuery({
    queryKey: ["products", product?.category],
    queryFn: () => getProductsByCategory(product?.category, 1, 5),
    enabled: !!product?.category,
    staleTime: 5 * 60 * 1000,
  });
  const relatedProducts = (relatedData?.data || []).filter((p) => p.id !== Number(id)).slice(0, 4);

  if (isLoading) return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-[#F63232]"></div>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Error loading product</h2>
      <p className="text-gray-500 mb-6">There was an issue retrieving the product details.</p>
      <button onClick={() => refetch()} className="px-8 py-3 text-white bg-gray-900 font-bold rounded-xl hover:bg-[#F63232] transition-colors">Try Again</button>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <p className="text-xl font-bold text-gray-900">Product not found</p>
      <Link to="/products" className="text-[#F63232] mt-4 font-bold hover:underline">Back to Shop</Link>
    </div>
  );

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart.");
      return;
    }
    setAdding(true);
    for (let i = 0; i < quantity; i++) {
      addToCart({ ...product, size: selectedSize });
    }
    setTimeout(() => setAdding(false), 800);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 lg:py-16">

        <Link to="/products" className="inline-flex items-center gap-2 text-[12px] font-extrabold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-[0.15em] mb-12">
          <FiArrowLeft className="text-lg" /> Back to Collections
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

          {/* Left: Image */}
          <div className="w-full lg:w-[55%] relative group">
            <div className="aspect-[4/5] bg-gray-50 rounded-[32px] overflow-hidden flex items-center justify-center p-8 lg:p-16 relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  const colors = { men: 'F3F4F6/111827', women: 'FDF2F8/831843', kids: 'F0FDF4/14532D' };
                  const cat = product.category?.toLowerCase() || 'men';
                  const color = colors[cat] || colors['men'];
                  e.target.src = `https://placehold.co/800x1000/${color}?text=${encodeURIComponent(product.title?.slice(0,10) || 'Product')}`;
                }}
              />
              {/* Wishlist Floating Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  wishlisted ? 'bg-red-50 text-[#F63232]' : 'bg-white text-gray-400 hover:text-[#F63232]'
                }`}
              >
                <FiHeart className={`text-xl ${wishlisted ? 'fill-[#F63232]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[45%] flex flex-col pt-4 lg:pt-10">
            <span className="text-[11px] font-extrabold text-[#F63232] uppercase tracking-[0.2em] mb-4">{product.category}</span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">{product.title}</h1>
            <div className="text-3xl font-black text-gray-900 mb-8 border-b border-gray-100 pb-8 tracking-tight">
              ${product.price ? product.price.toFixed(2) : '0.00'}
            </div>

            <p className="text-[16px] text-gray-500 font-medium leading-relaxed mb-10">
              {product.description || "Experience the perfect balance of premium craftsmanship and everyday comfort. This piece is meticulously designed to elevate your personal style effortlessly while maintaining durability."}
            </p>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Select Size</span>
                <a href="https://www.sizeguide.net" target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-gray-400 hover:text-gray-900 underline underline-offset-4">Size Guide</a>
              </div>
              <div className="flex flex-wrap gap-3">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-xl border text-[14px] font-bold transition-all ${
                      selectedSize === size
                        ? 'border-gray-900 bg-gray-900 text-white shadow-lg scale-105'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <span className="text-[11px] font-bold text-gray-900 uppercase tracking-widest block mb-4">Quantity</span>
              <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-2 w-fit">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-gray-800 hover:text-white hover:bg-gray-900 shadow-sm transition-all font-bold"
                >
                  <FiMinus />
                </button>
                <span className="font-extrabold text-gray-900 text-[16px] w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-gray-800 hover:text-white hover:bg-gray-900 shadow-sm transition-all font-bold"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-5 rounded-2xl flex items-center justify-center gap-3 font-extrabold text-[14px] uppercase tracking-[0.15em] transition-all duration-300 transform ${adding ? 'bg-emerald-600 text-white hover:bg-emerald-700 scale-[0.98]' : 'bg-[#F63232] text-white hover:bg-black hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1'}`}
              >
                <FiShoppingBag className="text-xl" />
                {adding ? 'Added to Bag!' : `Add ${quantity > 1 ? `(${quantity})` : ''} to Bag`}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center shrink-0 transition-all ${wishlisted ? 'bg-red-50 border-red-100 text-[#F63232]' : 'border-gray-200 text-gray-400 hover:border-[#F63232] hover:text-[#F63232]'}`}
              >
                <FiHeart className={wishlisted ? 'fill-[#F63232]' : ''} />
              </button>
            </div>

            {/* Features Bar */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
                  <FiTruck className="text-xl text-gray-400" />
                </div>
                <div>
                  <h4 className="text-[11px] font-extrabold text-gray-900 uppercase tracking-widest mb-1">Free Delivery</h4>
                  <p className="text-[12px] text-gray-500 font-medium">On orders over $150</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
                  <FiShield className="text-xl text-gray-400" />
                </div>
                <div>
                  <h4 className="text-[11px] font-extrabold text-gray-900 uppercase tracking-widest mb-1">Secure Checkout</h4>
                  <p className="text-[12px] text-gray-500 font-medium">100% Encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-gray-100">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-[#F63232] font-black mb-2">You May Also Like</p>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Related Products</h2>
              </div>
              <Link to={`/products/category/${product.category}`} className="text-[13px] font-extrabold text-gray-500 uppercase tracking-widest hover:text-[#F63232] transition-colors underline underline-offset-4">
                View all →
              </Link>
            </div>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
