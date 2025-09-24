import { CreditCard, Repeat, Settings, User, Crown, Mail, ChevronRight, Gift, Key, HelpCircle, Star, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../Auth/Utils/authUtils';
import { useGetProfile } from '../../Auth/Hooks/useAuth';

const Profile = () => {
  const navigate = useNavigate();
  const { data: userProfile } = useGetProfile();
  const storedUser = getUserData();
  
  // Use profile data if available, otherwise fall back to stored user data
  const user = userProfile || storedUser;
  
  // Get first name and last name from user name
  const nameParts = user?.name ? user.name.split(' ') : ['User'];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  const initials = firstName.charAt(0) + (lastName ? lastName.charAt(0) : '');

  const profileOptions = [
    { 
      name: 'Invite Friends', 
      icon: <Gift size={20} className="text-cyan-400" />, 
      description: 'Earn rewards by inviting friends',
      action: () => navigate('/v/invitefriends')
    },
    { 
      name: 'Update Profile', 
      icon: <Key size={20} className="text-blue-400" />, 
      description: 'Edit your profile and security',
      action: () => navigate('/v/edit-profile')
    },
    { 
      name: 'Help Center', 
      icon: <HelpCircle size={20} className="text-green-400" />, 
      description: 'Get support and answers',
      action: () => navigate('/v/helpcenter')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* User Info Card */}
        <div className="relative overflow-hidden  rounded-2xl shadow-2xl  mb-8">
        
          <div className="relative p-6">
            {/* User Avatar and Info */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {initials.toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-bg-secondary flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-text-primary font-bold text-xl mb-1">{user?.name || 'User Name'}</h2>
                <div className="flex items-center space-x-2 mb-2">
                  <Mail size={14} className="text-text-muted" />
                  <p className="text-sm text-text-muted">{user?.email || 'user@example.com'}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Crown size={14} className="text-yellow-500" />
                    <span className="text-xs font-medium text-yellow-500">Basic</span>
                  </div>
                  
                </div>
                {user?.phone && (
                  <div className="flex items-center space-x-2 mt-2">
                    <User size={14} className="text-text-muted" />
                    <p className="text-sm text-text-muted">{user.phone}</p>
                  </div>
                )}
              
              </div>
            </div>

            {/* Balance Card */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/30 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-300 text-sm font-medium mb-1">Current Balance</p>
                  <p className="text-text-primary text-3xl font-bold">$350.00</p>
                </div>
                <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                  <TrendingUp size={24} className="text-cyan-400" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/v/recharge')}
                className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-xl p-4 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Repeat size={20} className="text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">Recharge</span>
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
                onClick={() => navigate('/v/accountdetails')}
                className="group bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl p-4 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Settings size={20} className="text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">Settings</span>
                </div>
              </button>
              
              <button
                onClick={() => navigate('/admin')}
                className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl p-4 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <User size={20} className="text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">Admin</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Options */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-text-primary mb-4 px-2">Account Options</h3>
          {profileOptions.map((option) => (
            <button
              key={option.name}
              onClick={option.action}
              className="group w-full bg-gradient-to-r from-bg-secondary to-bg-tertiary hover:from-cyan-500/10 hover:to-cyan-600/10 rounded-xl p-4 shadow-lg border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center group-hover:from-cyan-500/20 group-hover:to-cyan-600/20 transition-all duration-300">
                    {option.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="text-text-primary font-semibold text-base group-hover:text-cyan-400 transition-colors">
                      {option.name}
                    </h4>
                    <p className="text-text-muted text-sm group-hover:text-text-secondary transition-colors">
                      {option.description}
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-text-muted group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </button>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-xl p-4 border border-cyan-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Star size={20} className="text-green-400" />
              </div>
              <div>
                <p className="text-text-muted text-xs">Tasks Completed</p>
                <p className="text-text-primary font-bold text-lg">127</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-xl p-4 border border-cyan-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-text-muted text-xs">Total Earned</p>
                <p className="text-text-primary font-bold text-lg">$1,250</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
