import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, CheckCircle, Trash2, DollarSign, Calendar, User } from 'lucide-react';
import { useAdminWithdrawals, useDeleteAdminWithdrawal, useCompleteAdminWithdrawal } from '../../Hooks/useWithdrawals';
import { toast } from 'react-toastify';
import type { Withdrawal, GetAdminWithdrawalsQueryParams } from '../../../user/withdrawals/Types';

const WithdrawalsManagement: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<GetAdminWithdrawalsQueryParams>({});
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; withdrawal: Withdrawal | null }>({ show: false, withdrawal: null });
  const [completeConfirm, setCompleteConfirm] = useState<{ show: boolean; withdrawal: Withdrawal | null }>({ show: false, withdrawal: null });

  const { data: withdrawalsResponse, isLoading, error } = useAdminWithdrawals({ ...filters, page: currentPage });
  const { mutate: deleteWithdrawal, isPending: isDeleting } = useDeleteAdminWithdrawal();
  const { mutate: completeWithdrawal, isPending: isCompleting } = useCompleteAdminWithdrawal();

  const withdrawals = withdrawalsResponse?.data?.data || [];
  const pagination = withdrawalsResponse?.data;

  const handleFilterChange = (key: keyof GetAdminWithdrawalsQueryParams, value: string) => {
    setFilters({ ...filters, [key]: value || undefined });
    setCurrentPage(1);
  };

  const handleViewWithdrawal = (uuid: string) => {
    navigate(`/admin/dashboard/withdrawals/${uuid}`);
  };

  const handleDeleteWithdrawal = (withdrawal: Withdrawal) => {
    setDeleteConfirm({ show: true, withdrawal });
  };

  const handleCompleteWithdrawal = (withdrawal: Withdrawal) => {
    setCompleteConfirm({ show: true, withdrawal });
  };

  const confirmDelete = () => {
    if (deleteConfirm.withdrawal) {
      deleteWithdrawal(deleteConfirm.withdrawal.uuid, {
        onSuccess: () => {
          toast.success('Withdrawal deleted successfully');
          setDeleteConfirm({ show: false, withdrawal: null });
        },
        onError: () => {
          toast.error('Failed to delete withdrawal');
        }
      });
    }
  };

  const confirmComplete = () => {
    if (completeConfirm.withdrawal) {
      completeWithdrawal(completeConfirm.withdrawal.uuid, {
        onSuccess: () => {
          toast.success('Withdrawal completed successfully');
          setCompleteConfirm({ show: false, withdrawal: null });
        },
        onError: () => {
          toast.error('Failed to complete withdrawal');
        }
      });
    }
  };

  const getStatusBadge = (isCompleted: boolean) => {
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        isCompleted 
          ? 'bg-green-100 text-green-800' 
          : 'bg-yellow-100 text-yellow-800'
      }`}>
        {isCompleted ? 'Completed' : 'Pending'}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
        <div>
        <h1 className="text-2xl font-bold text-text-primary">Withdrawal Requests</h1>
          <p className="text-text-secondary mt-1">
          Monitor and manage all user withdrawal requests
        </p>
      </div>

      {/* Filters */}
      <div className="bg-bg-secondary rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Status
            </label>
            <select
              value={filters.is_completed?.toString() || ''}
              onChange={(e) => handleFilterChange('is_completed', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
            >
              <option value="">All Statuses</option>
              <option value="false">Pending</option>
              <option value="true">Completed</option>
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
              <option value="Bitcoin">Bitcoin</option>
              <option value="USDT">USDT</option>
              <option value="Ethereum">Ethereum</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Min Amount
            </label>
            <input
              type="number"
              value={filters.min_amount || ''}
              onChange={(e) => handleFilterChange('min_amount', e.target.value)}
              placeholder="Minimum amount"
              className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              User UUID
            </label>
            <input
              type="text"
              value={filters.user_uuid || ''}
              onChange={(e) => handleFilterChange('user_uuid', e.target.value)}
              placeholder="User UUID"
              className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => {
                setFilters({});
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Withdrawals Table */}
      <div className="bg-bg-secondary rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-bg-main">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-bg-secondary divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-text-secondary">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent-cyan"></div>
                      <span className="ml-2">Loading withdrawals...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-red-500">
                    Error loading withdrawals. Please try again.
                  </td>
                </tr>
              ) : withdrawals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-text-secondary">
                    No withdrawals found.
                  </td>
                </tr>
              ) : (
                withdrawals.map((withdrawal: Withdrawal) => (
                  <tr key={withdrawal.uuid} className="hover:bg-bg-tertiary">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-accent-cyan flex items-center justify-center">
                            <User size={16} className="text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-text-primary">
                            {withdrawal.user?.name || 'Unknown User'}
                          </div>
                          <div className="text-sm text-text-secondary">
                            {withdrawal.user?.email || 'No email'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DollarSign size={16} className="text-green-500 mr-1" />
                        <span className="text-sm font-medium text-text-primary">
                          ${withdrawal.withdrawal_amount}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-text-primary">
                        {withdrawal.platform || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(withdrawal.is_completed)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar size={14} className="text-text-muted mr-1" />
                        <span className="text-sm text-text-secondary">
                          {formatDate(withdrawal.created_at)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewWithdrawal(withdrawal.uuid)}
                          className="text-accent-cyan hover:text-accent-cyan-hover disabled:opacity-50"
                          disabled={isDeleting || isCompleting}
                        >
                          <Eye size={16} />
                        </button>
                        {!withdrawal.is_completed && (
                          <>
                            <button 
                              onClick={() => handleCompleteWithdrawal(withdrawal)}
                              className="text-green-600 hover:text-green-700 disabled:opacity-50"
                              disabled={isDeleting || isCompleting}
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteWithdrawal(withdrawal)}
                              className="text-red-600 hover:text-red-700 disabled:opacity-50"
                              disabled={isDeleting || isCompleting}
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
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
        {pagination && pagination.last_page > 1 && (
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
                onClick={() => setCurrentPage(Math.min(pagination.last_page, currentPage + 1))}
                disabled={currentPage === pagination.last_page}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md text-text-primary bg-bg-secondary hover:bg-bg-tertiary disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-text-secondary">
                  Showing{' '}
                  <span className="font-medium">{pagination.from}</span>{' '}
                  to{' '}
                  <span className="font-medium">{pagination.to}</span>{' '}
                  of{' '}
                  <span className="font-medium">{pagination.total}</span>{' '}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
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

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div 
          className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
          onClick={isDeleting ? undefined : () => setDeleteConfirm({ show: false, withdrawal: null })}
        >
          <div 
            className="bg-bg-secondary rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Confirm Withdrawal Deletion
            </h3>
            <p className="text-text-secondary mb-4">
              Are you sure you want to delete this withdrawal of <strong>${deleteConfirm.withdrawal?.withdrawal_amount}</strong> from <strong>{deleteConfirm.withdrawal?.user?.name}</strong>?
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-800">
                <strong>Warning:</strong> This action cannot be undone.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteConfirm({ show: false, withdrawal: null })}
                className="flex-1 px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200 disabled:opacity-50"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete Withdrawal'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Confirmation Modal */}
      {completeConfirm.show && (
        <div 
          className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
          onClick={isCompleting ? undefined : () => setCompleteConfirm({ show: false, withdrawal: null })}
        >
          <div 
            className="bg-bg-secondary rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Confirm Withdrawal Completion
            </h3>
            <p className="text-text-secondary mb-4">
              Are you sure you want to complete this withdrawal of <strong>${completeConfirm.withdrawal?.withdrawal_amount}</strong> from <strong>{completeConfirm.withdrawal?.user?.name}</strong>?
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-green-800">
                <strong>Note:</strong> This will deduct ${completeConfirm.withdrawal?.withdrawal_amount} from the user's account balance.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setCompleteConfirm({ show: false, withdrawal: null })}
                className="flex-1 px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200 disabled:opacity-50"
                disabled={isCompleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmComplete}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={isCompleting}
              >
                {isCompleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Completing...
                  </>
                ) : (
                  'Complete Withdrawal'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawalsManagement;
