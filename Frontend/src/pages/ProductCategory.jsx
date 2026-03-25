import React, { useState, useEffect } from "react";
import ProductGrid from "../components/product/ProductGrid";
import { ProductGridSkeleton } from "../components/product/ProductCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ErrorMessage from "../components/ui/ErrorMessage";
import { getProductsByCategory } from "../services/productService";

const categoryData = {
    men: {
        title: "Men's Original",
        subtitle: "Discover the latest trends in men's fashion. Engineered for excellence.",
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1600&q=80"
    },
    women: {
        title: "Women's Collection",
        subtitle: "Explore elegance and everyday comfort. Designed beautifully.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80"
    },
    kids: {
        title: "Kids' Corner",
        subtitle: "Bright, playful outfits for every adventure and discovery.",
        image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=1600&q=80"
    }
};

function ProductCategory() {
  const { category } = useParams();
  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    setPage(1);
  }, [category]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", category, page],
    queryFn: () => getProductsByCategory(category, page, limit),
    staleTime: 5 * 60 * 1000,
  });

  const products = data?.data || [];
  const totalPages = data ? Math.ceil(data.total / limit) : 1;
  const catInfo = categoryData[category?.toLowerCase()] || categoryData.men;

  return (
    <div className="min-h-screen flex flex-col mb-10 bg-white">
      {/* Category Hero Banner */}
      <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center mb-12 overflow-hidden bg-gray-900 border-b border-gray-200">
          <img src={catInfo.image} alt={catInfo.title} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
          <div className="relative z-10 text-center px-4 w-full">
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight">{catInfo.title}</h1>
              <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto drop-shadow-md">{catInfo.subtitle}</p>
          </div>
      </div>

      {/* Products Grid & Pagination */}
      <div className="max-w-7xl mx-auto w-full flex-1 px-4 sm:px-6 lg:px-8">
          {(isLoading && !data) ? <ProductGridSkeleton count={12} /> : isError ? <ErrorMessage /> : (
              <>
                  <ProductGrid products={products} />
                  
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 py-8 mt-12 border-t border-gray-100">
                      <button 
                        disabled={page === 1} 
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        className="px-6 py-3 bg-white text-gray-800 border-2 border-gray-200 rounded-full font-bold disabled:opacity-40 hover:bg-gray-50 transition-colors shadow-sm"
                      >
                        Previous
                      </button>
                      
                      <span className="font-bold text-gray-700 bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
                        Page <span className="text-[#F63232]">{page}</span> of {totalPages}
                      </span>
                      
                      <button 
                        disabled={page === totalPages || totalPages === 0} 
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        className="px-6 py-3 bg-white text-gray-800 border-2 border-gray-200 rounded-full font-bold disabled:opacity-40 hover:bg-gray-50 transition-colors shadow-sm"
                      >
                        Next
                      </button>
                    </div>
                  )}
              </>
          )}
      </div>
    </div>
  );
}

export default ProductCategory;