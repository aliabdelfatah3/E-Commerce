import React from "react";

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white rounded-[2rem] p-4 animate-pulse">
      {/* Image placeholder */}
      <div className="rounded-[1.5rem] bg-gray-100 mb-5 pb-[110%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
      </div>
      {/* Category + rating */}
      <div className="flex justify-between items-center mb-3 px-3">
        <div className="h-2.5 w-16 bg-gray-200 rounded-full" />
        <div className="h-5 w-10 bg-gray-100 rounded-md" />
      </div>
      {/* Title */}
      <div className="px-3 space-y-2 mb-4">
        <div className="h-3 w-full bg-gray-200 rounded-full" />
        <div className="h-3 w-4/5 bg-gray-200 rounded-full" />
      </div>
      {/* Price */}
      <div className="px-3 mt-auto">
        <div className="h-6 w-24 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default ProductCardSkeleton;
