import React from "react";
import { useCartContext } from "../hooks/useCartContext";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiTrash2, FiMinus, FiPlus, FiArrowRight } from "react-icons/fi";

function Cart() {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartContext();

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15.00;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white px-4">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 shadow-inner shadow-gray-200/50">
            <FiShoppingBag className="text-4xl text-gray-300" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Your bag is empty</h2>
        <p className="text-gray-500 mb-10 max-w-sm text-center font-medium leading-relaxed">Looks like you haven't added anything yet. Discover our latest collections.</p>
        <Link to="/products" className="bg-gray-900 text-white font-extrabold uppercase tracking-[0.15em] text-[13px] px-12 py-5 hover:bg-[#F63232] transition-colors shadow-xl hover:shadow-[#F63232]/30 rounded-lg">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-gray-50/50 py-12 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="mb-10 flex items-end justify-between border-b border-gray-100 pb-6">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">Your Bag <span className="text-gray-400 font-extrabold text-2xl sm:text-3xl ml-3">({items.length})</span></h1>
            <button onClick={clearCart} className="text-[13px] font-extrabold text-gray-500 uppercase tracking-widest hover:text-[#F63232] transition-colors underline underline-offset-4 decoration-2 mb-2">Clear all</button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            
          {/* Left Column: Cart Items */}
          <div className="w-full lg:w-[63%] flex flex-col gap-6">
            {items.map((item, index) => (
              <div key={`${item.id}-${item.size}-${index}`} className="group flex flex-col sm:flex-row gap-6 p-5 sm:p-6 bg-white rounded-[2rem] border border-gray-100 hover:shadow-[0_15px_40px_rgb(0,0,0,0.05)] hover:border-transparent transition-all duration-300 relative">
                
                {/* Product Image */}
                <Link to={`/products/${item.id}`} className="w-full sm:w-36 sm:h-44 shrink-0 bg-gray-50/80 rounded-2xl overflow-hidden p-6 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] drop-shadow-sm"
                  />
                </Link>

                {/* Product Details & Controls */}
                <div className="flex flex-col flex-1 justify-between py-1">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-extrabold">{item.category}</p>
                            {item.size && (
                                <span className="bg-gray-100 text-gray-800 text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest border border-gray-200">
                                    Size: {item.size}
                                </span>
                            )}
                        </div>
                        <Link to={`/products/${item.id}`} className="text-lg font-extrabold text-gray-900 leading-snug hover:text-[#F63232] transition-colors line-clamp-2 max-w-[90%]">{item.title}</Link>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-gray-400 hover:text-[#F63232] transition-colors p-3 bg-gray-50 hover:bg-red-50 rounded-full shrink-0"
                      title="Remove Item"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-auto">
                    {/* Quantity Selector Pill */}
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-extrabold">Quantity</span>
                        <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-full p-1 shadow-sm">
                        <button
                            onClick={() => decreaseQuantity(item.id, item.size)}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-800 hover:text-white hover:bg-gray-900 shadow-sm transition-all text-sm font-bold"
                        >
                            <FiMinus />
                        </button>
                        <span className="font-extrabold text-gray-900 text-[14px] w-6 text-center">{item.quantity}</span>
                        <button
                            onClick={() => increaseQuantity(item.id, item.size)}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-800 hover:text-white hover:bg-gray-900 shadow-sm transition-all text-sm font-bold"
                        >
                            <FiPlus />
                        </button>
                        </div>
                    </div>

                    {/* Price Block */}
                    <div className="text-right">
                        <p className="text-[22px] font-black text-gray-900 tracking-tighter">${(item.price * item.quantity).toFixed(2)}</p>
                        {item.quantity > 1 && <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">${item.price.toFixed(2)} each</p>}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Right Column: Order Summary (Sticky Dashboard) */}
          <div className="w-full lg:w-[37%] lg:sticky lg:top-32">
            <div className="bg-gray-900 text-white rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-[#F63232]/10 transition-colors duration-1000"></div>
                
                <h2 className="text-2xl font-black mb-8 tracking-tight">Order Summary</h2>
                
                <div className="flex flex-col gap-5 text-gray-300 font-medium mb-8 border-b border-white/10 pb-8 text-[15px]">
                    <div className="flex justify-between items-center">
                        <span>Subtotal</span>
                        <span className="text-white font-extrabold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Estimated Shipping</span>
                        <span className="text-white font-extrabold">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Estimated Tax</span>
                        <span className="text-white font-extrabold">Calculated at checkout</span>
                    </div>
                </div>

                <div className="flex justify-between items-end mb-10">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-4xl font-black tracking-tighter">${total.toFixed(2)}</span>
                </div>

                <Link to="/checkout" className="w-full bg-white text-gray-900 font-extrabold uppercase tracking-[0.2em] text-[13px] py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#F63232] hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[#F63232]/40 hover:-translate-y-1 icon-group">
                  Proceed to Checkout
                  <FiArrowRight className="text-lg group-hover/icon-group:translate-x-1 transition-transform" />
                </Link>
                
                <p className="text-center text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-8 flex items-center justify-center gap-2">
                   <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H5V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" clipRule="evenodd" /></svg>
                   Secure Encrypted Payment
                </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cart;
