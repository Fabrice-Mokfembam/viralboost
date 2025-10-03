
import { CreditCard, Gift, Repeat, UserPlus } from 'lucide-react';
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
    <div className="min-h-screen bg-bg-main max-w-3xl mx-auto text-text-secondary">
      <h1 className="text-3xl font-bold text-accent-cyan mb-6">Account Details</h1>

      <div className="bg-bg-secondary p-6 rounded-2xl border border-cyan-500 shadow-xl mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Current Balance</h2>
          <p className="text-3xl font-bold text-text-primary">${balance.toFixed(2)}</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Total Income Earned</h2>
          <p className="text-2xl font-bold text-green-500">${totalIncome.toFixed(2)}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-bg-tertiary rounded-xl p-4 flex items-center space-x-4">
            <UserPlus size={32} className="text-accent-cyan" />
            <div>
              <p className="text-text-muted text-sm">Referral Income</p>
              <p className="text-text-primary text-lg font-semibold">${incomeSources.referral.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-gray-700 rounded-xl p-4 flex items-center space-x-4">
            <Repeat size={32} className="text-accent-cyan" />
            <div>
              <p className="text-text-muted text-sm">Task Income</p>
              <p className="text-text-primary text-lg font-semibold">${incomeSources.tasks.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-gray-700 rounded-xl p-4 flex items-center space-x-4">
            <Gift size={32} className="text-accent-cyan" />
            <div>
              <p className="text-text-muted text-sm">Bonuses</p>
              <p className="text-text-primary text-lg font-semibold">${incomeSources.bonuses.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-gray-700 rounded-xl p-4 flex items-center space-x-4">
            <CreditCard size={32} className="text-accent-cyan" />
            <div>
              <p className="text-text-muted text-sm">Total Withdrawals</p>
              <p className="text-text-primary text-lg font-semibold">{totalWithdrawals}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/v/withdraw')}
          className="mt-8 w-full bg-cyan-500 hover:bg-cyan-600 text-text-primary py-3 rounded-xl font-semibold shadow-lg transition"
        >
          Withdraw Funds
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
