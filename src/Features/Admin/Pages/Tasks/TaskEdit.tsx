import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { TaskCreationForm, TaskCreationFormErrors } from '../../Types';
import { staticTaskCategories } from '../../data/staticData';
import { useGetTaskById, useUpdateTask } from '../../Hooks/useTasks';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const TaskEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TaskCreationForm>({
    title: '',
    description: '',
    category_id: 1,
    category: '', // Will be set when category is selected
    task_type: 'like',
    platform: '',
    instructions: '',
    target_url: '',
    reward: 25,
    task_completion_count: 0, // Read-only field
    estimated_duration_minutes: 2,
    requires_photo: false,
    is_active: true,
    sort_order: 5,
    threshold_value: 100,
    task_status: 'active',
    membership: 'basic',
    requirements: []
  });

  const [errors, setErrors] = useState<TaskCreationFormErrors>({});

  const { data: taskData, isLoading, error } = useGetTaskById(id || '');
  const { mutate: updateTask, isPending: isUpdatingTask, isError: isUpdatingTaskError, error: updateTaskError } = useUpdateTask();

  // Populate form when task data is loaded
  useEffect(() => {
    if (taskData?.data) {
      const task = taskData.data;
      setFormData({
        title: task.title || '',
        description: task.description || '',
        category_id: task.category_id || 1,
        category: task.category || '', // Set category name from API response
        task_type: task.task_type || 'like',
        platform: task.platform || '',
        instructions: task.instructions || '',
        target_url: task.target_url || '',
        reward: task.reward || 25,
        task_completion_count: task.task_completion_count || 0, // Set completion count from API response
        estimated_duration_minutes: task.estimated_duration_minutes || 2,
        requires_photo: task.requires_photo || false,
        is_active: task.is_active || true,
        sort_order: task.sort_order || 5,
        threshold_value: task.threshold_value || 100,
        task_status: task.task_status || 'active',
        membership: 'basic', // Default since not in API response
        requirements: Array.isArray(task.requirements) ? task.requirements : []
      });
    }
  }, [taskData]);

  const platforms = [
    'Instagram',
    'YouTube', 
    'TikTok',
    'Twitter',
    'Facebook',
    'LinkedIn',
    'Snapchat',
    'Pinterest'
  ];

  const taskTypes = [
    { value: 'like', label: 'Like' },
    { value: 'follow', label: 'Follow' },
    { value: 'comment', label: 'Comment' },
    { value: 'subscribe', label: 'Subscribe' }
  ];

  const membershipTiers = [
    'basic',
    'vip1', 
    'vip2',
    'vip3',
    'vip4'
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'pause', label: 'Paused' },
    { value: 'completed', label: 'Completed' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const requirementOptions = [
    { value: 'must_follow', label: 'Must Follow' },
    { value: 'must_like_before_comment', label: 'Must Like Before Comment' },
    { value: 'must_verify_account', label: 'Must Verify Account' },
    { value: 'must_have_minimum_followers', label: 'Must Have Minimum Followers' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev: TaskCreationForm) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev: TaskCreationForm) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else if (name === 'category_id') {
      // When category is selected, also set the category name
      const selectedCategory = staticTaskCategories.find(cat => cat.id === parseInt(value));
      setFormData((prev: TaskCreationForm) => ({ 
        ...prev, 
        [name]: parseInt(value) || 1,
        category: selectedCategory?.name || ''
      }));
    } else {
      setFormData((prev: TaskCreationForm) => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof TaskCreationFormErrors]) {
      setErrors((prev: TaskCreationFormErrors) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRequirementChange = (requirement: string, checked: boolean) => {
    setFormData((prev: TaskCreationForm) => {
      const currentRequirements = Array.isArray(prev.requirements) ? prev.requirements : [];
      return {
        ...prev,
        requirements: checked 
          ? [...currentRequirements, requirement]
          : currentRequirements.filter((req: string) => req !== requirement)
      };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: TaskCreationFormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 255) {
      newErrors.title = 'Title must be 255 characters or less';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.platform.trim()) {
      newErrors.platform = 'Platform is required';
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Instructions are required';
    }

    if (!formData.target_url.trim()) {
      newErrors.target_url = 'Target URL is required';
    } else if (!isValidUrl(formData.target_url)) {
      newErrors.target_url = 'Please enter a valid URL';
    }

    if (formData.estimated_duration_minutes < 1) {
      newErrors.estimated_duration_minutes = 'Duration must be at least 1 minute';
    }

    if (formData.threshold_value < 1) {
      newErrors.threshold_value = 'Threshold value must be at least 1';
    }

    if (formData.reward < 1) {
      newErrors.reward = 'Reward must be at least 1';
    }

    if (formData.sort_order < 1) {
      newErrors.sort_order = 'Sort order must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!id) {
      toast.error('Task ID is required');
      return;
    }

    setIsSubmitting(true);

    updateTask({ taskId: id, updates: formData }, {
      onSuccess: () => {
        toast.success('Task updated successfully!');
        navigate('/admin/dashboard/tasks');
      },
      onError: (error: Error) => {
        console.error('Error updating task:', error);
        const apiError = error as unknown as ApiError;
        const errorMessage = apiError?.response?.data?.message || 'Error updating task. Please try again.';
        toast.error(errorMessage);
      }
    });
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/tasks');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Edit Task</h1>
            <p className="text-text-secondary mt-1">Loading task information...</p>
          </div>
        </div>
        <div className="bg-bg-secondary rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-cyan mx-auto"></div>
          <p className="text-text-secondary mt-4">Loading task details...</p>
        </div>
      </div>
    );
  }

  if (error || !taskData?.data) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Edit Task</h1>
            <p className="text-text-secondary mt-1">Error loading task</p>
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
              <h3 className="text-sm font-medium text-red-800">Error loading task</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Failed to load task details. Please try again later.</p>
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
          <h1 className="text-2xl font-bold text-text-primary">Edit Task</h1>
          <p className="text-text-secondary mt-1">
            Update task details and settings
          </p>
        </div>
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
        >
          Cancel
        </button>
      </div>

      {/* Task Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-bg-secondary rounded-lg p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Task Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                maxLength={255}
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.title ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Enter task title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
              <p className="mt-1 text-xs text-text-secondary">
                {formData.title.length}/255 characters
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
                placeholder="Describe what users need to do"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Category *
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                {staticTaskCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {/* Display selected category name */}
              {formData.category && (
                <p className="mt-1 text-sm text-cyan-400">
                  Selected: {formData.category}
                </p>
              )}
            </div>

            {/* Task Type */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Task Type *
              </label>
              <select
                name="task_type"
                value={formData.task_type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                {taskTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Platform *
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.platform ? 'border-red-500' : 'border-border'
                }`}
              >
                <option value="">Select Platform</option>
                {platforms.map(platform => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
              {errors.platform && (
                <p className="mt-1 text-sm text-red-500">{errors.platform}</p>
              )}
            </div>

            {/* Membership Tier */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Membership Tier *
              </label>
              <select
                name="membership"
                value={formData.membership}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                {membershipTiers.map(tier => (
                  <option key={tier} value={tier}>
                    {tier.charAt(0).toUpperCase() + tier.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Reward */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Reward (points) *
              </label>
              <input
                type="number"
                name="reward"
                value={formData.reward}
                onChange={handleInputChange}
                min="1"
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.reward ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Enter reward points"
              />
              {errors.reward && (
                <p className="mt-1 text-sm text-red-500">{errors.reward}</p>
              )}
            </div>
          </div>
        </div>

        {/* Task Details */}
        <div className="bg-bg-secondary rounded-lg p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Task Details</h2>
          
          <div className="space-y-6">
            {/* Instructions */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Instructions *
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                rows={6}
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.instructions ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Provide detailed instructions for users..."
              />
              {errors.instructions && (
                <p className="mt-1 text-sm text-red-500">{errors.instructions}</p>
              )}
            </div>

            {/* Target URL */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Target URL *
              </label>
              <input
                type="url"
                name="target_url"
                value={formData.target_url}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.target_url ? 'border-red-500' : 'border-border'
                }`}
                placeholder="https://example.com"
              />
              {errors.target_url && (
                <p className="mt-1 text-sm text-red-500">{errors.target_url}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Estimated Duration */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  name="estimated_duration_minutes"
                  value={formData.estimated_duration_minutes}
                  onChange={handleInputChange}
                  min="1"
                  className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                    errors.estimated_duration_minutes ? 'border-red-500' : 'border-border'
                  }`}
                />
                {errors.estimated_duration_minutes && (
                  <p className="mt-1 text-sm text-red-500">{errors.estimated_duration_minutes}</p>
                )}
              </div>

              {/* Threshold Value */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Threshold Value *
                </label>
                <input
                  type="number"
                  name="threshold_value"
                  value={formData.threshold_value}
                  onChange={handleInputChange}
                  min="1"
                  className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                    errors.threshold_value ? 'border-red-500' : 'border-border'
                  }`}
                />
                {errors.threshold_value && (
                  <p className="mt-1 text-sm text-red-500">{errors.threshold_value}</p>
                )}
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Sort Order *
                </label>
                <input
                  type="number"
                  name="sort_order"
                  value={formData.sort_order}
                  onChange={handleInputChange}
                  min="1"
                  className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                    errors.sort_order ? 'border-red-500' : 'border-border'
                  }`}
                />
                {errors.sort_order && (
                  <p className="mt-1 text-sm text-red-500">{errors.sort_order}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Task Settings */}
        <div className="bg-bg-secondary rounded-lg p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Task Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Status *
              </label>
              <select
                name="task_status"
                value={formData.task_status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="requires_photo"
                  checked={formData.requires_photo}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-accent-cyan focus:ring-accent-cyan border-border rounded"
                />
                <label className="ml-2 text-sm text-text-primary">
                  Requires Photo Proof
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-accent-cyan focus:ring-accent-cyan border-border rounded"
                />
                <label className="ml-2 text-sm text-text-primary">
                  Task is Active
                </label>
              </div>
            </div>
          </div>

          {/* Requirements Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-text-primary mb-3">
              Task Requirements
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {requirementOptions.map(requirement => (
                <div key={requirement.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={requirement.value}
                    checked={Array.isArray(formData.requirements) && formData.requirements.includes(requirement.value)}
                    onChange={(e) => handleRequirementChange(requirement.value, e.target.checked)}
                    className="h-4 w-4 text-accent-cyan focus:ring-accent-cyan border-border rounded"
                  />
                  <label htmlFor={requirement.value} className="ml-2 text-sm text-text-primary">
                    {requirement.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {isUpdatingTaskError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error updating task
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    {(updateTaskError as unknown as ApiError)?.response?.data?.message || 'An unexpected error occurred. Please try again.'}
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
            disabled={isSubmitting || isUpdatingTask}
            className={`px-6 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${
              isUpdatingTaskError 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-accent-cyan hover:bg-accent-cyan-hover'
            }`}
          >
            {isSubmitting || isUpdatingTask ? 'Updating...' : 'Update Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskEdit;
