import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiAlertCircle, FiHome, FiShoppingBag, FiArrowLeft } from "react-icons/fi";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center bg-white px-6 text-center">
      {/* Big 404 */}
      <div className="relative mb-8 select-none">
        <span className="text-[180px] sm:text-[220px] font-black text-gray-50 leading-none tracking-tighter">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <FiAlertCircle className="text-5xl text-[#F63232] mx-auto mb-2" />
            <p className="text-2xl font-black text-gray-900">Page Not Found</p>
          </div>
        </div>
      </div>

      <p className="text-gray-500 font-medium text-lg max-w-md mb-10 leading-relaxed">
        Oops! The page you're looking for doesn't exist or has been moved. Let's get you back to something good.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:border-gray-900 hover:text-gray-900 transition-all"
        >
          <FiArrowLeft />
          Go Back
        </button>
        <Link
          to="/"
          className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-[#F63232] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
        >
          <FiHome />
          Home
        </Link>
        <Link
          to="/products"
          className="flex items-center gap-2 px-8 py-4 bg-[#F63232] text-white font-bold rounded-2xl hover:bg-gray-900 transition-all shadow-lg hover:-translate-y-0.5 transform"
        >
          <FiShoppingBag />
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
