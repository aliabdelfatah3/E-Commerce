import { NavLink } from "react-router-dom"; // بدل Link
import logo from "../assets/logo.png";
import { MdArrowDropDown } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { useCartContext } from "../hooks/useCartContext";

function Header() {
  const { items } = useCartContext();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const activeClass = "text-[#F63232] font-bold";

  const defaultClass = "transition hover:text-[#F63232]";

  return (
    <nav className="flex justify-between items-center px-20 py-4 shadow-md sticky top-0 z-50 bg-[#D9D9D9]">
      {/* Logo */}
      <NavLink to="/">
        <img src={logo} alt="logo" className="w-24" />
      </NavLink>

      {/* Navigation Links */}
      <ul className="flex items-center gap-14">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClass : defaultClass
            }
          >
            Home
          </NavLink>
        </li>

        {/* Dropdown */}
        <li className="relative group">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            <span className="py-3 transition hover:text-[#F63232]">
              Categories
            </span>
            <MdArrowDropDown className="text-xl transition-transform duration-200 group-hover:rotate-180" />
          </div>
          <div className="absolute left-0 invisible transition-all duration-300 ease-out scale-95 translate-y-2 border border-gray-100 shadow-xl opacity-0 mt- w-44 rounded-xl bg-white/95 backdrop-blur group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:visible">
            {[
              { to: "/products/category/men", label: "👔 Men" },
              { to: "/products/category/women", label: "👗 Women" },
              { to: "/products/category/kids", label: "🧢 Kids" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "block px-5 py-2 rounded-lg text-white bg-blue-600"
                    : "block px-5 py-2 text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? activeClass : defaultClass
            }
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? activeClass : defaultClass
            }
          >
            Contact Us
          </NavLink>
        </li>

        {/* Cart */}
        <li className="relative">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? activeClass : defaultClass
            }
          >
            <FiShoppingCart className="text-2xl" />
            {totalItems > 0 && (
              <span className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full -top-2 -right-2">
                {totalItems}
              </span>
            )}
          </NavLink>
        </li>
      </ul>

      {/* Auth Links */}
      <ul className="flex gap-10">
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? activeClass : "btn btn-signin btn-md"
            }
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sign-up"
            className={({ isActive }) =>
              isActive ? activeClass : "btn btn-register btn-md"
            }
          >
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
