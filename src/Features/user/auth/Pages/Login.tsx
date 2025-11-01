import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useLogin } from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import { getAuthErrorMessage, parseAuthError, formatLoginError } from '../Utils/errorUtils';

const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    LoginValue: '',
    password: ''
  });
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<string>('');
  
  // Auth hook
  const { mutate: login, isPending } = useLogin();

  // Read query parameters and auto-fill form fields
  useEffect(() => {
    const email = searchParams.get('email');
    const password = searchParams.get('password');
    
    if (email) {
      setLoginData(prev => ({
        ...prev,
        LoginValue: email
      }));
    }
    
    if (password) {
      setLoginData(prev => ({
        ...prev,
        password: password
      }));
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (loginError) {
      setLoginError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.LoginValue.trim() || !loginData.password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    // Prepare login data based on login type
    const loginPayload: { password: string; email: string } = {
      password: loginData.password,
      email: loginData.LoginValue
    };

    login(loginPayload, {
      onSuccess: (data) => {
        toast.success(data.message || 'Login successful!');
        navigate('/dashboard');
      },
      onError: (error: unknown) => {
        const parsedError = parseAuthError(error);
        const errorMessage = parsedError ? formatLoginError(parsedError) : getAuthErrorMessage(error);
        
        setLoginError(errorMessage);
        toast.error(errorMessage);
      }
    });
    // navigate('/dashboard');

  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary">
            ViralBoast
          </h2>
          <h3 className="mt-2 text-center text-2xl font-bold text-text-primary">
            Welcome Back
          </h3>
        </div>
        <div className="bg-bg-main p-8 rounded-lg shadow-lg">
         <div className="flex justify-center mb-6">
           
            <button 
              className={`w-full cursor-pointer py-3 rounded text-text-primary font-semibold ${'bg-cyan-500'}`} 
            >
              Email
            </button>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="login-value"
                  name="LoginValue"
                  type="email"
                  autoComplete="email"
                  required
                  value={loginData.LoginValue}
                  onChange={handleInputChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-text-primary rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm bg-bg-tertiary"
                  placeholder="Email"
                />
              </div>
              <div className="relative mt-4">
                <div className="rounded-none bg-bg-tertiary border border-gray-700 rounded-b-md">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={loginData.password}
                    onChange={handleInputChange}
                    className="w-full py-3 pr-10 bg-transparent text-text-primary leading-tight focus:outline-none focus:shadow-outline pl-3"
                    placeholder="Password"
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

            {/* <div className="flex items-center justify-end">
              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-cyan-500 hover:text-accent-cyan">
                  Forgot Password?
                </a>
              </div>
            </div> */}

            {loginError && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Login failed
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      {loginError}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div>
              <button
                type="submit"
                disabled={false}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-text-primary bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )} 
              </button>
            </div>
          </form>
        </div>
        <div className="text-center text-sm text-text-muted">
          New to ViralBoost?{' '}
          <Link to="/signup" className="font-medium text-cyan-500 hover:text-accent-cyan">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;