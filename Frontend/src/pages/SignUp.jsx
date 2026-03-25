import React, { useState } from 'react';
import { authAPI } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Client-side validation
    if (name.trim().length < 3) {
      setError('Name must be at least 3 characters long');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    try {
      await authAPI.register({ name, email, password });
      setSuccess('Registration successful! Redirecting to secure login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white flex-row-reverse">
      {/* Right Side: Fashion Image Background */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
        <img 
            src="https://images.unsplash.com/photo-1485230895905-31d011713626?w=1600&q=80" 
            alt="Fashion Shopping" 
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay hover:scale-105 transition-transform duration-[10s]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-16">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">Step Into <span className="text-[#F63232]">Style</span></h1>
            <p className="text-xl text-gray-300 drop-shadow-md leading-relaxed max-w-lg">Create a personal account to effortlessly track orders, save curated favorites, and experience premium shopping features immediately.</p>
        </div>
      </div>

      {/* Left Side: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <Link to="/" className="absolute top-8 left-8 text-gray-500 hover:text-[#F63232] font-bold transition-colors">
            ← Back to Store
        </Link>
        
        <div className="w-full max-w-md">
            <div className="mb-12 text-center lg:text-left">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Create Account</h2>
              <p className="text-gray-500 text-lg">Join the world's leading fashion outlet today.</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[11px]">Personal Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-50 focus:border-[#F63232] transition-all"
                  placeholder="John Doe"
                />
              </div>

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
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[11px]">Secure Password</label>
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

              {success && (
                <div className="text-emerald-700 text-sm font-bold bg-emerald-50 px-4 py-3.5 rounded-xl border border-emerald-100 flex items-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-4 mt-4 bg-gray-900 text-white font-extrabold text-lg rounded-xl hover:bg-[#F63232] focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
              <p className="text-gray-600 font-medium">
                Already have an account?{" "}
                <Link to="/login" className="text-gray-900 font-bold hover:text-[#F63232] hover:underline transition-all ml-1">
                  Sign in here
                </Link>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;