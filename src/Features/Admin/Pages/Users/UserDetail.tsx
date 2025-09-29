import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserById } from '../../Hooks/useUsers';
import { ArrowLeft, User, Award, Target, Calendar, Shield, Eye, Bell } from 'lucide-react';

const UserDetail: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const { data: userData, isLoading, error } = useGetUserById(uuid || '');

  const user = userData?.data?.user;

  const getStatusBadge = (isActive: boolean) => {
    return (
      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
        isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  const getVisibilityBadge = (visibility: string) => {
    const visibilityConfig = {
      public: { color: 'bg-green-100 text-green-800', text: 'Public' },
      private: { color: 'bg-red-100 text-red-800', text: 'Private' },
      friends: { color: 'bg-blue-100 text-blue-800', text: 'Friends Only' },
    };
    
    const config = visibilityConfig[visibility as keyof typeof visibilityConfig] || visibilityConfig.private;
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
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
            <h1 className="text-2xl font-bold text-text-primary">User Details</h1>
            <p className="text-text-secondary mt-1">Loading user information...</p>
          </div>
        </div>
        <div className="bg-bg-secondary rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-cyan mx-auto"></div>
          <p className="text-text-secondary mt-4">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">User Details</h1>
            <p className="text-text-secondary mt-1">Error loading user</p>
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
              <h3 className="text-sm font-medium text-red-800">Error loading user</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Failed to load user details. Please try again later.</p>
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
            onClick={() => navigate('/admin/dashboard/users')}
            className="p-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">User Details</h1>
            <p className="text-text-secondary mt-1">
              User ID: {user.uuid}
            </p>
          </div>
        </div>
      </div>

      {/* User Overview */}
      <div className="bg-bg-secondary rounded-lg p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 h-16 w-16">
              {user.profile_picture ? (
                <img
                  className="h-16 w-16 rounded-full"
                  src={user.profile_picture}
                  alt={user.name}
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-accent-cyan flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-text-primary mb-2">{user.name}</h2>
              <p className="text-text-secondary text-lg mb-4">{user.email}</p>
              <div className="flex items-center space-x-4">
                {getStatusBadge(user.is_active)}
                <span className="text-sm text-text-muted">
                  Joined: {formatDate(user.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* User Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-bg-main rounded-lg p-4 border border-border">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-accent-cyan mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Total Points</p>
                <p className="text-2xl font-bold text-text-primary">{user.total_points?.toLocaleString() || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-bg-main rounded-lg p-4 border border-border">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-accent-cyan mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Tasks Today</p>
                <p className="text-2xl font-bold text-text-primary">{user.tasks_completed_today || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-bg-main rounded-lg p-4 border border-border">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-accent-cyan mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Active Memberships</p>
                <p className="text-2xl font-bold text-text-primary">{user.active_memberships || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-bg-main rounded-lg p-4 border border-border">
            <div className="flex items-center">
              <User className="h-8 w-8 text-accent-cyan mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Referral Code</p>
                <p className="text-lg font-bold text-text-primary font-mono">{user.referral_code}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-accent-cyan" />
            Personal Information
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Full Name</span>
              <span className="text-text-primary font-medium">{user.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Email</span>
              <span className="text-text-primary font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Phone</span>
              <span className="text-text-primary font-medium">{user.phone || 'Not provided'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Referral Code</span>
              <span className="text-text-primary font-medium font-mono">{user.referral_code}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Referred By</span>
              <span className="text-text-primary font-medium">
                {user.referred_by ? (
                  <div className="text-right">
                    <div className="font-mono text-sm">{user.referred_by}</div>
                    {user.referrer && (
                      <div className="text-xs text-text-secondary">{user.referrer.name}</div>
                    )}
                  </div>
                ) : 'No referrer'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">Profile Visibility</span>
              {getVisibilityBadge(user.profile_visibility)}
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="bg-bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-accent-cyan" />
            Account Status
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Account Status</span>
              {getStatusBadge(user.is_active)}
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Email Verified</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                user.email_verified_at ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user.email_verified_at ? 'Verified' : 'Not Verified'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Phone Verified</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                user.phone_verified_at ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user.phone_verified_at ? 'Verified' : 'Not Verified'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Admin Status</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                user.is_admin ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {user.is_admin ? 'Admin' : 'User'}
              </span>
            </div>
            {user.deactivated_at && (
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-text-secondary">Deactivated At</span>
                <span className="text-text-primary font-medium text-sm">
                  {formatDate(user.deactivated_at)}
                </span>
              </div>
            )}
            {user.deactivation_reason && (
              <div className="flex justify-between items-center py-2">
                <span className="text-text-secondary">Deactivation Reason</span>
                <span className="text-text-primary font-medium text-sm">
                  {user.deactivation_reason}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Privacy Preferences */}
        <div className="bg-bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Eye className="h-5 w-5 mr-2 text-accent-cyan" />
            Privacy Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Show Email</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                user.show_email ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user.show_email ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Show Phone</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                user.show_phone ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user.show_phone ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">Show Activity</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                user.show_activity ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user.show_activity ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2 text-accent-cyan" />
            Notification Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Email Notifications</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                user.email_notifications ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user.email_notifications ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">SMS Notifications</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                user.sms_notifications ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user.sms_notifications ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Timeline */}
      <div className="bg-bg-secondary rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-accent-cyan" />
          Account Timeline
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Account Created</span>
            <span className="text-text-primary font-medium">
              {formatDate(user.created_at)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Last Updated</span>
            <span className="text-text-primary font-medium">
              {formatDate(user.updated_at)}
            </span>
          </div>
          {user.email_verified_at && (
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Email Verified</span>
              <span className="text-text-primary font-medium">
                {formatDate(user.email_verified_at)}
              </span>
            </div>
          )}
          {user.phone_verified_at && (
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Phone Verified</span>
              <span className="text-text-primary font-medium">
                {formatDate(user.phone_verified_at)}
              </span>
            </div>
          )}
          {user.last_task_reset_date && (
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">Last Task Reset</span>
              <span className="text-text-primary font-medium">
                {formatDate(user.last_task_reset_date)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
