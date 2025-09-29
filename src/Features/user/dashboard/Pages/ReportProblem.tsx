import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Trash2, CheckCircle } from 'lucide-react';

// Dummy data for previous complaints
const dummyComplaints = [
  {
    id: 1,
    title: 'Task completion not credited',
    date: '2024-01-15',
    severity: 'high',
    status: 'open',
    description: 'Completed the video like task but did not receive credit for it.'
  },
  {
    id: 2,
    title: 'Withdrawal taking too long',
    date: '2024-01-10',
    severity: 'medium',
    status: 'closed',
    description: 'My withdrawal request has been pending for over a week.'
  },
  {
    id: 3,
    title: 'App crashes frequently',
    date: '2024-01-05',
    severity: 'low',
    status: 'open',
    description: 'The app keeps crashing when I try to view my profile.'
  }
];

const ReportProblem = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState(dummyComplaints);
  const [showCloseConfirm, setShowCloseConfirm] = useState<number | null>(null);

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

 

  const handleCloseComplaint = (id: number) => {
    setComplaints(prev => 
      prev.map(complaint => 
        complaint.id === id 
          ? { ...complaint, status: 'closed' }
          : complaint
      )
    );
    setShowCloseConfirm(null);
  };

  const handleCloseConfirm = (id: number) => {
    setShowCloseConfirm(id);
  };

  const handleCancelClose = () => {
    setShowCloseConfirm(null);
  };

  const handleDeleteComplaint = (id: number) => {
    setComplaints(prev => prev.filter(complaint => complaint.id !== id));
  };

  return (
    <div className="min-h-screen bg-bg-main max-w-4xl mx-auto text-text-secondary">
      <h1 className="text-3xl font-bold text-accent-cyan mb-8 text-center">Report a Problem</h1>
      
      {/* Previous Complaints Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Your Previous Complaints</h2>
        
        {complaints.length === 0 ? (
          <div className="bg-bg-secondary rounded-xl p-6 shadow-md border border-cyan-500 text-center">
            <p className="text-text-muted">No complaints yet. Submit your first complaint below!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div key={complaint.id} className={`bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl ${
                complaint.status === 'open' 
                  ? 'border-orange-500/30 hover:border-orange-500/50' 
                  : 'border-green-500/30 hover:border-green-500/50'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-text-primary">{complaint.title}</h3>
                      {complaint.status === 'open' && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 rounded-full">
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-orange-500 font-medium">ACTIVE</span>
                        </div>
                      )}
                      {complaint.status === 'closed' && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                          <CheckCircle size={12} className="text-green-500" />
                          <span className="text-xs text-green-500 font-medium">RESOLVED</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1 text-text-muted">
                        <Calendar size={16} />
                        <span className="text-sm">{complaint.date}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(complaint.severity)}`}>
                        {complaint.severity.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="bg-bg-main/50 rounded-lg p-3 mb-4">
                      <p className="text-text-muted text-sm leading-relaxed">{complaint.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    {complaint.status === 'open' && (
                      <button
                        onClick={() => handleCloseConfirm(complaint.id)}
                        className="group flex items-center gap-2 px-3 py-2 text-green-500 hover:bg-green-500/20 rounded-lg transition-all duration-300 hover:scale-105"
                        title="Mark as resolved"
                      >
                        <CheckCircle size={16} />
                        <span className="text-xs font-medium">Resolve</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteComplaint(complaint.id)}
                      className="group flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-105"
                      title="Delete complaint"
                    >
                      <Trash2 size={16} />
                      <span className="text-xs font-medium">Delete</span>
                    </button>
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
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} />
                Yes, Mark as Resolved
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
    </div>
  );
};

export default ReportProblem;
