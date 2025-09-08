import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft} from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const token = 'eifim'
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // In real app: send reset email via backend
       navigate(`/reset-password/${token}`)
      console.log('Reset email sent to:', email);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-bg-secondary flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-bg-main p-8 rounded-lg shadow-lg text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-text-primary mb-2">Check Your Email</h3>
            <p className="text-gray-400 mb-6">
              We've sent a password reset link to <strong>{email}</strong>. 
              The link will expire in 1 hour.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center text-cyan-500 hover:text-accent-cyan"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-text-muted">
            Enter your email address and we'll send you a reset link
          </p>
        </div>
        
        <div className="bg-bg-main p-8 rounded-lg shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-text-primary rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-bg-tertiary"
                placeholder="Email address"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-text-primary bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <Link
              to="/"
              className="text-cyan-500 hover:text-accent-cyan text-sm"
            >
              Remember your password? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;