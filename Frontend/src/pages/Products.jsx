import React from "react";
import ProductGrid from "../components/product/ProductGrid";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import LoadingMessage from "../components/ui/LoadingMessage";
import ErrorMessage from "../components/ui/ErrorMessage";
import { getProducts, getProductsByCategory } from "../services/productService";

function Products() {
  const { category } = useParams();

  const queryFn = category
    ? () => getProductsByCategory(category)
    : getProducts;

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", category],
    queryFn,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <LoadingMessage />;
  if (isError) return <ErrorMessage />;
  return <ProductGrid products={products} />;
}

export default Products;
