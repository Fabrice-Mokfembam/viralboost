
import {  Youtube, Twitter, Instagram, Smartphone, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRunTaskDistribution } from '../../tasks/Hooks/useTasks';
import { useState } from 'react';

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

  // Filter tasks based on active tab
  const getFilteredTasks = () => {
    if (!Tasks?.data) return [];
    
    switch (activeTab) {
      case 'undone':
        return Tasks.data; // Show all assigned tasks
      case 'in-progress':
        return Tasks.data.filter((task: any) => task.task_status === 'pending');
      case 'completed':
        return Tasks.data.filter((task: any) => task.task_status === 'completed');
      case 'cancelled':
        return Tasks.data.filter((task: any) => task.task_status === 'cancelled');
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
                className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-colors ${
                  activeTab === 'undone' 
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white' 
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                Undone
              </button>
              <button 
                onClick={() => setActiveTab('in-progress')}
                className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-colors ${
                  activeTab === 'in-progress' 
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white' 
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                In Progress
              </button>
              <button 
                onClick={() => setActiveTab('completed')}
                className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-colors ${
                  activeTab === 'completed' 
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white' 
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                Completed
              </button>
              <button 
                onClick={() => setActiveTab('cancelled')}
                className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-colors ${
                  activeTab === 'cancelled' 
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white' 
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                Cancelled
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task: any) => (
            <div
              key={task.id}
              className="relative overflow-hidden rounded-2xl shadow-2xl"
            >
              <div className="relative p-6">
                <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center group-hover:from-cyan-500/20 group-hover:to-cyan-600/20 transition-all duration-300">
                        {getPlatformIcon(task.platform)}
                      </div>
                      <div>
                        <div className="text-text-primary font-semibold text-lg">{task.title}</div>
                        <div className="text-cyan-400 text-sm font-bold">Earn ${task.benefit}</div>
                        <div className="text-xs text-text-muted mt-1">{task.category}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate(`/v/task/${task.id}`)} 
                      className="ml-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                      Do Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <div className="relative p-6">
              <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-8 text-center border border-gray-700/50">
                <div className="text-text-muted text-lg mb-2">
                  {activeTab === 'undone' && 'No undone tasks available'}
                  {activeTab === 'in-progress' && 'No tasks in progress'}
                  {activeTab === 'completed' && 'No completed tasks'}
                  {activeTab === 'cancelled' && 'No cancelled tasks'}
                </div>
                <div className="text-text-muted text-sm">
                  {activeTab === 'undone' && 'Check back later for new tasks!'}
                  {activeTab === 'in-progress' && 'Start working on some tasks to see them here.'}
                  {activeTab === 'completed' && 'Complete some tasks to see them here.'}
                  {activeTab === 'cancelled' && 'No tasks have been cancelled.'}
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
