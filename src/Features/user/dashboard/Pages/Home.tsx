
import { UserCheck, CreditCard, Info, PlusCircle, Gift, Youtube, Twitter, Instagram, Smartphone, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../auth/Utils/authUtils';
import { useGetProfile } from '../../auth/Hooks/useAuth';
import { useRunTaskDistribution } from '../../tasks/Hooks/useTasks';
import { useGetUserSubmissions } from '../../tasks/Hooks/useTaskSubmissions';
import { useEffect } from 'react';


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

const Home = () => {
  const navigate = useNavigate();
  const { data: userProfile } = useGetProfile();
  const storedUser = getUserData();

  const { data: Tasks } = useRunTaskDistribution();
  const { data: Submissions } = useGetUserSubmissions();

  useEffect(() => {
    console.log('Tasks',Tasks);
    console.log('userProfile',userProfile);
  }, [Tasks, userProfile]);

  // Helper function to check if a task has been submitted
  const isTaskSubmitted = (taskId: number) => {
    if (!Submissions?.data?.submissions) return false;
    return Submissions.data.submissions.some((submission: any) => submission.task_id === taskId);
  };

  // Filter out completed tasks
  const availableTasks = Tasks?.data?.filter((task: any) => !isTaskSubmitted(task.id)) || [];
  
  // Use profile data if available, otherwise fall back to stored user data
  const user = userProfile?.data?.user || storedUser;
  
  // Get first name from user name
  const firstName = user?.name ? user.name.split(' ')[0] : 'User';
  
  // Get task completion data from profile
  const tasksCompleted = user?.tasks_completed_today || 0;
  const dailyGoal = user?.membership?.tasks_per_day || 5;




  

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main">
      <div className="max-w-lg mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8 space-y-5">
        <h1 className="text-3xl font-extrabold text-cyan-400 text-center">
          Welcome Back! {firstName}
        </h1>
        <p className="text-text-muted text-center">
          Your Dashboard to Track Earnings and Manage Account Effortlessly
        </p>

        {/* Balance & Top-up */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8">
          <div className="relative p-6">
            <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4 flex justify-between items-center shadow-lg">
          <div>
            <p className="text-text-muted text-sm">Current Balance</p>
            <p className="text-text-primary font-bold text-xl">${user?.account_balance || '0.00'}</p>
          </div>
          <button
            onClick={() => navigate('/v/recharge')}
            className="flex items-center bg-cyan-500 hover:bg-cyan-600 text-text-primary rounded-lg py-2 px-4 font-semibold shadow"
          >
            <PlusCircle size={20} className="mr-2" />
            Top Up
          </button>
            </div>
          </div>
        </div>

        {/* Main Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <button
            onClick={() => navigate('/dashboard/membership')}
            className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-xl p-4 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <UserCheck size={20} className="text-white" />
              </div>
              <span className="text-white text-sm font-semibold">Membership</span>
            </div>
          </button>
          <button
            onClick={() => navigate('/v/withdraw')}
            className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-xl p-4 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <CreditCard size={20} className="text-white" />
              </div>
              <span className="text-white text-sm font-semibold">Withdraw</span>
            </div>
          </button>
          <button
            onClick={() => navigate('/v/aboutcompany')}
            className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-xl p-4 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Info size={20} className="text-white" />
              </div>
              <span className="text-white text-sm font-semibold">About</span>
            </div>
          </button>
        </div>
      </header>

      {/* Tasks Progress */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8">
        <div className="relative p-6">
          <h2 className="text-xl font-bold mb-4 text-cyan-400">Today's Progress</h2>
          <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4">
            <div className="bg-gray-800 rounded-full overflow-hidden h-5 mb-2 shadow-inner">
              <div
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-full transition-all"
                style={{ width: `${(tasksCompleted / dailyGoal) * 100}%` }}
              />
            </div>
            <p className="text-text-muted text-sm">
              {tasksCompleted} / {dailyGoal} Tasks Completed
            </p>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8">
        <div className="relative p-6">
          <h2 className="text-xl font-bold mb-4 text-cyan-400">Your Activities</h2>
          
          {availableTasks.length > 0 ? (
            <div className="space-y-4">
              {availableTasks.slice(0, 3).map((task: any) => (
                <div
                  key={task.id}
                  onClick={() => navigate(`/v/task/${task.id}`)}
                  className="flex items-center bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl shadow-lg p-4 hover:from-cyan-500/10 hover:to-cyan-600/10 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl cursor-pointer border border-gray-700/50 hover:border-cyan-500/50"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center group-hover:from-cyan-500/20 group-hover:to-cyan-600/20 transition-all duration-300">
                    {getPlatformIcon(task.platform)}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-text-primary">{task.title}</h3>
                    <p className="text-sm text-text-muted line-clamp-1">{task.description}</p>
                  </div>
                  <div className="text-cyan-400 font-bold text-lg">${task.benefit}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">All Activities Completed!</h3>
              <p className="text-text-muted text-sm">
                Great job! You've completed all available tasks for today.
              </p>
              <p className="text-text-muted text-xs mt-2">
                Check back tomorrow for new tasks.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Referral Invite */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8">
        <div className="relative p-6">
          <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4 border border-cyan-500/20">
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <Gift size={24} className="text-cyan-400" />
              </div>
              <h3 className="text-cyan-400 font-semibold text-lg">Invite Friends</h3>
            </div>
            <p className="text-text-muted text-sm mb-4">
              Earn bonus rewards when your friends join and complete tasks!
            </p>
            <button
              onClick={() => navigate('/v/invitefriends')}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-xl p-3 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Gift size={20} className="text-white" />
              <span className="text-white font-semibold">Invite Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* About & Support Links */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <div className="relative p-6">
          <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4 border border-cyan-500/20">
            <h3 className="font-semibold text-cyan-400 mb-4 text-lg">About Company & Support</h3>
            <p className="text-text-muted text-sm mb-4">
              This app helps you earn rewards by completing simple online tasks like
              liking videos and subscribing to channels. Manage your balance,
              withdraw earnings, and track your progress easily.
            </p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/v/helpcenter')}
                  className="text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer text-sm transition-colors"
                >
                  Support Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/v/helpcenter')}
                  className="text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer text-sm transition-colors"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/v/privacypolicy')}
                  className="text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer text-sm transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Home;
