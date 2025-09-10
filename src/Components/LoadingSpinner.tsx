import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-secondary">
      <Loader2 className={`animate-spin text-cyan-500 ${sizeClasses[size]}`} />
      {text && (
        <p className="mt-4 text-text-muted text-sm">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
