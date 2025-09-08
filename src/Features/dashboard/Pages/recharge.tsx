import React, { useState } from 'react';
import { CreditCard,  Wallet, Banknote } from 'lucide-react';

const rechargeMethods = [
  { id: 'paypal', name: 'PayPal', icon: <Wallet size={28} /> },
  { id: 'bank', name: 'Bank Transfer', icon: <Banknote size={28} /> },
  { id: 'card', name: 'Debit/Credit Card', icon: <CreditCard size={28} /> },
];

const Recharge = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState('');

  const handleRecharge = () => {
    alert(`Recharge of $${amount} via ${selectedMethod} requested.`);
    // Add actual recharge logic
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 max-w-xl mx-auto text-gray-300">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">Recharge Account</h1>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-white">Amount to Recharge</label>
        <input
          type="number"
          min="1"
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div>
        <p className="mb-4 font-semibold text-white">Select Payment Method</p>
        <div className="flex space-x-4">
          {rechargeMethods.map(({ id, name, icon }) => (
            <button
              key={id}
              onClick={() => setSelectedMethod(id)}
              className={`flex-1 rounded-lg p-4 border-2 flex flex-col items-center space-y-2 focus:outline-none transition ${
                selectedMethod === id
                  ? 'border-cyan-500 bg-cyan-700 text-white'
                  : 'border-gray-700 text-gray-400 hover:border-cyan-500'
              }`}
            >
              {icon}
              <span className="font-semibold">{name}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={!amount || !selectedMethod}
        onClick={handleRecharge}
        className={`mt-8 w-full py-3 rounded-xl font-semibold transition ${
          amount && selectedMethod
            ? 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg'
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
        }`}
      >
        Recharge Now
      </button>
    </div>
  );
};

export default Recharge;
