import React, { useState, useEffect } from "react";
import ProductGrid from "../components/product/ProductGrid";
import { ProductGridSkeleton } from "../components/product/ProductCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import ErrorMessage from "../components/ui/ErrorMessage";
import { getProducts, getProductsByCategory } from "../services/productService";
import { FiSearch, FiFilter, FiChevronDown, FiX } from "react-icons/fi";

function Products() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const limit = 12;

  // Filter States
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");

  // Applied Filters
  const [appliedFilters, setAppliedFilters] = useState({});

  // On mount: pick up ?search= param from Header search
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    if (urlSearch) {
      setSearch(urlSearch);
      setAppliedFilters({ search: urlSearch });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset page & filters when category changes
  useEffect(() => {
    setPage(1);
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
    setAppliedFilters({});
  }, [category]);

  const handleApplyFilters = (e) => {
    e?.preventDefault();
    setAppliedFilters({ search, minPrice, maxPrice, sort });
    setPage(1);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSort(newSort);
    const newFilters = { ...appliedFilters, sort: newSort };
    setAppliedFilters(newFilters);
    setPage(1);
  };

  const queryFn = category
    ? () => getProductsByCategory(category, page, limit, appliedFilters)
    : () => getProducts(page, limit, appliedFilters);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", category, page, appliedFilters],
    queryFn,
    staleTime: 5 * 60 * 1000,
  });

  const products = data?.data || [];
  const totalPages = data ? Math.ceil(data.total / limit) : 1;

  if (isLoading && !data) return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
      <ProductGridSkeleton count={12} />
    </div>
  );
  if (isError) return <ErrorMessage />;

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 mb-10 min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 pb-6 border-b border-gray-100">
        <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight capitalize">
            {category ? `${category} Collection` : "All Products"}
            </h1>
            <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">
            {data?.total || 0} Products Available
            </p>
        </div>
        

        {/* Top Bar Sort */}
        <div className="mt-6 md:mt-0 relative flex items-center">
            <span className="text-[12px] font-bold text-gray-400 mr-4 uppercase tracking-[0.15em]">Sort By:</span>
            <div className="relative">
                <select 
                    value={sort} 
                    onChange={handleSortChange}
                    className="appearance-none bg-gray-50 border border-gray-200 text-gray-900 font-extrabold text-[14px] py-3.5 pl-6 pr-14 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-50 focus:border-[#F63232] cursor-pointer shadow-sm transition-all"
                >
                    <option value="">Recommended</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
                <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-lg" />
            </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 shrink-0">
          <form onSubmit={handleApplyFilters} className="bg-white p-7 rounded-[24px] border border-gray-100 shadow-[0_15px_40px_rgb(0,0,0,0.06)] sticky top-[120px]">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-red-50 text-[#F63232] flex items-center justify-center">
                    <FiFilter className="text-xl" />
                </div>
                <h3 className="text-[16px] font-extrabold text-gray-900 uppercase tracking-[0.15em]">Filters</h3>
            </div>

            {/* Search */}
            <div className="mb-8">
                <label className="block text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-widest">Search</label>
                <div className="relative">
                    <input 
                        type="text" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-[14px] font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-50 focus:border-[#F63232] transition-all"
                    />
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
                <label className="block text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-widest">Price Range</label>
                <div className="flex items-center gap-3">
                    <input 
                        type="number" 
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-4 text-[14px] font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-50 focus:border-[#F63232] transition-all"
                    />
                    <span className="text-gray-300 font-black">-</span>
                    <input 
                        type="number" 
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-4 text-[14px] font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-50 focus:border-[#F63232] transition-all"
                    />
                </div>
            </div>

            <button 
                type="submit"
                className="w-full bg-gray-900 text-white font-extrabold text-[12px] uppercase tracking-[0.15em] py-4 rounded-xl hover:bg-[#F63232] transition-colors shadow-lg shadow-gray-900/20 hover:shadow-red-500/30 hover:-translate-y-0.5 transform duration-300"
            >
                Apply Filters
            </button>
            
            {(search || minPrice || maxPrice || sort) && (
              <button 
                type="button"
                onClick={() => {
                  setSearch(""); setMinPrice(""); setMaxPrice(""); setSort("");
                  setAppliedFilters({}); setPage(1);
                }}
                className="w-full mt-3 bg-white text-gray-500 border-2 border-gray-100 font-extrabold text-[12px] uppercase tracking-[0.15em] py-3.5 rounded-xl hover:text-gray-900 hover:border-gray-300 transition-colors"
              >
                Clear All
              </button>
            )}
          </form>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-32 bg-gray-50/50 rounded-[32px] border-2 border-dashed border-gray-200">
                <FiSearch className="mx-auto text-5xl text-gray-300 mb-6" />
                <p className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">No products found</p>
                <p className="text-gray-500 font-medium mb-8">Try adjusting your filters or search terms to find what you're looking for.</p>
                {Object.keys(appliedFilters).length > 0 && (
                  <button
                    onClick={() => { setSearch(""); setMinPrice(""); setMaxPrice(""); setSort(""); setAppliedFilters({}); setPage(1); }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-extrabold text-[12px] uppercase tracking-widest rounded-xl hover:bg-[#F63232] transition-colors"
                  >
                    <FiX /> Clear All Filters
                  </button>
                )}
            </div>
          ) : (
            <ProductGrid products={products} />
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 pt-16 pb-8">
              <button 
                disabled={page === 1} 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-6 py-3.5 bg-white text-gray-900 border-2 border-gray-100 rounded-xl font-extrabold uppercase tracking-[0.15em] text-[11px] disabled:opacity-40 disabled:hover:-translate-y-0 hover:border-gray-300 transition-all hover:-translate-y-0.5"
              >
                Previous
              </button>
              
              <span className="font-black text-gray-900 text-[15px] bg-gray-50 px-5 py-2.5 rounded-lg border border-gray-200">
                {page} <span className="text-gray-400 mx-1">/</span> {totalPages}
              </span>
              
              <button 
                disabled={page === totalPages || totalPages === 0} 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-6 py-3.5 bg-white text-gray-900 border-2 border-gray-100 rounded-xl font-extrabold uppercase tracking-[0.15em] text-[11px] disabled:opacity-40 disabled:hover:-translate-y-0 hover:border-gray-300 transition-all hover:-translate-y-0.5"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
