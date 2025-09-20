import React from 'react';
import { Crown, Star, Zap, CheckCircle, ArrowRight, Gift, Shield, Users } from 'lucide-react';

const memberships = [
  {
    level: 'Basic',
    price: 'Free',
    originalPrice: null,
    benefits: [
      'Access to daily micro-tasks',
      'Track earnings and withdraw',
      'Basic support',
    ],
    icon: <Users size={24} className="text-gray-400" />,
    bgColor: 'from-gray-800 via-gray-700 to-gray-800',
    borderColor: 'border-gray-600',
    textColor: 'text-gray-300',
    buttonColor: 'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800',
    isPopular: false,
    isCurrent: true,
  },
  {
    level: 'Premium',
    price: '$9.99',
    originalPrice: '$14.99',
    period: '/ month',
    benefits: [
      'Higher daily task limits',
      'Priority withdrawals',
      'Exclusive bonus tasks',
      'Priority customer support',
    ],
    icon: <Star size={24} className="text-yellow-400" />,
    bgColor: 'from-cyan-600 via-cyan-700 to-cyan-800',
    borderColor: 'border-cyan-500',
    textColor: 'text-cyan-100',
    buttonColor: 'from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700',
    isPopular: true,
    isCurrent: false,
  },
  {
    level: 'VIP',
    price: '$29.99',
    originalPrice: '$39.99',
    period: '/ month',
    benefits: [
      'Unlimited tasks & earnings',
      'Highest priority withdrawals',
      'Personal account manager',
      'Exclusive invites & events',
    ],
    icon: <Crown size={24} className="text-yellow-300" />,
    bgColor: 'from-purple-600 via-pink-600 to-red-600',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-100',
    buttonColor: 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
    isPopular: false,
    isCurrent: false,
  },
];

const Membership: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-10 w-24 h-24 bg-blue-500/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-green-500/5 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 pt-8 pb-20 px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 mb-6">
            <Gift size={20} className="text-cyan-400" />
            <span className="text-cyan-300 font-semibold text-sm">Membership Plans</span>
          </div>
          <h1 className="text-4xl font-bold text-text-primary mb-4 bg-gradient-to-r from-text-primary to-cyan-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Unlock premium features and maximize your earnings with our flexible membership options
          </p>
        </div>

        {/* Membership Cards */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {memberships.map((membership) => (
              <div
                key={membership.level}
                className={`relative group ${
                  membership.isPopular ? 'lg:-mt-4 lg:mb-4' : ''
                }`}
              >
                {/* Popular Badge */}
                {membership.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                      <Zap size={16} />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Current Plan Badge */}
                {membership.isCurrent && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                      <CheckCircle size={16} />
                      Current Plan
                    </div>
                  </div>
                )}

                <div className={`relative overflow-hidden bg-gradient-to-br ${membership.bgColor} rounded-3xl p-8 shadow-2xl border-2 ${membership.borderColor} hover:scale-105 transform transition-all duration-500 group-hover:shadow-3xl`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                  <div className="relative">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {membership.icon}
                      </div>
                      <h3 className={`${membership.textColor} font-bold text-2xl mb-2`}>
                        {membership.level}
                      </h3>
                      
                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-center justify-center gap-2">
                          <span className={`${membership.textColor} text-4xl font-bold`}>
                            {membership.price}
                          </span>
                          {membership.period && (
                            <span className={`${membership.textColor} text-lg opacity-80`}>
                              {membership.period}
                            </span>
                          )}
                        </div>
                        {membership.originalPrice && (
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <span className="text-white/60 line-through text-lg">
                              {membership.originalPrice}
                            </span>
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              Save {Math.round((1 - parseFloat(membership.price.replace('$', '')) / parseFloat(membership.originalPrice.replace('$', ''))) * 100)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-8">
                      <ul className="space-y-4">
                        {membership.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle size={14} className="text-white" />
                            </div>
                            <span className={`${membership.textColor} text-sm leading-relaxed`}>
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Button */}
                    <button
                      className={`w-full bg-gradient-to-r ${membership.buttonColor} text-white py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 group`}
                    >
                      {membership.isCurrent ? (
                        <>
                          <CheckCircle size={20} />
                          Current Plan
                        </>
                      ) : (
                        <>
                          Upgrade Now
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Why Choose Our Memberships?
            </h2>
            <p className="text-text-muted text-lg">
              Get the most out of your experience with our premium features
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-cyan-500/20 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield size={24} className="text-cyan-400" />
              </div>
              <h3 className="text-text-primary font-bold text-lg mb-2">Secure & Reliable</h3>
              <p className="text-text-muted text-sm">Your earnings are protected with bank-level security</p>
            </div>

            <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-cyan-500/20 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Zap size={24} className="text-green-400" />
              </div>
              <h3 className="text-text-primary font-bold text-lg mb-2">Instant Payouts</h3>
              <p className="text-text-muted text-sm">Get your earnings instantly with priority processing</p>
            </div>

            <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-cyan-500/20 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users size={24} className="text-purple-400" />
              </div>
              <h3 className="text-text-primary font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-text-muted text-sm">Round-the-clock assistance from our expert team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
