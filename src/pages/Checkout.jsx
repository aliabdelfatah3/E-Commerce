import React, { useState } from "react";
import { useCartContext } from "../hooks/useCartContext";

function Checkout() {
  const { items, clearCart } = useCartContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    console.log("Order Placed:", { ...formData, items, totalPrice });
    alert("Order placed successfully!");
    clearCart();
    setFormData({ name: "", email: "", address: "", phone: "" });
  };

  if (items.length === 0)
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
      </div>
    );

  return (
    <div className="max-w-4xl p-8 mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Checkout</h1>

      {/* Cart Items */}
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
              <p className="text-gray-600">
                ${item.price} x {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="text-right">
        <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
      </div>

      {/* User Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 mt-6 space-y-4 border rounded shadow-md"
      >
        <h2 className="mb-4 text-xl font-bold">Shipping Information</h2>

        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
