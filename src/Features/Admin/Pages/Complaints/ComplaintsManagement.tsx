import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Trash2, Eye, Mail, Phone, AlertTriangle } from 'lucide-react';
import type { Complaint } from '../../Types';

// Dummy data for complaints
const dummyComplaints: Complaint[] = [
  {
    id: '1',
    userId: 'user1',
    user: {
      id: 'user1',
      username: 'john_doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      membershipTier: { id: 1, membership_name: 'Basic', description: 'Basic membership', tasks_per_day: 5, max_tasks: 10, benefit_amount_per_task: 0, price: 0,  is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01' },
      totalPointsEarned: 1250,
      accountStatus: 'active',
      registrationDate: '2024-01-01',
      lastActive: '2024-01-15',
      isEmailVerified: true,
      isPhoneVerified: true,
      tasks_completed_today: 3,
      last_task_reset_date: '2024-01-15'
    },
    userEmail: 'john.doe@example.com',
    title: 'Task completion not credited',
    description: 'Completed the video like task but did not receive credit for it. The task was completed successfully but the points were not added to my account.',
    severity: 'high',
    status: 'open',
    contact: 'john.doe@example.com',
    contactType: 'email',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    userId: 'user2',
    user: {
      id: 'user2',
      username: 'jane_smith',
      email: 'jane.smith@example.com',
      phone: '+1234567891',
      membershipTier: { id: 2, membership_name: 'Premium', description: 'Premium membership', tasks_per_day: 15, max_tasks: 30, benefit_amount_per_task: 9.99, price: 9.99, is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01' },
      totalPointsEarned: 2500,
      accountStatus: 'active',
      registrationDate: '2024-01-05',
      lastActive: '2024-01-14',
      isEmailVerified: true,
      isPhoneVerified: true,
      tasks_completed_today: 8,
      last_task_reset_date: '2024-01-14'
    },
    userEmail: 'jane.smith@example.com',
    title: 'Withdrawal taking too long',
    description: 'My withdrawal request has been pending for over a week. I submitted the request on January 8th and it\'s still showing as pending.',
    severity: 'medium',
    status: 'closed',
    contact: '+1234567891',
    contactType: 'phone',
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    closedAt: '2024-01-12T16:45:00Z'
  },
  {
    id: '3',
    userId: 'user3',
    user: {
      id: 'user3',
      username: 'mike_wilson',
      email: 'mike.wilson@example.com',
      phone: '+1234567892',
      membershipTier: { id: 1, membership_name: 'Basic', description: 'Basic membership', tasks_per_day: 5, max_tasks: 10, benefit_amount_per_task: 0, price: 0, is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01' },
      totalPointsEarned: 800,
      accountStatus: 'active',
      registrationDate: '2024-01-08',
      lastActive: '2024-01-13',
      isEmailVerified: true,
      isPhoneVerified: false,
      tasks_completed_today: 2,
      last_task_reset_date: '2024-01-13'
    },
    userEmail: 'mike.wilson@example.com',
    title: 'App crashes frequently',
    description: 'The app keeps crashing when I try to view my profile. This happens every time I navigate to the profile section.',
    severity: 'low',
    status: 'open',
    contact: 'mike.wilson@example.com',
    contactType: 'email',
    createdAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z'
  },
  {
    id: '4',
    userId: 'user4',
    user: {
      id: 'user4',
      username: 'sarah_jones',
      email: 'sarah.jones@example.com',
      phone: '+1234567893',
      membershipTier: { id: 3, membership_name: 'VIP', description: 'VIP membership', tasks_per_day: 50, max_tasks: 100, benefit_amount_per_task: 29.99, price: 29.99, is_active: 1, created_at: '2024-01-01', updated_at: '2024-01-01' },
      totalPointsEarned: 5000,
      accountStatus: 'active',
      registrationDate: '2024-01-02',
      lastActive: '2024-01-15',
      isEmailVerified: true,
      isPhoneVerified: true,
      tasks_completed_today: 25,
      last_task_reset_date: '2024-01-15'
    },
    userEmail: 'sarah.jones@example.com',
    title: 'Premium features not working',
    description: 'I upgraded to VIP membership but I\'m not seeing the premium features. The task limits are still showing as basic membership limits.',
    severity: 'high',
    status: 'open',
    contact: '+1234567893',
    contactType: 'phone',
    createdAt: '2024-01-14T11:30:00Z',
    updatedAt: '2024-01-14T11:30:00Z'
  }
];

const ComplaintsManagement: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(dummyComplaints);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500 bg-red-500/20 border-red-500/30';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/30';
      case 'low':
        return 'text-green-500 bg-green-500/20 border-green-500/30';
      default:
        return 'text-gray-500 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-orange-500 bg-orange-500/20 border-orange-500/30';
      case 'closed':
        return 'text-green-500 bg-green-500/20 border-green-500/30';
      default:
        return 'text-gray-500 bg-gray-500/20 border-gray-500/30';
    }
  };

  const handleCloseComplaint = (id: string) => {
    setComplaints(prev => 
      prev.map(complaint => 
        complaint.id === id 
          ? { ...complaint, status: 'closed' as const, closedAt: new Date().toISOString() }
          : complaint
      )
    );
  };

  const handleDeleteComplaint = (id: string) => {
    setComplaints(prev => prev.filter(complaint => complaint.id !== id));
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || complaint.severity === severityFilter;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Complaints Management</h1>
          <p className="text-text-secondary mt-1">
            Manage user complaints and support requests ({filteredComplaints.length} total)
          </p>
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
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-bg-main border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-bg-main border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>

          {/* Severity Filter */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-2 bg-bg-main border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          >
            <option value="all">All Severity</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Filter Button */}
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-accent-cyan text-text-primary rounded-lg hover:bg-cyan-600 transition-colors">
            <Filter size={20} />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-bg-secondary rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg-tertiary">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Severity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Created</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Contact</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-bg-main/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-text-primary">{complaint.user.username}</div>
                      <div className="text-sm text-text-muted">{complaint.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="font-medium text-text-primary truncate">{complaint.title}</div>
                      <div className="text-sm text-text-muted truncate">{complaint.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(complaint.severity)}`}>
                      <AlertTriangle size={12} />
                      {complaint.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(complaint.status)}`}>
                      {complaint.status === 'open' ? (
                        <XCircle size={12} />
                      ) : (
                        <CheckCircle size={12} />
                      )}
                      {complaint.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">
                    {formatDate(complaint.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {complaint.contactType === 'email' ? (
                        <Mail size={16} className="text-cyan-400" />
                      ) : (
                        <Phone size={16} className="text-green-400" />
                      )}
                      <span className="text-sm text-text-muted">{complaint.contact}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {/* View complaint details */}}
                        className="p-2 text-cyan-400 hover:bg-cyan-400/20 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {complaint.status === 'open' && (
                        <button
                          onClick={() => handleCloseComplaint(complaint.id)}
                          className="p-2 text-green-400 hover:bg-green-400/20 rounded-lg transition-colors"
                          title="Close Complaint"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteComplaint(complaint.id)}
                        className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                        title="Delete Complaint"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredComplaints.length === 0 && (
          <div className="text-center py-12">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-text-muted/10 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-text-muted" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">No complaints found</h3>
              <p className="text-text-muted">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintsManagement;

