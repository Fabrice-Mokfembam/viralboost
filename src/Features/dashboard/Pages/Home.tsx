
import { UserCheck, CreditCard, Info, PlusCircle, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const activities = [
  {
    id: 1,
    title: 'Like a Video',
    description: 'Complete this task to earn $0.50',
    icon: <UserCheck size={28} className="text-cyan-500 bg-gray-800 rounded-md p-2" />,
    reward: '$0.50',
  },
  {
    id: 2,
    title: 'Subscribe to Channel',
    description: 'Gain $1.00 by subscribing',
    icon: <UserCheck size={28} className="text-cyan-500 bg-gray-800 rounded-md p-2" />,
    reward: '$1.00',
  },
];

const Home = () => {
  const navigate = useNavigate();
  // Example state for completed tasks
  const tasksCompleted = 3;
  const dailyGoal = 15;

  

  return (
    <div className="min-h-screen bg-gray-900 text-white md:px-6 py-8 md:max-w-xl mx-auto">
      {/* Header */}
      <header className="mb-8 space-y-5">
        <h1 className="text-3xl font-extrabold text-cyan-400 text-center">
          Welcome Back!
        </h1>
        <p className="text-gray-400 text-center">
          Your Dashboard to Track Earnings and Manage Account Effortlessly
        </p>

        {/* Balance & Top-up */}
        <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center shadow-lg">
          <div>
            <p className="text-gray-400 text-sm">Current Balance</p>
            <p className="text-white font-bold text-xl">$350.00</p>
          </div>
          <button
            onClick={() => navigate('/v/recharge')}
            className="flex items-center bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg py-2 px-4 font-semibold shadow"
          >
            <PlusCircle size={20} className="mr-2" />
            Top Up
          </button>
        </div>

        {/* Main Buttons */}
        <div className="flex justify-around space-x-4">
          <button
            onClick={() => navigate('/dashboard/membership')}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 rounded-lg py-3 flex flex-col items-center shadow-lg font-semibold"
          >
            <UserCheck size={28} />
            <span className="mt-1">Membership</span>
          </button>
          <button
            onClick={() => navigate('/v/withdraw')}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 rounded-lg py-3 flex flex-col items-center shadow-lg font-semibold"
          >
            <CreditCard size={28} />
            <span className="mt-1">Withdraw</span>
          </button>
          <button
            onClick={() => navigate('/v/aboutcompany')}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 rounded-lg py-3 flex flex-col items-center shadow-lg font-semibold"
          >
            <Info size={28} />
            <span className="mt-1">About Company</span>
          </button>
        </div>
      </header>

      {/* Tasks Progress */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3 text-cyan-400">Today's Progress</h2>
        <div className="bg-gray-800 rounded-full overflow-hidden h-5 mb-1 shadow-inner">
          <div
            className="bg-cyan-500 h-full transition-all"
            style={{ width: `${(tasksCompleted / dailyGoal) * 100}%` }}
          />
        </div>
        <p className="text-gray-400 text-sm">
          {tasksCompleted} / {dailyGoal} Tasks Completed
        </p>
      </section>

      {/* Activities */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-cyan-400">Your Activities</h2>
        <div className="space-y-4">
          {activities.map(({ id, title, description, icon, reward }) => (
            <div
              key={id}
              className="flex items-center bg-gray-800 rounded-xl shadow-lg p-4 hover:bg-gray-700 transition cursor-pointer"
            >
              <div>{icon}</div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-400">{description}</p>
              </div>
              <div className="text-cyan-400 font-bold text-lg">{reward}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Referral Invite */}
      <section className="mb-6 bg-gray-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-center space-x-4 mb-2">
          <Gift size={28} className="text-cyan-400" />
          <h3 className="text-cyan-400 font-semibold">Invite Friends</h3>
        </div>
        <p className="text-gray-400 text-sm mb-3">
          Earn bonus rewards when your friends join and complete tasks!
        </p>
        <button
          onClick={() => navigate('/v/invitefriends')}
          className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg py-2 px-4 font-semibold w-full"
        >
          Invite Now
        </button>
      </section>

      {/* About & Support Links */}
      <section className="bg-gray-800 rounded-lg p-4 shadow-lg text-gray-300 text-sm space-y-3">
        <h3 className="font-semibold text-cyan-400 mb-2">About Company & Support</h3>
        <p>
          This app helps you earn rewards by completing simple online tasks like
          liking videos and subscribing to channels. Manage your balance,
          withdraw earnings, and track your progress easily.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <a
              onClick={() => navigate('/v/helpcenter')}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Support Center
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate('/v/helpcenter')}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              FAQs
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate('/v/privacypolicy')}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Privacy Policy
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
