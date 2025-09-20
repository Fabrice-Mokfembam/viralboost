import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useAdminAuth } from '../../Hooks/useAdminAuth';

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoginPending } = useAdminAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation - just check if fields are not empty
    if (formData.email.trim() && formData.password.trim()) {
      login(formData, {
        onSuccess: () => {
          console.log('Admin login successful');
          toast.success('Login successful!');
          navigate('/admin/dashboard');
        },
        onError: (error) => {
          console.log(error);
          toast.error(error.message || 'Login failed');
        }
      });
    } else {
      toast.error('Please enter both email and password');
    }
  };

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-accent-cyan rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">V</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-text-primary">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Sign in to access the ViralBoost admin panel
          </p>
        </div>


        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-border rounded-lg placeholder-text-muted text-text-primary bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent sm:text-sm"
                placeholder="admin@viralboost.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-3 pr-10 border border-border rounded-lg placeholder-text-muted text-text-primary bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-accent-cyan focus:ring-accent-cyan border-border rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-accent-cyan hover:text-accent-cyan-hover">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoginPending}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-accent-cyan hover:bg-accent-cyan-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoginPending ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Signing In...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-text-muted">
            © 2024 ViralBoost. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
