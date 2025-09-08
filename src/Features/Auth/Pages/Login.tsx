import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    LoginValue: '',
    password: ''
  });
  const navigate = useNavigate()
  const [isPhoneLogin,setIsPhoneLogin]= useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login data:', loginData);
    navigate('/dashboard')
    // Handle login logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary">
            Viral 
            Boost
          </h2>
          <h3 className="mt-2 text-center text-2xl font-bold text-text-primary">
            Welcome Back, Thiago
          </h3>
        </div>
        <div className="bg-bg-main p-8 rounded-lg shadow-lg">
          <div className="flex justify-center mb-6">
            <button className={`w-1/2 cursor-pointer py-2 rounded-l-lg  text-text-primary font-semibold ${isPhoneLogin ? 'bg-cyan-500' : 'bg-bg-tertiary'}`} onClick={()=>setIsPhoneLogin(true)}>Phone</button>
            <button className={`w-1/2 cursor-pointer py-2 rounded-r ${isPhoneLogin ? 'bg-bg-tertiary' : 'bg-cyan-500'} text-text-primary font-semibold`} onClick={()=>setIsPhoneLogin(false)}>Email</button>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="login-value"
                  name="LoginValue"
                  type={isPhoneLogin ? "number" : "email"}
                  autoComplete="tel"
                  required
                  value={loginData.LoginValue}
                  onChange={handleInputChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-text-primary rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm bg-bg-tertiary"
                  placeholder={isPhoneLogin ? "Phone Number" : "Email"}
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

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-cyan-500 hover:text-accent-cyan">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-text-primary bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Sign In
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