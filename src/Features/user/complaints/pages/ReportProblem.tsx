import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, CheckCircle } from 'lucide-react';
import { useComplaints, useUpdateComplaint } from '../hooks/useComplaints';

const ReportProblem = () => {
  const navigate = useNavigate();
  const { data: complaintsResponse, isLoading, error } = useComplaints();
  const updateComplaintMutation = useUpdateComplaint();
  const [showCloseConfirm, setShowCloseConfirm] = useState<number | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  const complaints = complaintsResponse?.data?.complaints || [];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500 bg-red-500/20';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/20';
      case 'low':
        return 'text-green-500 bg-green-500/20';
      default:
        return 'text-gray-500 bg-gray-500/20';
    }
  };

 

  const handleCloseComplaint = async (id: number) => {
    try {
      await updateComplaintMutation.mutateAsync({
        complaintId: id,
        updateData: { is_resolved: true }
      });
      setShowCloseConfirm(null);
      
      // Show success toast
      setToast({
        show: true,
        message: 'Complaint marked as resolved successfully!',
        type: 'success'
      });
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3000);
    } catch (error) {
      console.error('Failed to update complaint:', error);
      
      // Show error toast
      setToast({
        show: true,
        message: 'Failed to resolve complaint. Please try again.',
        type: 'error'
      });
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3000);
    }
  };

  const handleCloseConfirm = (id: number) => {
    setShowCloseConfirm(id);
  };

  const handleCancelClose = () => {
    setShowCloseConfirm(null);
  };

  // Note: Delete functionality removed as there's no delete endpoint in the API

  return (
    <div className="min-h-screen bg-bg-main max-w-4xl mx-auto text-text-secondary">
      <h1 className="text-3xl font-bold text-accent-cyan mb-8 text-center">Report a Problem</h1>
      
      {/* Previous Complaints Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Your Previous Complaints</h2>
        
        {isLoading ? (
          <div className="bg-bg-secondary rounded-xl p-6 shadow-md border border-cyan-500 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-500"></div>
              <p className="text-text-muted">Loading complaints...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 shadow-md text-center">
            <p className="text-red-400 font-medium">Failed to load complaints</p>
            <p className="text-red-300 text-sm mt-1">Please try again later</p>
          </div>
        ) : complaints.length === 0 ? (
          <div className="bg-bg-secondary rounded-xl p-6 shadow-md border border-cyan-500 text-center">
            <p className="text-text-muted">No complaints yet. Submit your first complaint below!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div key={complaint.id} className={`rounded-xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl ${
                !complaint.is_resolved 
                  ? 'bg-gradient-to-r from-bg-secondary to-bg-tertiary border-orange-500/30 hover:border-orange-500/50' 
                  : 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-green-500/30 hover:border-green-500/50 opacity-75'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className={`text-lg font-semibold ${
                        complaint.is_resolved ? 'text-gray-400 line-through' : 'text-text-primary'
                      }`}>
                        {complaint.is_resolved ? 'Resolved' : 'Complaint'} #{complaint.id}
                      </h3>
                      {!complaint.is_resolved && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 rounded-full">
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-orange-500 font-medium">ACTIVE</span>
                        </div>
                      )}
                      {complaint.is_resolved && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                          <CheckCircle size={12} className="text-green-500" />
                          <span className="text-xs text-green-500 font-medium">RESOLVED</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`flex items-center gap-1 ${
                        complaint.is_resolved ? 'text-gray-500' : 'text-text-muted'
                      }`}>
                        <Calendar size={16} />
                        <span className="text-sm">{complaint.formatted_created_date}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        complaint.is_resolved 
                          ? 'text-gray-500 bg-gray-500/20' 
                          : getSeverityColor(complaint.severity_level)
                      }`}>
                        {complaint.severity_level.toUpperCase()}
                      </span>
                      <span className={`text-xs ${
                        complaint.is_resolved ? 'text-gray-500' : 'text-text-muted'
                      }`}>
                        {complaint.time_since_created}
                      </span>
                    </div>
                    
                    <div className={`rounded-lg p-3 mb-4 ${
                      complaint.is_resolved ? 'bg-gray-700/30' : 'bg-bg-main/50'
                    }`}>
                      <p className={`text-sm leading-relaxed ${
                        complaint.is_resolved ? 'text-gray-500' : 'text-text-muted'
                      }`}>{complaint.description}</p>
                    </div>

                    {/* Admin Response */}
                    {complaint.admin_response && (
                      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 mb-4">
                        <h4 className="text-cyan-400 font-medium text-sm mb-2">Admin Response:</h4>
                        <p className="text-text-secondary text-sm leading-relaxed">{complaint.admin_response}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    {!complaint.is_resolved && (
                      <button
                        onClick={() => handleCloseConfirm(complaint.id)}
                        disabled={updateComplaintMutation.isPending}
                        className="group flex items-center gap-2 px-3 py-2 text-green-500 hover:bg-green-500/20 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Mark as resolved"
                      >
                        <CheckCircle size={16} />
                        <span className="text-xs font-medium">Resolve</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Write New Complaint Button */}
      <div className="text-center">
        <button
          onClick={() => navigate('/v/new-complaint')}
          className="bg-cyan-500 hover:bg-cyan-600 text-text-primary font-semibold py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 mx-auto transition-colors"
        >
          <Plus size={20} />
          Write New Complaint
        </button>
      </div>

      {/* Close Confirmation Modal */}
      {showCloseConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-bg-secondary rounded-xl p-6 max-w-md w-full border border-cyan-500/20 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle size={20} className="text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Mark as Resolved</h3>
            </div>
            <p className="text-text-muted mb-6">
              Are you sure you want to mark this complaint as resolved? This action will close the complaint and indicate that you've found a solution.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleCloseComplaint(showCloseConfirm)}
                disabled={updateComplaintMutation.isPending}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {updateComplaintMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Resolving...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    Yes, Mark as Resolved
                  </>
                )}
              </button>
              <button
                onClick={handleCancelClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-5 duration-300">
          <div className={`rounded-lg shadow-lg border p-4 max-w-sm ${
            toast.type === 'success' 
              ? 'bg-green-500/20 border-green-500/50 text-green-400' 
              : 'bg-red-500/20 border-red-500/50 text-red-400'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                toast.type === 'success' ? 'bg-green-500/30' : 'bg-red-500/30'
              }`}>
                <CheckCircle size={16} className={toast.type === 'success' ? 'text-green-400' : 'text-red-400'} />
              </div>
              <p className="font-medium text-sm">{toast.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportProblem;
