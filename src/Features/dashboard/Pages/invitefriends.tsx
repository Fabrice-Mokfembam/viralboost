import  { useState } from 'react';
import { Clipboard } from 'lucide-react';

const InviteFriends = () => {
  const referralCode = 'ABCD1234';
  const referralLink = 'https://yourapp.com/referral/ABCD1234';
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: 'code' | 'link') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <div className="min-h-screen bg-bg-main p-6 max-w-md mx-auto text-text-secondary">
      <h1 className="text-3xl font-bold text-accent-cyan mb-6 text-center">Invite Friends</h1>

      <div className="bg-bg-secondary rounded-xl p-6 shadow-lg space-y-6">
        <div>
          <label className="block text-text-muted mb-1 font-semibold">Your Referral Code</label>
          <div className="flex items-center bg-bg-tertiary rounded-lg p-3 justify-between cursor-pointer">
            <span className="tracking-widest font-mono text-text-primary">{referralCode}</span>
            <button
              onClick={() => copyToClipboard(referralCode, 'code')}
              className="text-accent-cyan hover:text-cyan-500 transition"
              aria-label="Copy referral code"
            >
              <Clipboard size={24} />
            </button>
          </div>
          {copied === 'code' && <p className="text-green-400 mt-1 text-sm">Copied to clipboard!</p>}
        </div>

        <div>
          <label className="block text-text-muted mb-1 font-semibold">Your Referral Link</label>
          <div className="flex items-center bg-bg-tertiary rounded-lg p-3 justify-between cursor-pointer break-all">
            <span className="text-sm text-text-primary">{referralLink}</span>
            <button
              onClick={() => copyToClipboard(referralLink, 'link')}
              className="text-accent-cyan hover:text-cyan-500 transition"
              aria-label="Copy referral link"
            >
              <Clipboard size={24} />
            </button>
          </div>
          {copied === 'link' && <p className="text-green-400 mt-1 text-sm">Copied to clipboard!</p>}
        </div>

        <p className="text-text-muted mt-4 text-center">
          Share your referral code/link with friends and earn bonus rewards when they join and complete tasks!
        </p>
      </div>
    </div>
  );
};

export default InviteFriends;
