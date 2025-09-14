import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../hooks/useCartContext";

function ProductCard({ product }) {
  const { addToCart } = useCartContext();
  return (
    <div>
      <div className="p-4 border rounded-lg shadow hover:shadow-lg">
        <Link
          to={`/products/${product.id}`}
          aria-label={`View details of ${product.title}`}
        >
          <img
            loading="lazy"
            src={product.thumbnail}
            alt={product.title}
            className="object-cover w-full h-48 rounded"
          />
          <h3 className="mt-2 text-lg font-semibold text-gray-800">
            {product.title}
          </h3>
        </Link>

        <p className="text-gray-600">${product.price}</p>

        <button
          onClick={() => addToCart(product)}
          className="mt-3 btn btn-primary btn-md"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
