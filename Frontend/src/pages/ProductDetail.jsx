import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services/productService";
import LoadingMessage from "../components/ui/LoadingMessage";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useCartContext } from "../hooks/useCartContext";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCartContext();

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <LoadingMessage />;
  if (isError)
    return (
      <div className="p-4 text-center">
        <ErrorMessage />
        <button
          onClick={() => refetch()}
          className="px-4 py-2 mt-3 text-white bg-blue-600 rounded"
        >
          Try Again
        </button>
      </div>
    );
  if (!product)
    return <p className="text-center text-gray-500">Product not found</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{product.title}</h1>
      <p className="text-gray-600">{product.description}</p>
      <p className="font-semibold text-green-600">Price: {product.price}$</p>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="object-cover w-64 h-64 rounded"
      />
      <button
        onClick={() => addToCart(product)}
        className="mt-3 btn btn-primary btn-md"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;
