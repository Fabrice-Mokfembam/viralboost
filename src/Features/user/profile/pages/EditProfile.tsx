import React, { useState } from 'react';
import { Camera, User, Mail, Phone, Save, ArrowLeft, Key, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserData, updateUserData } from '../../auth/Utils/authUtils';
import { useGetProfile } from '../../auth/Hooks/useAuth';
import { useUpdateProfile } from '../Hooks/useProfile';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const navigate = useNavigate();
  const { data: userProfile } = useGetProfile();
  const storedUser = getUserData();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  
  // Use profile data if available, otherwise fall back to stored user data
  const user = userProfile || storedUser;
  
  // Get first name and last name from user name
  const nameParts = user?.name ? user.name.split(' ') : ['User'];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  const initials = firstName.charAt(0) + (lastName ? lastName.charAt(0) : '');

  // Form state
  const [formData, setFormData] = useState({
    firstName: firstName || '',
    lastName: lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!formData.firstName.trim() || !formData.email.trim()) {
      toast.error('First name and email are required');
      return;
    }

    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
    
    // Build the profile data object, only including fields that have values
    const profileData: {
      name: string;
      email: string;
      phone?: string;
      profile_image?: File;
    } = {
      name: fullName,
      email: formData.email.trim(),
    };

    // Only add phone if it has a value
    if (formData.phone.trim()) {
      profileData.phone = formData.phone.trim();
    }

    // Only add profile_image if a file is selected
    if (selectedImage) {
      profileData.profile_image = selectedImage;
    }

    console.log(profileData);

    updateProfile(profileData, {
      onSuccess: (response) => {
        // Update local storage with new user data
        if (response.data?.user) {
          updateUserData({
            name: response.data.user.name,
            email: response.data.user.email,
            phone: response.data.user.phone,
            profile_picture: response.data.user.profile_image,
          });
        }
        
        toast.success('Profile updated successfully!');
        navigate('/dashboard/profile');
      },
      onError: (error: any) => {
        console.error('Profile update error:', error);
        const errorMessage = error?.response?.data?.message || 'Failed to update profile';
        toast.error(errorMessage);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/dashboard/profile')}
            className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Edit Profile</h1>
          <div className="w-10 h-10"></div> {/* Spacer for center alignment */}
        </div>

        {/* Profile Image Section */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8">
          <div className="relative p-6">
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg overflow-hidden">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (user as any)?.profile_picture ? (
                    <img 
                      src={(user as any).profile_picture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    initials.toUpperCase()
                  )}
                </div>
                {/* Camera overlay */}
                <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <Camera size={24} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isUpdating}
                  />
                </label>
                {/* Edit badge */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                  <Edit3 size={14} className="text-white" />
                </div>
              </div>
              <p className="text-text-muted text-sm mt-2">
                {selectedImage ? 'Image selected - click save to update' : 'Tap to change profile picture'}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="space-y-6">
          {/* First Name */}
          <div className="space-y-2">
            <label className="text-text-primary font-semibold text-sm">First Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={18} className="text-text-muted" />
              </div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full bg-gradient-to-r from-bg-secondary to-bg-tertiary border border-gray-700/50 rounded-xl py-4 pl-12 pr-4 text-text-primary placeholder-text-muted focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                placeholder="Enter your first name"
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="text-text-primary font-semibold text-sm">Last Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={18} className="text-text-muted" />
              </div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full bg-gradient-to-r from-bg-secondary to-bg-tertiary border border-gray-700/50 rounded-xl py-4 pl-12 pr-4 text-text-primary placeholder-text-muted focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-text-primary font-semibold text-sm">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-text-muted" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gradient-to-r from-bg-secondary to-bg-tertiary border border-gray-700/50 rounded-xl py-4 pl-12 pr-4 text-text-primary placeholder-text-muted focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-text-primary font-semibold text-sm">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone size={18} className="text-text-muted" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-gradient-to-r from-bg-secondary to-bg-tertiary border border-gray-700/50 rounded-xl py-4 pl-12 pr-4 text-text-primary placeholder-text-muted focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Change Password Button */}
          <button
            onClick={() => navigate('/v/change-password')}
            className="w-full group bg-gradient-to-r from-bg-secondary to-bg-tertiary hover:from-cyan-500/10 hover:to-cyan-600/10 rounded-xl p-4 shadow-lg border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center group-hover:from-cyan-500/20 group-hover:to-cyan-600/20 transition-all duration-300">
                  <Key size={20} className="text-cyan-400" />
                </div>
                <div className="text-left">
                  <h4 className="text-text-primary font-semibold text-base group-hover:text-cyan-400 transition-colors">
                    Change Password
                  </h4>
                  <p className="text-text-muted text-sm group-hover:text-text-secondary transition-colors">
                    Update your account security
                  </p>
                </div>
              </div>
              <ArrowLeft size={20} className="text-text-muted group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300 rotate-180" />
            </div>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isUpdating}
            className={`w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-xl p-4 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2 ${
              isUpdating ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isUpdating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="text-white font-semibold">Saving...</span>
              </>
            ) : (
              <>
                <Save size={20} className="text-white" />
                <span className="text-white font-semibold">Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

