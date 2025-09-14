import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { MdArrowDropDown } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { useCartContext } from "../hooks/useCartContext";

function Header() {
  const { items } = useCartContext();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex justify-between items-center px-20 py-4 shadow-md sticky top-0 z-50 bg-[#D9D9D9]">
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="logo" className="w-24" />
      </Link>

      {/* Navigation Links */}
      <ul className="flex items-center gap-14">
        <li>
          <Link to="/" className="transition hover:text-blue-700">
            Home
          </Link>
        </li>

        {/* Dropdown on Hover */}
        <li className="relative group">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            <span className="transition hover:text-blue-700">Categories</span>
            <MdArrowDropDown className="text-xl transition-transform duration-200 group-hover:rotate-180" />
          </div>

          {/* Dropdown Menu */}
          <div className="absolute left-0 invisible mt-3 transition-all duration-300 ease-out scale-95 translate-y-2 border border-gray-100 shadow-xl opacity-0 w-44 rounded-xl bg-white/95 backdrop-blur group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:visible">
            {[
              { to: "/products/category/men", label: "👔 Men" },
              { to: "/products/category/women", label: "👗 Women" },
              { to: "/products/category/kids", label: "🧢 Kids" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block px-5 py-2 text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </li>

        <li>
          <Link to="/about" className="transition hover:text-blue-700">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/contact" className="transition hover:text-blue-700">
            Contact Us
          </Link>
        </li>

        {/* Cart Icon */}
        <li className="relative">
          <Link
            to="/cart"
            className="text-gray-700 transition hover:text-blue-700"
          >
            <FiShoppingCart className="text-2xl" />
            {totalItems > 0 && (
              <span className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full -top-2 -right-2">
                {totalItems}
              </span>
            )}
          </Link>
        </li>
      </ul>

      {/* Authentication Links */}
      <ul className="flex gap-14">
        <li>
          <Link to="/login" className="transition hover:text-blue-700">
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="px-4 py-1 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
