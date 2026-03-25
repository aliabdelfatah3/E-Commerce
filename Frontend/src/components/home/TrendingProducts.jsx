import { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService';
import ProductCard from '../product/ProductCard';
import { Link } from 'react-router-dom';

export default function TrendingProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                // Fetch first 8 products for the showcase
                const data = await getProducts(1, 8);
                setProducts(data.data || []);
            } catch (error) {
                console.error("Error fetching trending products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center py-32 bg-gray-50">
            <div className="w-14 h-14 border-4 border-gray-200 border-t-[#F63232] rounded-full animate-spin"></div>
        </div>
    );

    return (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Trending <span className="text-[#F63232]">Right Now</span></h2>
                        <p className="text-gray-500 max-w-xl text-lg">Check out our most popular products updated daily. Grab them before they're gone!</p>
                    </div>
                    <Link to="/products" className="hidden md:inline-flex px-8 py-3 border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-900 hover:text-white transition-all shadow-sm">
                        View All Products
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                
                <div className="mt-12 text-center md:hidden">
                    <Link to="/products" className="inline-flex px-10 py-4 border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-900 hover:text-white transition-all">
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
}
