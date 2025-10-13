
import { CreditCard, Gift, Repeat, UserPlus, ArrowLeft, TrendingUp, DollarSign} from 'lucide-react';
import { useAccount } from '../Hooks/useAccount';
import { useNavigate } from 'react-router-dom';

const AccountDetails = () => {
  const navigate = useNavigate();
  const { data: accountResponse, isLoading, error } = useAccount();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-text-primary">Loading account details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">Error loading account details</div>
      </div>
    );
  }

  const account = accountResponse?.data;

  if (!account) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-text-primary">No account data available</div>
      </div>
    );
  }

  // Use actual account data
  const balance = parseFloat(account.balance);
  const totalIncome = parseFloat(account.total_earned);
  const referralIncome = parseFloat(account.referral_income);
  const taskIncome = totalIncome - referralIncome; // Calculate task income as total - referral
  const incomeSources = {
    referral: referralIncome,
    tasks: taskIncome,
    bonuses: parseFloat(account.total_bonus),
  };
  const totalWithdrawals = parseFloat(account.total_withdrawals);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main">
      <div className="max-w-lg mx-auto px-3 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/dashboard/profile')}
            className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Account Details</h1>
          <div className="w-10 h-10"></div> {/* Spacer for center alignment */}
        </div>

        {/* Balance Card */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-6">
          <div className="relative p-4">
            <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl flex items-center justify-center">
                    <DollarSign size={24} className="text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-text-primary">Current Balance</h2>
                    <p className="text-text-muted text-sm">Available funds</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-cyan-400">${balance.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Income Card */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-6">
          <div className="relative p-4">
            <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4 border border-green-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center">
                    <TrendingUp size={24} className="text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-text-primary">Total Income</h2>
                    <p className="text-text-muted text-sm">All time earnings</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">${totalIncome.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Income Sources */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-6">
          <div className="relative p-4">
            <h2 className="text-lg font-bold mb-4 text-cyan-400">Income Breakdown</h2>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                    <UserPlus size={24} className="text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-text-muted text-sm">Referral Income</p>
                    <p className="text-text-primary text-lg font-semibold">${incomeSources.referral.toFixed(2)}</p>
                  </div>
                  <div className="text-blue-400 font-bold text-lg">${incomeSources.referral.toFixed(2)}</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                    <Repeat size={24} className="text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-text-muted text-sm">Task Income</p>
                    <p className="text-text-primary text-lg font-semibold">${incomeSources.tasks.toFixed(2)}</p>
                  </div>
                  <div className="text-purple-400 font-bold text-lg">${incomeSources.tasks.toFixed(2)}</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-xl flex items-center justify-center">
                    <Gift size={24} className="text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-text-muted text-sm">Bonuses</p>
                    <p className="text-text-primary text-lg font-semibold">${incomeSources.bonuses.toFixed(2)}</p>
                  </div>
                  <div className="text-yellow-400 font-bold text-lg">${incomeSources.bonuses.toFixed(2)}</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl flex items-center justify-center">
                    <CreditCard size={24} className="text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-text-muted text-sm">Total Withdrawals</p>
                    <p className="text-text-primary text-lg font-semibold">${totalWithdrawals.toFixed(2)}</p>
                  </div>
                  <div className="text-red-400 font-bold text-lg">${totalWithdrawals.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <div className="relative p-4">
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => navigate('/v/withdraw')}
                className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-xl p-4 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <CreditCard size={20} className="text-white" />
                  </div>
                  <span className="text-white text-xs font-semibold">Withdraw</span>
                </div>
              </button>
              
              <button 
                onClick={() => navigate('/v/recharge')}
                className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl p-4 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <DollarSign size={20} className="text-white" />
                  </div>
                  <span className="text-white text-xs font-semibold">Recharge</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
