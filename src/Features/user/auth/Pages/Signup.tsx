import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useRegister } from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import { getReferralCodeFromUrl } from '../Utils/referralUtils';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(true);
  const { mutate: register, isPending, error } = useRegister();

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
    confirmPassword: '',
    phonenumber: '',
    email: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    password: false,
    confirmPassword: false,
    phonenumber: false,
    email: false
  });

  // Extract referral code from URL on component mount
  useEffect(() => {
    const referralCode = getReferralCodeFromUrl();
    if (referralCode) {
      setFormData(prev => ({
        ...prev,
        referralCode: referralCode
      }));
    }
  }, []);

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
    if (touched.name && name === 'name') {
      validateName(value);
    }
    if (touched.phonenumber && name === 'phonenumber') {
      validatePhoneNumber(value);
    }
    if (touched.email && name === 'email') {
      validateEmail(value);
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
    } else if (field === 'phonenumber') {
      validatePhoneNumber(formData.phonenumber);
    } else if (field === 'email') {
      validateEmail(formData.email);
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

  const validatePhoneNumber = (phone: string) => {
    const newErrors = { ...errors };
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Basic international phone format validation
    
    if (!phone.trim()) {
      newErrors.phonenumber = 'Phone number is required';
    } else if (!phoneRegex.test(phone)) {
      newErrors.phonenumber = 'Please enter a valid phone number';
    } else {
      newErrors.phonenumber = '';
    }
    
    setErrors(newErrors);
    return newErrors.phonenumber === '';
  };

  const validateEmail = (email: string) => {
    const newErrors = { ...errors };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    } else {
      newErrors.email = '';
    }
    
    setErrors(newErrors);
    return newErrors.email === '';
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
    const allTouched = {
      name: true,
      password: true,
      confirmPassword: true,
      phonenumber: isPhoneLogin,
      email: !isPhoneLogin
    };
    setTouched(allTouched);
    
    const isNameValid = validateName(formData.name);
    const isPasswordValid = validatePassword(formData.password);
    const isConfirmPasswordValid = validateConfirmPassword(formData.confirmPassword);
    const isPhoneValid = isPhoneLogin ? validatePhoneNumber(formData.phonenumber) : true;
    const isEmailValid = !isPhoneLogin ? validateEmail(formData.email) : true;
    
    if (isNameValid && isPasswordValid && isConfirmPasswordValid && isPhoneValid && isEmailValid) {
      // Prepare registration data
      const registrationData: {
        name: string;
        password: string;
        phone?: string;
        email?: string;
        referralCode?: string;
      } = {
        name: formData.name,
        password: formData.password,
      };

      // Add phone or email based on selection
      if (isPhoneLogin) {
        registrationData.phone = formData.phonenumber;
      } else {
        registrationData.email = formData.email;
      }

      // Add referral code if provided
      if (formData.referralCode.trim()) {
        registrationData.referralCode = formData.referralCode;
      }

      // Call the register mutation
      register(registrationData, {
        onSuccess: (data) => {
          toast.success(data.message || 'Registration successful! Please check your email to verify your account.');
          // Navigate to verification page with the email
          navigate('/code-verification', { 
            state: { 
              email: isPhoneLogin ? formData.email : formData.email,
              isPhone: isPhoneLogin
            } 
          });
        },
        onError: (error: unknown) => {
          const errorMessage = error && typeof error === 'object' && 'response' in error && 
            error.response && typeof error.response === 'object' && 'data' in error.response &&
            error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data
            ? (error.response.data as { message: string }).message
            : 'Registration failed. Please try again.';
          toast.error(errorMessage);
        }
      });
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

  const getPhoneInputClass = () => {
    if (!touched.phonenumber) return 'border-gray-700';
    return errors.phonenumber ? 'border-red-500' : 'border-green-500';
  };

  const getEmailInputClass = () => {
    if (!touched.email) return 'border-gray-700';
    return errors.email ? 'border-red-500' : 'border-green-500';
  };

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary">
            Viral Boost
          </h2>
          <h3 className="mt-2 text-center text-2xl font-bold text-text-primary">
            Join the Tribe
          </h3>
        </div>
        <div className="bg-bg-main p-8 rounded-lg shadow-lg">
          <div className="flex justify-center mb-6">
            <button 
              className={`w-1/2 cursor-pointer py-2 rounded-l-lg text-text-primary font-semibold ${isPhoneLogin ? 'bg-cyan-500' : 'bg-bg-tertiary'}`} 
              onClick={() => setIsPhoneLogin(true)}
            >
              Phone
            </button>
            <button 
              className={`w-1/2 cursor-pointer py-2 rounded-r text-text-primary font-semibold ${isPhoneLogin ? 'bg-bg-tertiary' : 'bg-cyan-500'}`} 
              onClick={() => setIsPhoneLogin(false)}
            >
              Email
            </button>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-text-primary rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm bg-bg-tertiary"
                  placeholder="Full Name"
                />
                {touched.name && errors.name && (
                  <div className="mt-1 flex items-center text-red-500 text-xs">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.name}
                  </div>
                )}
              </div>
              
              {isPhoneLogin ? (
                <div className="mt-4">
                  <input
                    id="phonenumber"
                    name="phonenumber"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.phonenumber}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('phonenumber')}
                    className={`appearance-none rounded-none relative block w-full px-3 py-3 border placeholder-gray-500 text-text-primary focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm bg-bg-tertiary ${getPhoneInputClass()}`}
                    placeholder="Phone Number (e.g., +1234567890)"
                  />
                  {touched.phonenumber && errors.phonenumber && (
                    <div className="mt-1 flex items-center text-red-500 text-xs">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.phonenumber}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-4">
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('email')}
                    className={`appearance-none rounded-none relative block w-full px-3 py-3 border placeholder-gray-500 text-text-primary focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm bg-bg-tertiary ${getEmailInputClass()}`}
                    placeholder="Email address"
                  />
                  {touched.email && errors.email && (
                    <div className="mt-1 flex items-center text-red-500 text-xs">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>
              )}
              
              <div className="relative mt-4">
                <div className={`rounded-none bg-bg-tertiary ${getPasswordInputClass()} ${errors.password ? 'border-2' : 'border'}`}>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('password')}
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
                {touched.password && errors.password && (
                  <div className="mt-1 flex items-center text-red-500 text-xs">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.password}
                  </div>
                )}
              </div>
              
              <div className="relative mt-4">
                <div className={`rounded-none bg-bg-tertiary ${getConfirmPasswordInputClass()} ${errors.confirmPassword ? 'border-2' : 'border'} rounded-b-md`}>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('confirmPassword')}
                    className="w-full py-3 pr-10 bg-transparent text-text-primary leading-tight focus:outline-none focus:shadow-outline pl-3"
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
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
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-text-primary rounded-b-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm bg-bg-tertiary"
                  placeholder="Referral Code (Optional)"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Registration failed
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      {error.message || 'An error occurred during registration. Please try again.'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-text-primary bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isPending || !!errors.name || !!errors.password || !!errors.confirmPassword || (isPhoneLogin && !!errors.phonenumber) || (!isPhoneLogin && !!errors.email)}
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Registering...
                  </>
                ) : (
                  'Sign Up'
                )}
            
              </button>
            </div>
          </form>
        </div>
        <div className="text-center text-sm text-text-muted">
          Already have an account?{' '}
          <Link to="/" className="font-medium text-cyan-500 hover:text-accent-cyan">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;