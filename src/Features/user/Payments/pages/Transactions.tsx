import { useState } from 'react';
import { ArrowLeft, CreditCard, Repeat, TrendingUp, TrendingDown, X, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePayments, useDeletePayment } from '../hooks/usePayments';
import { useWithdrawals, useDeleteWithdrawal } from '../../withdrawals/hooks/useWithdrawals';
import { toast } from 'react-toastify';
import type { Payment } from '../Types';
import type { Withdrawal } from '../../withdrawals/Types';

const Transactions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'withdrawals' | 'topups'>('topups');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [modalType, setModalType] = useState<'payment' | 'withdrawal'>('payment');

  // Fetch payments and withdrawals data
  const { data: paymentsResponse, isLoading: paymentsLoading, error: paymentsError } = usePayments();
  const { data: withdrawalsResponse, isLoading: withdrawalsLoading, error: withdrawalsError } = useWithdrawals();
  const deletePaymentMutation = useDeletePayment();
  const deleteWithdrawalMutation = useDeleteWithdrawal();
  
  const payments = paymentsResponse?.data?.data || [];
  const withdrawals = withdrawalsResponse?.data?.data || [];

  const handleCancelPayment = async (paymentUuid: string) => {
    try {
      await deletePaymentMutation.mutateAsync(paymentUuid);
      toast.success('Payment cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel payment');
      console.error('Cancel payment error:', error);
    }
  };

  const handleCancelWithdrawal = async (withdrawalUuid: string) => {
    try {
      await deleteWithdrawalMutation.mutateAsync(withdrawalUuid);
      toast.success('Withdrawal cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel withdrawal');
      console.error('Cancel withdrawal error:', error);
    }
  };

  const handleViewPaymentDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setSelectedWithdrawal(null);
    setModalType('payment');
    setShowDetailsModal(true);
  };

  const handleViewWithdrawalDetails = (withdrawal: Withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setSelectedPayment(null);
    setModalType('withdrawal');
    setShowDetailsModal(true);
  };

  const getStatusColor = (isApproved: boolean, isCompleted?: boolean) => {
    if (isApproved || isCompleted) {
      return 'text-green-400 bg-green-400/20';
    } else {
      return 'text-yellow-400 bg-yellow-400/20';
    }
  };

  const getStatusText = (isApproved: boolean, isCompleted?: boolean) => {
    if (isApproved || isCompleted) {
      return 'Completed';
    } else {
      return 'Pending';
    }
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

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'bitcoin':
        return <CreditCard size={20} className="text-orange-400" />;
      case 'ethereum':
        return <CreditCard size={20} className="text-blue-400" />;
      case 'usdt':
        return <CreditCard size={20} className="text-green-400" />;
      default:
        return <CreditCard size={20} className="text-gray-400" />;
    }
  };

  if (paymentsLoading || withdrawalsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-text-primary">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (paymentsError || withdrawalsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">Error loading transactions</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/dashboard/profile')}
            className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Transactions</h1>
          <div className="w-10 h-10"></div> {/* Spacer for center alignment */}
        </div>

        {/* Tab Navigation */}
        <div className="bg-bg-secondary rounded-xl p-1 mb-6 border border-gray-700/50">
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setActiveTab('topups')}
              className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'topups'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                  : 'text-text-muted hover:text-text-primary hover:bg-bg-tertiary'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp size={18} />
                <span>Top-ups</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('withdrawals')}
              className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'withdrawals'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                  : 'text-text-muted hover:text-text-primary hover:bg-bg-tertiary'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingDown size={18} />
                <span>Withdrawals</span>
              </div>
            </button>
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          {activeTab === 'topups' ? (
            // Top-ups Tab - Show payment data
            payments.map((payment) => (
              <div
                key={payment.uuid}
                className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-500/20">
                      {getPlatformIcon(payment.platform)}
                    </div>
                    <div>
                      <p className="text-text-primary font-semibold">
                        ${parseFloat(payment.amount).toFixed(2)}
                      </p>
                      <p className="text-text-muted text-sm">{payment.platform}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.is_approved)}`}>
                      {getStatusText(payment.is_approved)}
                    </span>
                    <p className="text-text-muted text-xs mt-1">{formatDate(payment.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>ID: {payment.uuid.slice(0, 8)}...</span>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleViewPaymentDetails(payment)}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center space-x-1"
                    >
                      <Eye size={14} />
                      <span>View Details</span>
                    </button>
                    {!payment.is_approved && (
                      <button 
                        onClick={() => handleCancelPayment(payment.uuid)}
                        disabled={deletePaymentMutation.isPending}
                        className="text-red-400 hover:text-red-300 transition-colors flex items-center space-x-1 disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Withdrawals Tab - Show actual withdrawal data
            withdrawals.map((withdrawal) => (
              <div
                key={withdrawal.uuid}
                className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-red-500/20">
                      <CreditCard size={20} className="text-red-400" />
                    </div>
                    <div>
                      <p className="text-text-primary font-semibold">
                        ${parseFloat(withdrawal.withdrawal_amount).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-text-muted text-sm">{withdrawal.platform || 'Withdrawal'}</p>
                        {withdrawal.platform === 'USDT' && withdrawal.address_type && (
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            withdrawal.address_type === 'TRC20' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {withdrawal.address_type}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(false, withdrawal.is_completed)}`}>
                      {getStatusText(false, withdrawal.is_completed)}
                    </span>
                    <p className="text-text-muted text-xs mt-1">{formatDate(withdrawal.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>ID: {withdrawal.uuid.slice(0, 8)}...</span>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleViewWithdrawalDetails(withdrawal)}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center space-x-1"
                    >
                      <Eye size={14} />
                      <span>View Details</span>
                    </button>
                    {!withdrawal.is_completed && (
                      <button 
                        onClick={() => handleCancelWithdrawal(withdrawal.uuid)}
                        disabled={deleteWithdrawalMutation.isPending}
                        className="text-red-400 hover:text-red-300 transition-colors flex items-center space-x-1 disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Empty State */}
        {((activeTab === 'topups' ? payments : withdrawals).length === 0) && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === 'topups' ? (
                <Repeat size={32} className="text-gray-500" />
              ) : (
                <CreditCard size={32} className="text-gray-500" />
              )}
            </div>
            <h3 className="text-text-primary font-semibold mb-2">No {activeTab} found</h3>
            <p className="text-text-muted text-sm">
              You haven't made any {activeTab} yet.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          {activeTab === 'topups' ? (
            <button
              onClick={() => navigate('/v/recharge')}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Add Funds
            </button>
          ) : (
            <button
              onClick={() => navigate('/v/withdraw')}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Request Withdrawal
            </button>
          )}
        </div>
      </div>

      {/* Transaction Details Modal */}
      {showDetailsModal && (selectedPayment || selectedWithdrawal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-bg-secondary rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary">
                {modalType === 'payment' ? 'Payment Details' : 'Withdrawal Details'}
              </h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <X size={16} className="text-text-primary" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Transaction Image */}
              {(selectedPayment?.picture_path || selectedWithdrawal?.picture_path) && (
                <div>
                  <h3 className="text-text-primary font-semibold mb-2">
                    {modalType === 'payment' ? 'Payment Proof' : 'Withdrawal Proof'}
                  </h3>
                  <img
                    src={selectedPayment?.picture_path || selectedWithdrawal?.picture_path}
                    alt={modalType === 'payment' ? 'Payment proof' : 'Withdrawal proof'}
                    className="w-full rounded-lg border border-gray-600"
                  />
                </div>
              )}

              {/* Transaction Info */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-muted">Amount:</span>
                  <span className="text-text-primary font-semibold">
                    ${parseFloat(
                      modalType === 'payment' 
                        ? selectedPayment?.amount || '0' 
                        : selectedWithdrawal?.withdrawal_amount || '0'
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Platform:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-text-primary">
                      {modalType === 'payment' 
                        ? selectedPayment?.platform 
                        : selectedWithdrawal?.platform || 'Withdrawal'}
                    </span>
                    {modalType === 'withdrawal' && selectedWithdrawal?.platform === 'USDT' && selectedWithdrawal?.address_type && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        selectedWithdrawal.address_type === 'TRC20' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {selectedWithdrawal.address_type}
                      </span>
                    )}
                  </div>
                </div>
                {modalType === 'withdrawal' && selectedWithdrawal?.wallet_address && (
                  <div className="flex justify-between">
                    <span className="text-text-muted">Wallet Address:</span>
                    <span className="text-text-primary font-mono text-xs break-all max-w-48 text-right">
                      {selectedWithdrawal.wallet_address}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-text-muted">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    modalType === 'payment' 
                      ? getStatusColor(selectedPayment?.is_approved || false)
                      : getStatusColor(false, selectedWithdrawal?.is_completed || false)
                  }`}>
                    {modalType === 'payment' 
                      ? getStatusText(selectedPayment?.is_approved || false)
                      : getStatusText(false, selectedWithdrawal?.is_completed || false)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Created:</span>
                  <span className="text-text-primary">
                    {formatDate(
                      modalType === 'payment' 
                        ? selectedPayment?.created_at || '' 
                        : selectedWithdrawal?.created_at || ''
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Updated:</span>
                  <span className="text-text-primary">
                    {formatDate(
                      modalType === 'payment' 
                        ? selectedPayment?.updated_at || '' 
                        : selectedWithdrawal?.updated_at || ''
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Transaction ID:</span>
                  <span className="text-text-primary font-mono text-xs">
                    {modalType === 'payment' 
                      ? selectedPayment?.uuid 
                      : selectedWithdrawal?.uuid}
                  </span>
                </div>
              </div>

              {/* Description */}
              {selectedPayment?.description && (
                <div>
                  <h3 className="text-text-primary font-semibold mb-2">Description</h3>
                  <p className="text-text-muted text-sm">
                    {selectedPayment.description}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                {modalType === 'payment' ? (
                  !selectedPayment?.is_approved && (
                    <button
                      onClick={() => {
                        handleCancelPayment(selectedPayment?.uuid || '');
                        setShowDetailsModal(false);
                      }}
                      disabled={deletePaymentMutation.isPending}
                      className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                      <Trash2 size={16} />
                      <span>Cancel Payment</span>
                    </button>
                  )
                ) : (
                  !selectedWithdrawal?.is_completed && (
                    <button
                      onClick={() => {
                        handleCancelWithdrawal(selectedWithdrawal?.uuid || '');
                        setShowDetailsModal(false);
                      }}
                      disabled={deleteWithdrawalMutation.isPending}
                      className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                      <Trash2 size={16} />
                      <span>Cancel Withdrawal</span>
                    </button>
                  )
                )}
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;