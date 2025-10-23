import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Star, 
  Zap, 
  Crown, 
  Users, 
  ArrowRight,
  Gift,
  Shield,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingSection: React.FC = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for getting started",
      icon: <Users size={32} className="text-gray-400" />,
      bgColor: "from-gray-800 via-gray-700 to-gray-800",
      borderColor: "border-gray-600",
      textColor: "text-gray-300",
      buttonColor: "from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800",
      isPopular: false,
      features: [
        "5 tasks per day",
        "$0.50 per task",
        "Basic support",
        "Standard withdrawal",
        "Mobile app access"
      ],
      limitations: [
        "Limited task variety",
        "Standard processing time"
      ]
    },
    {
      name: "Premium",
      price: "$9.99",
      description: "Most popular choice",
      icon: <Star size={32} className="text-yellow-400" />,
      bgColor: "from-cyan-600 via-cyan-700 to-cyan-800",
      borderColor: "border-cyan-500",
      textColor: "text-cyan-100",
      buttonColor: "from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700",
      isPopular: true,
      features: [
        "15 tasks per day",
        "$1.00 per task",
        "Priority support",
        "Fast withdrawal",
        "Premium task access",
        "Referral bonuses"
      ],
      limitations: []
    },
    {
      name: "Pro",
      price: "$19.99",
      description: "For serious earners",
      icon: <Crown size={32} className="text-yellow-300" />,
      bgColor: "from-purple-600 via-pink-600 to-red-600",
      borderColor: "border-purple-500",
      textColor: "text-purple-100",
      buttonColor: "from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      isPopular: false,
      features: [
        "Unlimited tasks",
        "$1.50 per task",
        "VIP support",
        "Instant withdrawal",
        "All premium features",
        "Higher referral rewards",
        "Early access to new features"
      ],
      limitations: []
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10]
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 mb-6">
            <Gift size={20} className="text-cyan-400" />
            <span className="text-cyan-300 font-semibold text-sm">Choose Your Plan</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 bg-gradient-to-r from-text-primary to-cyan-400 bg-clip-text text-transparent">
            Flexible Pricing Plans
          </h2>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Start free and upgrade anytime. Choose the plan that fits your earning goals. 
            All plans include secure payments and 24/7 support.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className={`relative group ${
                plan.isPopular ? 'md:-mt-4 md:mb-4' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    <Zap size={16} />
                    Most Popular
                  </div>
                </motion.div>
              )}

              <div className={`relative overflow-hidden bg-gradient-to-br ${plan.bgColor} rounded-3xl p-8 shadow-2xl border-2 ${plan.borderColor} hover:scale-105 transform transition-all duration-500 group-hover:shadow-3xl`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="relative">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {plan.icon}
                    </div>
                    <h3 className={`${plan.textColor} font-bold text-2xl mb-2`}>
                      {plan.name}
                    </h3>
                    <p className={`${plan.textColor} text-sm opacity-80 mb-4`}>
                      {plan.description}
                    </p>
                    
                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-center justify-center gap-2">
                        <span className={`${plan.textColor} text-4xl font-bold`}>
                          {plan.price}
                        </span>
                        {plan.price !== "Free" && (
                          <span className={`${plan.textColor} text-lg opacity-80`}>
                            / month
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle size={14} className="text-white" />
                          </div>
                          <span className={`${plan.textColor} text-sm leading-relaxed`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => navigate('/signup')}
                    className={`w-full bg-gradient-to-r ${plan.buttonColor} text-white py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 group`}
                  >
                    {plan.price === "Free" ? "Get Started Free" : `Choose ${plan.name}`}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-3xl p-8 border border-cyan-500/20 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <Shield size={32} className="text-green-400" />
                </div>
                <h4 className="text-lg font-bold text-text-primary mb-2">Secure Payments</h4>
                <p className="text-text-muted text-sm">All transactions are encrypted and secure</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <Clock size={32} className="text-blue-400" />
                </div>
                <h4 className="text-lg font-bold text-text-primary mb-2">Cancel Anytime</h4>
                <p className="text-text-muted text-sm">No long-term commitments required</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <Gift size={32} className="text-purple-400" />
                </div>
                <h4 className="text-lg font-bold text-text-primary mb-2">Free Trial</h4>
                <p className="text-text-muted text-sm">Start with our free plan, upgrade when ready</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
