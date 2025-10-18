
import { UserCheck, CreditCard, Info, PlusCircle, Gift, Youtube, Twitter, Instagram, Smartphone, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../auth/Utils/authUtils';
import { useGetProfile } from '../../auth/Hooks/useAuth';
import { useRunTaskDistribution } from '../../tasks/Hooks/useTasks';
import { useGetUserSubmissions } from '../../tasks/Hooks/useTaskSubmissions';
import { useEffect } from 'react';
import { useAccount } from '../../accounts';


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

  const { data: Tasks, isLoading: tasksLoading } = useRunTaskDistribution();
  const { data: Submissions, isLoading: submissionsLoading } = useGetUserSubmissions();
  const { data: accountData, isLoading: accountLoading } = useAccount();

  useEffect(() => {
    console.log('Tasks',Tasks);
    console.log('userProfile',userProfile);
  }, [Tasks, userProfile]);


  // Helper function to check if a task has been submitted
  const isTaskSubmitted = (taskId: number) => {
    if (!Submissions?.data?.submissions) return false;
    return Submissions.data.submissions.some((submission:{ task_id: number }) => submission.task_id === taskId);
  };

  // Filter out completed tasks
  const availableTasks = Array.isArray(Tasks?.data) 
    ? Tasks.data.filter((task: { id: number }) => !isTaskSubmitted(task.id))
    : Array.isArray(Tasks?.data?.tasks) 
      ? Tasks.data.tasks.filter((task: { id: number }) => !isTaskSubmitted(task.id))
      : [];
  
  // Use profile data if available, otherwise fall back to stored user data
  const user = userProfile?.data?.user || storedUser;
  
  // Get first name from user name
  const firstName = user?.name ? user.name.split(' ')[0] : 'User';
  
  // Get task completion data from profile
  const tasksCompleted = Submissions?.data?.submissions?.length || 0;
  const dailyGoal = user?.membership?.tasks_per_day || 5;
  const memberShipData = user?.membership;

  console.log('account',accountData);


  // Skeleton component for balance
  const BalanceSkeleton = () => (
    <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4 flex justify-between items-center shadow-lg">
      <div>
        <div className="h-4 bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
        <div className="h-6 bg-gray-700 rounded w-16 animate-pulse"></div>
      </div>
      <div className="h-10 bg-gray-700 rounded-lg w-20 animate-pulse"></div>
    </div>
  );

  // Skeleton component for progress bar
  const ProgressSkeleton = () => (
    <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4">
      <div className="bg-gray-800 rounded-full overflow-hidden h-5 mb-2">
        <div className="h-full bg-gray-700 animate-pulse w-1/3"></div>
      </div>
      <div className="h-4 bg-gray-700 rounded w-32 animate-pulse"></div>
    </div>
  );

  // Skeleton component for activity items
  const ActivitySkeleton = () => (
    <div className="flex items-center bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl shadow-lg p-4 border border-gray-700/50">
      <div className="w-12 h-12 bg-gray-700 rounded-xl animate-pulse"></div>
      <div className="ml-4 flex-1">
        <div className="h-5 bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
      </div>
      <div className="h-6 bg-gray-700 rounded w-12 animate-pulse"></div>
    </div>
  );

  


  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main">
      
      <div className="max-w-lg mx-auto px-3 py-6">
      {/* Header */}
      <header className="mb-6 space-y-4">
        <h1 className="text-2xl font-extrabold text-cyan-400 text-center">
          Welcome Back! {firstName}
        </h1>
        <p className="text-text-muted text-center">
          Your Dashboard to Track Earnings and Manage Account Effortlessly
        </p>

        {/* Balance & Top-up */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-6">
          <div className="relative p-4">
            {accountLoading ? (
              <BalanceSkeleton />
            ) : (
              <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-3 flex justify-between items-center shadow-lg">
                <div>
                  <p className="text-text-muted text-sm">Current Balance</p>
                  <p className="text-text-primary font-bold text-lg">${accountData?.data?.balance || '0.00'}</p>
                </div>
                <button
                  onClick={() => navigate('/v/recharge')}
                  className="flex items-center bg-cyan-500 hover:bg-cyan-600 text-text-primary rounded-lg py-2 px-3 font-semibold shadow text-sm"
                >
                  <PlusCircle size={20} className="mr-2" />
                  Top Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Buttons */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button
            onClick={() => navigate('/dashboard/membership')}
            className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-xl p-3 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <UserCheck size={20} className="text-white" />
              </div>
              <span className="text-white text-xs font-semibold">Membership</span>
            </div>
          </button>
          <button
            onClick={() => navigate('/v/withdraw')}
            className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-xl p-3 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <CreditCard size={20} className="text-white" />
              </div>
              <span className="text-white text-xs font-semibold">Withdraw</span>
            </div>
          </button>
          <button
            onClick={() => navigate('/v/aboutcompany')}
            className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-xl p-3 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Info size={20} className="text-white" />
              </div>
              <span className="text-white text-xs font-semibold">About</span>
            </div>
          </button>
        </div>
      </header>

      {/* Tasks Progress */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-6">
        <div className="relative p-4">
          <h2 className="text-lg font-bold mb-3 text-cyan-400">Today's Progress</h2>
          {submissionsLoading ? (
            <ProgressSkeleton />
          ) : (
            <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-3">
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
          )}
        </div>
      </div>

      {/* Activities */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-6">
        <div className="relative p-4">
          <h2 className="text-lg font-bold mb-3 text-cyan-400">Your Activities</h2>
          
          {tasksLoading || submissionsLoading ? (
            <div className="space-y-4">
              <ActivitySkeleton />
              <ActivitySkeleton />
              <ActivitySkeleton />
            </div>
          ) : availableTasks.length > 0 ? (
            <div className="space-y-3">
              {availableTasks.slice(0, 3).map((task: { id: number; title: string; description: string; platform: string; benefit: string }) => (
                <div
                  key={task.id}
                  onClick={() => navigate(`/v/task/${task.id}`)}
                  className="flex items-center bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl shadow-lg p-3 hover:from-cyan-500/10 hover:to-cyan-600/10 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl cursor-pointer border border-gray-700/50 hover:border-cyan-500/50"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center group-hover:from-cyan-500/20 group-hover:to-cyan-600/20 transition-all duration-300 flex-shrink-0">
                    {getPlatformIcon(task.platform)}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-text-primary line-clamp-2 leading-tight">{task.title}</h3>
                    <p className="text-xs text-text-muted line-clamp-1">{task.description}</p>
                  </div>
                  <div className="text-cyan-400 font-bold text-sm flex-shrink-0">${memberShipData?.benefit_amount_per_task}</div>
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
      <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-6">
        <div className="relative p-4">
          <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-3 border border-cyan-500/20">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <Gift size={20} className="text-cyan-400" />
              </div>
              <h3 className="text-cyan-400 font-semibold text-base">Invite Friends</h3>
            </div>
            <p className="text-text-muted text-xs mb-3">
              Earn bonus rewards when your friends join and complete tasks!
            </p>
            <button
              onClick={() => navigate('/v/invitefriends')}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-xl p-2 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Gift size={16} className="text-white" />
              <span className="text-white font-semibold text-sm">Invite Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* About & Support Links */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <div className="relative p-4">
          <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-3 border border-cyan-500/20">
            <h3 className="font-semibold text-cyan-400 mb-3 text-base">About Company & Support</h3>
            <p className="text-text-muted text-xs mb-3">
              This app helps you earn rewards by completing simple online tasks like
              liking videos and subscribing to channels. Manage your balance,
              withdraw earnings, and track your progress easily.
            </p>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => navigate('/v/helpcenter')}
                  className="text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer text-xs transition-colors"
                >
                  Support Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/v/helpcenter')}
                  className="text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer text-xs transition-colors"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/v/privacypolicy')}
                  className="text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer text-xs transition-colors"
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
