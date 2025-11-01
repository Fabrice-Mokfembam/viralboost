import React from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  DollarSign, 
  Shield, 
  Zap, 
  Users, 
  Clock, 
  CheckCircle, 
  CreditCard,
  Target,
  TrendingUp
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Smartphone size={32} className="text-cyan-400" />,
      title: "Easy Mobile Tasks",
      description: "Complete simple tasks like liking videos, subscribing to channels, and following accounts directly from your phone.",
      color: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/30"
    },
    {
      icon: <DollarSign size={32} className="text-green-400" />,
      title: "Instant Payments",
      description: "Get paid immediately after completing tasks. Withdraw your earnings via USDT, Bitcoin, or Ethereum.",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30"
    },
    {
      icon: <Shield size={32} className="text-purple-400" />,
      title: "Secure Platform",
      description: "Your data and earnings are protected with bank-level security and encrypted transactions.",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30"
    },
    {
      icon: <Zap size={32} className="text-yellow-400" />,
      title: "Quick Tasks",
      description: "Most tasks take less than 2 minutes to complete. Earn money in your spare time.",
      color: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30"
    },
    {
      icon: <Users size={32} className="text-blue-400" />,
      title: "Referral Rewards",
      description: "Invite friends and earn bonus rewards when they join and complete their first tasks.",
      color: "from-blue-500/20 to-indigo-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      icon: <Clock size={32} className="text-red-400" />,
      title: "24/7 Availability",
      description: "Access tasks anytime, anywhere. Work on your own schedule and earn at your own pace.",
      color: "from-red-500/20 to-rose-500/20",
      borderColor: "border-red-500/30"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
            <CheckCircle size={20} className="text-cyan-400" />
            <span className="text-cyan-300 font-semibold text-sm">Why Choose ViralBoast</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 bg-gradient-to-r from-text-primary to-cyan-400 bg-clip-text text-transparent">
            Everything You Need to
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Earn with ViralBoast
            </span>
          </h2>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Our platform makes it incredibly easy to earn from social media engagement. 
            No special skills required - just follow simple instructions and build your income stream!
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group relative overflow-hidden bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-3xl p-8 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300">
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-text-muted leading-relaxed group-hover:text-text-secondary transition-colors">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-3xl p-8 border border-cyan-500/20 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Target size={24} className="text-green-400" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-bold text-text-primary">Multiple Platforms</h4>
                  <p className="text-text-muted text-sm">YouTube, Instagram, TikTok, Twitter & More</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <CreditCard size={24} className="text-blue-400" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-bold text-text-primary">Flexible Payments</h4>
                  <p className="text-text-muted text-sm">USDT, Bitcoin, Ethereum Support</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp size={24} className="text-purple-400" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-bold text-text-primary">Growing Community</h4>
                  <p className="text-text-muted text-sm">Join thousands of active earners</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
