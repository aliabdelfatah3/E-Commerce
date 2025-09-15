import React from "react";
import { useCartContext } from "../hooks/useCartContext";
import { Link } from "react-router-dom";

function Cart() {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartContext();

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0)
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
      </div>
    );
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      <div className="grid gap-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4 border-b">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="object-cover w-24 h-24 rounded"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600">${item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="px-4 py-2 btn btn-danger btn-md"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-4 mt-6 text-center">
        <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
        <Link
          to="/checkout"
          className="px-6 py-2 btn btn-primary btn-md"
        >
          Checkout
        </Link>
        <button
          onClick={clearCart}
          className="px-6 py-2 btn btn-secondary btn-md"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
