import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative bg-gray-900 h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0">
            <img 
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80" 
                alt="Shopping Background" 
                className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
            <span className="text-[#F63232] font-bold tracking-widest uppercase text-sm md:text-base mb-4 block">New Collection 2026</span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
                Discover Your <span className="text-[#F63232]">True Style</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto drop-shadow-md">
                Elevate your everyday look with our premium collection of men's, women's, and kids' apparel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products" className="px-10 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-200 hover:scale-105 transition-all shadow-xl">
                    Shop Now
                </Link>
                <Link to="/products/category/women" className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 hover:scale-105 transition-all shadow-xl">
                    Women's Collection
                </Link>
            </div>
        </div>
    </div>
  );
}
