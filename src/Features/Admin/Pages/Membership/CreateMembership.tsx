import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { MembershipCreationForm, MembershipCreationFormErrors } from '../../Types';
import { useCreateMembership } from '../../Hooks/useMemberships';
import { useCloudinaryUpload } from '../../../../Hooks/useCloudinaryUpload';
import { ImageUpload } from '../../../../Components/ImageUpload';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const CreateMembership: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<MembershipCreationForm>({
    membership_name: '',
    description: '',
    tasks_per_day: 5,
    max_tasks: 50,
    price: 0,
    benefit_amount_per_task: 0,
    membership_icons: '',
    is_active: true,
  });

  // Track display values for number inputs to allow clearing
  const [displayValues, setDisplayValues] = useState({
    price: '0',
    tasks_per_day: '5',
    max_tasks: '50',
    benefit_amount_per_task: '0',
  });

  const [errors, setErrors] = useState<MembershipCreationFormErrors>({});
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const { mutate: createMembership, isPending: isCreatingMembership, isError: isCreatingMembershipError, error: createMembershipError } = useCreateMembership();
  const { error: uploadError } = useCloudinaryUpload();

  const handleImageUpload = async (response: { secure_url: string }) => {
    setUploadedImage(response.secure_url);
    setFormData(prev => ({ ...prev, membership_icons: response.secure_url }));
    setErrors(prev => ({ ...prev, membership_icons: undefined }));
  };

  const handleUploadError = (error: string) => {
    setErrors(prev => ({ ...prev, membership_icons: error }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev: MembershipCreationForm) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      // Update display value to allow clearing
      setDisplayValues((prev) => ({ ...prev, [name]: value }));
      
      // Update form data with parsed number (0 if empty)
      const numericValue = value === '' ? 0 : parseFloat(value) || 0;
      setFormData((prev: MembershipCreationForm) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev: MembershipCreationForm) => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof MembershipCreationFormErrors]) {
      setErrors((prev: MembershipCreationFormErrors) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: MembershipCreationFormErrors = {};

    if (!formData.membership_name.trim()) {
      newErrors.membership_name = 'Membership name is required';
    } else if (formData.membership_name.length > 50) {
      newErrors.membership_name = 'Membership name must be 50 characters or less';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description must be 500 characters or less';
    }

    if (formData.tasks_per_day < 1) {
      newErrors.tasks_per_day = 'Tasks per day must be at least 1';
    }

    if (formData.max_tasks < 1) {
      newErrors.max_tasks = 'Max tasks must be at least 1';
    }

    if (formData.price < 0) {
      newErrors.price = 'Price cannot be negative';
    }

    if (formData.benefit_amount_per_task < 0) {
      newErrors.benefit_amount_per_task = 'Benefit amount per task cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    console.log(formData);

    createMembership(formData, {
      onSuccess: () => {
        toast.success('Membership created successfully!');
        navigate('/admin/dashboard/membership');
      },
      onError: (error: Error) => {
        console.error('Error creating membership:', error);
        const apiError = error as unknown as ApiError;
        const errorMessage = apiError?.response?.data?.message || 'Error creating membership. Please try again.';
        toast.error(errorMessage);
      }
    });
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/membership');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Create New Membership</h1>
          <p className="text-text-secondary mt-1">
            Create a new membership tier for users
          </p>
        </div>
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
        >
          Cancel
        </button>
      </div>

      {/* Membership Creation Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-bg-secondary rounded-lg p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Membership Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Membership Name *
              </label>
              <input
                type="text"
                name="membership_name"
                value={formData.membership_name}
                onChange={handleInputChange}
                maxLength={50}
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.membership_name ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Enter membership name"
              />
              {errors.membership_name && (
                <p className="mt-1 text-sm text-red-500">{errors.membership_name}</p>
              )}
              <p className="mt-1 text-xs text-text-secondary">
                {formData.membership_name.length}/50 characters
              </p>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                maxLength={500}
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.description ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Describe the membership tier"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
              <p className="mt-1 text-xs text-text-secondary">
                {formData.description.length}/500 characters
              </p>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={displayValues.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.price ? 'border-red-500' : 'border-border'
                }`}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            {/* Tasks Per Day */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Tasks Per Day *
              </label>
              <input
                type="number"
                name="tasks_per_day"
                value={displayValues.tasks_per_day}
                onChange={handleInputChange}
                min="1"
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.tasks_per_day ? 'border-red-500' : 'border-border'
                }`}
                placeholder="5"
              />
              {errors.tasks_per_day && (
                <p className="mt-1 text-sm text-red-500">{errors.tasks_per_day}</p>
              )}
            </div>

            {/* Max Tasks */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Max Tasks *
              </label>
              <input
                type="number"
                name="max_tasks"
                value={displayValues.max_tasks}
                onChange={handleInputChange}
                min="1"
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.max_tasks ? 'border-red-500' : 'border-border'
                }`}
                placeholder="50"
              />
              {errors.max_tasks && (
                <p className="mt-1 text-sm text-red-500">{errors.max_tasks}</p>
              )}
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-bg-secondary rounded-lg p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Advanced Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Benefit Amount Per Task */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Benefit Amount Per Task ($) *
              </label>
              <input
                type="number"
                name="benefit_amount_per_task"
                value={displayValues.benefit_amount_per_task}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.benefit_amount_per_task ? 'border-red-500' : 'border-border'
                }`}
                placeholder="0.00"
              />
              {errors.benefit_amount_per_task && (
                <p className="mt-1 text-sm text-red-500">{errors.benefit_amount_per_task}</p>
              )}
            </div>

            {/* Is Active */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
                className="h-4 w-4 text-accent-cyan focus:ring-accent-cyan border-border rounded"
              />
              <label className="ml-2 text-sm text-text-primary">
                Membership is Active
              </label>
            </div>
          </div>
        </div>

        {/* Membership Icon Upload */}
        <div className="bg-bg-secondary rounded-lg p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Membership Icon</h2>
          
          <div className="space-y-4">
            <p className="text-text-muted text-sm">
              Upload an icon for this membership tier. This will be displayed to users.
            </p>
            
            {/* Image Preview */}
            {uploadedImage && (
              <div className="mb-4">
                <p className="text-text-primary font-medium mb-2 text-sm">Icon Preview:</p>
                <div className="relative bg-bg-tertiary rounded-lg p-4 border border-gray-600 max-w-xs">
                  <img
                    src={uploadedImage}
                    alt="Membership icon preview"
                    className="w-20 h-20 object-cover rounded-lg mx-auto"
                  />
                </div>
              </div>
            )}

            <ImageUpload
              onUploadSuccess={handleImageUpload}
              onUploadError={handleUploadError}
              accept="image/*"
              maxSize={5}
              className="w-full"
            >
              <div className="border-2 border-dashed border-cyan-500/50 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors">
                <div className="text-cyan-500 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-text-primary font-medium mb-2">
                  {uploadedImage ? 'Upload another icon' : 'Click to upload membership icon'}
                </p>
                <p className="text-text-muted text-sm">
                  {uploadedImage ? 'Click to replace current icon' : 'Upload an image file (max 5MB)'}
                </p>
              </div>
            </ImageUpload>
            
            {errors.membership_icons && (
              <p className="mt-1 text-sm text-red-500">{errors.membership_icons}</p>
            )}
            
            {uploadError && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                {uploadError}
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {isCreatingMembershipError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error creating membership
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    {(createMembershipError as unknown as ApiError)?.response?.data?.message || 'An unexpected error occurred. Please try again.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isCreatingMembership}
            className={`px-6 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${
              isCreatingMembershipError 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-accent-cyan hover:bg-accent-cyan-hover'
            }`}
          >
            {isSubmitting || isCreatingMembership ? 'Creating...' : 'Create Membership'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMembership;

