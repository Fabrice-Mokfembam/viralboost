import { useState } from 'react';
import { useAccount } from '../../accounts';
import { useCreateWithdrawal } from '../../withdrawals';
import { ustd, bigcoin, Ethereum } from '../../../../assets/images';
import { AlertTriangle, X, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const cryptoMethods = [
  { 
    id: 'USDT', 
    name: 'USDT', 
    icon: <img src={ustd} alt="USDT" className="w-8 h-8" />,
    description: 'Tether USD'
  },
  { 
    id: 'Ethereum', 
    name: 'Ethereum', 
    icon: <img src={Ethereum} alt="Ethereum" className="w-8 h-8" />,
    description: 'Ethereum Network'
  },
  { 
    id: 'Bitcoin', 
    name: 'Bitcoin', 
    icon: <img src={bigcoin} alt="Bitcoin" className="w-8 h-8" />,
    description: 'Bitcoin Network'
  },
];

const Withdraw = () => {
  const navigate = useNavigate();
  const { data: accountResponse } = useAccount();
  const createWithdrawalMutation = useCreateWithdrawal();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const account = accountResponse?.data;
  const currentBalance = parseFloat(account?.balance || '0');
  const withdrawalAmount = parseFloat(amount || '0');

  const handleWithdraw = () => {
    if (!selectedMethod || !amount) {
      alert('Please select a withdrawal method and enter an amount');
      return;
    }

    if (withdrawalAmount < 10) {
      alert('Minimum withdrawal amount is $10');
      return;
    }

    if (withdrawalAmount > currentBalance) {
      alert('Insufficient balance. You cannot withdraw more than your current balance.');
      return;
    }

    setShowAddressModal(true);
  };

  const handleConfirmWithdrawal = async () => {
    if (!walletAddress.trim()) {
      alert('Please enter a valid wallet address');
      return;
    }

    setIsProcessing(true);
    
    try {
      await createWithdrawalMutation.mutateAsync({
        withdrawal_amount: withdrawalAmount,
        platform: selectedMethod || undefined,
        picture_path: undefined // No image required for withdrawal
      });

      toast.success('Withdrawal request submitted successfully!');
      setShowAddressModal(false);
      setWalletAddress('');
      setAmount('');
      setSelectedMethod(null);
    } catch (error: any) {
      console.error('Withdrawal submission error:', error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to submit withdrawal request. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const getSelectedMethodInfo = () => {
    return cryptoMethods.find(method => method.id === selectedMethod);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main">
      <div className="max-w-xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/v/accountdetails')}
            className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Withdraw Funds</h1>
          <div className="w-10 h-10"></div> {/* Spacer for center alignment */}
        </div>

      {/* Current Balance Display */}
      <div className="mb-6 p-4 bg-bg-secondary rounded-lg border border-border">
        <div className="flex justify-between items-center">
          <span className="text-text-primary font-semibold">Current Balance:</span>
          <span className="text-accent-cyan font-bold text-xl">${currentBalance.toFixed(2)}</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-text-primary">Amount to Withdraw</label>
        <input
          type="number"
          min="10"
          step="0.01"
          className="w-full p-3 rounded-lg bg-bg-tertiary text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Enter amount (minimum $10)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <p className="text-sm text-text-muted mt-1">Minimum withdrawal amount is $10</p>
        {withdrawalAmount > currentBalance && amount && (
          <p className="text-sm text-red-500 mt-1">Insufficient balance. Available: ${currentBalance.toFixed(2)}</p>
        )}
      </div>

      <div>
        <p className="mb-4 font-semibold text-text-primary">Select Withdrawal Method</p>
        <div className="grid grid-cols-1 gap-4">
          {cryptoMethods.map(({ id, name, icon, description }) => (
            <button
              key={id}
              onClick={() => setSelectedMethod(id)}
              className={`p-4 rounded-lg border-2 flex items-center space-x-4 focus:outline-none transition ${
                selectedMethod === id
                  ? 'border-cyan-500 bg-cyan-700 text-text-primary'
                  : 'border-gray-700 text-gray-400 hover:border-cyan-500'
              }`}
            >
              {icon}
              <div className="text-left">
                <div className="font-semibold">{name}</div>
                <div className="text-sm opacity-75">{description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={!amount || !selectedMethod || withdrawalAmount < 10 || withdrawalAmount > currentBalance}
        onClick={handleWithdraw}
        className={`mt-8 w-full py-3 rounded-xl font-semibold transition ${
          amount && selectedMethod && withdrawalAmount >= 10 && withdrawalAmount <= currentBalance
            ? 'bg-cyan-500 hover:bg-cyan-600 text-text-primary shadow-lg'
            : 'bg-bg-tertiary text-gray-500 cursor-not-allowed'
        }`}
      >
        Request Withdrawal
      </button>

      {/* Address Input Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-bg-secondary rounded-lg p-6 max-w-md w-full border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Enter Wallet Address</h3>
              <button
                onClick={() => setShowAddressModal(false)}
                className="text-text-muted hover:text-text-primary"
                disabled={isProcessing}
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                {getSelectedMethodInfo()?.icon}
                <span className="font-medium text-text-primary">
                  {getSelectedMethodInfo()?.name} Address
                </span>
              </div>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder={`Enter your ${getSelectedMethodInfo()?.name} wallet address`}
                className="w-full p-3 rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan-500"
                disabled={isProcessing}
              />
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">Important Disclaimer:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Please verify that the address is correct for {getSelectedMethodInfo()?.name}</li>
                    <li>Withdrawals are irreversible once processed</li>
                    <li>Double-check the address before confirming</li>
                    <li>We are not responsible for funds sent to incorrect addresses</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Withdrawal Summary */}
            <div className="bg-bg-main rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-text-primary mb-2">Withdrawal Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Amount:</span>
                  <span className="text-text-primary font-medium">${amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Method:</span>
                  <span className="text-text-primary font-medium">{getSelectedMethodInfo()?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Address:</span>
                  <span className="text-text-primary font-mono text-xs truncate max-w-32">
                    {walletAddress || 'Not provided'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddressModal(false)}
                className="flex-1 px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors disabled:opacity-50"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmWithdrawal}
                disabled={!walletAddress.trim() || isProcessing}
                className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} className="mr-2" />
                    Confirm Withdrawal
                  </>
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

export default Withdraw;