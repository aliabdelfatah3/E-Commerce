import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.png";

function Footer() {
  return (
    <footer className="text-white">
      {/* Main Footer */}
      <div className="bg-[#1E1E1E] px-6 md:px-16 lg:px-24 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Logo / Address */}
          <div className="flex flex-col items-start gap-5">
            <img src={logo2} alt="logo" className="w-32" />
            <p className="mb-2 text-gray-300">
              <span className="font-bold text-white">Address:</span> 123 Main
              Street, City
            </p>
            <p className="mb-2 text-gray-300">
              <span className="font-bold text-white">E-mail:</span>{" "}
              Example@gmail.com
            </p>
            <p className="text-gray-300">
              <span className="font-bold text-white">Phone:</span> 123 456 789
            </p>
          </div>

          {/* Shopping & Categories */}
          <div>
            <h2 className="mb-4 text-xl font-bold">Shopping & Categories</h2>
            <ul className="space-y-5 text-gray-300">
              {[
                { to: "/products/category/men", label: "Men's Shopping" },
                { to: "/products/category/women", label: "Women's Shopping" },
                { to: "/products/category/kids", label: "Kid's Shopping" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h2 className="mb-4 text-xl font-bold">Useful Links</h2>
            <ul className="space-y-5 text-gray-300">
              {[
                { to: "/", label: "Homepage" },
                { to: "/about", label: "About Us" },
                { to: "#", label: "Help" },
                { to: "/contact", label: "Contact Us" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Information */}
          <div>
            <h2 className="mb-4 text-xl font-bold">Help & Information</h2>
            <ul className="space-y-5 text-gray-300">
              {["FAQ'S", "Shipping", "Tracking Id"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-4 text-sm text-center text-gray-400 bg-black">
        Copyright © 2025
      </div>
    </footer>
  );
}

export default Footer;
