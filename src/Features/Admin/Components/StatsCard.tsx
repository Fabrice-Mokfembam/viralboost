import React from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  className = '',
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      default:
        return 'text-text-muted';
    }
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
        </svg>
      );
    } else if (changeType === 'negative') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
        </svg>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className={`bg-bg-secondary rounded-lg p-6 ${className}`}
      whileHover={{ 
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center">
        <motion.div 
          className="flex-shrink-0"
          whileHover={{ rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-12 h-12 bg-accent-cyan bg-opacity-10 rounded-lg flex items-center justify-center text-accent-cyan">
            {icon}
          </div>
        </motion.div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <div className="flex items-baseline">
            <motion.p 
              className="text-2xl font-semibold text-text-primary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {value}
            </motion.p>
            {change !== undefined && change !== 0 && (
              <motion.div 
                className={`ml-2 flex items-center ${getChangeColor()}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                {getChangeIcon()}
                <span className="text-sm font-medium ml-1">
                  {Math.abs(change)}%
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
