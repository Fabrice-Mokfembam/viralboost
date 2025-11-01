import React, { useEffect, useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Trash2, Mail, Phone, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetComplaints, useUpdateComplaintStatus, useDeleteComplaint, useGetComplaintStats } from '../../Hooks/useComplaints';
import { toast } from 'react-toastify';


const ComplaintsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);

  const { data: complaintsData, isLoading, error } = useGetComplaints(
    currentPage, 
    pageSize, 
    statusFilter === 'all' ? undefined : statusFilter,
    severityFilter === 'all' ? undefined : severityFilter,
    searchTerm || undefined
  );
  
  const { data: statsData } = useGetComplaintStats();
  const updateComplaintStatusMutation = useUpdateComplaintStatus();
  const deleteComplaintMutation = useDeleteComplaint();

  useEffect(() => {
    console.log('Complaints Data:', complaintsData);
    console.log('Stats Data:', statsData);
  }, [complaintsData, statsData]);

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

  const getStatusColor = (isResolved: boolean) => {
    return isResolved 
      ? 'text-green-500 bg-green-500/20 border-green-500/30'
      : 'text-orange-500 bg-orange-500/20 border-orange-500/30';
  };

  const handleCloseComplaint = async (id: number) => {
    try {
      await updateComplaintStatusMutation.mutateAsync({
        id: id.toString(),
        request: {
          status: 'resolved',
          admin_response: 'Complaint resolved by admin'
        }
      });
      toast.success('Complaint resolved successfully');
    } catch (error) {
      toast.error('Failed to resolve complaint');
      console.error('Error resolving complaint:', error);
    }
  };

  const handleDeleteComplaint = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        await deleteComplaintMutation.mutateAsync(id.toString());
        toast.success('Complaint deleted successfully');
      } catch (error) {
        toast.error('Failed to delete complaint');
        console.error('Error deleting complaint:', error);
      }
    }
  };

  const complaints = complaintsData?.data?.complaints || [];
  const pagination = complaintsData?.data?.pagination;
  const summary = complaintsData?.data?.summary;

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
            Manage user complaints and support requests ({summary?.total_complaints || 0} total)
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-bg-secondary rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Total Complaints</p>
                <p className="text-2xl font-bold text-text-primary">{summary.total_complaints}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-bg-secondary rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Pending</p>
                <p className="text-2xl font-bold text-orange-400">{summary.pending_complaints}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>
          <div className="bg-bg-secondary rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Resolved</p>
                <p className="text-2xl font-bold text-green-400">{summary.resolved_complaints}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          <div className="bg-bg-secondary rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Urgent</p>
                <p className="text-2xl font-bold text-red-400">{summary.urgent_complaints}</p>
              </div>
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>
        </div>
      )}

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
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Issue</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Severity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Created</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Contact</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-cyan"></div>
                      <p className="text-text-muted mt-2">Loading complaints...</p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                        <XCircle className="w-8 h-8 text-red-400" />
                      </div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">Error loading complaints</h3>
                      <p className="text-text-muted">Please try again later</p>
                    </div>
                  </td>
                </tr>
              ) : complaints.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-text-muted/10 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-text-muted" />
                      </div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">No complaints found</h3>
                      <p className="text-text-muted">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                complaints.map((complaint:any) => (
                  <tr key={complaint.id} className="hover:bg-bg-main/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-text-primary">
                          {complaint.user?.name || 'Unknown User'}
                        </div>
                        <div className="text-sm text-text-muted">{complaint.contact}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="font-medium text-text-primary truncate">{complaint.title || complaint.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(complaint.severity_level)}`}>
                        <AlertTriangle size={12} />
                        {complaint.severity_level.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(complaint.is_resolved)}`}>
                        {complaint.is_resolved ? (
                          <CheckCircle size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}
                        {complaint.is_resolved ? 'RESOLVED' : 'PENDING'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {formatDate(complaint.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {complaint.contact_type === 'email' ? (
                          <Mail size={16} className="text-cyan-400" />
                        ) : (
                          <Phone size={16} className="text-green-400" />
                        )}
                        <span className="text-sm text-text-muted">{complaint.contact}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {!complaint.is_resolved && (
                          <button
                            onClick={() => handleCloseComplaint(complaint.id)}
                            className="p-2 text-green-400 hover:bg-green-400/20 rounded-lg transition-colors"
                            title="Resolve Complaint"
                            disabled={updateComplaintStatusMutation.isPending}
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteComplaint(complaint.id)}
                          className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                          title="Delete Complaint"
                          disabled={deleteComplaintMutation.isPending}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      {/* Pagination */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex items-center justify-between bg-bg-secondary rounded-lg p-4">
          <div className="text-sm text-text-muted">
            Showing {((pagination.current_page - 1) * pagination.per_page) + 1} to {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of {pagination.total} complaints
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={pagination.current_page === 1}
              className="flex items-center gap-1 px-3 py-2 bg-bg-main border border-border rounded-lg text-text-primary hover:bg-bg-tertiary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <span className="px-3 py-2 text-text-primary">
              Page {pagination.current_page} of {pagination.last_page}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(pagination.last_page, prev + 1))}
              disabled={pagination.current_page === pagination.last_page}
              className="flex items-center gap-1 px-3 py-2 bg-bg-main border border-border rounded-lg text-text-primary hover:bg-bg-tertiary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ComplaintsManagement;

