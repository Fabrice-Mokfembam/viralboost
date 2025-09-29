import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { TaskCreationForm, TaskCreationFormErrors } from '../../Types';

import { useCreateTask } from '../../Hooks/useTasks';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const TaskCreation: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TaskCreationForm>({
    title: '',
    description: '',
    category: '',
    task_type: 'social_media',
    platform: '',
    instructions: '',
    target_url: '',
    benefit: 1.00,
    is_active: true,
    task_status: 'active',
    priority: 'medium',
    threshold_value: 100,
    task_completion_count: 0,
    task_distribution_count: 0
  });

  const [errors, setErrors] = useState<TaskCreationFormErrors>({});

  const { mutate: createTask, isPending: isCreatingTask, isError: isCreatingTaskError, error: createTaskError } = useCreateTask();


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
    { value: 'social_media', label: 'Social Media' },
    { value: 'website_visit', label: 'Website Visit' },
    { value: 'app_download', label: 'App Download' },
    { value: 'survey', label: 'Survey' },
    { value: 'other', label: 'Other' }
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev: TaskCreationForm) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      // Handle decimal values for benefit field
      if (name === 'benefit') {
        setFormData((prev: TaskCreationForm) => ({ ...prev, [name]: parseFloat(value) || 0 }));
      } else {
        setFormData((prev: TaskCreationForm) => ({ ...prev, [name]: parseInt(value) || 0 }));
      }
    } else {
      setFormData((prev: TaskCreationForm) => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof TaskCreationFormErrors]) {
      setErrors((prev: TaskCreationFormErrors) => ({ ...prev, [name]: undefined }));
    }
  };


  const validateForm = (): boolean => {
    const newErrors: TaskCreationFormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be 100 characters or less';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length > 1000) {
      newErrors.description = 'Description must be 1000 characters or less';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    } else if (formData.category.length > 50) {
      newErrors.category = 'Category must be 50 characters or less';
    }

    if (!formData.platform.trim()) {
      newErrors.platform = 'Platform is required';
    } else if (formData.platform.length > 50) {
      newErrors.platform = 'Platform must be 50 characters or less';
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Instructions are required';
    } else if (formData.instructions.length > 2000) {
      newErrors.instructions = 'Instructions must be 2000 characters or less';
    }

    if (!formData.target_url.trim()) {
      newErrors.target_url = 'Target URL is required';
    } else if (!isValidUrl(formData.target_url)) {
      newErrors.target_url = 'Please enter a valid URL';
    } else if (formData.target_url.length > 255) {
      newErrors.target_url = 'Target URL must be 255 characters or less';
    }

    if (formData.threshold_value < 1) {
      newErrors.threshold_value = 'Threshold value must be at least 1';
    }

    if (formData.benefit < 0) {
      newErrors.benefit = 'Benefit cannot be negative';
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

    setIsSubmitting(true);

    // Set the category name based on the selected category_id
    const categoryMap: { [key: string]: string } = {
      1: 'Social Media Engagement',
      2: 'Content Creation',
      3: 'Brand Promotion',
      4: 'Community Building',
      5: 'Market Research'
    };
    
    const selectedCategoryName = categoryMap[formData.category];
    const updatedFormData = {
      ...formData,
      category: selectedCategoryName || '',
      
    };
    
    console.log(updatedFormData);

    createTask(updatedFormData, {
      onSuccess: () => {
        toast.success('Task created successfully!');
        navigate('/admin/dashboard/tasks');
      },
      onError: (error: Error) => {
        console.error('Error creating task:', error);
        const apiError = error as unknown as ApiError;
        const errorMessage = apiError?.response?.data?.message || 'Error creating task. Please try again.';
        toast.error(errorMessage);
      }
    });
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/tasks');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Create New Task</h1>
          <p className="text-text-secondary mt-1">
            Create a new task for users to complete
          </p>
        </div>
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
        >
          Cancel
        </button>
      </div>

      {/* Task Creation Form */}
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
                maxLength={100}
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.title ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Enter task title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
              <p className="mt-1 text-xs text-text-secondary">
                {formData.title.length}/100 characters
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
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                maxLength={50}
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.category ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Enter category name"
              />
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            {/* Task Completion Count (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Task Completion Count
              </label>
              <input
                type="number"
                name="task_completion_count"
                value={formData.task_completion_count}
                readOnly
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-tertiary text-text-muted cursor-not-allowed"
                placeholder="Auto-generated"
              />
              <p className="mt-1 text-xs text-text-muted">
                This field is automatically managed by the system
              </p>
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

            {/* Benefit */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Benefit ($) *
              </label>
              <input
                type="number"
                name="benefit"
                value={formData.benefit}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  errors.benefit ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Enter benefit amount (e.g., 1.50)"
              />
              {errors.benefit && (
                <p className="mt-1 text-sm text-red-500">{errors.benefit}</p>
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

              {/* Task Distribution Count */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Task Distribution Count
                </label>
                <input
                  type="number"
                  name="task_distribution_count"
                  value={formData.task_distribution_count}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                  placeholder="0"
                />
                <p className="mt-1 text-xs text-text-muted">
                  Number of times this task has been distributed
                </p>
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

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Priority *
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                {priorityOptions.map(priority => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkboxes */}
            <div className="md:col-span-2">
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
        </div>

        {/* Error Message */}
        {isCreatingTaskError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error creating task
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    {(createTaskError as unknown as ApiError)?.response?.data?.message || 'An unexpected error occurred. Please try again.'}
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
            disabled={isSubmitting || isCreatingTask}
            className={`px-6 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${
              isCreatingTaskError 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-accent-cyan hover:bg-accent-cyan-hover'
            }`}
          >
            {isSubmitting || isCreatingTask ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskCreation;



