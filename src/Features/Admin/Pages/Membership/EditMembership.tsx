import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { MembershipCreationForm, MembershipCreationFormErrors } from '../../Types';
import { useGetMembershipById, useUpdateMembership } from '../../Hooks/useMemberships';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const EditMembership: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<MembershipCreationForm>({
    membership_name: '',
    description: '',
    tasks_per_day: 5,
    max_tasks: 50,
    benefits: '',
    price: 0,
    duration_days: 30,
    reward_multiplier: 1.0,
    priority_level: 3,
    is_active: true,
  });

  const [errors, setErrors] = useState<MembershipCreationFormErrors>({});

  const { data: membershipData, isLoading, error } = useGetMembershipById(id || '');
  const { mutate: updateMembership, isPending: isUpdatingMembership, isError: isUpdatingMembershipError, error: updateMembershipError } = useUpdateMembership();

  // Populate form when membership data is loaded
  useEffect(() => {
    if (membershipData?.data) {
      const membership = membershipData.data;
      setFormData({
        membership_name: membership.membership_name || '',
        description: membership.description || '',
        tasks_per_day: membership.tasks_per_day || 5,
        max_tasks: membership.max_tasks || 50,
        benefits: membership.benefits || '',
        price: membership.price || 0,
        duration_days: membership.duration_days || 30,
        reward_multiplier: membership.reward_multiplier || 1.0,
        priority_level: membership.priority_level || 3,
        is_active: membership.is_active || true,
      });
    }
  }, [membershipData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev: MembershipCreationForm) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev: MembershipCreationForm) => ({ ...prev, [name]: parseFloat(value) || 0 }));
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
    } else if (formData.membership_name.length > 255) {
      newErrors.membership_name = 'Membership name must be 255 characters or less';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.tasks_per_day < 1) {
      newErrors.tasks_per_day = 'Tasks per day must be at least 1';
    }

    if (formData.max_tasks < 1) {
      newErrors.max_tasks = 'Max tasks must be at least 1';
    }

 

    if (!formData.benefits.trim()) {
      newErrors.benefits = 'Benefits are required';
    }

    if (formData.price < 0) {
      newErrors.price = 'Price cannot be negative';
    }

    if (formData.duration_days < 1) {
      newErrors.duration_days = 'Duration must be at least 1 day';
    }

    if (formData.reward_multiplier < 0.1) {
      newErrors.reward_multiplier = 'Reward multiplier must be at least 0.1';
    }

    if (formData.priority_level < 1 || formData.priority_level > 3) {
      newErrors.priority_level = 'Priority level must be between 1 and 3';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!id) {
      toast.error('Membership ID is required');
      return;
    }

    setIsSubmitting(true);

    updateMembership({ membershipId: id, updates: formData }, {
      onSuccess: () => {
        toast.success('Membership updated successfully!');
        navigate('/admin/dashboard/membership');
      },
      onError: (error: Error) => {
        console.error('Error updating membership:', error);
        const apiError = error as unknown as ApiError;
        const errorMessage = apiError?.response?.data?.message || 'Error updating membership. Please try again.';
        toast.error(errorMessage);
      }
    });
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/membership');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Edit Membership</h1>
            <p className="text-text-secondary mt-1">Loading membership information...</p>
          </div>
        </div>
        <div className="bg-bg-secondary rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-cyan mx-auto"></div>
          <p className="text-text-secondary mt-4">Loading membership details...</p>
        </div>
      </div>
    );
  }

  if (error || !membershipData?.data) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Edit Membership</h1>
            <p className="text-text-secondary mt-1">Error loading membership</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading membership</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Failed to load membership details. Please try again later.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Edit Membership</h1>
          <p className="text-text-secondary mt-1">
            Update membership tier details and settings
          </p>
        </div>
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
        >
          Cancel
        </button>
      </div>

      {/* Membership Edit Form */}
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
                maxLength={255}
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.membership_name ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Enter membership name"
              />
              {errors.membership_name && (
                <p className="mt-1 text-sm text-red-500">{errors.membership_name}</p>
              )}
              <p className="mt-1 text-xs text-text-secondary">
                {formData.membership_name.length}/255 characters
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
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.description ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Describe the membership tier"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
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

            {/* Duration Days */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Duration (days) *
              </label>
              <input
                type="number"
                name="duration_days"
                value={formData.duration_days}
                onChange={handleInputChange}
                min="1"
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.duration_days ? 'border-red-500' : 'border-border'
                }`}
                placeholder="30"
              />
              {errors.duration_days && (
                <p className="mt-1 text-sm text-red-500">{errors.duration_days}</p>
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
                value={formData.tasks_per_day}
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
                value={formData.max_tasks}
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
          
          <div className="space-y-6">
          
          

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Benefits *
              </label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                rows={6}
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.benefits ? 'border-red-500' : 'border-border'
                }`}
                placeholder="List the benefits of this membership tier..."
              />
              {errors.benefits && (
                <p className="mt-1 text-sm text-red-500">{errors.benefits}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Reward Multiplier */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Reward Multiplier *
                </label>
                <input
                  type="number"
                  name="reward_multiplier"
                  value={formData.reward_multiplier}
                  onChange={handleInputChange}
                  min="0.1"
                  step="0.1"
                  className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                    errors.reward_multiplier ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="1.0"
                />
                {errors.reward_multiplier && (
                  <p className="mt-1 text-sm text-red-500">{errors.reward_multiplier}</p>
                )}
              </div>

              {/* Priority Level */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Priority Level *
                </label>
                <select
                  name="priority_level"
                  value={formData.priority_level}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                    errors.priority_level ? 'border-red-500' : 'border-border'
                  }`}
                >
                  <option value={1}>High (1)</option>
                  <option value={2}>Medium (2)</option>
                  <option value={3}>Low (3)</option>
                </select>
                {errors.priority_level && (
                  <p className="mt-1 text-sm text-red-500">{errors.priority_level}</p>
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
        </div>

        {/* Error Message */}
        {isUpdatingMembershipError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error updating membership
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    {(updateMembershipError as unknown as ApiError)?.response?.data?.message || 'An unexpected error occurred. Please try again.'}
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
            disabled={isSubmitting || isUpdatingMembership}
            className={`px-6 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${
              isUpdatingMembershipError 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-accent-cyan hover:bg-accent-cyan-hover'
            }`}
          >
            {isSubmitting || isUpdatingMembership ? 'Updating...' : 'Update Membership'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMembership;

