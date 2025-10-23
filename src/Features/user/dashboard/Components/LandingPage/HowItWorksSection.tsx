import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Target, 
  Camera, 
  DollarSign, 
  ArrowRight,
  CheckCircle,
  Smartphone,
  Clock,
  Play
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signup, account, tasksteps, withdrawal, general } from '../../../../../assets/images';

const HowItWorksSection: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      icon: <UserPlus size={32} className="text-cyan-400" />,
      title: "Sign Up & Verify",
      description: "Create your account in seconds and verify your email. No complex verification process required.",
      details: ["Quick registration", "Email verification", "Profile setup"],
      color: "from-cyan-500 to-blue-500",
      image: signup
    },
    {
      number: "02", 
      icon: <Target size={32} className="text-green-400" />,
      title: "Choose Your Tasks",
      description: "Browse available tasks from various social media platforms. Each task shows clear instructions and rewards.",
      details: ["Browse task list", "Read instructions", "Check rewards"],
      color: "from-green-500 to-emerald-500",
      image: account
    },
    {
      number: "03",
      icon: <Camera size={32} className="text-purple-400" />,
      title: "Complete & Submit",
      description: "Follow the task instructions, take a screenshot as proof, and submit your completion for review.",
      details: ["Follow instructions", "Take screenshot", "Submit proof"],
      color: "from-purple-500 to-pink-500",
      image: tasksteps
    },
    {
      number: "04",
      icon: <DollarSign size={32} className="text-yellow-400" />,
      title: "Get Paid Instantly",
      description: "Once approved, your earnings are added to your balance. Withdraw anytime via crypto or bank transfer.",
      details: ["Instant approval", "Balance updated", "Withdraw funds"],
      color: "from-yellow-500 to-orange-500",
      image: withdrawal
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

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-bg-secondary/50 to-bg-tertiary/50">
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
            <Clock size={20} className="text-cyan-400" />
            <span className="text-cyan-300 font-semibold text-sm">Simple Process</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 bg-gradient-to-r from-text-primary to-cyan-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Start generating passive income in just 4 simple steps. No experience needed - 
            just follow the instructions and build your income stream!
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
            >
              {/* Content */}
              <div className="flex-1">
                <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-3xl p-8 border border-gray-700/50 backdrop-blur-sm">
                  {/* Step Number */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl`}>
                      {step.number}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-text-primary mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-text-muted text-lg mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-3">
                        <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                        <span className="text-text-secondary">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visual */}
              <div className="flex-1 flex justify-center">
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-3xl border border-gray-700/50 backdrop-blur-sm overflow-hidden"
                  >
                    <img 
                      src={step.image} 
                      alt={`Step ${step.number}: ${step.title}`}
                      className="w-full h-full object-cover rounded-3xl"
                    />
                    {/* Overlay with step info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl flex items-end">
                      <div className="p-6 w-full">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 bg-gradient-to-r ${step.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                            {step.number}
                          </div>
                          <span className="text-white font-semibold text-lg">{step.title}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ 
                      y: [-10, 10, -10],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-500/30 rounded-full blur-sm"
                  />
                  <motion.div
                    animate={{ 
                      y: [10, -10, 10],
                      rotate: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500/30 rounded-full blur-sm"
                  />
                </div>
              </div>

              {/* Arrow (except for last step) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -translate-y-8">
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center"
                  >
                    <ArrowRight size={16} className="text-white rotate-90" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Promotional Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 bg-gradient-to-r from-text-primary to-cyan-400 bg-clip-text text-transparent">
              See It In Action
            </h3>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Watch how easy it is to start generating passive income with our platform
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-3xl border border-gray-700/50 backdrop-blur-sm overflow-hidden"
            >
              <img 
                src={general} 
                alt="Platform Overview"
                className="w-full h-96 object-cover"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  <Play size={32} className="text-white ml-1" />
                </motion.button>
              </div>
              
              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                <h4 className="text-white font-bold text-xl mb-2">Platform Overview</h4>
                <p className="text-gray-300 text-sm">See how our platform works in just 2 minutes</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-3xl p-8 border border-cyan-500/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Ready to Start Passive Income?
            </h3>
            <p className="text-text-muted mb-6">
              Join thousands of users who are already building their passive income streams.
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-3xl flex items-center gap-3 mx-auto"
            >
              <Smartphone size={24} />
              Start Generating Income
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
