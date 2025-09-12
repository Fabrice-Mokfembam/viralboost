import type { 
  DashboardStats, 
  RecentActivity, 
  User, 
  Task, 
  Complaint, 
  Transaction, 
  TaskSubmission,
  MembershipTier,
  AdminUser,
  TaskCategory
} from '../Types';

// Static Membership Tiers
export const membershipTiers: MembershipTier[] = [
  {
    id: '1',
    name: 'Basic',
    description: 'Perfect for getting started',
    price: 0,
    rewardMultiplier: 1.0,
    dailyTaskLimit: 5,
    maxTasks: 10,
    priorityLevel: 1,
    icon: '⭐',
    color: '#6B7280',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Premium',
    description: 'For serious earners',
    price: 9.99,
    rewardMultiplier: 1.5,
    dailyTaskLimit: 15,
    maxTasks: 30,
    priorityLevel: 2,
    icon: '💎',
    color: '#3B82F6',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'VIP',
    description: 'Maximum earning potential',
    price: 19.99,
    rewardMultiplier: 2.0,
    dailyTaskLimit: 30,
    maxTasks: 50,
    priorityLevel: 3,
    icon: '👑',
    color: '#F59E0B',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

// Static Users Data
export const staticUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john.doe@email.com',
    phone: '+1234567890',
    membershipTier: membershipTiers[1], // Premium
    totalPointsEarned: 1250,
    accountStatus: 'active',
    registrationDate: '2024-01-15T10:30:00Z',
    lastActive: '2024-01-20T14:22:00Z',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isEmailVerified: true,
    isPhoneVerified: true
  },
  {
    id: '2',
    username: 'sarah_wilson',
    email: 'sarah.wilson@email.com',
    phone: '+1987654321',
    membershipTier: membershipTiers[2], // VIP
    totalPointsEarned: 3200,
    accountStatus: 'active',
    registrationDate: '2024-01-10T08:15:00Z',
    lastActive: '2024-01-20T16:45:00Z',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    isEmailVerified: true,
    isPhoneVerified: true
  },
  {
    id: '3',
    username: 'mike_chen',
    email: 'mike.chen@email.com',
    membershipTier: membershipTiers[0], // Basic
    totalPointsEarned: 450,
    accountStatus: 'active',
    registrationDate: '2024-01-18T12:00:00Z',
    lastActive: '2024-01-19T09:30:00Z',
    isEmailVerified: true,
    isPhoneVerified: false
  },
  {
    id: '4',
    username: 'emma_brown',
    email: 'emma.brown@email.com',
    phone: '+1555123456',
    membershipTier: membershipTiers[1], // Premium
    totalPointsEarned: 2100,
    accountStatus: 'suspended',
    registrationDate: '2024-01-05T14:20:00Z',
    lastActive: '2024-01-18T11:15:00Z',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isEmailVerified: true,
    isPhoneVerified: true
  },
  {
    id: '5',
    username: 'alex_smith',
    email: 'alex.smith@email.com',
    membershipTier: membershipTiers[2], // VIP
    totalPointsEarned: 4500,
    accountStatus: 'active',
    registrationDate: '2023-12-20T16:45:00Z',
    lastActive: '2024-01-20T18:20:00Z',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isEmailVerified: true,
    isPhoneVerified: true
  },
  {
    id: '6',
    username: 'lisa_jones',
    email: 'lisa.jones@email.com',
    membershipTier: membershipTiers[0], // Basic
    totalPointsEarned: 320,
    accountStatus: 'banned',
    registrationDate: '2024-01-12T09:30:00Z',
    lastActive: '2024-01-15T13:45:00Z',
    isEmailVerified: false,
    isPhoneVerified: false
  }
];

// Static Tasks Data
export const staticTasks: Task[] = [
  {
    id: '1',
    title: 'Instagram Story Share',
    description: 'Share our latest product on your Instagram story',
    platform: 'instagram',
    basePoints: 50,
    estimatedDurationMinutes: 5,
    requiresPhoto: true,
    samplePhotoUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=400&fit=crop',
    thresholdValue: 100,
    instructions: [
      'Take a screenshot of our product page',
      'Create an Instagram story with the screenshot',
      'Add a caption mentioning @viralboost',
      'Share the story publicly'
    ],
    targetUrl: 'https://viralboost.com/products',
    expiresAt: '2024-02-15T23:59:59Z',
    status: 'active',
    membershipTiers: ['1', '2', '3'],
    totalCompletions: 45,
    createdAt: '2024-01-15T10:00:00Z',
    createdBy: 'admin_1'
  },
  {
    id: '2',
    title: 'YouTube Video Comment',
    description: 'Comment on our latest YouTube video',
    platform: 'youtube',
    basePoints: 25,
    estimatedDurationMinutes: 3,
    requiresPhoto: false,
    thresholdValue: 50,
    instructions: [
      'Watch our latest YouTube video',
      'Leave a meaningful comment',
      'Include #ViralBoost in your comment'
    ],
    targetUrl: 'https://youtube.com/watch?v=example',
    expiresAt: '2024-02-10T23:59:59Z',
    status: 'active',
    membershipTiers: ['1', '2', '3'],
    totalCompletions: 78,
    createdAt: '2024-01-10T14:30:00Z',
    createdBy: 'admin_1'
  },
  {
    id: '3',
    title: 'TikTok Dance Challenge',
    description: 'Create a TikTok video using our trending sound',
    platform: 'tiktok',
    basePoints: 100,
    estimatedDurationMinutes: 15,
    requiresPhoto: true,
    samplePhotoUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=400&fit=crop',
    thresholdValue: 200,
    instructions: [
      'Use our trending sound in your TikTok',
      'Create an original dance or lip-sync',
      'Include #ViralBoostChallenge in caption',
      'Post the video publicly'
    ],
    targetUrl: 'https://tiktok.com/@viralboost',
    expiresAt: '2024-02-20T23:59:59Z',
    status: 'active',
    membershipTiers: ['2', '3'],
    totalCompletions: 23,
    createdAt: '2024-01-18T16:00:00Z',
    createdBy: 'admin_2'
  },
  {
    id: '4',
    title: 'Twitter Retweet Campaign',
    description: 'Retweet our announcement tweet',
    platform: 'twitter',
    basePoints: 30,
    estimatedDurationMinutes: 2,
    requiresPhoto: false,
    thresholdValue: 60,
    instructions: [
      'Find our latest announcement tweet',
      'Retweet it to your followers',
      'Add a comment with your thoughts'
    ],
    targetUrl: 'https://twitter.com/viralboost/status/example',
    expiresAt: '2024-01-25T23:59:59Z',
    status: 'paused',
    membershipTiers: ['1', '2', '3'],
    totalCompletions: 156,
    createdAt: '2024-01-20T11:00:00Z',
    createdBy: 'admin_1'
  },
  {
    id: '5',
    title: 'Facebook Group Post',
    description: 'Share our content in relevant Facebook groups',
    platform: 'facebook',
    basePoints: 75,
    estimatedDurationMinutes: 10,
    requiresPhoto: true,
    samplePhotoUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=400&fit=crop',
    thresholdValue: 150,
    instructions: [
      'Join relevant Facebook groups',
      'Share our content with proper context',
      'Engage with comments on your post'
    ],
    targetUrl: 'https://facebook.com/viralboost',
    expiresAt: '2024-01-30T23:59:59Z',
    status: 'expired',
    membershipTiers: ['2', '3'],
    totalCompletions: 12,
    createdAt: '2024-01-05T09:00:00Z',
    createdBy: 'admin_2'
  }
];

// Static Complaints Data
export const staticComplaints: Complaint[] = [
  {
    id: '1',
    userId: '2',
    user: staticUsers[1],
    subject: 'Task not approved',
    description: 'I completed the Instagram story task but it was rejected without reason. I followed all instructions correctly.',
    status: 'open',
    priority: 'medium',
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-20T10:30:00Z',
    internalNotes: ['User has good history', 'Need to review submission']
  },
  {
    id: '2',
    userId: '4',
    user: staticUsers[3],
    subject: 'Account suspension appeal',
    description: 'My account was suspended but I believe this was done in error. I have not violated any terms.',
    status: 'in_progress',
    priority: 'high',
    assignedTo: 'admin_1',
    createdAt: '2024-01-18T14:20:00Z',
    updatedAt: '2024-01-19T09:15:00Z',
    internalNotes: ['Reviewing account activity', 'Checking for policy violations']
  },
  {
    id: '3',
    userId: '1',
    user: staticUsers[0],
    subject: 'Points not credited',
    description: 'I completed 3 tasks yesterday but only received points for 1. Please check my account.',
    status: 'resolved',
    priority: 'low',
    assignedTo: 'admin_2',
    createdAt: '2024-01-15T16:45:00Z',
    updatedAt: '2024-01-16T11:30:00Z',
    resolution: 'Points have been credited to your account. There was a system delay.',
    internalNotes: ['Issue resolved', 'Points manually credited']
  }
];

// Static Transactions Data
export const staticTransactions: Transaction[] = [
  {
    id: '1',
    userId: '2',
    user: staticUsers[1],
    type: 'membership_purchase',
    amount: 9.99,
    currency: 'USD',
    status: 'completed',
    description: 'Premium membership upgrade',
    createdAt: '2024-01-15T10:30:00Z',
    processedAt: '2024-01-15T10:31:00Z'
  },
  {
    id: '2',
    userId: '5',
    user: staticUsers[4],
    type: 'payout',
    amount: 25.00,
    currency: 'USD',
    status: 'completed',
    description: 'Points to cash payout',
    createdAt: '2024-01-18T14:20:00Z',
    processedAt: '2024-01-19T09:15:00Z'
  },
  {
    id: '3',
    userId: '1',
    user: staticUsers[0],
    type: 'membership_purchase',
    amount: 19.99,
    currency: 'USD',
    status: 'pending',
    description: 'VIP membership upgrade',
    createdAt: '2024-01-20T16:45:00Z'
  },
  {
    id: '4',
    userId: '3',
    user: staticUsers[2],
    type: 'bonus',
    amount: 5.00,
    currency: 'USD',
    status: 'completed',
    description: 'Welcome bonus',
    createdAt: '2024-01-18T12:00:00Z',
    processedAt: '2024-01-18T12:01:00Z'
  }
];

// Static Task Submissions Data
export const staticTaskSubmissions: TaskSubmission[] = [
  {
    id: '1',
    taskId: '1',
    task: staticTasks[0],
    userId: '2',
    user: staticUsers[1],
    submittedPhotoUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=400&fit=crop',
    status: 'approved',
    pointsAwarded: 50,
    submittedAt: '2024-01-19T14:30:00Z',
    reviewedAt: '2024-01-19T15:45:00Z',
    reviewedBy: 'admin_1'
  },
  {
    id: '2',
    taskId: '2',
    task: staticTasks[1],
    userId: '1',
    user: staticUsers[0],
    status: 'pending',
    submittedAt: '2024-01-20T10:15:00Z'
  },
  {
    id: '3',
    taskId: '3',
    task: staticTasks[2],
    userId: '5',
    user: staticUsers[4],
    submittedPhotoUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=400&fit=crop',
    status: 'rejected',
    submittedAt: '2024-01-18T16:20:00Z',
    reviewedAt: '2024-01-19T09:30:00Z',
    reviewedBy: 'admin_2',
    rejectionReason: 'Video does not meet quality standards'
  }
];

// Static Recent Activities Data
export const staticRecentActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'user_registration',
    description: 'New user registered: alex_smith',
    userId: '5',
    userName: 'alex_smith',
    createdAt: '2024-01-20T18:20:00Z'
  },
  {
    id: '2',
    type: 'task_completed',
    description: 'Task completed: Instagram Story Share',
    userId: '2',
    userName: 'sarah_wilson',
    metadata: { taskId: '1', points: 50 },
    createdAt: '2024-01-20T16:45:00Z'
  },
  {
    id: '3',
    type: 'complaint_created',
    description: 'New complaint: Task not approved',
    userId: '2',
    userName: 'sarah_wilson',
    metadata: { complaintId: '1' },
    createdAt: '2024-01-20T10:30:00Z'
  },
  {
    id: '4',
    type: 'transaction_completed',
    description: 'Payout processed: $25.00',
    userId: '5',
    userName: 'alex_smith',
    metadata: { transactionId: '2', amount: 25.00 },
    createdAt: '2024-01-19T09:15:00Z'
  },
  {
    id: '5',
    type: 'user_suspended',
    description: 'User suspended: emma_brown',
    userId: '4',
    userName: 'emma_brown',
    createdAt: '2024-01-18T11:15:00Z'
  }
];

// Static Dashboard Stats
export const staticDashboardStats: DashboardStats = {
  totalUsers: 1250,
  totalUsersGrowth: 12.5,
  totalTasksCreated: 89,
  totalTasksCompleted: 2340,
  totalRevenue: 45600,
  totalRevenueGrowth: 8.3,
  activeUsers: 890,
  pendingSubmissions: 23,
  openComplaints: 7,
  systemHealth: 'healthy'
};

// Static Task Categories
export const staticTaskCategories: TaskCategory[] = [
  {
    id: 1,
    name: 'Social Media Engagement',
    description: 'Tasks involving likes, follows, comments, and shares',
    is_active: true
  },
  {
    id: 2,
    name: 'Content Creation',
    description: 'Tasks requiring users to create original content',
    is_active: true
  },
  {
    id: 3,
    name: 'Brand Promotion',
    description: 'Tasks focused on promoting specific brands or products',
    is_active: true
  },
  {
    id: 4,
    name: 'Community Building',
    description: 'Tasks aimed at building and engaging communities',
    is_active: true
  },
  {
    id: 5,
    name: 'Market Research',
    description: 'Tasks involving surveys, feedback, and data collection',
    is_active: true
  }
];

// Static Admin User
export const staticAdminUser: AdminUser = {
  id: 'admin_1',
  email: 'admin@viralboost.com',
  role: 'super_admin',
  name: 'Admin User',
  createdAt: '2024-01-01T00:00:00Z',
  lastLogin: '2024-01-20T18:30:00Z',
  isActive: true
};
