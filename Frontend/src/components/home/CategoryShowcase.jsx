import React from "react";
import { Link } from "react-router-dom";

const ShowcaseCard = ({ title, category, images }) => (
  <div className="bg-white p-6 pb-8 flex flex-col h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
    <h3 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
      {title}
    </h3>
    <div className="grid grid-cols-2 gap-4 flex-1 mb-6">
      {images.map((img, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 group cursor-pointer relative overflow-hidden"
        >
          <div className="aspect-square bg-gray-50 relative overflow-hidden">
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">
            {img.label}
          </span>
        </div>
      ))}
    </div>
    <Link
      to={`/products/category/${category}`}
      className="text-[#F63232] font-bold text-[13px] uppercase tracking-wider hover:text-black transition-colors mt-auto inline-block"
    >
      Shop now <span className="ml-1">→</span>
    </Link>
  </div>
);

export default function CategoryShowcase() {
  return (
    <section className="bg-gray-100 py-12 lg:py-16 -mt-[8vh] relative z-10 w-full mx-auto px-4 sm:px-8">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ShowcaseCard
          title="Refresh Your Wardrobe"
          category="men"
          images={[
            {
              label: "Jackets",
              src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",
            },
            {
              label: "Shirts",
              src: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80",
            },
            {
              label: "Pants",
              src: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80",
            },
            {
              label: "Shoes",
              src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80",
            },
          ]}
        />
        <ShowcaseCard
          title="Elevated Essentials"
          category="women"
          images={[
            {
              label: "Dresses",
              src: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80",
            },
            {
              label: "Blouses",
              src: "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=400&q=80",
            },
            {
              label: "Skirts",
              src: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80",
            },
            {
              label: "Heels",
              src: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80",
            },
          ]}
        />
        <ShowcaseCard
          title="Kids' Adventures"
          category="kids"
          images={[
            {
              label: "Outerwear",
              src: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=80",
            },
            {
              label: "Tops",
              src: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&q=80",
            },
            {
              label: "Bottoms",
              src: "https://plus.unsplash.com/premium_photo-1675183689638-a68fe7048da9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              label: "Sneakers",
              src: "https://images.unsplash.com/photo-1560506840-ec148e82a604?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
          ]}
        />

        {/* 4th Card: Exclusive Access Promo */}
        <div className="bg-gray-900 p-8 flex flex-col justify-between text-white hover:bg-black hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay group-hover:opacity-40 transition-opacity duration-500"
            alt="Background Fashion"
          />
          <div className="relative z-10">
            <h3 className="text-3xl font-extrabold mb-4 tracking-tight leading-tight">
              Exclusive
              <br />
              <span className="text-[#F63232]">Members</span>
              <br />
              Preview
            </h3>
            <p className="text-gray-400 font-medium">
              Sign in to unlock early premium access to our Fall 2026
              Collection.
            </p>
          </div>
          <div>
            <Link
              to="/sign-up"
              className="relative z-10 inline-block bg-white text-gray-900 py-4 px-6 font-extrabold uppercase tracking-widest text-[13px] hover:bg-[#F63232] hover:text-white transition-colors text-center w-full shadow-lg"
            >
              Join Hexa Club
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
