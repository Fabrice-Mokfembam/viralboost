import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader2, ArrowLeft } from 'lucide-react';
import { loginAsUser } from '../../API/users';
import { storeAuthData } from '../../../user/auth/Utils/authUtils';
import type { AdminLoginAsUserResponse } from '../../Types';

const AdminLoginAs: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get email from URL params
    const userEmail = searchParams.get('email');
    if (userEmail) {
      setEmail(userEmail);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    setIsLoading(true);
    
    try {
      const response: AdminLoginAsUserResponse = await loginAsUser(email);
      
      // Transform the response to match normal login format
      // The response has: data.user containing the user object
      const transformedResponse = {
        success: response.success,
        message: response.message,
        token: response.token,
        user: response.data.user
      };

      // Store the transformed response (same as normal login)
      if (response.token && response.data.user) {
        storeAuthData(transformedResponse);
        
        // Store admin impersonation flag
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin_login_as_user', 'true');
        }
        
        toast.success(response.message || 'Successfully logged in as user');
        
        // Redirect to user dashboard (same as normal login)
        setTimeout(() => {
          navigate('/dashboard');
        }, 100);
      }
    } catch (error) {
      console.error('Failed to login as user:', error);
      const errorMessage = error && typeof error === 'object' && 'response' in error && 
        error.response && typeof error.response === 'object' && 'data' in error.response &&
        error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data
        ? (error.response.data as { message: string }).message
        : 'Failed to login as user. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/admin/dashboard/users');
  };

  return (
    <div className="min-h-screen bg-bg-secondary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <button
            onClick={handleBack}
            className="mb-6 flex items-center text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Users
          </button>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary">
            Admin Login As User
          </h2>
          <h3 className="mt-2 text-center text-2xl font-bold text-text-primary">
            Impersonate User Account
          </h3>
        </div>
        
        <div className="bg-bg-main p-8 rounded-lg shadow-lg">
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  User Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-text-primary focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm bg-bg-tertiary"
                  placeholder="Enter user email"
                />
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Warning:</strong> You will be logged in as this user. Make sure you have permission to do this.
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-text-primary bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Logging In...
                  </>
                ) : (
                  'Login As User'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginAs;

