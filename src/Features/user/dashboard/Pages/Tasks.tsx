
import {  Youtube, Twitter, Instagram, Smartphone, UserCheck, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRunTaskDistribution } from '../../tasks/Hooks/useTasks';
import { useEffect, useState } from 'react';
import { useGetUserSubmissions } from '../../tasks/Hooks/useTaskSubmissions';

// Function to get platform icon
const getPlatformIcon = (platform: string) => {
  const iconProps = { size: 28, className: "text-cyan-500 bg-gray-800 rounded-md p-2" };
  
  switch (platform.toLowerCase()) {
    case 'youtube':
      return <Youtube {...iconProps} />;
    case 'twitter':
      return <Twitter {...iconProps} />;
    case 'instagram':
      return <Instagram {...iconProps} />;
    case 'tiktok':
      return <Smartphone {...iconProps} />;
    default:
      return <UserCheck {...iconProps} />;
  }
};

const Tasks = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('undone');
  
  const { data: Tasks } = useRunTaskDistribution();

  const { data: Submissions } = useGetUserSubmissions();

  useEffect(() => {
    if (Submissions?.data) {
      console.log(Submissions.data.submissions
      );
    }
  }, [Submissions]);

  // Helper function to check if a task has been submitted
  const isTaskSubmitted = (taskId: number) => {
    if (!Submissions?.data?.submissions) return false;
    return Submissions.data.submissions.some((submission: any) => submission.task_id === taskId);
  };

  // Filter tasks based on active tab and submission status
  const getFilteredTasks = () => {
    if (!Tasks?.data) return [];
    
    switch (activeTab) {
      case 'undone':
        // Show tasks that haven't been submitted yet
        return Tasks.data.filter((task: any) => !isTaskSubmitted(task.id));
      case 'in-progress':
        // Show tasks that are pending (this might be empty based on your logic)
        return Tasks.data.filter((task: any) => task.task_status === 'pending' && !isTaskSubmitted(task.id));
      case 'completed':
        // Show tasks that have been submitted
        return Tasks.data.filter((task: any) => isTaskSubmitted(task.id));
      default:
        return Tasks.data;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main">
      <div className="max-w-lg mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8">
        <div className="relative p-6">
          <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4 border border-cyan-500/20">
            <div className="flex justify-between text-text-primary text-sm mb-2">
              <span>Today's Tasks</span>
              <span>Duration</span>
            </div>
            <div className="flex justify-between items-center font-bold text-xl text-text-primary">
              <span>0/15</span>
              <span>22:54:22</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8">
        <div className="relative p-6">
          <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-1 border border-cyan-500/20">
            <div className="flex">
              <button 
                onClick={() => setActiveTab('undone')}
                className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'undone' 
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white' 
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                Undone
              </button>
              <button 
                onClick={() => setActiveTab('in-progress')}
                className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'in-progress' 
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white' 
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                In Progress
              </button>
              <button 
                onClick={() => setActiveTab('completed')}
                className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'completed' 
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white' 
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task: any) => {
            const isCompleted = isTaskSubmitted(task.id);
            
            return (
              <div
                key={task.id}
                className="relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <div className="relative p-6">
                  <div className={`bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4 border transition-all duration-300 ${
                    isCompleted 
                      ? 'border-green-500/50 hover:border-green-500/70' 
                      : 'border-gray-700/50 hover:border-cyan-500/50 transform hover:scale-[1.02] hover:shadow-xl'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isCompleted 
                            ? 'from-green-500/20 to-green-600/20' 
                            : 'from-gray-700 to-gray-800 group-hover:from-cyan-500/20 group-hover:to-cyan-600/20'
                        }`}>
                          {isCompleted ? (
                            <Check size={28} className="text-green-500" />
                          ) : (
                            getPlatformIcon(task.platform)
                          )}
                        </div>
                        <div>
                          <div className="text-text-primary font-semibold text-lg">{task.title}</div>
                          <div className="text-cyan-400 text-sm font-bold">Earn ${task.benefit}</div>
                          <div className="text-xs text-text-muted mt-1">{task.category}</div>
                        </div>
                      </div>
                      {isCompleted ? (
                        <div className="ml-4 flex items-center space-x-2">
                          <Check size={24} className="text-green-500" />
                          <span className="text-green-500 font-semibold">Completed</span>
                        </div>
                      ) : (
                        <button 
                          onClick={() => navigate(`/v/task/${task.id}`)} 
                          className="ml-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer"
                        >
                          Do Task
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <div className="relative p-6">
              <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-8 text-center border border-gray-700/50">
                <div className="text-text-muted text-lg mb-2">
                  {activeTab === 'undone' && 'No undone tasks available'}
                  {activeTab === 'in-progress' && 'No tasks in progress'}
                  {activeTab === 'completed' && 'No completed tasks'}
                </div>
                <div className="text-text-muted text-sm">
                  {activeTab === 'undone' && 'Check back later for new tasks!'}
                  {activeTab === 'in-progress' && 'Start working on some tasks to see them here.'}
                  {activeTab === 'completed' && 'Complete some tasks to see them here.'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Tasks;
