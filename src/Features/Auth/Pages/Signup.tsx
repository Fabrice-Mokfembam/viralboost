import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPhoneLogin,setIsPhoneLogin]= useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phonenumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [touched, setTouched] = useState({
    name: false,
    password: false,
    confirmPassword: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Validate in real-time if the field has been touched
    if (touched.password && name === 'password') {
      validatePassword(value);
    }
    if (touched.confirmPassword && name === 'confirmPassword') {
      validateConfirmPassword(value);
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    if (field === 'name') {
      validateName(formData.name);
    } else if (field === 'password') {
      validatePassword(formData.password);
    } else if (field === 'confirmPassword') {
      validateConfirmPassword(formData.confirmPassword);
    }
  };

  const validateName = (name: string) => {
    const newErrors = { ...errors };
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    } else {
      newErrors.name = '';
    }
    
    setErrors(newErrors);
    return newErrors.name === '';
  };

  const validatePassword = (password: string) => {
    const newErrors = { ...errors };
    
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password = 'Password must contain at least one special character';
    } else {
      newErrors.password = '';
    }
    
    setErrors(newErrors);
    return newErrors.password === '';
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    const newErrors = { ...errors };
    
    if (confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    } else {
      newErrors.confirmPassword = '';
    }
    
    setErrors(newErrors);
    return newErrors.confirmPassword === '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched to show errors
    setTouched({
      name: true,
      password: true,
      confirmPassword: true
    });
    
    const isNameValid = validateName(formData.name);
    const isPasswordValid = validatePassword(formData.password);
    const isConfirmPasswordValid = validateConfirmPassword(formData.confirmPassword);
    
    if (isNameValid && isPasswordValid && isConfirmPasswordValid) {
      console.log('Signup data:', formData);
      navigate('/code-verification');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getPasswordInputClass = () => {
    if (!touched.password) return 'border-gray-700';
    return errors.password ? 'border-red-500' : 'border-green-500';
  };

  const getConfirmPasswordInputClass = () => {
    if (!touched.confirmPassword) return 'border-gray-700';
    return errors.confirmPassword ? 'border-red-500' : 'border-green-500';
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Viral Boost
          </h2>
          <h3 className="mt-2 text-center text-2xl font-bold text-white">
            Join the Tribe
          </h3>
        </div>
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
            <div className="flex justify-center mb-6">
            <button className={`w-1/2 cursor-pointer py-2 rounded-l-lg  text-white font-semibold ${isPhoneLogin ? 'bg-cyan-500' : 'bg-gray-700'}`} onClick={()=>setIsPhoneLogin(true)}>Phone</button>
            <button className={`w-1/2 cursor-pointer py-2 rounded-r ${isPhoneLogin ? 'bg-gray-700' : 'bg-cyan-500'} text-white font-semibold`} onClick={()=>setIsPhoneLogin(false)}>Email</button>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('name')}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm bg-gray-700"
                  placeholder="Full Name"
                />
                {touched.name && errors.name && (
                  <div className="mt-1 flex items-center text-red-500 text-xs">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.name}
                  </div>
                )}
              </div>
              
     {isPhoneLogin?  <div className="mt-4">
                <input
                  id="phonenumber"
                  name="phonenumber"
                  type="number"
                  autoComplete="phonenumber"
                  required
                  value={formData.phonenumber}
                  onChange={handleInputChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm bg-gray-700"
                  placeholder="Phone Number"
                />
              </div>  : (
                <div className="mt-4">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm bg-gray-700"
                  placeholder="Email address"
                />
              </div>)}
              
              <div className="relative mt-4">
                <div className={`rounded-none bg-gray-700 ${getPasswordInputClass()} ${errors.password ? 'border-2' : 'border'}`}>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('password')}
                    className="w-full py-3 pr-10 bg-transparent text-white leading-tight focus:outline-none focus:shadow-outline pl-3"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <div className="mt-1 flex items-center text-red-500 text-xs">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.password}
                  </div>
                )}
              </div>
              
              <div className="relative mt-4">
                <div className={`rounded-none bg-gray-700 ${getConfirmPasswordInputClass()} ${errors.confirmPassword ? 'border-2' : 'border'} rounded-b-md`}>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('confirmPassword')}
                    className="w-full py-3 pr-10 bg-transparent text-white leading-tight focus:outline-none focus:shadow-outline pl-3"
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <div className="mt-1 flex items-center text-red-500 text-xs">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                <input
                  id="referral-code"
                  name="referralCode"
                  type="text"
                  autoComplete="off"
                  value={formData.referralCode}
                  onChange={handleInputChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm bg-gray-700"
                  placeholder="Referral Code (Optional)"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!!errors.name || !!errors.password || !!errors.confirmPassword}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/" className="font-medium text-cyan-500 hover:text-cyan-400">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;