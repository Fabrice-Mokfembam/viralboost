import React from 'react';

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
    <div className={`bg-bg-secondary rounded-lg p-6 ${className}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-accent-cyan bg-opacity-10 rounded-lg flex items-center justify-center text-accent-cyan">
            {icon}
          </div>
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-text-primary">{value}</p>
            {change !== undefined && change !== 0 && (
              <div className={`ml-2 flex items-center ${getChangeColor()}`}>
                {getChangeIcon()}
                <span className="text-sm font-medium ml-1">
                  {Math.abs(change)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
