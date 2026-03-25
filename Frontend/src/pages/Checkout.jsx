import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { useNavigate, Link } from "react-router-dom";
import { FiCheckCircle, FiShield, FiLock, FiChevronLeft } from "react-icons/fi";
import { orderAPI } from "../services/api";
import toast from "react-hot-toast";

function Checkout() {
  const { items, clearCart } = useCartStore();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    phone: "",
    city: "",
    zipCode: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponOpen, setCouponOpen] = useState(false);

  // Available coupon codes
  const COUPONS = {
    "HEXA10": { type: "percent", value: 10, label: "10% off" },
    "SAVE20": { type: "percent", value: 20, label: "20% off" },
    "FREESHIP": { type: "shipping", value: 0, label: "Free shipping" },
  };

  const handleApplyCoupon = () => {
    const upper = couponCode.trim().toUpperCase();
    if (COUPONS[upper]) {
      setAppliedCoupon({ code: upper, ...COUPONS[upper] });
    } else {
      setAppliedCoupon({ code: null, label: "Invalid code" });
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const baseShipping = subtotal > 150 ? 0 : 15.00;
  const discount = appliedCoupon?.type === "percent" ? (subtotal * appliedCoupon.value / 100) : 0;
  const shipping = appliedCoupon?.type === "shipping" ? 0 : baseShipping;
  const total = subtotal - discount + shipping;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    // Simple validation
    if (!/^\d+$/.test(formData.zipCode)) {
      toast.error("Please enter a valid numeric zip code.");
      return;
    }
    if (formData.phone.length < 8) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
        await orderAPI.createOrder({
            ...formData,
            items: items.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                size: item.size || "",
                price: item.price,
            }))
        });

        clearCart();
        setOrderPlaced(true);
        toast.success("Order placed successfully! 🎉");
    } catch (error) {
        console.error("Order creation failed:", error);
        toast.error("Failed to place your order. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (!user) return null;

  if (orderPlaced) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[85vh] bg-white px-4 py-20">
              <div className="w-28 h-28 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-10 shadow-lg shadow-emerald-500/10 scale-in-center">
                  <FiCheckCircle className="text-6xl" />
              </div>
              <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight text-center">Order Confirmed!</h1>
              <p className="text-gray-500 mb-12 max-w-lg text-center text-lg leading-relaxed">Thank you for your premium purchase, {formData.name.split(' ')[0]}. An encrypted confirmation email has been dispatched to <span className="text-gray-900 font-bold">{formData.email}</span>.</p>
              <Link to="/orders" className="bg-gray-900 text-white font-extrabold uppercase tracking-widest text-[13px] px-12 py-5 hover:bg-[#F63232] transition-all hover:-translate-y-1 shadow-2xl rounded-xl">View Order History</Link>
          </div>
      )
  }

  if (items.length === 0) return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white px-4">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Your bag is empty</h2>
        <p className="text-gray-500 mb-10 max-w-sm text-center">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="bg-gray-900 text-white font-extrabold uppercase tracking-widest text-[13px] px-10 py-4 hover:bg-[#F63232] transition-colors shadow-lg">Start Shopping</Link>
      </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Checkout Minimal Header */}
      <div className="bg-white/80 border-b border-gray-100 py-6 sticky top-0 z-40 backdrop-blur-md">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between">
              <Link to="/cart" className="flex items-center gap-2 text-sm font-extrabold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest"><FiChevronLeft className="text-lg"/> Back to Bag</Link>
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full font-bold text-[11px] uppercase tracking-widest border border-emerald-100">
                  <FiLock className="text-emerald-500" /> Secure Checkout
              </div>
          </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
            
          {/* Left Column: Forms */}
          <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col gap-10">
            <div>
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">Checkout</h1>
                <p className="text-gray-500 font-medium text-lg border-l-4 border-[#F63232] pl-4">Please enter your details below to complete your secure purchase.</p>
            </div>

            <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-10">
                {/* Contact Info Block */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 group-focus-within:bg-gray-900 transition-colors"></div>
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-50 border border-transparent rounded-xl px-5 py-4 focus:bg-white focus:ring-2 focus:ring-[#F63232] focus:border-transparent outline-none transition-all text-gray-900 font-bold" placeholder="John Doe" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-gray-50 border border-transparent rounded-xl px-5 py-4 focus:bg-white focus:ring-2 focus:ring-[#F63232] outline-none transition-all text-gray-900 font-bold" placeholder="john@example.com" />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-gray-50 border border-transparent rounded-xl px-5 py-4 focus:bg-white focus:ring-2 focus:ring-[#F63232] outline-none transition-all text-gray-900 font-bold" placeholder="+1 (555) 000-0000" />
                        </div>
                    </div>
                </div>

                {/* Shipping Info Block */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 group-focus-within:bg-gray-900 transition-colors"></div>
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6">Shipping Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Street Address</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full bg-gray-50 border border-transparent rounded-xl px-5 py-4 focus:bg-white focus:ring-2 focus:ring-[#F63232] outline-none transition-all text-gray-900 font-bold" placeholder="123 Fashion Ave, Apt 4B" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">City</label>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full bg-gray-50 border border-transparent rounded-xl px-5 py-4 focus:bg-white focus:ring-2 focus:ring-[#F63232] outline-none transition-all text-gray-900 font-bold" placeholder="New York" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Postal Code</label>
                            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required className="w-full bg-gray-50 border border-transparent rounded-xl px-5 py-4 focus:bg-white focus:ring-2 focus:ring-[#F63232] outline-none transition-all text-gray-900 font-bold" placeholder="10001" />
                        </div>
                    </div>
                </div>

                {/* Secure Notice */}
                <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 flex items-center gap-5 text-gray-600">
                    <FiShield className="text-4xl shrink-0 text-emerald-500" />
                    <div>
                        <p className="text-sm font-extrabold text-gray-900 mb-1">Payment collected securely upon delivery</p>
                        <p className="text-xs font-medium">Your order is completely risk-free. Inspect your items and pay securely when your package arrives at your door.</p>
                    </div>
                </div>
            </form>
          </div>

          {/* Right Column: Order Summary Mini-Cart (Sticky) */}
          <div className="w-full lg:w-[45%] xl:w-[40%] lg:sticky lg:top-32 lg:mt-6">
            <div className="bg-gray-50 rounded-[2.5rem] p-8 sm:p-10 shadow-sm border border-gray-100/50 relative overflow-hidden">
                <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Order Summary</h2>
                
                {/* Scrollable Mini Cart */}
                <div className="flex flex-col gap-6 max-h-[35vh] overflow-y-auto pr-3 pt-3 mb-8 border-b border-gray-200 pb-8" style={{ scrollbarWidth: 'thin' }}>
                    {items.map((item, index) => (
                        <div key={`${item.id}-${item.size}-${index}`} className="flex gap-4 items-center group">
                            <div className="w-16 h-20 bg-white rounded-xl p-2 border border-gray-100 shrink-0 relative group-hover:border-gray-200 transition-colors">
                                <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" alt={item.title}/>
                                <span className="absolute -top-2 -right-2 bg-gray-900 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold shadow-sm">{item.quantity}</span>
                            </div>
                            <div className="flex flex-col flex-1">
                                <p className="text-sm font-extrabold text-gray-900 line-clamp-2 leading-snug">{item.title}</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{item.category}</p>
                                    {item.size && (
                                        <span className="bg-gray-100 text-gray-800 text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-widest border border-gray-200">
                                            Size: {item.size}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-5 text-gray-500 font-medium mb-8 border-b border-gray-200 pb-8 text-[14px]">
                    <div className="flex justify-between items-center">
                        <span>Subtotal</span>
                        <span className="text-gray-900 font-extrabold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Estimated Shipping</span>
                        <span className="text-gray-900 font-extrabold">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between items-center text-emerald-600">
                            <span className="font-bold">Discount ({appliedCoupon.label})</span>
                            <span className="font-extrabold">-${discount.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center">
                        <span>Estimated Tax</span>
                        <span className="text-gray-900 font-extrabold">Calculated below</span>
                    </div>

                    {/* Coupon Code */}
                    <div className="pt-2">
                        <button
                            type="button"
                            onClick={() => setCouponOpen(!couponOpen)}
                            className="text-[12px] font-extrabold text-gray-400 hover:text-gray-900 uppercase tracking-widest underline underline-offset-4 flex items-center gap-2"
                        >
                            🏷️ {appliedCoupon?.code ? `Code applied: ${appliedCoupon.code}` : "Have a promo code?"}
                        </button>
                        {couponOpen && (
                            <div className="mt-3 flex gap-2">
                                <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    placeholder="e.g. HEXA10"
                                    className="flex-1 bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#F63232]"
                                />
                                <button
                                    type="button"
                                    onClick={handleApplyCoupon}
                                    className="px-4 py-2.5 bg-gray-900 text-white font-bold text-sm rounded-xl hover:bg-[#F63232] transition-colors"
                                >
                                    Apply
                                </button>
                            </div>
                        )}
                        {appliedCoupon && !appliedCoupon.code && (
                            <p className="text-xs font-bold text-red-500 mt-2">❌ Invalid code. Try: HEXA10, SAVE20, or FREESHIP</p>
                        )}
                        {appliedCoupon?.code && (
                            <p className="text-xs font-bold text-emerald-600 mt-2">✅ Coupon applied! {appliedCoupon.label}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-end mb-10">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-4xl font-black text-gray-900 tracking-tighter">${total.toFixed(2)}</span>
                </div>

                <button 
                  type="submit" 
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white font-extrabold uppercase tracking-[0.2em] text-[13px] py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#F63232] transition-colors shadow-[0_15px_30px_rgba(0,0,0,0.15)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                      <span className="flex items-center gap-3"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Processing Payment...</span>
                  ) : "Confirm Order"}
                </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;
