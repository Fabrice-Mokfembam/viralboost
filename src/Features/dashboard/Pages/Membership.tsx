import React from 'react';

const memberships = [
  {
    level: 'Basic',
    price: 'Free',
    benefits: [
      'Access to daily micro-tasks',
      'Track earnings and withdraw',
      'Basic support',
    ],
    bgColor: 'bg-gray-800',
  },
  {
    level: 'Premium',
    price: '$9.99 / month',
    benefits: [
      'Higher daily task limits',
      'Priority withdrawals',
      'Exclusive bonus tasks',
      'Priority customer support',
    ],
    bgColor: 'bg-cyan-700',
  },
  {
    level: 'VIP',
    price: '$29.99 / month',
    benefits: [
      'Unlimited tasks & earnings',
      'Highest priority withdrawals',
      'Personal account manager',
      'Exclusive invites & events',
    ],
    bgColor: 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600',
  },
];

const Membership: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-4 md:p-6 flex flex-col items-center space-y-3 text-gray-300">
      <div className="border border-cyan-500 rounded-lg py-4 px-6 w-full max-w-md text-center">
        <h2 className="text-cyan-400 font-semibold text-lg mb-1">Become a Member</h2>
        <p className="text-gray-400 text-sm">
          Invite friends to join and get chances to upgrade your membership level!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0 w-full max-w-5xl md:px-2">
        {memberships.map(({ level, price, benefits, bgColor }) => (
          <div
            key={level}
            className={`${bgColor} rounded-3xl p-6 flex-1 shadow-xl border border-cyan-500 hover:scale-105 transform transition cursor-pointer`}
          >
            <h3 className="text-white font-bold text-2xl mb-3">{level}</h3>
            <p className="text-cyan-300 font-semibold text-lg mb-6">{price}</p>
            <ul className="text-gray-200 mb-6 space-y-2 list-disc list-inside">
              {benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
            <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold shadow-lg transition">
              {level === 'Basic' ? 'Current Plan' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
