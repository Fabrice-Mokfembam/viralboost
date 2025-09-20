import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetMembershipById } from '../../Hooks/useMemberships';
import { ArrowLeft, DollarSign, Calendar, Target, Award, Settings, ExternalLink } from 'lucide-react';

const MembershipDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: membershipData, isLoading, error } = useGetMembershipById(id || '');

  const membership = membershipData?.data;

  const getStatusBadge = (isActive: boolean) => {
    return (
      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
        isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  const getPriorityBadge = (priority: number) => {
    const priorityConfig = {
      1: { color: 'bg-red-100 text-red-800', text: 'High Priority' },
      2: { color: 'bg-yellow-100 text-yellow-800', text: 'Medium Priority' },
      3: { color: 'bg-blue-100 text-blue-800', text: 'Low Priority' },
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig[3];
    
    return (
      <span className={`px-3 py-1 text-sm font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
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
            <h1 className="text-2xl font-bold text-text-primary">Membership Details</h1>
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

  if (error || !membership) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Membership Details</h1>
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
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/dashboard/membership')}
            className="p-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Membership Details</h1>
            <p className="text-text-secondary mt-1">
              Membership ID: {membership.id}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate(`/admin/dashboard/membership/edit/${membership.id}`)}
            className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
          >
            Edit Membership
          </button>
        </div>
      </div>

      {/* Membership Overview */}
      <div className="bg-bg-secondary rounded-lg p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-text-primary mb-2">{membership.membership_name}</h2>
            <p className="text-text-secondary text-lg mb-4">{membership.description}</p>
            <div className="flex items-center space-x-4">
              {getStatusBadge(membership.is_active)}
              {getPriorityBadge(membership.priority_level)}
              <span className="text-sm text-text-muted">
                Created: {formatDate(membership.created_at)}
              </span>
            </div>
          </div>
        </div>

        {/* Membership Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-bg-main rounded-lg p-4 border border-border">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-accent-cyan mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Price</p>
                <p className="text-2xl font-bold text-text-primary">${membership.price}</p>
              </div>
            </div>
          </div>

          <div className="bg-bg-main rounded-lg p-4 border border-border">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-accent-cyan mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Duration</p>
                <p className="text-2xl font-bold text-text-primary">{membership.duration_days} days</p>
              </div>
            </div>
          </div>

          <div className="bg-bg-main rounded-lg p-4 border border-border">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-accent-cyan mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Tasks/Day</p>
                <p className="text-2xl font-bold text-text-primary">{membership.tasks_per_day}</p>
              </div>
            </div>
          </div>

          <div className="bg-bg-main rounded-lg p-4 border border-border">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-accent-cyan mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Reward Multiplier</p>
                <p className="text-2xl font-bold text-text-primary">{membership.reward_multiplier}x</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Benefits */}
        <div className="bg-bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-accent-cyan" />
            Benefits
          </h3>
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap text-text-secondary bg-bg-main p-4 rounded-lg border border-border">
              {membership.benefits}
            </pre>
          </div>
        </div>

        {/* Membership Settings */}
        <div className="bg-bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Settings className="h-5 w-5 mr-2 text-accent-cyan" />
            Membership Settings
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Max Tasks</span>
              <span className="text-text-primary font-medium">{membership.max_tasks}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Priority Level</span>
              <span className="text-text-primary font-medium">{membership.priority_level}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Is Active</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                membership.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {membership.is_active ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">Last Updated</span>
              <span className="text-text-primary font-medium text-sm">
                {formatDate(membership.updated_at)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Task Link */}
      <div className="bg-bg-secondary rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <ExternalLink className="h-5 w-5 mr-2 text-accent-cyan" />
          Task Link
        </h3>
        <div className="flex items-center space-x-3">
          <a
            href={membership.task_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan hover:text-accent-cyan-hover underline break-all"
          >
            {membership.task_link}
          </a>
          <button
            onClick={() => window.open(membership.task_link, '_blank')}
            className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipDetail;

