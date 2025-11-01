import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RecentActivityList from '../Components/RecentActivityList';
import StatsCard from '../Components/StatsCard';
import { useAdminAuth } from '../Hooks/useAdminAuth';
import { useRecentActivity } from '../Hooks/useAdminData';
import { useGetUserStats } from '../Hooks/useUsers';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { admin } = useAdminAuth();

  const { data: userStats } = useGetUserStats();
  
  // Use real API calls (these are currently disabled until backend endpoints are implemented)
  const { data: activitiesData } = useRecentActivity(5);
  
  // Use real user stats data from API
  const stats = {
    totalUsers: userStats?.data?.total_users || 0,
    totalUsersGrowth: 0, // You can calculate this based on previous data if needed
    totalTasksCreated: 0, // Will be updated when backend is ready
    totalTasksCompleted: 0, // Will be updated when backend is ready
    totalRevenue: 0, // Will be updated when backend is ready
    totalRevenueGrowth: 0, // Will be updated when backend is ready
    activeUsers: userStats?.data?.active_users || 0,
    pendingSubmissions: 0, // Will be updated when backend is ready
    openComplaints: 0, // Will be updated when backend is ready
    systemHealth: 'healthy' as const
  };
  
  const activities = activitiesData || [];

  // Animation variants
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
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: -20 
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const statsGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const statCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <motion.div 
        variants={headerVariants}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold text-text-primary">Dashboard Overview</h1>
        <p className="text-text-secondary mt-1">
          Welcome to the ViralBoost admin panel, {admin?.name || 'Admin'}. Here's what's happening on your platform.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={statsGridVariants}
      >
          <motion.div 
            variants={statCardVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
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
          </motion.div>
          
          <motion.div 
            variants={statCardVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
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
          </motion.div>
          
          <motion.div 
            variants={statCardVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
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
          </motion.div>
          
          <motion.div 
            variants={statCardVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
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
          </motion.div>
        </motion.div>

      {/* Additional Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={statsGridVariants}
      >
          <motion.div 
            variants={statCardVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
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
          </motion.div>
          
          <motion.div 
            variants={statCardVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <StatsCard
              title="Verified Users"
              value={userStats?.data?.verified_users?.toLocaleString() || '0'}
              change={0}
              changeType="neutral"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </motion.div>
          
          <motion.div 
            variants={statCardVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <StatsCard
              title="Monthly Registrations"
              value={userStats?.data?.monthly_registrations?.toLocaleString() || '0'}
              change={0}
              changeType="neutral"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />
          </motion.div>
          
          <motion.div 
            variants={statCardVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <StatsCard
              title="Users with Phone"
              value={userStats?.data?.users_with_phone?.toLocaleString() || '0'}
              change={0}
              changeType="neutral"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }
            />
          </motion.div>
        </motion.div>

      {/* System Health */}
      <motion.div 
        className="bg-bg-secondary rounded-lg p-6"
        variants={itemVariants}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
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
        </motion.div>

      {/* Recent Activity */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={containerVariants}
      >
        <motion.div 
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <RecentActivityList 
            activities={activities} 
            title="Recent Activity"
          />
        </motion.div>
        
        {/* Quick Actions */}
        <motion.div 
          className="bg-bg-secondary rounded-lg p-6"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h3 className="text-lg font-medium text-text-primary mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <motion.button 
              onClick={() => navigate('/admin/dashboard/create-task')}
              className="w-full text-left p-3 rounded-lg bg-bg-main hover:bg-bg-tertiary transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-cyan mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-text-primary">Create New Task</span>
              </div>
            </motion.button>
            
            <motion.button 
              className="w-full text-left p-3 rounded-lg bg-bg-main hover:bg-bg-tertiary transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-cyan mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span className="text-text-primary">View All Users</span>
              </div>
            </motion.button>
            
            <motion.button 
              className="w-full text-left p-3 rounded-lg bg-bg-main hover:bg-bg-tertiary transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-cyan mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-text-primary">Generate Report</span>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
