import  { useState } from 'react';
import { Clipboard, ArrowLeft } from 'lucide-react';
import { generateReferralLink } from '../../auth/Utils/referralUtils';
import { getUserData } from '../../auth/Utils/authUtils';
import { useNavigate } from 'react-router-dom';

const InviteFriends = () => {
  const navigate = useNavigate();
  const user = getUserData();
  const referralCode = user?.referral_code || 'ABCD1234'; // Fallback for demo
  const referralLink = generateReferralLink(referralCode);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: 'code' | 'link') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/dashboard/profile')}
            className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Invite Friends</h1>
          <div className="w-10 h-10"></div> {/* Spacer for center alignment */}
        </div>

        <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8">
          <div className="relative p-6">
            <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-6 space-y-6 border border-cyan-500/20">
              <div>
                <label className="block text-text-muted mb-2 font-semibold">Your Referral Code</label>
                <div className="flex items-center bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-4 justify-between border border-gray-600 hover:border-cyan-500/50 transition-all duration-300">
                  <span className="tracking-widest font-mono text-text-primary text-lg">{referralCode}</span>
                  <button
                    onClick={() => copyToClipboard(referralCode, 'code')}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 hover:scale-110 transform"
                    aria-label="Copy referral code"
                  >
                    <Clipboard size={24} />
                  </button>
                </div>
                {copied === 'code' && <p className="text-green-400 mt-2 text-sm">Copied to clipboard!</p>}
              </div>

              <div>
                <label className="block text-text-muted mb-2 font-semibold">Your Referral Link</label>
                <div className="flex items-center bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-4 justify-between border border-gray-600 hover:border-cyan-500/50 transition-all duration-300">
                  <span className="text-sm text-text-primary break-all flex-1 mr-3">{referralLink}</span>
                  <button
                    onClick={() => copyToClipboard(referralLink, 'link')}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 hover:scale-110 transform flex-shrink-0"
                    aria-label="Copy referral link"
                  >
                    <Clipboard size={24} />
                  </button>
                </div>
                {copied === 'link' && <p className="text-green-400 mt-2 text-sm">Copied to clipboard!</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <div className="relative p-6">
            <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl p-4 border border-cyan-500/20">
              <p className="text-text-muted text-center text-sm">
                Share your referral code/link with friends and earn bonus rewards when they join and complete tasks!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriends;
