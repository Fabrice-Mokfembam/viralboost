import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ustd,bigcoin,Ethereum} from '../../../../assets/images'
import { ArrowLeft } from 'lucide-react';

const rechargeMethods = [
  { id: 'USDT', name: 'USDT', icon: <img src={ustd} alt="USDT" /> },
  { id: 'Ethereum', name: 'Ethereum', icon: <img src={Ethereum} alt="Ethereum" /> },
  { id: 'Bitcoin', name: 'Bitcoin', icon: <img src={bigcoin} alt="Bitcoin" /> },

];

const Recharge = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState('');

  const handleRecharge = () => {
    if (!selectedMethod || !amount) {
      alert('Please select a payment method and enter an amount');
      return;
    }
    
    const amountValue = parseFloat(amount);
    if (amountValue < 10) {
      alert('Minimum recharge amount is $10');
      return;
    }
    
    // Navigate to payment page with method and amount
    navigate('/v/payment', {
      state: {
        method: selectedMethod,
        amount: amount
      }
    });
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
          <h1 className="text-2xl font-bold text-text-primary">Recharge Account</h1>
          <div className="w-10 h-10"></div> {/* Spacer for center alignment */}
        </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-text-primary">Amount to Recharge</label>
        <input
          type="number"
          min="10"
          step="0.01"
          className="w-full p-3 rounded-lg bg-bg-tertiary text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Enter amount (minimum $10)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <p className="text-sm text-text-muted mt-1">Minimum recharge amount is $10</p>
      </div>

      <div>
        <p className="mb-4 font-semibold text-text-primary">Select Payment Method</p>
        <div className="flex space-x-4">
          {rechargeMethods.map(({ id, name, icon }) => (
            <button
              key={id}
              onClick={() => setSelectedMethod(id)}
              className={`flex-1 rounded-lg p-4 border-2 flex flex-col items-center space-y-2 focus:outline-none transition ${
                selectedMethod === id
                  ? 'border-cyan-500 bg-cyan-700 text-text-primary'
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
        disabled={!amount || !selectedMethod || parseFloat(amount) < 10}
        onClick={handleRecharge}
        className={`mt-8 w-full py-3 rounded-xl font-semibold transition ${
          amount && selectedMethod && parseFloat(amount) >= 10
            ? 'bg-cyan-500 hover:bg-cyan-600 text-text-primary shadow-lg'
            : 'bg-bg-tertiary text-gray-500 cursor-not-allowed'
        }`}
      >
        Recharge Now
      </button>
      </div>
    </div>
  );
};

export default Recharge;
