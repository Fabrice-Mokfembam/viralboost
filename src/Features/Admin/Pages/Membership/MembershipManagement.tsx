import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { MembershipTier } from '../../Types';

// Dummy data for memberships
const dummyMemberships: MembershipTier[] = [
  {
    id: '1',
    membership_name: 'Basic',
    description: 'Perfect for getting started with micro-tasks',
    tasks_per_day: 5,
    max_tasks: 10,
    task_link: 'https://example.com/basic-tasks',
    benefits: 'Access to daily micro-tasks, Basic support, Track earnings',
    price: 0,
    duration_days: 30,
    reward_multiplier: 1.0,
    priority_level: 1,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    membership_name: 'Premium',
    description: 'Enhanced features for serious earners',
    tasks_per_day: 15,
    max_tasks: 30,
    task_link: 'https://example.com/premium-tasks',
    benefits: 'Higher daily task limits, Priority withdrawals, Exclusive bonus tasks, Priority customer support',
    price: 9.99,
    duration_days: 30,
    reward_multiplier: 1.5,
    priority_level: 2,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    membership_name: 'VIP',
    description: 'Ultimate experience with unlimited access',
    tasks_per_day: 50,
    max_tasks: 100,
    task_link: 'https://example.com/vip-tasks',
    benefits: 'Unlimited tasks & earnings, Highest priority withdrawals, Personal account manager, Exclusive invites & events',
    price: 29.99,
    duration_days: 30,
    reward_multiplier: 2.0,
    priority_level: 3,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    membership_name: 'Enterprise',
    description: 'Custom solutions for large organizations',
    tasks_per_day: 100,
    max_tasks: 200,
    task_link: 'https://example.com/enterprise-tasks',
    benefits: 'Custom task creation, Dedicated support team, Advanced analytics, White-label options',
    price: 99.99,
    duration_days: 30,
    reward_multiplier: 3.0,
    priority_level: 4,
    is_active: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  }
];

const MembershipManagement: React.FC = () => {
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [membershipToDelete, setMembershipToDelete] = useState<MembershipTier | null>(null);
  const [memberships, setMemberships] = useState<MembershipTier[]>(dummyMemberships);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletingMembership, setIsDeletingMembership] = useState(false);

  const handleDeleteClick = (membership: MembershipTier) => {
    setMembershipToDelete(membership);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!membershipToDelete) return;

    setIsDeletingMembership(true);
    
    // Simulate API call
    setTimeout(() => {
      setMemberships(prev => prev.filter(membership => membership.id !== membershipToDelete.id));
      toast.success('Membership deleted successfully!');
      setDeleteModalOpen(false);
      setMembershipToDelete(null);
      setIsDeletingMembership(false);
    }, 1000);
  };

  const handleDeleteCancel = () => {
    setIsLoading(false);
    setDeleteModalOpen(false);
    setMembershipToDelete(null);
  };

  const getStatusBadge = (isActive: boolean) => {
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  const getPriorityBadge = (priority: number) => {
    const priorityConfig = {
      1: { color: 'bg-red-100 text-red-800', text: 'High' },
      2: { color: 'bg-yellow-100 text-yellow-800', text: 'Medium' },
      3: { color: 'bg-blue-100 text-blue-800', text: 'Low' },
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig[3];
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Membership Management</h1>
            <p className="text-text-secondary mt-1">Loading memberships...</p>
          </div>
        </div>
        <div className="bg-bg-secondary rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-cyan mx-auto"></div>
          <p className="text-text-secondary mt-4">Loading memberships...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Membership Management</h1>
          <p className="text-text-secondary mt-1">
            Manage membership tiers and subscription plans
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/dashboard/create-membership')}
          className="px-4 py-2 bg-accent-cyan text-white rounded-lg hover:bg-accent-cyan-hover focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-colors duration-200"
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Membership
          </div>
        </button>
      </div>

      {/* Memberships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memberships?.map((membership: MembershipTier) => (
          <div key={membership.id} className="bg-bg-secondary rounded-lg p-6 border border-border hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">{membership.membership_name}</h3>
                <p className="text-text-secondary text-sm mt-1">{membership.description}</p>
              </div>
              <div className="flex space-x-2">
                {getStatusBadge(membership.is_active)}
                {getPriorityBadge(membership.priority_level)}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Price:</span>
                <span className="text-text-primary font-medium">${membership.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Duration:</span>
                <span className="text-text-primary font-medium">{membership.duration_days} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Tasks/Day:</span>
                <span className="text-text-primary font-medium">{membership.tasks_per_day}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Max Tasks:</span>
                <span className="text-text-primary font-medium">{membership.max_tasks}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Reward Multiplier:</span>
                <span className="text-text-primary font-medium">{membership.reward_multiplier}x</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/admin/dashboard/membership/details/${membership.id}`)}
                className="flex-1 px-3 py-2 text-accent-cyan border border-accent-cyan rounded-lg hover:bg-accent-cyan hover:text-white transition-colors duration-200 text-sm"
              >
                View
              </button>
              <button
                onClick={() => navigate(`/admin/dashboard/membership/edit/${membership.id}`)}
                className="flex-1 px-3 py-2 text-text-secondary border border-border rounded-lg hover:bg-bg-tertiary hover:text-text-primary transition-colors duration-200 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(membership)}
                className="px-3 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {memberships.length === 0 && (
        <div className="bg-bg-secondary rounded-lg p-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <svg className="w-16 h-16 text-text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <h3 className="text-lg font-medium text-text-primary mb-2">No Memberships Found</h3>
            <p className="text-text-secondary mb-4">
              Get started by creating your first membership tier.
            </p>
            <button
              onClick={() => navigate('/admin/dashboard/create-membership')}
              className="px-4 py-2 bg-accent-cyan text-white rounded-lg hover:bg-accent-cyan-hover transition-colors duration-200"
            >
              Create Membership
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-bg-secondary rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-text-primary">
                  Delete Membership
                </h3>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-text-secondary">
                Are you sure you want to delete this membership? This action cannot be undone.
              </p>
              {membershipToDelete && (
                <div className="mt-3 p-3 bg-bg-main rounded-lg border border-border">
                  <p className="text-sm font-medium text-text-primary">{membershipToDelete.membership_name}</p>
                  <p className="text-xs text-text-secondary mt-1">
                    ${membershipToDelete.price} • {membershipToDelete.duration_days} days
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleDeleteCancel}
                disabled={isDeletingMembership}
                className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeletingMembership}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isDeletingMembership ? 'Deleting...' : 'Delete Membership'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipManagement;
