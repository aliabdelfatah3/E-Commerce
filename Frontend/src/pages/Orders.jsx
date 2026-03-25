import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { orderAPI } from '../services/api';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiTruck, FiCheck, FiPackage, FiMapPin, FiChevronDown, FiChevronUp } from 'react-icons/fi';

// Order tracking steps
const TRACKING_STEPS = [
  { key: 'placed',     label: 'Order Placed',    icon: FiShoppingBag, desc: 'Your order has been received and confirmed.' },
  { key: 'processing', label: 'Processing',       icon: FiPackage,     desc: 'We are picking and packing your items carefully.' },
  { key: 'shipped',    label: 'Shipped',          icon: FiTruck,       desc: 'Your order is on its way with our delivery partner.' },
  { key: 'delivered',  label: 'Delivered',        icon: FiCheck,       desc: 'Package delivered successfully. Enjoy your purchase!' },
];

// Determine current step index from order date and status
function getDynamicStatus(order) {
  const elapsedMinutes = (new Date() - new Date(order.orderDate)) / 60000;
  
  if (elapsedMinutes < 2) return 'placed';
  if (elapsedMinutes < 5) return 'processing';
  if (elapsedMinutes < 10) return 'shipped';
  return 'delivered';
}

function getStepIndex(status) {
  const map = { 'placed': 0, 'processing': 1, 'shipped': 2, 'delivered': 3 };
  return map[status.toLowerCase()] ?? 1;
}

// Simulate an ETA based on order date
function getEstimatedDelivery(orderDate) {
  const d = new Date(orderDate);
  d.setDate(d.getDate() + 5);
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function TrackingPanel({ order }) {
  const status = getDynamicStatus(order);
  const currentStep = getStepIndex(status);
  const eta = getEstimatedDelivery(order.orderDate);

  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      {/* ETA Banner */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-5 py-4 rounded-2xl mb-8">
        <FiMapPin className="text-[#F63232] text-xl shrink-0" />
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Estimated Delivery</p>
          <p className="font-extrabold text-[15px]">{eta}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Tracking ID</p>
          <p className="font-black text-[13px] tracking-widest text-[#F63232]">HX-{String(order.id).padStart(8, '0')}</p>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="relative flex items-start justify-between gap-2">
        {/* Connecting line background */}
        <div className="absolute top-5 left-[calc(12.5%)] right-[calc(12.5%)] h-[3px] bg-gray-100 rounded-full z-0" />
        {/* Filled progress line */}
        <div
          className="absolute top-5 left-[calc(12.5%)] h-[3px] bg-gradient-to-r from-gray-900 to-[#F63232] rounded-full z-0 transition-all duration-700"
          style={{ width: `${(currentStep / (TRACKING_STEPS.length - 1)) * 75}%` }}
        />

        {TRACKING_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isDone   = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <div key={step.key} className="flex flex-col items-center flex-1 relative z-10 gap-3">
              {/* Step Circle */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-sm ${
                isDone   ? 'bg-gray-900 border-gray-900 text-white' :
                isActive ? 'bg-white border-[#F63232] text-[#F63232] shadow-[0_0_0_4px_rgba(246,50,50,0.15)]' :
                           'bg-white border-gray-200 text-gray-300'
              }`}>
                {isDone ? <FiCheck className="text-sm font-bold" /> : <Icon className="text-sm" />}
              </div>

              {/* Label */}
              <div className="text-center">
                <p className={`text-[11px] font-black uppercase tracking-widest leading-tight ${
                  isDone || isActive ? 'text-gray-900' : 'text-gray-300'
                }`}>
                  {step.label}
                </p>
                {isActive && (
                  <p className="text-[10px] text-gray-400 mt-1 max-w-[100px] text-center leading-relaxed hidden sm:block">
                    {step.desc}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const dynamicStatus = getDynamicStatus(order);

  const statusColors = {
    processing: 'bg-amber-50 border-amber-100 text-amber-700',
    shipped:    'bg-blue-50 border-blue-100 text-blue-700',
    delivered:  'bg-emerald-50 border-emerald-100 text-emerald-700',
    placed:     'bg-indigo-50 border-indigo-100 text-indigo-700',
  };
  const statusColor = statusColors[dynamicStatus] || statusColors.processing;

  return (
    <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Order Header */}
      <div className="p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100 mb-6">
          <div className="flex flex-wrap gap-8 lg:gap-12">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1">Order Placed</p>
              <p className="font-extrabold text-gray-900 text-[15px]">
                {new Date(order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1">Total Amount</p>
              <p className="font-extrabold text-gray-900 text-[15px]">${order.totalAmount.toFixed(2)}</p>
            </div>
            <div className="hidden sm:block">
              <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1">Order Number</p>
              <p className="font-extrabold text-gray-900 text-[15px] tracking-wider">#{String(order.id).padStart(6, '0')}</p>
            </div>
          </div>

          <div className={`flex items-center justify-center gap-2 border px-5 py-2.5 rounded-xl font-bold ${statusColor}`}>
            <FiTruck className="text-lg" />
            <span className="text-[13px] uppercase tracking-wider">{dynamicStatus}</span>
          </div>
        </div>

        {/* Shipping Address Display */}
        {order.address && (
          <div className="mb-8 p-5 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4">
             <FiMapPin className="text-gray-400 text-xl shrink-0 mt-1" />
             <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black mb-1">Shipping Destination</p>
                <p className="text-sm font-bold text-gray-900">{order.name}</p>
                <p className="text-[13px] text-gray-500 font-medium">{order.address}, {order.city} {order.zipCode}</p>
                <p className="text-[13px] text-gray-500 font-medium">PH: {order.phone}</p>
             </div>
          </div>
        )}

        {/* Products List */}
        <div className="space-y-5">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-5 items-center">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl p-2.5 shrink-0 border border-gray-100 flex items-center justify-center">
                <img src={item.product?.image} alt={item.product?.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-[14px] text-gray-900 leading-snug line-clamp-2">{item.product?.title}</h4>
                <div className="flex items-center gap-3 mt-1.5">
                  <p className="text-[12px] text-gray-400 font-bold uppercase tracking-wider">Qty: {item.quantity}</p>
                  {item.size && (
                    <span className="bg-gray-100 text-gray-700 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest border border-gray-200">
                      Size: {item.size}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-extrabold text-gray-900 text-[16px]">${item.priceAtPurchase.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Track Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gray-50 hover:bg-gray-900 hover:text-white border-2 border-gray-100 hover:border-gray-900 text-gray-700 font-bold text-[13px] uppercase tracking-widest rounded-2xl transition-all duration-300 group"
        >
          <FiTruck className="text-base group-hover:scale-110 transition-transform" />
          {expanded ? 'Hide Tracking' : 'Track My Order'}
          {expanded ? <FiChevronUp className="ml-auto" /> : <FiChevronDown className="ml-auto" />}
        </button>

        {/* Tracking Panel - Expandable */}
        <div className={`overflow-hidden transition-all duration-500 ${expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <TrackingPanel order={order} />
        </div>
      </div>
    </div>
  );
}

function Orders() {
  const { data: response, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderAPI.getOrders(),
  });

  const orders = response?.data || [];

  if (isLoading) return (
    <div className="min-h-[70vh] flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-[#F63232]"></div>
    </div>
  );

  if (isError) return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <p className="text-xl text-red-500 font-bold">Failed to load orders.</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 min-h-[70vh]">
      <div className="mb-12">
        <p className="text-[11px] uppercase tracking-widest text-[#F63232] font-black mb-3">My Account</p>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Order History</h1>
        <p className="text-gray-500 font-medium">Track your active shipments and review past purchases.</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-24 bg-gray-50/50 rounded-3xl border border-gray-100">
          <FiShoppingBag className="mx-auto text-6xl text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">When you purchase from Hexashop, you'll be able to track all your orders here.</p>
          <Link to="/products" className="inline-block bg-gray-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-[#F63232] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
