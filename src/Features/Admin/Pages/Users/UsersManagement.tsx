import React, { useState, useMemo } from 'react';
import type { UserFilters } from '../../Types';
import { useGetUsers } from '../../Hooks/useUsers';

interface UserWithMembership {
  uuid: string;
  name: string;
  email: string | null;
  phone: string | null;
  is_active: boolean;
  total_points: number;
  created_at: string;
  membership: string;
  totalPointsEarned: number;
  accountStatus: string;
  registrationDate: string;
  username: string;
  profilePicture: string | null;
}

const UsersManagement: React.FC = () => {
  const [filters, setFilters] = useState<UserFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: usersResponse, isLoading, error } = useGetUsers(currentPage, 15, searchTerm);
  
  // Add random membership to each user
  const usersWithMemberships = useMemo((): UserWithMembership[] => {
    if (!usersResponse?.data?.users) return [];
    
    const membershipTiers = ['Basic', 'Premium', 'VIP', 'Gold', 'Platinum'];
    
    return usersResponse.data.users.map((user: Record<string, unknown>) => ({
      ...user,
      membership: membershipTiers[Math.floor(Math.random() * membershipTiers.length)],
      totalPointsEarned: user.total_points || 0,
      accountStatus: user.is_active ? 'active' : 'inactive',
      registrationDate: user.created_at,
      username: user.name,
      profilePicture: null
    }));
  }, [usersResponse?.data?.users]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleFilterChange = (key: keyof UserFilters, value: string) => {
    setFilters({ ...filters, [key]: value || undefined });
    setCurrentPage(1);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', text: 'Active' },
      suspended: { color: 'bg-yellow-100 text-yellow-800', text: 'Suspended' },
      banned: { color: 'bg-red-100 text-red-800', text: 'Banned' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  // No loading or error states needed with static data

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">User Management</h1>
        <p className="text-text-secondary mt-1">
          Manage all users on the platform
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-bg-secondary rounded-lg p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or username..."
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Status
              </label>
              <select
                value={filters.accountStatus || ''}
                onChange={(e) => handleFilterChange('accountStatus', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="banned">Banned</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Membership Tier
              </label>
              <select
                value={filters.membershipTier || ''}
                onChange={(e) => handleFilterChange('membershipTier', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                <option value="">All Tiers</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="vip">VIP</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-accent-cyan text-white rounded-lg hover:bg-accent-cyan-hover focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-bg-secondary rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-bg-main">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Membership
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-bg-secondary divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-text-secondary">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent-cyan"></div>
                      <span className="ml-2">Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-red-500">
                    Error loading users. Please try again.
                  </td>
                </tr>
              ) : usersWithMemberships.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-text-secondary">
                    No users found.
                  </td>
                </tr>
              ) : (
                usersWithMemberships.map((user: UserWithMembership) => (
                <tr key={user.uuid} className="hover:bg-bg-tertiary">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.profilePicture ? (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.profilePicture}
                            alt={user.username}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-accent-cyan flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {user.username?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-text-primary">
                          {user.username || 'Unknown User'}
                        </div>
                        <div className="text-sm text-text-secondary">
                          ID: {user.uuid?.slice(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">{user.email || 'No email'}</div>
                    {user.phone && (
                      <div className="text-sm text-text-secondary">{user.phone}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.membership === 'VIP' || user.membership === 'Platinum' 
                        ? 'bg-purple-100 text-purple-800'
                        : user.membership === 'Premium' || user.membership === 'Gold'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.membership}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">
                      {user.totalPointsEarned.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.accountStatus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {new Date(user.registrationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-accent-cyan hover:text-accent-cyan-hover">
                        View
                      </button>
                      <button className="text-text-secondary hover:text-text-primary">
                        Edit
                      </button>
                      {user.accountStatus === 'active' ? (
                        <button className="text-yellow-600 hover:text-yellow-700">
                          Suspend
                        </button>
                      ) : (
                        <button className="text-green-600 hover:text-green-700">
                          Activate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {usersResponse?.data?.pagination && usersResponse.data.pagination.last_page > 1 && (
          <div className="bg-bg-main px-4 py-3 flex items-center justify-between border-t border-border">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md text-text-primary bg-bg-secondary hover:bg-bg-tertiary disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(usersResponse.data.pagination.last_page, currentPage + 1))}
                disabled={currentPage === usersResponse.data.pagination.last_page}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md text-text-primary bg-bg-secondary hover:bg-bg-tertiary disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-text-secondary">
                  Showing{' '}
                  <span className="font-medium">
                    {usersResponse.data.pagination.from}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {usersResponse.data.pagination.to}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{usersResponse.data.pagination.total}</span>{' '}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: usersResponse.data.pagination.last_page }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === currentPage
                          ? 'z-10 bg-accent-cyan border-accent-cyan text-white'
                          : 'bg-bg-secondary border-border text-text-primary hover:bg-bg-tertiary'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
