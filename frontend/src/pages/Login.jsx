import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/IMG_2494.PNG";
import { useToast } from '../context/ToastContext';
import { useAuth } from '../hooks/auth/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login, loading: isLoading, isAuthenticated } = useAuth();

  // If already authenticated, redirect to admin dashboard
  if (isAuthenticated) {
    navigate("/admin", { replace: true });
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login({ username: formData.username, password: formData.password });
      showToast('Login successful!', 'success');
      navigate("/admin");
    } catch (err) {
      const errorMessage = err.message || 'Invalid username or password';
      setError(errorMessage);
      showToast(errorMessage, 'error');
    }
  };

  return (
    <>
      {/* Mobile Restriction Screen */}
      <div className="md:hidden min-h-screen bg-off-white flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-sky-blue/20 max-w-sm w-full">
          <div className="mx-auto mb-6 bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-primary">
              desktop_windows
            </span>
          </div>
          <h1 className="text-2xl font-bold text-charcoal mb-4 font-display">
            Desktop Access Required
          </h1>
          <p className="text-charcoal/70 mb-8 leading-relaxed">
            For security and the best experience, the admin panel is only accessible on larger screens.
          </p>
          <div className="text-sm font-medium text-primary bg-primary/5 py-3 px-4 rounded-lg">
            Please switch to a laptop or desktop computer to log in.
          </div>
          <div className="mt-8 pt-6 border-t border-sky-blue/10">
            <Link 
              to="/" 
              className="text-charcoal/60 hover:text-primary transition-colors text-sm flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Login Screen */}
      <div className="hidden md:flex min-h-screen bg-background-light items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary/5 p-8 text-center border-b border-sky-blue/20">
          <div className="mx-auto mb-6">
            <img
              src={logo}
              alt="Birch Hill School Logo"
              className="h-24 w-auto mx-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-charcoal mb-2 font-display">
            Admin Login
          </h1>
          <p className="text-charcoal/60 text-sm">
            Welcome back! Please enter your credentials to continue.
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-charcoal mb-2"
              >
                Username
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40">
                  person
                </span>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-sky-blue/20 rounded-lg bg-off-white/50 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-charcoal mb-2"
              >
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40">
                  password
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-sky-blue/20 rounded-lg bg-off-white/50 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">
                    refresh
                  </span>
                  Logging in...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">login</span>
                  Login
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-sky-blue/20 text-center">
            <p className="text-sm text-charcoal/60">
              Not an admin?{" "}
              <Link
                to="/"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Return to homepage
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-primary/5 p-6 border-t border-sky-blue/20">
          <footer className="text-center">
            <p className="text-xs text-charcoal/50">
              © 2026 Birch Hill Educational Center. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;
