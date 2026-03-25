import React, { useState } from "react";
import { authAPI } from "../services/api";
import { Link, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiLock, FiCheckCircle } from "react-icons/fi";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ state: "idle", message: "" }); // idle, loading, success, error

  const handleReset = async (e) => {
    e.preventDefault();
    if (!password || !token) return;
    
    setStatus({ state: "loading", message: "" });

    try {
      await authAPI.resetPassword({ token, newPassword: password });
      setStatus({ 
        state: "success", 
        message: "Your password has been successfully reset. You can now use your new password to log in." 
      });
    } catch (err) {
      setStatus({ 
        state: "error", 
        message: err.response?.data?.message || "Invalid or expired reset token. Please request a new link." 
      });
    }
  };

  if (!token) {
    return (
        <div className="flex min-h-screen bg-white items-center justify-center p-4">
            <div className="text-center max-w-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Link</h2>
                <p className="text-gray-500 mb-8">This password reset link is invalid or is missing its security token.</p>
                <Link to="/forgot-password" className="inline-block bg-gray-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-[#F63232] transition-colors">Request New Link</Link>
            </div>
        </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side: Dramatic Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
        <img 
            src="https://images.unsplash.com/photo-1549439602-43ebca2327af?w=1600&q=80" 
            alt="Fashion Security" 
            className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-overlay hover:scale-105 transition-transform duration-[15s]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-16">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">Secure Your <span className="text-[#F63232]">Access</span></h1>
            <p className="text-xl text-gray-300 drop-shadow-md leading-relaxed max-w-lg">Enter a strong new password to regain immediate access to an exclusive e-commerce experience.</p>
        </div>
      </div>

      {/* Right Side: Recovery Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <Link to="/login" className="absolute top-8 left-8 text-gray-500 hover:text-gray-900 font-extrabold text-[12px] uppercase tracking-widest transition-colors flex items-center gap-2">
            <FiArrowLeft className="text-lg" /> Back to Login
        </Link>
        
        <div className="w-full max-w-md mt-10 lg:mt-0">
            <div className="mb-12 text-center lg:text-left">
              <div className="w-16 h-16 bg-red-50 text-[#F63232] rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
                <FiLock className="text-3xl" />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Create New Password</h2>
              <p className="text-gray-500 text-lg leading-relaxed">Choose a strong, unique password for your account.</p>
            </div>
            
            {status.state === "success" ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center animate-fade-in">
                <FiCheckCircle className="text-5xl text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-extrabold text-emerald-900 mb-2">Password Reset Successful</h3>
                <p className="text-emerald-700 font-medium leading-relaxed">{status.message}</p>
                <Link to="/login" className="mt-8 inline-block w-full py-4 px-4 bg-emerald-600 text-white font-extrabold text-[14px] uppercase tracking-widest rounded-xl hover:bg-emerald-700 transition-colors">
                  Login Now
                </Link>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleReset}>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[11px]">New Password</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-50 focus:border-[#F63232] transition-all"
                    placeholder="Enter new password (min. 6 characters)"
                  />
                </div>

                {status.state === "error" && (
                  <div className="text-[#F63232] text-sm font-bold bg-red-50 px-4 py-3.5 rounded-xl border border-red-100 flex items-center shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.state === "loading" || password.length < 6}
                  className="w-full py-4.5 px-4 mt-6 bg-gray-900 text-white font-extrabold text-[13px] uppercase tracking-[0.15em] rounded-xl hover:bg-[#F63232] focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  {status.state === "loading" ? "Resetting..." : "Update Password"}
                </button>
              </form>
            )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
