import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ustd,bigcoin,Ethereum} from '../../../../assets/images'

const rechargeMethods = [
  { id: 'USDT', name: 'USDT', icon: <img src={ustd} alt="USDT" /> },
  { id: 'Ethereum', name: 'Ethereum', icon: <img src={Ethereum} alt="Ethereum" /> },
  { id: 'Bigcoin', name: 'Bigcoin', icon: <img src={bigcoin} alt="Bigcoin" /> },

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
    
    // Navigate to payment page with method and amount
    navigate('/v/payment', {
      state: {
        method: selectedMethod,
        amount: amount
      }
    });
  };

  return (
    <div className="min-h-screen bg-bg-main p-6 max-w-xl mx-auto text-text-secondary">
      <h1 className="text-3xl font-bold text-accent-cyan mb-6">Recharge Account</h1>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-text-primary">Amount to Recharge</label>
        <input
          type="number"
          min="1"
          className="w-full p-3 rounded-lg bg-bg-tertiary text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
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
        disabled={!amount || !selectedMethod}
        onClick={handleRecharge}
        className={`mt-8 w-full py-3 rounded-xl font-semibold transition ${
          amount && selectedMethod
            ? 'bg-cyan-500 hover:bg-cyan-600 text-text-primary shadow-lg'
            : 'bg-bg-tertiary text-gray-500 cursor-not-allowed'
        }`}
      >
        Recharge Now
      </button>
    </div>
  );
};

export default Recharge;
