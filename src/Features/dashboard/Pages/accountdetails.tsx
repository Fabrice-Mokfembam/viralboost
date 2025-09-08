import React from 'react';
import { CreditCard, Gift, Repeat, UserPlus } from 'lucide-react';

const AccountDetails = () => {
  // Dummy data; replace with actual fetched user data
  const balance = 350.0;
  const incomeSources = {
    referral: 120.0,
    tasks: 200.0,
    bonuses: 30.0,
  };
  const totalWithdrawals = 5;

  return (
    <div className="min-h-screen bg-gray-900 p-6 max-w-3xl mx-auto text-gray-300">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">Account Details</h1>

      <div className="bg-gray-800 p-6 rounded-2xl border border-cyan-500 shadow-xl mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Current Balance</h2>
          <p className="text-3xl font-bold text-white">${balance.toFixed(2)}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-700 rounded-xl p-4 flex items-center space-x-4">
            <UserPlus size={32} className="text-cyan-400" />
            <div>
              <p className="text-gray-400 text-sm">Referral Income</p>
              <p className="text-white text-lg font-semibold">${incomeSources.referral.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-gray-700 rounded-xl p-4 flex items-center space-x-4">
            <Repeat size={32} className="text-cyan-400" />
            <div>
              <p className="text-gray-400 text-sm">Task Income</p>
              <p className="text-white text-lg font-semibold">${incomeSources.tasks.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-gray-700 rounded-xl p-4 flex items-center space-x-4">
            <Gift size={32} className="text-cyan-400" />
            <div>
              <p className="text-gray-400 text-sm">Bonuses</p>
              <p className="text-white text-lg font-semibold">${incomeSources.bonuses.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-gray-700 rounded-xl p-4 flex items-center space-x-4">
            <CreditCard size={32} className="text-cyan-400" />
            <div>
              <p className="text-gray-400 text-sm">Total Withdrawals</p>
              <p className="text-white text-lg font-semibold">{totalWithdrawals}</p>
            </div>
          </div>
        </div>

        <button className="mt-8 w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold shadow-lg transition">
          Withdraw Funds
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
