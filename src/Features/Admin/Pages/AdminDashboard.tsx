import React from 'react';
import { useNavigate } from 'react-router-dom';
import { staticDashboardStats, staticRecentActivities } from '../data/staticData';
import RecentActivityList from '../Components/RecentActivityList';
import StatsCard from '../Components/StatsCard';
import { useAdminAuth } from '../Hooks/useAdminAuth';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { admin } = useAdminAuth();
  const stats = staticDashboardStats;
  const activities = staticRecentActivities.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Dashboard Overview</h1>
        <p className="text-text-secondary mt-1">
          Welcome to the ViralBoost admin panel, {admin?.name || 'Admin'}. Here's what's happening on your platform.
        </p>
      </div>

      {/* Admin Profile Card */}
      {admin && (
        <div className="bg-bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-medium text-text-primary mb-4">Admin Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-text-secondary">Name</label>
              <p className="text-text-primary">{admin.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary">Email</label>
              <p className="text-text-primary">{admin.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary">Phone</label>
              <p className="text-text-primary">{admin.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary">Status</label>
              <p className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                admin.is_active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {admin.is_active ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-text-secondary">Email Verified</label>
              <p className="text-text-primary">
                {admin.email_verified_at ? new Date(admin.email_verified_at).toLocaleDateString() : 'Not verified'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary">Phone Verified</label>
              <p className="text-text-primary">
                {admin.phone_verified_at ? new Date(admin.phone_verified_at).toLocaleDateString() : 'Not verified'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            change={stats.totalUsersGrowth}
            changeType="positive"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            }
          />
          
          <StatsCard
            title="Tasks Created"
            value={stats.totalTasksCreated.toLocaleString()}
            change={0}
            changeType="neutral"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          
          <StatsCard
            title="Tasks Completed"
            value={stats.totalTasksCompleted.toLocaleString()}
            change={0}
            changeType="neutral"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          
          <StatsCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            change={stats.totalRevenueGrowth}
            changeType="positive"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            }
          />
        </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Active Users"
            value={stats.activeUsers.toLocaleString()}
            change={0}
            changeType="neutral"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
          
          <StatsCard
            title="Pending Submissions"
            value={stats.pendingSubmissions.toLocaleString()}
            change={0}
            changeType="neutral"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          
          <StatsCard
            title="Open Complaints"
            value={stats.openComplaints.toLocaleString()}
            change={0}
            changeType="neutral"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            }
          />
        </div>

      {/* System Health */}
      <div className="bg-bg-secondary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-text-primary">System Health</h3>
              <p className="text-text-secondary mt-1">Current platform status</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              stats.systemHealth === 'healthy' 
                ? 'bg-green-100 text-green-800' 
                : stats.systemHealth === 'warning'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {stats.systemHealth.charAt(0).toUpperCase() + stats.systemHealth.slice(1)}
            </div>
          </div>
        </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivityList 
          activities={activities} 
          title="Recent Activity"
        />
        
        {/* Quick Actions */}
        <div className="bg-bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-medium text-text-primary mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/admin/dashboard/create-task')}
              className="w-full text-left p-3 rounded-lg bg-bg-main hover:bg-bg-tertiary transition-colors duration-200"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-cyan mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-text-primary">Create New Task</span>
              </div>
            </button>
            
            <button className="w-full text-left p-3 rounded-lg bg-bg-main hover:bg-bg-tertiary transition-colors duration-200">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-cyan mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span className="text-text-primary">View All Users</span>
              </div>
            </button>
            
            <button className="w-full text-left p-3 rounded-lg bg-bg-main hover:bg-bg-tertiary transition-colors duration-200">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-cyan mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-text-primary">Generate Report</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
