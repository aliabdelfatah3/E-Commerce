import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { MdArrowDropDown } from "react-icons/md";
import { FiShoppingCart, FiMenu, FiX, FiSearch, FiHeart } from "react-icons/fi";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useWishlistStore } from "../store/wishlistStore";

function Header() {
  const items = useCartStore((state) => state.items);
  const { user, logout } = useAuthStore();
  const wishlist = useWishlistStore((state) => state.wishlist);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  // ESC key closes search
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setSearchOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinkClass = ({ isActive }) =>
    `relative group py-2 font-bold tracking-wide transition-colors ${isActive ? 'text-[#F63232]' : 'text-gray-800 hover:text-[#F63232]'}`;

  const Underline = ({ isActive }) => (
    <span className={`absolute -bottom-1 left-0 w-full h-[3px] rounded-t-lg bg-[#F63232] transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
  );

  const categories = [
    { to: "/products/category/men", label: "Men's Original" },
    { to: "/products/category/women", label: "Women's Fashion" },
    { to: "/products/category/kids", label: "Kids' Corner" },
  ];

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100 py-3' : 'bg-white py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0" onClick={() => setMobileOpen(false)}>
            <img src={logo} alt="logo" className="w-[124px] transform hover:scale-105 transition-transform duration-300" />
          </NavLink>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-10">
            <li>
              <NavLink to="/" className={navLinkClass}>
                {({ isActive }) => <><span className="relative z-10">Home</span><Underline isActive={isActive} /></>}
              </NavLink>
            </li>
            {/* Dropdown */}
            <li className="relative group">
              <div className="flex items-center gap-1 cursor-pointer select-none">
                <NavLink to="/products" className={navLinkClass}>
                  {({ isActive }) => <><span className="relative z-10">Categories</span><Underline isActive={isActive} /></>}
                </NavLink>
                <MdArrowDropDown className="text-xl text-gray-500 transition-transform duration-300 group-hover:rotate-180" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 invisible opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-400 ease-out pt-6 w-60">
                <div className="bg-white/95 backdrop-blur-2xl rounded-[20px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-2 relative overflow-hidden">
                  <div className="flex flex-col space-y-1">
                    {categories.map((item) => (
                      <NavLink key={item.to} to={item.to}
                        className={({ isActive }) => `group flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 ${isActive ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                      >
                        {({ isActive }) => (
                          <>
                            <span className={`text-[12px] font-extrabold uppercase tracking-[0.15em] transition-colors ${isActive ? 'text-[#F63232]' : 'text-gray-500 group-hover:text-gray-900'}`}>
                              {item.label}
                            </span>
                            <span className="text-[#F63232] font-bold opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                {({ isActive }) => <><span className="relative z-10">About Us</span><Underline isActive={isActive} /></>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                {({ isActive }) => <><span className="relative z-10">Contact</span><Underline isActive={isActive} /></>}
              </NavLink>
            </li>
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-600 hover:text-[#F63232] transition-colors"
              title="Search"
            >
              <FiSearch className="text-[22px]" />
            </button>

            {/* Wishlist */}
            <NavLink to="/wishlist" className="relative p-2 text-gray-600 hover:text-[#F63232] transition-colors">
              <FiHeart className="text-[22px]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white bg-[#F63232] border-2 border-white rounded-full">
                  {wishlist.length}
                </span>
              )}
            </NavLink>

            {/* Cart */}
            <NavLink to="/cart" className="relative p-2 text-gray-800 hover:text-[#F63232] transition-colors group">
              <FiShoppingCart className="text-[26px] transform group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white bg-[#F63232] border-2 border-white rounded-full shadow-sm">
                  {totalItems}
                </span>
              )}
            </NavLink>

            {/* Auth Links - Desktop only */}
            <div className="hidden sm:flex items-center gap-4 border-l-2 border-gray-100 pl-4 h-10">
              {user ? (
                <div className="relative group flex items-center gap-3 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold shadow-md group-hover:bg-[#F63232] transition-colors duration-300">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:block font-extrabold text-[14px] text-gray-800">{user.name.split(' ')[0]}</span>
                  <div className="absolute right-0 top-full pt-4 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-50">
                    <div className="w-52 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden p-2">
                      <NavLink to="/orders" className="flex items-center gap-3 w-full px-4 py-3 text-left font-bold text-sm text-gray-700 hover:bg-gray-50 hover:text-[#F63232] rounded-xl transition-colors">
                        <span>📦 My Orders</span>
                      </NavLink>
                      <NavLink to="/wishlist" className="flex items-center gap-3 w-full px-4 py-3 text-left font-bold text-sm text-gray-700 hover:bg-gray-50 hover:text-[#F63232] rounded-xl transition-colors">
                        <span>❤️ Wishlist {wishlist.length > 0 && `(${wishlist.length})`}</span>
                      </NavLink>
                      <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-left font-bold text-sm text-gray-700 hover:bg-red-50 hover:text-[#F63232] rounded-xl transition-colors mt-1">
                        <span>🚪 Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <NavLink to="/login" className="px-5 py-2.5 text-sm font-bold text-gray-800 hover:text-[#F63232] transition-colors">Login</NavLink>
                  <NavLink to="/sign-up" className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 border-2 border-gray-900 rounded-full hover:bg-transparent hover:text-gray-900 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">Sign Up</NavLink>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-800 hover:text-[#F63232] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX className="text-[24px]" /> : <FiMenu className="text-[24px]" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[12vh]"
          onClick={() => setSearchOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-2xl">
              <FiSearch className="text-2xl text-gray-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands, categories..."
                className="flex-1 text-lg font-medium text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-700 text-xl">
                  <FiX />
                </button>
              )}
              <button
                type="submit"
                className="bg-gray-900 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#F63232] transition-colors text-sm uppercase tracking-wider"
              >
                Search
              </button>
            </form>
            <p className="text-center text-white/50 text-xs mt-4 font-medium">Press ESC or click outside to close</p>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Drawer Panel */}
        <div className={`absolute top-0 right-0 h-full w-[300px] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <NavLink to="/" onClick={() => setMobileOpen(false)}>
              <img src={logo} alt="logo" className="w-[100px]" />
            </NavLink>
            <button onClick={() => setMobileOpen(false)} className="p-2 text-gray-500 hover:text-[#F63232]">
              <FiX className="text-[22px]" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
            {[
              { to: "/", label: "🏠 Home" },
              { to: "/products", label: "🛍 All Products" },
              { to: "/products/category/men", label: "👔 Men's" },
              { to: "/products/category/women", label: "👗 Women's" },
              { to: "/products/category/kids", label: "🧸 Kids'" },
              { to: "/wishlist", label: `❤️ Wishlist${wishlist.length > 0 ? ` (${wishlist.length})` : ''}` },
              { to: "/about", label: "ℹ️ About Us" },
              { to: "/contact", label: "📬 Contact" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3.5 rounded-xl font-bold text-sm transition-colors ${isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-[#F63232]'}`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Auth Section in mobile */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-extrabold text-sm text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <NavLink to="/orders" onClick={() => setMobileOpen(false)} className="flex px-4 py-3.5 rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-50 hover:text-[#F63232] transition-colors">
                    📦 My Orders
                  </NavLink>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3.5 rounded-xl font-bold text-sm text-[#F63232] hover:bg-red-50 transition-colors">
                    🚪 Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 px-2">
                  <NavLink to="/login" onClick={() => setMobileOpen(false)} className="w-full text-center py-3 font-bold text-sm text-gray-800 border-2 border-gray-200 rounded-xl hover:border-gray-900 transition-all">
                    Login
                  </NavLink>
                  <NavLink to="/sign-up" onClick={() => setMobileOpen(false)} className="w-full text-center py-3 font-bold text-sm text-white bg-gray-900 rounded-xl hover:bg-[#F63232] transition-all">
                    Sign Up
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
