import React from 'react';
import { FiTruck, FiRefreshCw, FiShield, FiPhoneCall } from 'react-icons/fi';

const features = [
    { icon: <FiTruck />, title: "Free Global Shipping", desc: "On all orders over $150" },
    { icon: <FiRefreshCw />, title: "30-Day Returns", desc: "No questions asked guarantee" },
    { icon: <FiShield />, title: "Secure Checkout", desc: "100% encrypted payment system" },
    { icon: <FiPhoneCall />, title: "Premium Support", desc: "Dedicated team available anytime" }
];

export default function BrandTrust() {
    return (
        <section className="bg-white border-t border-gray-100 py-20 pb-24">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                {features.map((feature, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center group">
                        <div className="w-20 h-20 bg-gray-50 flex items-center justify-center rounded-full text-3xl text-gray-400 group-hover:bg-red-50 group-hover:text-[#F63232] transition-colors duration-500 mb-6 border border-gray-100 shadow-sm relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#F63232] opacity-0 group-hover:opacity-10 scale-0 group-hover:scale-150 transition-all duration-700 rounded-full"></div>
                            {feature.icon}
                        </div>
                        <h4 className="font-extrabold text-gray-900 text-[16px] tracking-tight mb-2">{feature.title}</h4>
                        <p className="text-gray-500 font-medium text-sm max-w-[200px]">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
