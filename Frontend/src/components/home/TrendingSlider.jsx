import { useEffect, useState, useRef } from 'react';
import { getProducts } from '../../services/productService';
import ProductCard from '../product/ProductCard';
import { ProductGridSkeleton } from '../product/ProductCardSkeleton';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function TrendingSlider() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                // Fetch 12 products to guarantee carousel overflow
                const data = await getProducts(1, 12);
                setProducts(data.data || []);
            } catch (error) {
                console.error("Error fetching trending products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, []);

    const scrollLeft = () => {
        if (sliderRef.current) sliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    };

    const scrollRight = () => {
        if (sliderRef.current) sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    };

    // Return an aesthetic skeleton if loading
    if (loading) return (
        <section className="py-20 bg-white">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
                 <div className="mb-8 border-b border-gray-100 pb-5">
                    <div className="h-10 w-64 bg-gray-100 animate-pulse rounded-lg mb-2"></div>
                 </div>
                 <ProductGridSkeleton count={4} />
            </div>
        </section>
    );

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
                <style dangerouslySetInnerHTML={{__html: `
                    .hide-scrollbar::-webkit-scrollbar { display: none; }
                    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}} />

                <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-5">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Trending <span className="text-[#F63232]">Right Now</span></h2>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={scrollLeft} className="w-12 h-12 bg-gray-50 flex items-center justify-center text-gray-900 rounded-full hover:bg-gray-100 hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-[#F63232] shadow-sm"><FiChevronLeft className="text-2xl" /></button>
                        <button onClick={scrollRight} className="w-12 h-12 bg-gray-50 flex items-center justify-center text-gray-900 rounded-full hover:bg-gray-100 hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-[#F63232] shadow-sm"><FiChevronRight className="text-2xl" /></button>
                    </div>
                </div>

                <div className="relative -mx-4 sm:mx-0">
                    <div 
                        ref={sliderRef} 
                        className="flex overflow-x-auto gap-6 sm:gap-8 snap-x snap-mandatory hide-scrollbar pb-10 pt-4 px-4 sm:px-0 scroll-smooth"
                    >
                        {products.map(product => (
                            <div key={product.id} className="w-[85vw] sm:w-[320px] lg:w-[350px] shrink-0 snap-start h-full">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
