import React, { useState } from 'react';
import { 
  CheckCircle, 
  UserPlus, 
  AlertTriangle, 
  DollarSign, 
  Bell, 
  Eye, 

  Filter, 
  Search,
  Calendar,

  Users,
  Shield,

  Activity
} from 'lucide-react';
import type { Notification } from '../../Types';

// Dummy notification data
const dummyNotifications: Notification[] = [
  {
    id: '1',
    type: 'task_completed',
    title: 'Task Completed',
    message: 'Instagram Like task has been completed successfully',
    userId: 'user1',
    userName: 'john_doe',
    taskId: 'task1',
    taskTitle: 'Like Instagram Post - @fashionbrand',
    amount: 2.50,
    status: 'unread',
    priority: 'medium',
    createdAt: '2024-01-15T14:30:00Z',
    metadata: {
      platform: 'Instagram',
      taskType: 'like',
      completedAt: '2024-01-15T14:25:00Z',
      rewardAmount: 2.50
    }
  },
  {
    id: '2',
    type: 'task_completed',
    title: 'Task Completed',
    message: 'YouTube Subscribe task has been completed',
    userId: 'user2',
    userName: 'jane_smith',
    taskId: 'task2',
    taskTitle: 'Subscribe to Tech Channel - @techreviews',
    amount: 5.00,
    status: 'unread',
    priority: 'high',
    createdAt: '2024-01-15T13:45:00Z',
    metadata: {
      platform: 'YouTube',
      taskType: 'subscribe',
      completedAt: '2024-01-15T13:40:00Z',
      rewardAmount: 5.00
    }
  },
  {
    id: '3',
    type: 'user_registered',
    title: 'New User Registration',
    message: 'A new user has registered on the platform',
    userId: 'user3',
    userName: 'mike_wilson',
    status: 'read',
    priority: 'low',
    createdAt: '2024-01-15T12:15:00Z',
    readAt: '2024-01-15T12:20:00Z',
    metadata: {
      registrationMethod: 'email',
      membershipTier: 'basic'
    }
  },
  {
    id: '4',
    type: 'task_completed',
    title: 'Task Completed',
    message: 'TikTok Follow task has been completed',
    userId: 'user4',
    userName: 'sarah_jones',
    taskId: 'task3',
    taskTitle: 'Follow TikTok Creator - @dancequeen',
    amount: 3.75,
    status: 'unread',
    priority: 'medium',
    createdAt: '2024-01-15T11:20:00Z',
    metadata: {
      platform: 'TikTok',
      taskType: 'follow',
      completedAt: '2024-01-15T11:15:00Z',
      rewardAmount: 3.75
    }
  },
  {
    id: '5',
    type: 'withdrawal_requested',
    title: 'Withdrawal Request',
    message: 'User has requested a withdrawal',
    userId: 'user5',
    userName: 'alex_brown',
    amount: 25.00,
    status: 'unread',
    priority: 'high',
    createdAt: '2024-01-15T10:30:00Z',
    metadata: {
      withdrawalMethod: 'PayPal',
      accountEmail: 'alex.brown@email.com'
    }
  },
  {
    id: '6',
    type: 'complaint_created',
    title: 'New Complaint',
    message: 'A user has submitted a complaint',
    userId: 'user6',
    userName: 'emma_davis',
    status: 'read',
    priority: 'medium',
    createdAt: '2024-01-15T09:45:00Z',
    readAt: '2024-01-15T10:00:00Z',
    metadata: {
      complaintType: 'task_issue',
      severity: 'medium'
    }
  },
  {
    id: '7',
    type: 'task_completed',
    title: 'Task Completed',
    message: 'Twitter Retweet task has been completed',
    userId: 'user7',
    userName: 'david_lee',
    taskId: 'task4',
    taskTitle: 'Retweet Tech News - @technews',
    amount: 1.25,
    status: 'unread',
    priority: 'low',
    createdAt: '2024-01-15T08:15:00Z',
    metadata: {
      platform: 'Twitter',
      taskType: 'retweet',
      completedAt: '2024-01-15T08:10:00Z',
      rewardAmount: 1.25
    }
  },
  {
    id: '8',
    type: 'system_alert',
    title: 'System Alert',
    message: 'High server load detected',
    status: 'unread',
    priority: 'urgent',
    createdAt: '2024-01-15T07:30:00Z',
    metadata: {
      alertType: 'performance',
      serverLoad: '85%'
    }
  }
];

const NotificationsManagement: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'task_completed' | 'user_registered' | 'complaint_created' | 'withdrawal_requested' | 'system_alert'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task_completed':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'user_registered':
        return <UserPlus size={20} className="text-blue-500" />;
      case 'complaint_created':
        return <AlertTriangle size={20} className="text-orange-500" />;
      case 'withdrawal_requested':
        return <DollarSign size={20} className="text-purple-500" />;
      case 'system_alert':
        return <Shield size={20} className="text-red-500" />;
      default:
        return <Bell size={20} className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-red-500 bg-red-50/10';
      case 'high':
        return 'border-l-orange-500 bg-orange-50/10';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50/10';
      case 'low':
        return 'border-l-green-500 bg-green-50/10';
      default:
        return 'border-l-gray-500 bg-gray-50/10';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'task_completed':
        return 'text-green-600 bg-green-100';
      case 'user_registered':
        return 'text-blue-600 bg-blue-100';
      case 'complaint_created':
        return 'text-orange-600 bg-orange-100';
      case 'withdrawal_requested':
        return 'text-purple-600 bg-purple-100';
      case 'system_alert':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, status: 'read' as const, readAt: new Date().toISOString() }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.status === 'unread'
          ? { ...notification, status: 'read' as const, readAt: new Date().toISOString() }
          : notification
      )
    );
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || notification.status === filter;
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    const matchesSearch = searchTerm === '' || 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.userName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesType && matchesSearch;
  });

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Notifications</h1>
          <p className="text-text-secondary mt-1">
            Manage system notifications and alerts ({filteredNotifications.length} total, {unreadCount} unread)
          </p>
        </div>
        <div className="flex gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-accent-cyan text-text-primary rounded-lg hover:bg-cyan-600 transition-colors"
            >
              <Eye size={16} />
              Mark All as Read
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-bg-secondary rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" size={20} />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-bg-main border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 bg-bg-main border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-3 py-2 bg-bg-main border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          >
            <option value="all">All Types</option>
            <option value="task_completed">Task Completed</option>
            <option value="user_registered">User Registered</option>
            <option value="complaint_created">Complaints</option>
            <option value="withdrawal_requested">Withdrawals</option>
            <option value="system_alert">System Alerts</option>
          </select>

          {/* Filter Button */}
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Filter size={20} />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-bg-secondary rounded-lg border-l-4 p-6 transition-all duration-200 hover:shadow-lg ${
              notification.status === 'unread' 
                ? 'border-l-accent-cyan bg-gradient-to-r from-cyan-500/5 to-transparent' 
                : getPriorityColor(notification.priority)
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                {/* Icon */}
                <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {notification.title}
                    </h3>
                    {notification.status === 'unread' && (
                      <div className="w-2 h-2 bg-accent-cyan rounded-full"></div>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                      {notification.type.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <p className="text-text-muted mb-3">{notification.message}</p>

                  {/* Task Details for Task Completed notifications */}
                  {notification.type === 'task_completed' && notification.metadata && (
                    <div className="bg-bg-main/50 rounded-lg p-4 mb-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-text-muted">Task Title</p>
                          <p className="font-medium text-text-primary">{notification.taskTitle}</p>
                        </div>
                      
                      </div>
                    </div>
                  )}

                  {/* User Details */}
                  {notification.userName && (
                    <div className="flex items-center gap-2 text-sm text-text-muted mb-2">
                      <Users size={16} />
                      <span>User: {notification.userName}</span>
                    </div>
                  )}

                  {/* Amount for withdrawal notifications */}
                  {notification.amount && (
                    <div className="flex items-center gap-2 text-sm text-text-muted mb-2">
                      <DollarSign size={16} />
                      <span>Amount: ${notification.amount}</span>
                    </div>
                  )}

                  {/* Timestamps */}
                  <div className="flex items-center gap-4 text-sm text-text-muted">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>Created: {formatDate(notification.createdAt)}</span>
                    </div>
                 
                    {notification.readAt && (
                      <div className="flex items-center gap-1">
                        <Eye size={16} />
                        <span>Read: {formatDate(notification.readAt)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 ml-4">
                {notification.status === 'unread' && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-2 text-accent-cyan hover:bg-cyan-500/20 rounded-lg transition-colors"
                    title="Mark as read"
                  >
                    <Eye size={16} />
                  </button>
                )}
                <button
                  className="p-2 text-text-muted hover:bg-gray-500/20 rounded-lg transition-colors"
                  title="View details"
                >
                  <Activity size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-text-muted/10 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">No notifications found</h3>
            <p className="text-text-muted">Try adjusting your search or filter criteria</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsManagement;
