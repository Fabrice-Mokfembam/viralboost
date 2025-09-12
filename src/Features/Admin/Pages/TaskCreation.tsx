import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TaskCreationForm } from '../Types';
import { staticTaskCategories } from '../data/staticData';

const TaskCreation: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TaskCreationForm>({
    title: '',
    description: '',
    category_id: 1,
    task_type: 'like',
    platform: '',
    instructions: '',
    target_url: '',
    membership: 'Basic',
    estimated_duration_minutes: 5,
    requires_photo: false,
    is_active: true,
    sort_order: 1,
    threshold_value: 100,
    status: 'active'
  });

  const [errors, setErrors] = useState<Partial<TaskCreationForm>>({});

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
    'Basic',
    'VIP1', 
    'VIP2',
    'VIP3',
    'VIP4'
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'pause', label: 'Paused' },
    { value: 'completed', label: 'Completed' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof TaskCreationForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<TaskCreationForm> = {};

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

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would call an API here
      console.log('Task created:', formData);
      
      // Show success message and redirect
      alert('Task created successfully!');
      navigate('/admin/dashboard/tasks');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                    {tier}
                  </option>
                ))}
              </select>
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
                name="status"
                value={formData.status}
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
        </div>

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
            disabled={isSubmitting}
            className="px-6 py-2 bg-accent-cyan text-white rounded-lg hover:bg-accent-cyan-hover focus:outline-none focus:ring-2 focus:ring-accent-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskCreation;

