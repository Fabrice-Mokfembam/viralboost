import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  Target, 
  TrendingUp,
  Clock,
  Shield,
  Globe,
  Zap
} from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: <Users size={40} className="text-cyan-400" />,
      number: "50,000+",
      label: "Active Users",
      description: "Growing community of earners",
      color: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/30"
    },
    {
      icon: <DollarSign size={40} className="text-green-400" />,
      number: "$2M+",
      label: "Total Paid Out",
      description: "Real money earned by users",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30"
    },
    {
      icon: <Target size={40} className="text-purple-400" />,
      number: "1M+",
      label: "Tasks Completed",
      description: "Successful task submissions",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30"
    },
    {
      icon: <TrendingUp size={40} className="text-yellow-400" />,
      number: "98%",
      label: "Success Rate",
      description: "Task completion accuracy",
      color: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30"
    },
    {
      icon: <Clock size={40} className="text-blue-400" />,
      number: "< 2min",
      label: "Average Task Time",
      description: "Quick and easy completion",
      color: "from-blue-500/20 to-indigo-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      icon: <Shield size={40} className="text-red-400" />,
      number: "100%",
      label: "Secure Platform",
      description: "Bank-level security",
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
            <TrendingUp size={20} className="text-cyan-400" />
            <span className="text-cyan-300 font-semibold text-sm">Platform Statistics</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 bg-gradient-to-r from-text-primary to-cyan-400 bg-clip-text text-transparent">
            Trusted by Thousands
          </h2>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Our platform has processed millions of tasks and paid out millions in rewards. 
            Join the growing community of successful ViralBoast earners.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
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
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative z-10 text-center">
                {/* Icon */}
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  style={{ animationDelay: `${index * 0.2}s` }}
                  className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300"
                >
                  {stat.icon}
                </motion.div>

                {/* Number */}
                <motion.h3
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl font-bold text-text-primary mb-2 group-hover:text-cyan-400 transition-colors"
                >
                  {stat.number}
                </motion.h3>

                {/* Label */}
                <h4 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-cyan-400 transition-colors">
                  {stat.label}
                </h4>

                {/* Description */}
                <p className="text-text-muted group-hover:text-text-secondary transition-colors">
                  {stat.description}
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
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-3xl p-8 border border-cyan-500/20 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <Globe size={32} className="text-green-400" />
                </div>
                <h4 className="text-lg font-bold text-text-primary mb-2">Global Reach</h4>
                <p className="text-text-muted text-sm">Available in 50+ countries worldwide</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <Zap size={32} className="text-blue-400" />
                </div>
                <h4 className="text-lg font-bold text-text-primary mb-2">Instant Processing</h4>
                <p className="text-text-muted text-sm">Tasks approved within minutes</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <Shield size={32} className="text-purple-400" />
                </div>
                <h4 className="text-lg font-bold text-text-primary mb-2">Secure Payments</h4>
                <p className="text-text-muted text-sm">Encrypted transactions & data protection</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
