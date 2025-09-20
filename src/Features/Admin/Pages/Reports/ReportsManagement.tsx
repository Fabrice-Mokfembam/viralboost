import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle, 
  Download, 
  Eye,
  BarChart3,
  Activity,
  Target,
  Clock,
  Star,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface ReportData {
  id: string;
  title: string;
  period: 'weekly' | 'monthly' | 'yearly';
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  description: string;
}

const ReportsManagement: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  const reportData: ReportData[] = [
    {
      id: '1',
      title: 'Total Revenue',
      period: 'monthly',
      value: 125430.50,
      change: 12.5,
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/20',
      description: 'Total revenue generated this month'
    },
    {
      id: '2',
      title: 'Active Users',
      period: 'monthly',
      value: 2847,
      change: 8.2,
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20',
      description: 'Users who completed at least one task'
    },
    {
      id: '3',
      title: 'Tasks Completed',
      period: 'monthly',
      value: 15623,
      change: 15.3,
      changeType: 'increase',
      icon: CheckCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/20',
      description: 'Total tasks completed by users'
    },
    {
      id: '4',
      title: 'Conversion Rate',
      period: 'monthly',
      value: 23.7,
      change: -2.1,
      changeType: 'decrease',
      icon: Target,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/20',
      description: 'Percentage of visitors who become users'
    },
    {
      id: '5',
      title: 'Average Task Value',
      period: 'monthly',
      value: 8.03,
      change: 5.2,
      changeType: 'increase',
      icon: Star,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/20',
      description: 'Average reward per completed task'
    },
    {
      id: '6',
      title: 'Support Tickets',
      period: 'monthly',
      value: 142,
      change: -18.5,
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/20',
      description: 'Total support tickets received'
    }
  ];

  const weeklyData: ReportData[] = [
    {
      id: '1',
      title: 'Weekly Revenue',
      period: 'weekly',
      value: 31250.75,
      change: 7.8,
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/20',
      description: 'Revenue generated this week'
    },
    {
      id: '2',
      title: 'New Users',
      period: 'weekly',
      value: 234,
      change: 12.4,
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20',
      description: 'New user registrations this week'
    },
    {
      id: '3',
      title: 'Tasks Completed',
      period: 'weekly',
      value: 3892,
      change: 22.1,
      changeType: 'increase',
      icon: CheckCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/20',
      description: 'Tasks completed this week'
    },
    {
      id: '4',
      title: 'User Retention',
      period: 'weekly',
      value: 78.3,
      change: 3.2,
      changeType: 'increase',
      icon: Target,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/20',
      description: 'Percentage of users who returned'
    },
    {
      id: '5',
      title: 'Peak Activity',
      period: 'weekly',
      value: 14.5,
      change: 0,
      changeType: 'neutral',
      icon: Clock,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/20',
      description: 'Peak activity hours per day'
    },
    {
      id: '6',
      title: 'System Uptime',
      period: 'weekly',
      value: 99.8,
      change: 0.1,
      changeType: 'increase',
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-500/20',
      description: 'System availability percentage'
    }
  ];

  const yearlyData: ReportData[] = [
    {
      id: '1',
      title: 'Annual Revenue',
      period: 'yearly',
      value: 1254300.00,
      change: 28.7,
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/20',
      description: 'Total revenue for the year'
    },
    {
      id: '2',
      title: 'Total Users',
      period: 'yearly',
      value: 15420,
      change: 45.2,
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20',
      description: 'Total registered users'
    },
    {
      id: '3',
      title: 'Tasks Completed',
      period: 'yearly',
      value: 187456,
      change: 67.3,
      changeType: 'increase',
      icon: CheckCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/20',
      description: 'Total tasks completed this year'
    },
    {
      id: '4',
      title: 'Growth Rate',
      period: 'yearly',
      value: 156.8,
      change: 23.4,
      changeType: 'increase',
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/20',
      description: 'Year-over-year growth percentage'
    },
    {
      id: '5',
      title: 'Customer Satisfaction',
      period: 'yearly',
      value: 4.7,
      change: 0.3,
      changeType: 'increase',
      icon: Star,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/20',
      description: 'Average customer satisfaction rating'
    },
    {
      id: '6',
      title: 'Market Share',
      period: 'yearly',
      value: 12.3,
      change: 4.1,
      changeType: 'increase',
      icon: BarChart3,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/20',
      description: 'Percentage of market share'
    }
  ];

  const getCurrentData = () => {
    switch (selectedPeriod) {
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return reportData;
      case 'yearly':
        return yearlyData;
      default:
        return reportData;
    }
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return <ArrowUp size={16} className="text-green-500" />;
      case 'decrease':
        return <ArrowDown size={16} className="text-red-500" />;
      default:
        return <Minus size={16} className="text-gray-500" />;
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-500';
      case 'decrease':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatValue = (value: number, title: string) => {
    if (title.includes('Revenue') || title.includes('Value')) {
      return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (title.includes('Rate') || title.includes('Uptime') || title.includes('Satisfaction') || title.includes('Share')) {
      return `${value}%`;
    }
    return value.toLocaleString('en-US');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Reports & Analytics</h1>
          <p className="text-text-secondary mt-1">
            Comprehensive insights and performance metrics
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Download size={16} />
            Export Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent-cyan text-text-primary rounded-lg hover:bg-cyan-600 transition-colors">
            <Eye size={16} />
            View Details
          </button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="bg-bg-secondary rounded-lg p-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-text-primary">Report Period:</span>
          <div className="flex gap-2">
            {(['weekly', 'monthly', 'yearly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-accent-cyan text-text-primary'
                    : 'bg-bg-main text-text-muted hover:text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getCurrentData().map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.id}
              className="bg-bg-secondary rounded-xl p-6 border border-border hover:border-accent-cyan/30 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${report.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} className={report.color} />
                </div>
                <div className="flex items-center gap-1">
                  {getChangeIcon(report.changeType)}
                  <span className={`text-sm font-medium ${getChangeColor(report.changeType)}`}>
                    {report.change > 0 ? '+' : ''}{report.change}%
                  </span>
                </div>
              </div>

              <div className="mb-2">
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  {formatValue(report.value, report.title)}
                </h3>
                <p className="text-sm text-text-muted">{report.title}</p>
              </div>

              <p className="text-xs text-text-muted leading-relaxed">
                {report.description}
              </p>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">
                    {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Report
                  </span>
                  <button className="text-xs text-accent-cyan hover:text-cyan-400 transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Tasks */}
        <div className="bg-bg-secondary rounded-xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <BarChart3 size={20} className="text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary">Top Performing Tasks</h3>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Instagram Likes', completion: 89, revenue: 2340 },
              { name: 'YouTube Subscribes', completion: 76, revenue: 1890 },
              { name: 'TikTok Follows', completion: 82, revenue: 1650 },
              { name: 'Twitter Retweets', completion: 71, revenue: 1420 }
            ].map((task, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">{task.name}</p>
                  <p className="text-xs text-text-muted">{task.completion}% completion rate</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-500">${task.revenue}</p>
                  <p className="text-xs text-text-muted">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Activity Trends */}
        <div className="bg-bg-secondary rounded-xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Activity size={20} className="text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary">User Activity Trends</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Peak Hours</span>
              <span className="text-sm font-medium text-text-primary">2:00 PM - 6:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Most Active Day</span>
              <span className="text-sm font-medium text-text-primary">Saturday</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Avg Session Duration</span>
              <span className="text-sm font-medium text-text-primary">24 minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Bounce Rate</span>
              <span className="text-sm font-medium text-text-primary">12.3%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsManagement;

