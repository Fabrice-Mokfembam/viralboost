import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { useGetTaskById } from '../../Hooks/useTasks'; // Commented out for offline mode
import { staticTasks } from '../../data/staticData';
import { ArrowLeft, Clock, Target, Award, Settings, ExternalLink } from 'lucide-react';

const TaskAdminDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // Commented out for offline mode - using static data instead
  // const { data: taskData, isLoading, error } = useGetTaskById(id || '');

  // Mock states for offline mode
  const isLoading = false;
  const error = null;
  
  // Get task from static data
  const task = staticTasks.find(t => t.id === id);

  console.log(task);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
      active: { color: 'bg-green-100 text-green-800', text: 'Active' },
      pause: { color: 'bg-blue-100 text-blue-800', text: 'Paused' },
      paused: { color: 'bg-blue-100 text-blue-800', text: 'Paused' },
      completed: { color: 'bg-purple-100 text-purple-800', text: 'Completed' },
      suspended: { color: 'bg-red-100 text-red-800', text: 'Suspended' },
      expired: { color: 'bg-gray-100 text-gray-800', text: 'Expired' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`px-3 py-1 text-sm font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getPlatformIcon = (platform: string) => {
    const platformIcons = {
      instagram: '📷',
      youtube: '📺',
      twitter: '🐦',
      tiktok: '🎵',
      facebook: '👥',
      linkedin: '💼',
    };
    
    return platformIcons[platform as keyof typeof platformIcons] || '📱';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Task Details</h1>
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

  if (error || !task) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Task Details</h1>
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
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/dashboard/tasks')}
            className="p-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Task Details</h1>
            <p className="text-text-secondary mt-1">
              Task ID: {task.id} • {getPlatformIcon(task.platform)} {task.platform.charAt(0).toUpperCase() + task.platform.slice(1)}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate(`/admin/dashboard/task/edit/${task.id}`)}
            className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
          >
            Edit Task
          </button>
        </div>
      </div>

      {/* Task Overview */}
      <div className="bg-bg-secondary rounded-lg p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 h-16 w-16">
              <div className="h-16 w-16 rounded-lg bg-bg-tertiary flex items-center justify-center">
                <span className="text-3xl">{getPlatformIcon(task.platform)}</span>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-text-primary mb-2">{task.title}</h2>
              <p className="text-text-secondary text-lg mb-4">{task.description}</p>
              <div className="flex items-center space-x-4">
                {getStatusBadge(task.status)}
                <span className="text-sm text-text-muted">
                  Created: {formatDate(task.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Task Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-bg-main rounded-lg p-4 border border-border">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-accent-cyan mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Reward</p>
                <p className="text-2xl font-bold text-text-primary">{task.reward} points</p>
              </div>
            </div>
          </div>

          <div className="bg-bg-main rounded-lg p-4 border border-border">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-accent-cyan mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Duration</p>
                <p className="text-2xl font-bold text-text-primary">{task.estimatedDurationMinutes} min</p>
              </div>
            </div>
          </div>

          <div className="bg-bg-main rounded-lg p-4 border border-border">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-accent-cyan mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Threshold</p>
                <p className="text-2xl font-bold text-text-primary">{task.thresholdValue}</p>
              </div>
            </div>
          </div>

          <div className="bg-bg-main rounded-lg p-4 border border-border">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-accent-cyan mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Sort Order</p>
                <p className="text-2xl font-bold text-text-primary">5</p>
              </div>
            </div>
          </div>

          <div className="bg-bg-main rounded-lg p-4 border border-border">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-accent-cyan mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Completions</p>
                <p className="text-2xl font-bold text-text-primary">{task.totalCompletions || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Instructions */}
        <div className="bg-bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Settings className="h-5 w-5 mr-2 text-accent-cyan" />
            Instructions
          </h3>
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap text-text-secondary bg-bg-main p-4 rounded-lg border border-border">
              {task.instructions}
            </pre>
          </div>
        </div>

        {/* Task Settings */}
        <div className="bg-bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Settings className="h-5 w-5 mr-2 text-accent-cyan" />
            Task Settings
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Task Type</span>
              <span className="text-text-primary font-medium capitalize">like</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Platform</span>
              <span className="text-text-primary font-medium capitalize">{task.platform}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Category</span>
              <span className="text-text-primary font-medium capitalize">{task.category || 'Unknown'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Category ID</span>
              <span className="text-text-primary font-medium">1</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Requires Photo</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                task.requiresPhoto ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {task.requiresPhoto ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Is Active</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                task.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {task.status === 'active' ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">Last Updated</span>
              <span className="text-text-primary font-medium text-sm">
                {formatDate(task.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Target URL */}
      <div className="bg-bg-secondary rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <ExternalLink className="h-5 w-5 mr-2 text-accent-cyan" />
          Target URL
        </h3>
        <div className="flex items-center space-x-3">
          <a
            href={task.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan hover:text-accent-cyan-hover underline break-all"
          >
            {task.targetUrl}
          </a>
          <button
            onClick={() => window.open(task.targetUrl, '_blank')}
            className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Requirements */}
      {task.instructions && task.instructions.length > 0 && (
        <div className="bg-bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Requirements</h3>
          <div className="space-y-2">
            {task.instructions.map((instruction: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-cyan rounded-full"></div>
                <span className="text-text-secondary capitalize">
                  {instruction.replace(/_/g, ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskAdminDetail;