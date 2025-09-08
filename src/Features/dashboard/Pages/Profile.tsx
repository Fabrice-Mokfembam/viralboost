import { CreditCard, Repeat, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const profileOptions = ['Invite Friends', 'Change password', 'Help Center'];

  return (
    <div className="min-h-screen bg-bg-main flex flex-col items-center py-8 ">
      {/* User Info Card */}
      <div className="w-full max-w-md rounded-lg mb-6 shadow-lg text-text-secondary  py-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-bg-tertiary flex items-center justify-center text-gray-500 text-3xl font-bold">
            U
          </div>
          <div>
            <h2 className="text-text-primary font-bold text-lg">User Name</h2>
            <p className="text-sm text-text-muted">user@example.com</p>
            <p className="text-xs mt-1">Membership: Basic</p>
            <p className="text-xs">Days Left: 15</p>
          </div>
        </div>

        <div className="bg-bg-tertiary rounded-md py-3 text-center mb-5">
          <p className="text-accent-cyan text-sm font-semibold">Balance</p>
          <p className="text-text-primary text-2xl font-bold">350.00$</p>
        </div>

        {/* Action Icons */}
        <div className="flex justify-around mb-6">
          <button
            onClick={() => navigate('/v/recharge')}
            className="flex flex-col items-center space-y-1 bg-cyan-500 rounded-md p-4 shadow-lg text-text-primary"
          >
            <Repeat size={24} />
            <span className="text-xs font-semibold">Recharge</span>
          </button>
          <button
            onClick={() => navigate('/v/withdraw')}
            className="flex flex-col items-center space-y-1 bg-cyan-500 rounded-md p-4 shadow-lg text-text-primary"
          >
            <CreditCard size={24} />
            <span className="text-xs font-semibold">Withdraw</span>
          </button>
          <button
            onClick={() => navigate('/v/accountdetails')}
            className="flex flex-col items-center space-y-1 bg-bg-tertiary rounded-md p-4 shadow-lg text-text-muted"
          >
            <Settings size={24} />
            <span className="text-xs font-semibold">Account details</span>
          </button>
        </div>

        {/* Profile Options */}
        <div className="space-y-3">
          {profileOptions.map((item) => (
            <button
              key={item}
              onClick={() => {
                if (item === 'Invite Friends') {
                  navigate('/v/invitefriends');
                } else if (item === 'Change password') {
                  // Link to change password page or fallback
                  navigate('/v/accountdetails');
                } else if (item === 'Help Center') {
                  navigate('/v/helpcenter');
                }
              }}
              className="w-full flex justify-between items-center bg-bg-tertiary text-text-secondary py-3 px-4 rounded-md shadow hover:bg-gray-600 focus:outline-none"
            >
              <span>{item}</span>
              <svg
                className="w-5 h-5 text-text-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
