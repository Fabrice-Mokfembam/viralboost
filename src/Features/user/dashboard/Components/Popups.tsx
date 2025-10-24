import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Crown, TrendingUp, Gift, Star, X } from 'lucide-react';

interface Notification {
  id: string;
  name: string;
  message: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  amount?: number;
}

// 30 different names
const names = [
  'Zamni', 'James', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'John', 'Maria', 'Alex',
  'Sophie', 'Ryan', 'Jessica', 'Chris', 'Amanda', 'Daniel', 'Rachel', 'Kevin', 'Nicole', 'Mark',
  'Laura', 'Steve', 'Jennifer', 'Tom', 'Michelle', 'Paul', 'Ashley', 'Brian', 'Stephanie', 'Mike'
];

// 5 different message types
const messageTypes = [
  {
    template: (name: string) => `${name} just purchased a premium membership!`,
    icon: <Crown size={20} className="text-yellow-400" />,
    color: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/30'
  },
  {
    template: (name: string, amount?: number) => `${name} just withdrew $${amount}!`,
    icon: <DollarSign size={20} className="text-green-400" />,
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30'
  },
  {
    template: (name: string, amount?: number) => `${name} earned $${amount} from tasks today!`,
    icon: <TrendingUp size={20} className="text-blue-400" />,
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30'
  },
  {
    template: (name: string, amount?: number) => `${name} received a $${amount} bonus!`,
    icon: <Gift size={20} className="text-purple-400" />,
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30'
  },
  {
    template: (name: string, amount?: number) => `${name} completed ${amount} tasks and earned $${Math.floor(amount! * 0.5)}!`,
    icon: <Star size={20} className="text-cyan-400" />,
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/30'
  }
];

const Popups: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isActive, setIsActive] = useState(true);

  const showNotification = useCallback(() => {
    if (!isActive) return;
    
    const generateRandomNotification = (): Notification => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomMessageType = messageTypes[Math.floor(Math.random() * messageTypes.length)];
      const randomAmount = Math.floor(Math.random() * 500) + 50; // $50-$550
      
      return {
        id: Date.now().toString(),
        name: randomName,
        message: randomMessageType.template(randomName, randomAmount),
        icon: randomMessageType.icon,
        color: randomMessageType.color,
        borderColor: randomMessageType.borderColor,
        amount: randomAmount
      };
    };
    
    const notification = generateRandomNotification();
    setNotifications(prev => [...prev, notification]);

    // Remove notification after 4 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 4000);
  }, [isActive]);

  const closeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    if (!isActive) return;

    const scheduleNextNotification = () => {
      const randomDelay = Math.random() * 40000; // 0-40 seconds
      setTimeout(() => {
        showNotification();
        scheduleNextNotification();
      }, randomDelay);
    };

    // Start the first notification after a random delay
    const initialDelay = Math.random() * 10000 + 5000; // 5-15 seconds
    setTimeout(() => {
      showNotification();
      scheduleNextNotification();
    }, initialDelay);

    return () => {
      setIsActive(false);
    };
  }, [isActive, showNotification]);

  return (
    <div className="fixed left-4 top-1/2 transform translate-y-16 z-50 space-y-3">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ 
              opacity: 0, 
              x: -400, 
              scale: 0.8 
            }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1 
            }}
            exit={{ 
              opacity: 0, 
              x: -400, 
              scale: 0.8 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3 
            }}
            className={`
              bg-gradient-to-r ${notification.color} 
              backdrop-blur-md border ${notification.borderColor}
              rounded-2xl p-4 shadow-2xl max-w-sm
              border-l-4 border-l-cyan-400 relative
            `}
          >
            {/* Close Button */}
            <button
              onClick={() => closeNotification(notification.id)}
              className="absolute top-2 right-2 w-6 h-6 bg-gray-700/50 hover:bg-gray-600/70 rounded-full flex items-center justify-center transition-colors duration-200 group"
            >
              <X size={14} className="text-gray-300 group-hover:text-white" />
            </button>

            <div className="flex items-center gap-3 pr-6">
              <div className="flex-shrink-0">
                {notification.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-text-primary font-semibold text-sm leading-tight">
                  {notification.message}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-text-muted text-xs">Just now</span>
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4, ease: "linear" }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-b-2xl"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Popups;