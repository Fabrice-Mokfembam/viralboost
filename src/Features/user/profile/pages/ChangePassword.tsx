import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUpdatePassword } from '../Hooks/useProfile';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { mutate: updatePassword, isPending: isUpdating } = useUpdatePassword();
  
  // Form state
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.currentPassword && formData.newPassword && formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) return;

    updatePassword({
      current_password: formData.currentPassword,
      password: formData.newPassword,
      password_confirmation: formData.confirmPassword,
    }, {
      onSuccess: () => {
        toast.success('Password updated successfully!');
        // Clear form
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setErrors({});
        // Navigate back to edit profile after successful update
        navigate('/v/edit-profile');
      },
      onError: (error: any) => {
        console.error('Password update error:', error);
        const errorMessage = error?.response?.data?.message || 'Failed to update password';
        toast.error(errorMessage);
        
        // Handle specific validation errors
        if (error?.response?.data?.errors) {
          const apiErrors = error.response.data.errors;
          setErrors({
            currentPassword: apiErrors.current_password?.[0] || '',
            newPassword: apiErrors.password?.[0] || '',
            confirmPassword: apiErrors.password_confirmation?.[0] || '',
          });
        }
      }
    });
  };

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength: number) => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/v/edit-profile')}
            className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Change Password</h1>
          <div className="w-10 h-10"></div> {/* Spacer for center alignment */}
        </div>

        {/* Security Info Card */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8">
          <div className="relative p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl flex items-center justify-center">
                <Shield size={24} className="text-cyan-400" />
              </div>
              <div>
                <h3 className="text-text-primary font-semibold text-lg">Account Security</h3>
                <p className="text-text-muted text-sm">Keep your account safe with a strong password</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20">
              <div className="flex items-start space-x-3">
                <CheckCircle size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-text-muted">
                  <p className="mb-1">Tips for a strong password:</p>
                  <ul className="text-xs space-y-1 text-text-muted/80">
                    <li>• At least 6 characters long</li>
                    <li>• Mix of uppercase and lowercase letters</li>
                    <li>• Include numbers and special characters</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="space-y-6">
          {/* Current Password */}
          <div className="space-y-2">
            <label className="text-text-primary font-semibold text-sm">Current Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-text-muted" />
              </div>
              <input
                type={showPassword.current ? 'text' : 'password'}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className={`w-full bg-gradient-to-r from-bg-secondary to-bg-tertiary border ${
                  errors.currentPassword ? 'border-red-500' : 'border-gray-700/50'
                } rounded-xl py-4 pl-12 pr-12 text-text-primary placeholder-text-muted focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300`}
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showPassword.current ? (
                  <EyeOff size={18} className="text-text-muted hover:text-cyan-400 transition-colors" />
                ) : (
                  <Eye size={18} className="text-text-muted hover:text-cyan-400 transition-colors" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-400 text-sm">{errors.currentPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="text-text-primary font-semibold text-sm">New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-text-muted" />
              </div>
              <input
                type={showPassword.new ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className={`w-full bg-gradient-to-r from-bg-secondary to-bg-tertiary border ${
                  errors.newPassword ? 'border-red-500' : 'border-gray-700/50'
                } rounded-xl py-4 pl-12 pr-12 text-text-primary placeholder-text-muted focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300`}
                placeholder="Enter your new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showPassword.new ? (
                  <EyeOff size={18} className="text-text-muted hover:text-cyan-400 transition-colors" />
                ) : (
                  <Eye size={18} className="text-text-muted hover:text-cyan-400 transition-colors" />
                )}
              </button>
            </div>
            {/* Password Strength Indicator */}
            {formData.newPassword && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength(formData.newPassword))}`}
                      style={{ width: `${(passwordStrength(formData.newPassword) / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs font-medium ${
                    passwordStrength(formData.newPassword) < 2 ? 'text-red-400' :
                    passwordStrength(formData.newPassword) < 4 ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {getStrengthText(passwordStrength(formData.newPassword))}
                  </span>
                </div>
              </div>
            )}
            {errors.newPassword && (
              <p className="text-red-400 text-sm">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-text-primary font-semibold text-sm">Confirm New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-text-muted" />
              </div>
              <input
                type={showPassword.confirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full bg-gradient-to-r from-bg-secondary to-bg-tertiary border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-700/50'
                } rounded-xl py-4 pl-12 pr-12 text-text-primary placeholder-text-muted focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300`}
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showPassword.confirm ? (
                  <EyeOff size={18} className="text-text-muted hover:text-cyan-400 transition-colors" />
                ) : (
                  <Eye size={18} className="text-text-muted hover:text-cyan-400 transition-colors" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Update Password Button */}
          <button
            onClick={handleChangePassword}
            disabled={isUpdating}
            className={`w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-xl p-4 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2 ${
              isUpdating ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isUpdating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="text-white font-semibold">Updating Password...</span>
              </>
            ) : (
              <>
                <Shield size={20} className="text-white" />
                <span className="text-white font-semibold">Update Password</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

