import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Trash2, DollarSign, Calendar, User, Mail, CreditCard, Clock, AlertCircle } from 'lucide-react';
import { useAdminPayment, useDeleteAdminPayment, useApproveAdminPayment } from '../../Hooks/usePayments';
import { toast } from 'react-toastify';


const PaymentDetail: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [approveConfirm, setApproveConfirm] = useState(false);

  const { data: paymentResponse, isLoading, error } = useAdminPayment(uuid || '');
  const { mutate: deletePayment, isPending: isDeleting } = useDeleteAdminPayment();
  const { mutate: approvePayment, isPending: isApproving } = useApproveAdminPayment();

  const payment = paymentResponse?.data;

  const handleDelete = () => {
    if (payment) {
      deletePayment(payment.uuid, {
        onSuccess: () => {
          toast.success('Payment deleted successfully');
          navigate('/admin/dashboard/transactions');
        },
        onError: () => {
          toast.error('Failed to delete payment');
        }
      });
    }
  };

  const handleApprove = () => {
    if (payment) {
      approvePayment(payment.uuid, {
        onSuccess: () => {
          toast.success('Payment approved successfully');
          navigate('/admin/dashboard/transactions');
        },
        onError: () => {
          toast.error('Failed to approve payment');
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
          <span className="text-text-primary">Loading payment details...</span>
        </div>
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text-primary mb-2">Payment Not Found</h2>
          <p className="text-text-secondary mb-6">The payment you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/admin/dashboard/transactions')}
            className="px-6 py-3 bg-accent-cyan text-white rounded-lg hover:bg-accent-cyan-hover transition-colors"
          >
            Back to Transactions
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
            onClick={() => navigate('/admin/dashboard/transactions')}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Transactions
          </button>
          <h1 className="text-3xl font-bold text-text-primary">Payment Details</h1>
          <p className="text-text-secondary mt-2">Review payment information and take action</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Payment Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Overview */}
            <div className="bg-bg-secondary rounded-2xl p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-primary">Payment Overview</h2>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  payment.is_approved 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {payment.is_approved ? 'Approved' : 'Pending'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Amount</label>
                    <div className="flex items-center gap-2 mt-1">
                      <DollarSign size={20} className="text-green-500" />
                      <span className="text-2xl font-bold text-text-primary">${payment.amount}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-text-secondary">Platform</label>
                    <p className="text-text-primary font-medium">{payment.platform || 'N/A'}</p>
                  </div>

                  {payment.conversion_amount && (
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Conversion Amount</label>
                      <p className="text-text-primary font-medium">
                        {payment.conversion_amount}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Payment ID</label>
                    <p className="text-text-primary font-mono text-sm">{payment.uuid}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-text-secondary">Created</label>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-text-muted" />
                      <p className="text-text-primary">{formatDate(payment.created_at)}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-text-secondary">Last Updated</label>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-text-muted" />
                      <p className="text-text-primary">{formatDate(payment.updated_at)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {payment.description && (
                <div className="mt-6">
                  <label className="text-sm font-medium text-text-secondary">Description</label>
                  <p className="text-text-primary mt-1 bg-bg-main p-3 rounded-lg">
                    {payment.description}
                  </p>
                </div>
              )}
            </div>

            {/* Payment Proof */}
            <div className="bg-bg-secondary rounded-2xl p-6 border border-border">
              <h3 className="text-lg font-bold text-text-primary mb-4">Payment Proof</h3>
              {payment.picture_path ? (
                <div className="space-y-4">
                  <img
                    src={payment.picture_path}
                    alt="Payment proof"
                    className="w-full max-w-md rounded-lg border border-border cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(payment.picture_path, '_blank')}
                  />
                  <p className="text-sm text-text-secondary">
                    Click the image to view in full size
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CreditCard size={48} className="text-text-muted mx-auto mb-4" />
                  <p className="text-text-secondary">No payment proof image available</p>
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
                    <p className="font-medium text-text-primary">{payment.user?.name || 'Unknown User'}</p>
                    <p className="text-sm text-text-secondary">User ID: {payment.user_uuid.slice(0, 8)}...</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-text-muted" />
                  <p className="text-text-primary">{payment.user?.email || 'No email'}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            {!payment.is_approved && (
              <div className="bg-bg-secondary rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-bold text-text-primary mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setApproveConfirm(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isApproving || isDeleting}
                  >
                    <CheckCircle size={20} />
                    {isApproving ? 'Approving...' : 'Approve Payment'}
                  </button>

                  <button
                    onClick={() => setDeleteConfirm(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isApproving || isDeleting}
                  >
                    <Trash2 size={20} />
                    {isDeleting ? 'Deleting...' : 'Delete Payment'}
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
                    payment.is_approved ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {payment.is_approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Created:</span>
                  <span className="text-text-primary">{formatDate(payment.created_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Updated:</span>
                  <span className="text-text-primary">{formatDate(payment.updated_at)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modals */}
        {approveConfirm && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-bg-secondary rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Confirm Payment Approval
              </h3>
              <p className="text-text-secondary mb-4">
                Are you sure you want to approve this payment of <strong>${payment.amount}</strong> from <strong>{payment.user?.name}</strong>?
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-green-800">
                  <strong>Note:</strong> This will add ${payment.amount} to the user's account balance.
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setApproveConfirm(false)}
                  className="flex-1 px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors disabled:opacity-50"
                  disabled={isApproving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprove}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={isApproving}
                >
                  {isApproving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Approving...
                    </>
                  ) : (
                    'Approve Payment'
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
                Confirm Payment Deletion
              </h3>
              <p className="text-text-secondary mb-4">
                Are you sure you want to delete this payment of <strong>${payment.amount}</strong> from <strong>{payment.user?.name}</strong>?
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
                    'Delete Payment'
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

export default PaymentDetail;
