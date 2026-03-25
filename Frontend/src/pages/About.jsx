import React from 'react';
import { FiUsers, FiGlobe, FiAward } from 'react-icons/fi';

function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-24 bg-gray-50 border-b border-gray-100 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">Our <span className="text-[#F63232]">Story</span></h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
          Hexashop was founded on a simple yet powerful principle: high-quality premium fashion should be accessible, affordable, and crafted with immense care for everyone.
        </p>
      </div>

      {/* Split Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
            <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80" alt="Team working" className="rounded-3xl shadow-2xl w-full h-[500px] md:h-[600px] object-cover hover:scale-[1.02] transition-transform duration-500" />
        </div>
        <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Crafting the future of fashion.</h2>
            <div className="w-20 h-1.5 bg-[#F63232] rounded-full"></div>
            <p className="text-gray-600 text-lg leading-relaxed">
                Since our inception in 2026, we have constantly strived to push the boundaries of modern e-commerce. From sustainable global sourcing to our incredibly rigorous quality control checks, we ensure that every single item that leaves our fulfillment warehouse is something we are radically proud of.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
                Whether you are looking for the sharpest menswear, timeless elegant dresses, or durable kidswear, Hexashop is your ultimate destination. We believe true style is timeless and boundless.
            </p>
            <button className="px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-[#F63232] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Meet The Executive Team
            </button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-900 py-20 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-700">
            <div className="p-4 transform hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <FiUsers className="text-4xl text-[#F63232]" />
                </div>
                <h3 className="text-5xl font-extrabold text-white mb-3">50k+</h3>
                <p className="text-gray-400 font-medium text-lg uppercase tracking-wide">Happy Customers</p>
            </div>
            <div className="p-4 transform hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <FiGlobe className="text-4xl text-[#F63232]" />
                </div>
                <h3 className="text-5xl font-extrabold text-white mb-3">12</h3>
                <p className="text-gray-400 font-medium text-lg uppercase tracking-wide">Countries Served</p>
            </div>
            <div className="p-4 transform hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <FiAward className="text-4xl text-[#F63232]" />
                </div>
                <h3 className="text-5xl font-extrabold text-white mb-3">99%</h3>
                <p className="text-gray-400 font-medium text-lg uppercase tracking-wide">Positive Feedback</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default About;