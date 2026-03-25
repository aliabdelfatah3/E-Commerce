import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiStar, FiHeart } from "react-icons/fi";
import { useWishlistStore } from "../../store/wishlistStore";

// Memoized: only re-renders when the product prop actually changes
const ProductCard = memo(function ProductCard({ product }) {
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const isNew  = product.id % 3 === 0;
  const isSale = product.id % 5 === 0 && !isNew;

  return (
    <div className="flex flex-col h-full bg-white group rounded-[2rem] p-4 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 border border-transparent hover:border-gray-100/60 cursor-pointer relative">

      {/* Wishlist Heart */}
      <button
        onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
        className={`absolute top-6 right-6 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
          wishlisted
            ? "bg-red-50 text-[#F63232]"
            : "bg-white/80 backdrop-blur text-gray-300 opacity-0 group-hover:opacity-100"
        }`}
        title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <FiHeart className={`text-sm ${wishlisted ? "fill-[#F63232]" : ""}`} />
      </button>

      <Link
        to={`/products/${product.id}`}
        aria-label={`View details of ${product.title}`}
        className="relative block overflow-hidden rounded-[1.5rem] bg-gray-50/80 mb-5 pb-[110%] transition-colors duration-500 group-hover:bg-gray-100"
      >
        <div className="absolute inset-0 p-8 flex items-center justify-center">
          <img
            loading="lazy"
            decoding="async"
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] drop-shadow-sm"
            onError={(e) => {
              e.target.onerror = null;
              const colors = { men: 'F3F4F6/111827', women: 'FDF2F8/831843', kids: 'F0FDF4/14532D' };
              const cat = product.category?.toLowerCase() || 'men';
              const color = colors[cat] || colors['men'];
              e.target.src = `https://placehold.co/400x500/${color}?text=${encodeURIComponent(product.title?.slice(0,15) || 'Product')}`;
            }}
          />
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {isNew  && <span className="bg-gray-900 text-white text-[10px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">New</span>}
          {isSale && <span className="bg-[#F63232] text-white text-[10px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-red-500/20">Sale</span>}
        </div>

        {/* Quick View Button */}
        <div className="absolute bottom-4 right-4 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
          <button
            onClick={(e) => { e.preventDefault(); navigate(`/products/${product.id}`); }}
            className="w-12 h-12 bg-white/95 backdrop-blur-md text-gray-900 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-[#F63232] hover:text-white transition-all hover:scale-110 duration-300"
            title="View Product"
          >
            <FiShoppingBag className="text-xl" />
          </button>
        </div>
      </Link>

      <div className="flex flex-col flex-1 px-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em] font-extrabold">{product.category}</p>
          <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
            <FiStar className="text-[10px] text-[#F63232] fill-[#F63232]" />
            <span className="text-[11px] font-extrabold text-gray-700 leading-none">
              {product.ratingRate ? product.ratingRate.toFixed(1) : "5.0"}
            </span>
          </div>
        </div>

        <h3 className="text-[15px] font-extrabold text-gray-900 leading-snug line-clamp-2 mb-4 group-hover:text-[#F63232] transition-colors" title={product.title}>
          {product.title}
        </h3>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            {isSale && <p className="text-[12px] font-bold text-gray-400 line-through mb-0.5">${(product.price * 1.4).toFixed(2)}</p>}
            <p className="text-[20px] font-black text-gray-900 tracking-tighter leading-none">
              ${product.price ? product.price.toFixed(2) : "0.00"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
