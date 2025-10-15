import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Trash2, DollarSign, Calendar, User, Mail, CreditCard, Clock, AlertCircle, Edit } from 'lucide-react';
import { useAdminWithdrawal, useDeleteAdminWithdrawal, useCompleteAdminWithdrawal, useUpdateAdminWithdrawal } from '../../Hooks/useWithdrawals';
import { toast } from 'react-toastify';
import type { UpdateWithdrawalPayload } from '../../../user/withdrawals/Types';

const WithdrawalDetail: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [completeConfirm, setCompleteConfirm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<UpdateWithdrawalPayload>({});

  const { data: withdrawalResponse, isLoading, error } = useAdminWithdrawal(uuid || '');
  const { mutate: deleteWithdrawal, isPending: isDeleting } = useDeleteAdminWithdrawal();
  const { mutate: completeWithdrawal, isPending: isCompleting } = useCompleteAdminWithdrawal();
  const { mutate: updateWithdrawal, isPending: isUpdating } = useUpdateAdminWithdrawal();

  const withdrawal = withdrawalResponse?.data;

  const handleDelete = () => {
    if (withdrawal) {
      deleteWithdrawal(withdrawal.uuid, {
        onSuccess: () => {
          toast.success('Withdrawal deleted successfully');
          navigate('/admin/dashboard/withdrawals');
        },
        onError: () => {
          toast.error('Failed to delete withdrawal');
        }
      });
    }
  };

  const handleComplete = () => {
    if (withdrawal) {
      completeWithdrawal(withdrawal.uuid, {
        onSuccess: () => {
          toast.success('Withdrawal completed successfully');
          navigate('/admin/dashboard/withdrawals');
        },
        onError: () => {
          toast.error('Failed to complete withdrawal');
        }
      });
    }
  };

  const handleEdit = () => {
    if (withdrawal) {
      updateWithdrawal({ uuid: withdrawal.uuid, payload: editForm }, {
        onSuccess: () => {
          toast.success('Withdrawal updated successfully');
          setEditMode(false);
          setEditForm({});
        },
        onError: () => {
          toast.error('Failed to update withdrawal');
        }
      });
    }
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
      <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-cyan"></div>
          <span className="text-text-primary">Loading withdrawal details...</span>
        </div>
      </div>
    );
  }

  if (error || !withdrawal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text-primary mb-2">Withdrawal Not Found</h2>
          <p className="text-text-secondary mb-6">The withdrawal you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/admin/dashboard/withdrawals')}
            className="px-6 py-3 bg-accent-cyan text-white rounded-lg hover:bg-accent-cyan-hover transition-colors"
          >
            Back to Withdrawals
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/dashboard/withdrawals')}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Withdrawals
          </button>
          <h1 className="text-3xl font-bold text-text-primary">Withdrawal Details</h1>
          <p className="text-text-secondary mt-2">Review withdrawal information and take action</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Withdrawal Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Withdrawal Overview */}
            <div className="bg-bg-secondary rounded-2xl p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-primary">Withdrawal Overview</h2>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    withdrawal.is_completed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {withdrawal.is_completed ? 'Completed' : 'Pending'}
                  </span>
                  {!withdrawal.is_completed && (
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="text-accent-cyan hover:text-accent-cyan-hover"
                    >
                      <Edit size={20} />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Amount</label>
                    <div className="flex items-center gap-2 mt-1">
                      <DollarSign size={20} className="text-green-500" />
                      <span className="text-2xl font-bold text-text-primary">${withdrawal.withdrawal_amount}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-text-secondary">Platform</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={editForm.platform || withdrawal.platform || ''}
                        onChange={(e) => setEditForm({ ...editForm, platform: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                        placeholder="Platform"
                      />
                    ) : (
                      <p className="text-text-primary font-medium">{withdrawal.platform || 'N/A'}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-text-secondary">Wallet Address</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={editForm.wallet_address || withdrawal.wallet_address || ''}
                        onChange={(e) => setEditForm({ ...editForm, wallet_address: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                        placeholder="Wallet Address"
                      />
                    ) : (
                      <p className="text-text-primary font-mono text-sm break-all bg-bg-main p-2 rounded border">
                        {withdrawal.wallet_address || 'N/A'}
                      </p>
                    )}
                  </div>

                  {withdrawal.platform === 'USDT' && (
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Address Type</label>
                      {editMode ? (
                        <select
                          value={editForm.address_type || withdrawal.address_type || ''}
                          onChange={(e) => setEditForm({ ...editForm, address_type: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                        >
                          <option value="">Select Address Type</option>
                          <option value="TRC20">TRC20 (Tron Network)</option>
                          <option value="ERC20">ERC20 (Ethereum Network)</option>
                        </select>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            withdrawal.address_type === 'TRC20' 
                              ? 'bg-green-100 text-green-800' 
                              : withdrawal.address_type === 'ERC20'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {withdrawal.address_type || 'N/A'}
                          </span>
                          {withdrawal.address_type === 'TRC20' && (
                            <span className="text-xs text-green-600">Lower Fees</span>
                          )}
                          {withdrawal.address_type === 'ERC20' && (
                            <span className="text-xs text-orange-600">Higher Fees</span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Withdrawal ID</label>
                    <p className="text-text-primary font-mono text-sm">{withdrawal.uuid}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-text-secondary">Created</label>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-text-muted" />
                      <p className="text-text-primary">{formatDate(withdrawal.created_at)}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-text-secondary">Last Updated</label>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-text-muted" />
                      <p className="text-text-primary">{formatDate(withdrawal.updated_at)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {editMode && (
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={handleEdit}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-accent-cyan text-white rounded-lg hover:bg-accent-cyan-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isUpdating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Updating...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setEditForm({});
                    }}
                    className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Withdrawal Proof */}
            <div className="bg-bg-secondary rounded-2xl p-6 border border-border">
              <h3 className="text-lg font-bold text-text-primary mb-4">Withdrawal Proof</h3>
              {withdrawal.picture_path ? (
                <div className="space-y-4">
                  <img
                    src={withdrawal.picture_path}
                    alt="Withdrawal proof"
                    className="w-full max-w-md rounded-lg border border-border cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(withdrawal.picture_path, '_blank')}
                  />
                  <p className="text-sm text-text-secondary">
                    Click the image to view in full size
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CreditCard size={48} className="text-text-muted mx-auto mb-4" />
                  <p className="text-text-secondary">No withdrawal proof image available</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Information */}
            <div className="bg-bg-secondary rounded-2xl p-6 border border-border">
              <h3 className="text-lg font-bold text-text-primary mb-4">User Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent-cyan flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{withdrawal.user?.name || 'Unknown User'}</p>
                    <p className="text-sm text-text-secondary">User ID: {withdrawal.user_uuid.slice(0, 8)}...</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-text-muted" />
                  <p className="text-text-primary">{withdrawal.user?.email || 'No email'}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            {!withdrawal.is_completed && (
              <div className="bg-bg-secondary rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-bold text-text-primary mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setCompleteConfirm(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isCompleting || isDeleting}
                  >
                    <CheckCircle size={20} />
                    {isCompleting ? 'Completing...' : 'Complete Withdrawal'}
                  </button>

                  <button
                    onClick={() => setDeleteConfirm(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isCompleting || isDeleting}
                  >
                    <Trash2 size={20} />
                    {isDeleting ? 'Deleting...' : 'Delete Withdrawal'}
                  </button>
                </div>
              </div>
            )}

            {/* Status Information */}
            <div className="bg-bg-secondary rounded-2xl p-6 border border-border">
              <h3 className="text-lg font-bold text-text-primary mb-4">Status Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Status:</span>
                  <span className={`font-medium ${
                    withdrawal.is_completed ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {withdrawal.is_completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Created:</span>
                  <span className="text-text-primary">{formatDate(withdrawal.created_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Updated:</span>
                  <span className="text-text-primary">{formatDate(withdrawal.updated_at)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modals */}
        {completeConfirm && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-bg-secondary rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Confirm Withdrawal Completion
              </h3>
              <p className="text-text-secondary mb-4">
                Are you sure you want to complete this withdrawal of <strong>${withdrawal.withdrawal_amount}</strong> from <strong>{withdrawal.user?.name}</strong>?
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-green-800">
                  <strong>Note:</strong> This will deduct ${withdrawal.withdrawal_amount} from the user's account balance.
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setCompleteConfirm(false)}
                  className="flex-1 px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors disabled:opacity-50"
                  disabled={isCompleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleComplete}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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

        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-bg-secondary rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Confirm Withdrawal Deletion
              </h3>
              <p className="text-text-secondary mb-4">
                Are you sure you want to delete this withdrawal of <strong>${withdrawal.withdrawal_amount}</strong> from <strong>{withdrawal.user?.name}</strong>?
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-800">
                  <strong>Warning:</strong> This action cannot be undone.
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors disabled:opacity-50"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
      </div>
    </div>
  );
};

export default WithdrawalDetail;
