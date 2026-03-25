import React from 'react';
import { Link } from 'react-router-dom';

export default function PromotionalBanner() {
    return (
        <section className="relative w-full h-[65vh] min-h-[500px] bg-gray-900 flex items-center overflow-hidden my-12">
            <img 
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1800&q=80" 
                alt="Flash Sale Banner" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay hover:scale-105 transition-transform duration-[20s]"
            />
            {/* Dynamic Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent"></div>
            
            <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-12 w-full flex flex-col items-start justify-center">
                <span className="text-[#F63232] font-black text-[14px] uppercase tracking-[0.3em] mb-4 bg-white/5 px-6 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg inline-block">48-Hour Event</span>
                
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
                    Mid-Season <br/>Flash Sale.
                </h2>
                
                <p className="text-lg md:text-xl text-gray-300 mb-10 font-bold max-w-lg leading-relaxed mix-blend-screen">
                    Up to 60% off sitewide. No code required. Premium collections are moving fast.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link to="/products/category/women" className="bg-white text-gray-900 font-extrabold uppercase tracking-[0.15em] text-[13px] px-12 py-5 hover:bg-[#F63232] hover:text-white transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] w-full sm:w-auto text-center rounded-sm">
                        Shop Women
                    </Link>
                    <Link to="/products/category/men" className="bg-transparent border-2 border-white text-white font-extrabold uppercase tracking-[0.15em] text-[13px] px-12 py-5 hover:bg-white hover:text-gray-900 transition-all duration-300 w-full sm:w-auto text-center rounded-sm">
                        Shop Men
                    </Link>
                </div>
            </div>
        </section>
    );
}
