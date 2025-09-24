
import { ThumbsUp, UserPlus, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tasks = [
  {
    id: 1,
    title: 'Like a video',
    reward: '$0.50',
    icon: <ThumbsUp size={28} className="text-cyan-400 bg-gray-800 rounded-md p-2" />,
  },
  {
    id: 2,
    title: 'Follow an account',
    reward: '$0.75',
    icon: <UserPlus size={28} className="text-cyan-400 bg-gray-800 rounded-md p-2" />,
  },
  {
    id: 3,
    title: 'Subscribe to a channel',
    reward: '$1.00',
    icon: <Bell size={28} className="text-cyan-400 bg-gray-800 rounded-md p-2" />,
  },
];

const Tasks = () => {
  const navigate = useNavigate()
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
              <button className="flex-1 py-3 text-center text-sm font-semibold bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg">
                Undone
              </button>
              <button className="flex-1 py-3 text-center text-sm text-text-muted hover:text-text-primary transition-colors">In Progress</button>
              <button className="flex-1 py-3 text-center text-sm text-text-muted hover:text-text-primary transition-colors">Completed</button>
              <button className="flex-1 py-3 text-center text-sm text-text-muted hover:text-text-primary transition-colors">
                Cancelled
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="relative overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="relative p-6">
              <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center group-hover:from-cyan-500/20 group-hover:to-cyan-600/20 transition-all duration-300">
                      {task.icon}
                    </div>
                    <div>
                      <div className="text-text-primary font-semibold text-lg">{task.title}</div>
                      <div className="text-cyan-400 text-sm font-bold">Earn {task.reward}</div>
                      <div className="text-xs text-text-muted mt-1">Read More</div>
                    </div>
                  </div>
                  <button 
                    onClick={()=>navigate(`/v/task/${task.id}`)} 
                    className="ml-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    Do Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Tasks;
