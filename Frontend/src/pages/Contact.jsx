import React from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Map Banner Placeholder */}
      <div className="w-full h-[400px] md:h-[500px] bg-gray-300 relative overflow-hidden">
        <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80" 
            alt="Map location" 
            className="w-full h-full object-cover grayscale opacity-70 transition-transform duration-1000 hover:scale-105" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl text-center transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 max-w-sm w-full mx-4">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiMapPin className="text-3xl text-[#F63232]" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Hexashop HQ</h3>
                <p className="text-gray-600 font-medium">123 Fashion Avenue<br/>New York, NY 10001</p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex items-start gap-5 hover:shadow-2xl transition-shadow group">
                    <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-red-50 transition-colors">
                        <FiPhone className="text-3xl text-[#F63232]" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-gray-900">Phone</h4>
                        <p className="text-gray-500 mt-2 leading-relaxed">+1 (555) 123-4567<br/>Mon-Fri, 9am-6pm</p>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex items-start gap-5 hover:shadow-2xl transition-shadow group">
                    <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-red-50 transition-colors">
                        <FiMail className="text-3xl text-[#F63232]" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-gray-900">Email</h4>
                        <p className="text-gray-500 mt-2 leading-relaxed">support@hexashop.com<br/>sales@hexashop.com</p>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex items-start gap-5 hover:shadow-2xl transition-shadow group">
                    <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-red-50 transition-colors">
                        <FiMapPin className="text-3xl text-[#F63232]" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-gray-900">Location</h4>
                        <p className="text-gray-500 mt-2 leading-relaxed">123 Fashion Avenue<br/>New York, NY 10001</p>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-10 md:p-12 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">Send Us A Message</h2>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Your Name</label>
                            <input type="text" className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-[#F63232] focus:ring-4 focus:ring-red-50 transition-all bg-gray-50 focus:bg-white" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Your Email</label>
                            <input type="email" className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-[#F63232] focus:ring-4 focus:ring-red-50 transition-all bg-gray-50 focus:bg-white" placeholder="john@example.com" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Subject</label>
                        <input type="text" className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-[#F63232] focus:ring-4 focus:ring-red-50 transition-all bg-gray-50 focus:bg-white" placeholder="How can we help?" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Message</label>
                        <textarea rows="6" className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-[#F63232] focus:ring-4 focus:ring-red-50 transition-all bg-gray-50 focus:bg-white resize-none" placeholder="Write your message here..."></textarea>
                    </div>
                    <button type="submit" className="w-full sm:w-auto px-12 py-4 bg-[#F63232] text-white font-bold rounded-xl hover:bg-gray-900 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;