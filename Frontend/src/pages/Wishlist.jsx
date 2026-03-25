import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistProvider";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiTrash2 } from "react-icons/fi";

function Wishlist() {
  const { wishlist, toggleWishlist, clearWishlist } = useContext(WishlistContext);

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8">
          <FiHeart className="text-4xl text-[#F63232]" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-10 max-w-sm leading-relaxed">
          Save your favorite products here and come back to them anytime.
        </p>
        <Link to="/products" className="bg-gray-900 text-white font-extrabold uppercase tracking-[0.15em] text-[13px] px-12 py-5 hover:bg-[#F63232] transition-colors shadow-xl rounded-xl">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 min-h-[70vh]">
      <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-6">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-[#F63232] font-black mb-2">My Account</p>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Wishlist <span className="text-gray-400 text-2xl font-bold ml-2">({wishlist.length})</span>
          </h1>
        </div>
        <button onClick={clearWishlist} className="text-[13px] font-extrabold text-gray-500 uppercase tracking-widest hover:text-[#F63232] transition-colors underline underline-offset-4">
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {wishlist.map((product) => (
          <div key={product.id} className="group bg-white border border-gray-100 rounded-[24px] p-4 hover:shadow-lg transition-all duration-300 relative">
            {/* Remove from wishlist */}
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 text-[#F63232] transition-colors"
            >
              <FiHeart className="text-base fill-[#F63232]" />
            </button>

            <Link to={`/products/${product.id}`} className="block">
              <div className="aspect-square bg-gray-50 rounded-2xl p-4 mb-4 overflow-hidden flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">{product.category}</p>
              <h3 className="text-[14px] font-extrabold text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#F63232] transition-colors">{product.title}</h3>
              <p className="text-[18px] font-black text-gray-900">${product.price?.toFixed(2)}</p>
            </Link>

            <Link
              to={`/products/${product.id}`}
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-gray-900 hover:bg-[#F63232] text-white font-bold text-[12px] uppercase tracking-widest rounded-xl transition-all"
            >
              <FiShoppingBag className="text-sm" />
              View & Buy
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
