import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TaskFilters } from '../Types';
import { staticTasks } from '../data/staticData';

const TasksManagement: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<TaskFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter and paginate tasks
  const filteredTasks = useMemo(() => {
    let filtered = staticTasks;
    
    // Apply search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search)
      );
    }
    
    // Apply platform filter
    if (filters.platform) {
      filtered = filtered.filter(task => task.platform === filters.platform);
    }
    
    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(task => task.status === filters.status);
    }
    
    // Apply membership tier filter
    if (filters.membershipTier) {
      filtered = filtered.filter(task => 
        task.membershipTiers.includes(filters.membershipTier!)
      );
    }
    
    return filtered;
  }, [filters]);
  
  // Paginate results
  const tasksPerPage = 20;
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );
  
  const tasks = {
    data: paginatedTasks,
    pagination: {
      page: currentPage,
      limit: tasksPerPage,
      total: filteredTasks.length,
      totalPages: totalPages
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, search: searchTerm });
    setCurrentPage(1);
  };

  const handleFilterChange = (key: keyof TaskFilters, value: string) => {
    setFilters({ ...filters, [key]: value || undefined });
    setCurrentPage(1);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
      active: { color: 'bg-green-100 text-green-800', text: 'Active' },
      paused: { color: 'bg-blue-100 text-blue-800', text: 'Paused' },
      expired: { color: 'bg-red-100 text-red-800', text: 'Expired' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
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

  // No loading or error states needed with static data

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Task Management</h1>
          <p className="text-text-secondary mt-1">
            Create and manage tasks for users
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/dashboard/create-task')}
          className="px-4 py-2 bg-accent-cyan text-white rounded-lg hover:bg-accent-cyan-hover focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-colors duration-200"
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Task
          </div>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-bg-secondary rounded-lg p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Status
              </label>
              <select
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Platform
              </label>
              <select
                value={filters.platform || ''}
                onChange={(e) => handleFilterChange('platform', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                <option value="">All Platforms</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="twitter">Twitter</option>
                <option value="tiktok">TikTok</option>
                <option value="facebook">Facebook</option>
                <option value="linkedin">LinkedIn</option>
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

      {/* Tasks Table */}
      <div className="bg-bg-secondary rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-bg-main">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Expires
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Completions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-bg-secondary divide-y divide-border">
              {tasks?.data.map((task) => (
                <tr key={task.id} className="hover:bg-bg-tertiary">
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10">
                        {task.requiresPhoto && task.samplePhotoUrl ? (
                          <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={task.samplePhotoUrl}
                            alt="Task sample"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-bg-tertiary flex items-center justify-center">
                            <span className="text-lg">{getPlatformIcon(task.platform)}</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-text-primary">
                          {task.title}
                        </div>
                        <div className="text-sm text-text-secondary mt-1">
                          {task.description.length > 100 
                            ? `${task.description.substring(0, 100)}...` 
                            : task.description
                          }
                        </div>
                        <div className="text-xs text-text-muted mt-1">
                          ID: {task.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{getPlatformIcon(task.platform)}</span>
                      <span className="text-sm text-text-primary capitalize">
                        {task.platform}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">
                      {task.basePoints}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {task.estimatedDurationMinutes} min
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(task.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {new Date(task.expiresAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">
                      {task.totalCompletions.toLocaleString()}
                    </div>
                    <div className="text-xs text-text-secondary">
                      / {task.thresholdValue} target
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-accent-cyan hover:text-accent-cyan-hover">
                        View
                      </button>
                      <button className="text-text-secondary hover:text-text-primary">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {tasks && tasks.pagination.totalPages > 1 && (
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
                onClick={() => setCurrentPage(Math.min(tasks.pagination.totalPages, currentPage + 1))}
                disabled={currentPage === tasks.pagination.totalPages}
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
                    {(currentPage - 1) * 20 + 1}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * 20, tasks.pagination.total)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{tasks.pagination.total}</span>{' '}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: tasks.pagination.totalPages }, (_, i) => i + 1).map((page) => (
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

export default TasksManagement;
