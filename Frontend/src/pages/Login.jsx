import React, { useState, useContext } from "react";
import { authAPI } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await authAPI.login({ email, password });
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side: Fashion Image Background */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
        <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80" 
            alt="Fashion Model" 
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay hover:scale-105 transition-transform duration-[10s]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-16">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">Join The <span className="text-[#F63232]">Hexashop</span> Community</h1>
            <p className="text-xl text-gray-300 drop-shadow-md leading-relaxed max-w-lg">Unlock exclusive deals, track your orders seamlessly, and discover a world of premium fashion.</p>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <Link to="/" className="absolute top-8 right-8 text-gray-500 hover:text-[#F63232] font-bold transition-colors">
            Back to Store →
        </Link>
        
        <div className="w-full max-w-md">
            <div className="mb-12 text-center lg:text-left">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Welcome Back</h2>
              <p className="text-gray-500 text-lg">Please enter your details to securely sign in.</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[11px]">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-50 focus:border-[#F63232] transition-all"
                  placeholder="name@example.com"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest text-[11px]">Password</label>
                    <Link to="/forgot-password" className="text-sm font-bold text-[#F63232] hover:text-gray-900 transition-colors">Forgot password?</Link>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-50 focus:border-[#F63232] transition-all"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="text-[#F63232] text-sm font-bold bg-red-50 px-4 py-3.5 rounded-xl border border-red-100 flex items-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-4 mt-4 bg-[#F63232] text-white font-extrabold text-lg rounded-xl hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_8px_20px_rgba(246,50,50,0.3)] hover:shadow-[0_8px_25px_rgba(246,50,50,0.5)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {loading ? "Signing in..." : "Sign In securely"}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
              <p className="text-gray-600 font-medium">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-[#F63232] font-bold hover:text-gray-900 hover:underline transition-all ml-1">
                  Sign up for free
                </Link>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
