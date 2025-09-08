
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
    <div className="min-h-screen bg-bg-main flex flex-col items-center py-8 px-2">
      {/* Header Section */}
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-4 mb-6 shadow-lg">
        <div className="flex justify-between text-text-primary text-sm mb-2">
          <span>Today's Tasks</span>
          <span>Duration</span>
        </div>
        <div className="flex justify-between items-center font-bold text-xl text-text-primary">
          <span>0/15</span>
          <span>22:54:22</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-md flex bg-gray-800 p-1 rounded-lg mb-4">
        <button className="flex-1 py-2 text-center text-sm font-semibold bg-cyan-500 text-text-primary rounded-l-lg">
          Undone
        </button>
        <button className="flex-1 py-2 text-center text-gray-400">In Progress</button>
        <button className="flex-1 py-2 text-center text-gray-400">Completed</button>
        <button className="flex-1 py-2 text-center text-gray-400 rounded-r-lg">
          Cancelled
        </button>
      </div>

      {/* Tasks List */}
      <div className="w-full max-w-md space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between bg-bg-secondary rounded-lg p-4 shadow border border-gray-700"
          >
            <div className="flex items-center space-x-4">
              {task.icon}
              <div>
                <div className="text-text-primary font-semibold">{task.title}</div>
                <div className="text-cyan-400 text-sm font-bold">Earn {task.reward}</div>
                <div className="text-xs text-gray-400 mt-1">Read More</div>
              </div>
            </div>
            <button onClick={()=>navigate(`/v/task/${task.id}`)} className="ml-4 bg-cyan-500 hover:bg-cyan-600 text-text-primary font-semibold py-2 px-4 rounded-md shadow">
              Do Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
