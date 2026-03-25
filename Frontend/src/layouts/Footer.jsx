import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/Logo2.png";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
import toast from "react-hot-toast";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Welcome to the Hexashop family! ❤️");
    setEmail("");
  };

  return (
    <footer className="bg-[#0A0A0A] text-white pt-24 pb-8 border-t-4 border-[#F63232]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-8">
            <img src={logo2} alt="logo" className="w-[140px] mb-8 opacity-95 brightness-200" />
            <p className="text-gray-400 mb-8 leading-relaxed text-[15px]">
              Hexashop is your ultimate destination for premium fashion. We blend timeless elegance with modern trends to bring you the best clothing collection globally. Express your true style.
            </p>
            <div className="w-full">
              <h4 className="text-[13px] font-bold tracking-[0.2em] text-[#F63232] uppercase mb-4">Join Our VIP Newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex w-full mt-2 shadow-lg">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address" 
                  className="w-full px-5 py-3.5 bg-gray-900/80 border border-gray-800 rounded-l-xl focus:outline-none focus:border-gray-600 text-white placeholder-gray-500 font-medium transition-colors" 
                  required
                />
                <button type="submit" className="px-6 py-3.5 bg-[#F63232] text-white font-bold rounded-r-xl hover:bg-red-700 transition-colors shrink-0">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1 hidden lg:block"></div>

          {/* Shopping Categories */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-8 text-white tracking-wider">Shopping</h3>
            <ul className="space-y-4">
              {[
                { to: "/products", label: "All Products" },
                { to: "/products/category/men", label: "Men's Original" },
                { to: "/products/category/women", label: "Women's Fashion" },
                { to: "/products/category/kids", label: "Kids' Corner" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-3 group text-[15px]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-[#F63232] transition-colors group-hover:scale-150"></span>
                    <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-8 text-white tracking-wider">Company</h3>
            <ul className="space-y-4">
              {[
                { to: "/", label: "Homepage" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact Us" },
                { to: "#", label: "Help & FAQ" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-3 group text-[15px]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-[#F63232] transition-colors group-hover:scale-150"></span>
                    <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-8 text-white tracking-wider">Contact Info</h3>
            <ul className="space-y-5 text-gray-400 text-[15px]">
              <li className="flex items-start gap-4">
                <span className="text-[#F63232] font-bold text-lg mt-0.5">A.</span>
                <span className="leading-relaxed">123 Fashion Avenue<br/>New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-[#F63232] font-bold text-lg">E.</span>
                <a href="mailto:support@hexashop.com" className="hover:text-white transition-colors">support@hexashop.com</a>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-[#F63232] font-bold text-lg">P.</span>
                <a href="tel:+15551234567" className="hover:text-white transition-colors tracking-wider">+1 (555) 123-4567</a>
              </li>
            </ul>

            <div className="mt-10 flex gap-4">
                <a href="#" className="w-11 h-11 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#F63232] hover:border-[#F63232] hover:text-white transition-all transform hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(246,50,50,0.3)]">
                    <FiFacebook className="text-lg" />
                </a>
                <a href="#" className="w-11 h-11 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#F63232] hover:border-[#F63232] hover:text-white transition-all transform hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(246,50,50,0.3)]">
                    <FiTwitter className="text-lg" />
                </a>
                <a href="#" className="w-11 h-11 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#F63232] hover:border-[#F63232] hover:text-white transition-all transform hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(246,50,50,0.3)]">
                    <FiInstagram className="text-lg" />
                </a>
                <a href="#" className="w-11 h-11 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#F63232] hover:border-[#F63232] hover:text-white transition-all transform hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(246,50,50,0.3)]">
                    <FiLinkedin className="text-lg" />
                </a>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Footer */}
      <div className="border-t border-gray-800/60 pt-8 mt-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[14px] text-gray-500 font-medium">
                &copy; {new Date().getFullYear()} <span className="text-gray-400 font-bold">Hexashop</span> E-Commerce. All rights reserved.
            </p>
            <div className="flex gap-8 text-[14px] font-medium text-gray-500">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
