import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Star, Users, CheckCircle, Zap, Shield, CreditCard, Calendar, Target,  TrendingUp, Gift, AlertCircle, Loader2 } from 'lucide-react';
import { useMemberships, useMyMembership, usePurchaseMembership } from '../hooks/useMemberships';
import { useAccount } from '../../accounts/Hooks/useAccount';
import { useGetProfile } from '../../auth/Hooks/useAuth';
import { getUserData } from '../../auth/Utils/authUtils';

const MembershipDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: membershipsResponse, isLoading, error } = useMemberships();
  const { data: myMembershipResponse } = useMyMembership();
  const { data: accountResponse, isLoading: accountLoading } = useAccount();
  const { data: userProfile } = useGetProfile();
  const purchaseMembershipMutation = usePurchaseMembership();

  const memberships = membershipsResponse?.data?.memberships || [];
  const membership = memberships.find(m => m.id === parseInt(id || '0'));
  const currentMembershipId = myMembershipResponse?.data?.membership?.id;
  const isCurrent = membership?.id === currentMembershipId;
  
  // Get user data and balance
  const storedUser = getUserData();
  const user = userProfile?.data?.user || storedUser;
  const userBalance = parseFloat(accountResponse?.data?.balance || '0');
  const membershipPrice = parseFloat(membership?.price || '0');
  const canAfford = userBalance >= membershipPrice;
  
  // Extract subscription and daily progress data for current membership
  const subscription = myMembershipResponse?.data?.subscription;
  const dailyProgress = myMembershipResponse?.data?.daily_progress;

  // Handle membership purchase
  const handlePurchase = async () => {
    if (!membership || !user?.uuid) {
      alert('Unable to process purchase. Please try again.');
      return;
    }

    if (!canAfford) {
      alert('Insufficient balance to purchase this membership');
      return;
    }

    try {
      await purchaseMembershipMutation.mutateAsync({
        user_uuid: user.uuid,
        membership_id: membership.id,
        membership_name: membership.membership_name
      });
      
      alert('Membership purchased successfully!');
    } catch (error: unknown) {
      console.error('Purchase error:', error);
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } })?.response?.data?.message 
        : 'Failed to purchase membership. Please try again.';
      alert(errorMessage);
    }
  };

  // Helper function to get membership styling based on membership ID (random colors)
  const getMembershipStyling = (membership: { id: number }) => {
    const membershipId = membership.id;
    
    // Define color schemes for different membership IDs
    const colorSchemes = [
      {
        icon: <Users size={32} className="text-gray-400" />,
        bgColor: 'from-gray-800 via-gray-700 to-gray-800',
        borderColor: 'border-gray-600',
        textColor: 'text-gray-300',
        buttonColor: 'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800',
        accentColor: 'text-gray-400',
      },
      {
        icon: <Star size={32} className="text-yellow-400" />,
        bgColor: 'from-cyan-600 via-cyan-700 to-cyan-800',
        borderColor: 'border-cyan-500',
        textColor: 'text-cyan-100',
        buttonColor: 'from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700',
        accentColor: 'text-cyan-400',
      },
      {
        icon: <Crown size={32} className="text-yellow-300" />,
        bgColor: 'from-purple-600 via-pink-600 to-red-600',
        borderColor: 'border-purple-500',
        textColor: 'text-purple-100',
        buttonColor: 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
        accentColor: 'text-purple-400',
      },
      {
        icon: <Zap size={32} className="text-green-400" />,
        bgColor: 'from-green-600 via-emerald-700 to-teal-800',
        borderColor: 'border-green-500',
        textColor: 'text-green-100',
        buttonColor: 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
        accentColor: 'text-green-400',
      },
      {
        icon: <Shield size={32} className="text-blue-400" />,
        bgColor: 'from-blue-600 via-indigo-700 to-purple-800',
        borderColor: 'border-blue-500',
        textColor: 'text-blue-100',
        buttonColor: 'from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700',
        accentColor: 'text-blue-400',
      },
      {
        icon: <Gift size={32} className="text-pink-400" />,
        bgColor: 'from-pink-600 via-rose-700 to-red-800',
        borderColor: 'border-pink-500',
        textColor: 'text-pink-100',
        buttonColor: 'from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700',
        accentColor: 'text-pink-400',
      }
    ];
    
    // Use membership ID to select color scheme (cycling through available schemes)
    const schemeIndex = (membershipId - 1) % colorSchemes.length;
    return colorSchemes[schemeIndex];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
          <p className="text-text-muted text-lg">Loading membership details...</p>
        </div>
      </div>
    );
  }

  if (error || !membership) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg font-medium mb-2">Membership not found</p>
          <button
            onClick={() => navigate('/v/membership')}
            className="text-cyan-400 hover:text-cyan-300 underline"
          >
            Back to Memberships
          </button>
        </div>
      </div>
    );
  }

  const styling = getMembershipStyling(membership);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-10 w-24 h-24 bg-blue-500/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-green-500/5 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 pt-8 pb-20 px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Memberships
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 mb-6">
              {styling.icon}
              <span className="text-cyan-300 font-semibold text-sm">Membership Details</span>
            </div>
            
            <h1 className="text-4xl font-bold text-text-primary mb-4 bg-gradient-to-r from-text-primary to-cyan-400 bg-clip-text text-transparent">
              {membership.membership_name}
            </h1>
            
            {isCurrent && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 mb-6">
                <CheckCircle size={16} className="text-green-400" />
                <span className="text-green-400 font-semibold text-sm">Your Current Plan</span>
              </div>
            )}
          </div>
        </div>

        {/* Balance and Purchase Info */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-cyan-500/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Current Balance */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp size={20} className="text-cyan-400" />
                  <span className="text-text-muted text-sm font-medium">Current Balance</span>
                </div>
                <p className="text-2xl font-bold text-text-primary">
                  ${accountLoading ? '...' : userBalance.toFixed(2)}
                </p>
              </div>

              {/* Membership Price */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CreditCard size={20} className="text-purple-400" />
                  <span className="text-text-muted text-sm font-medium">Membership Price</span>
                </div>
                <p className="text-2xl font-bold text-text-primary">
                  ${membershipPrice.toFixed(2)}
                </p>
              </div>

              {/* Purchase Status */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {canAfford ? (
                    <CheckCircle size={20} className="text-green-400" />
                  ) : (
                    <AlertCircle size={20} className="text-red-400" />
                  )}
                  <span className="text-text-muted text-sm font-medium">Purchase Status</span>
                </div>
                <p className={`text-lg font-bold ${canAfford ? 'text-green-400' : 'text-red-400'}`}>
                  {canAfford ? 'Can Purchase' : 'Insufficient Balance'}
                </p>
              </div>
            </div>

            {/* Insufficient Balance Warning */}
            {!canAfford && !isCurrent && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-400 font-medium mb-1">Insufficient Balance</p>
                    <p className="text-red-300 text-sm">
                      You need ${(membershipPrice - userBalance).toFixed(2)} more to purchase this membership. 
                      <button 
                        onClick={() => navigate('/v/recharge')}
                        className="underline hover:text-red-200 ml-1"
                      >
                        Add funds
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Membership Card */}
            <div className={`relative overflow-hidden bg-gradient-to-br ${styling.bgColor} rounded-3xl p-8 shadow-2xl border-2 ${styling.borderColor}`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center">
                    {styling.icon}
                  </div>
                  <h2 className={`${styling.textColor} font-bold text-3xl mb-4`}>
                    {membership.membership_name}
                  </h2>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2">
                      <span className={`${styling.textColor} text-5xl font-bold`}>
                        ${membership.price}
                      </span>
                      <span className={`${styling.textColor} text-xl opacity-80`}>
                        / membership
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className={`${styling.textColor} text-center text-lg leading-relaxed`}>
                    {membership.description}
                  </p>
                </div>

                {/* Purchase Button */}
                <button
                  onClick={isCurrent ? undefined : handlePurchase}
                  disabled={isCurrent || purchaseMembershipMutation.isPending || accountLoading}
                  className={`w-full bg-gradient-to-r ${styling.buttonColor} text-white py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  {isCurrent ? (
                    <>
                      <CheckCircle size={20} />
                      Current Plan
                    </>
                  ) : purchaseMembershipMutation.isPending ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      Purchase Now
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Features & Benefits */}
            <div className="space-y-6">
              {/* Key Features */}
              <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-cyan-500/20">
                <h3 className="text-text-primary font-bold text-xl mb-4 flex items-center gap-2">
                  <Target size={20} className="text-cyan-400" />
                  Key Features
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <Calendar size={16} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">{membership.tasks_per_day} Tasks Per Day</p>
                      <p className="text-text-muted text-sm">Daily task limit for this membership</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Zap size={16} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">Max {membership.max_tasks} Total Tasks</p>
                      <p className="text-text-muted text-sm">Maximum tasks available in this plan</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Star size={16} className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">${membership.benefit_amount_per_task} Per Task</p>
                      <p className="text-text-muted text-sm">Earnings per completed task</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-cyan-500/20">
                <h3 className="text-text-primary font-bold text-xl mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-green-400" />
                  Benefits Included
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={14} className="text-green-400" />
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {membership.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Current Membership Status (only show if this is the user's current membership) */}
              {isCurrent && subscription && dailyProgress && (
                <>
                  {/* Subscription Status */}
                  <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-green-500/20">
                    <h3 className="text-text-primary font-bold text-xl mb-4 flex items-center gap-2">
                      <Calendar size={20} className="text-green-400" />
                      Subscription Status
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-text-muted">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          subscription.is_active 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {subscription.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-muted">Started:</span>
                        <span className="text-text-primary">
                          {new Date(subscription.started_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-muted">Expires:</span>
                        <span className="text-text-primary">
                          {new Date(subscription.expires_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-muted">Remaining Days:</span>
                        <span className="text-text-primary font-semibold">
                          {subscription.remaining_days} days
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Daily Progress */}
                  <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-blue-500/20">
                    <h3 className="text-text-primary font-bold text-xl mb-4 flex items-center gap-2">
                      <TrendingUp size={20} className="text-blue-400" />
                      Today's Progress
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-text-muted">Tasks Completed:</span>
                        <span className="text-text-primary font-semibold">
                          {dailyProgress.tasks_completed} / {dailyProgress.daily_limit}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-muted">Remaining Tasks:</span>
                        <span className="text-text-primary font-semibold">
                          {dailyProgress.remaining_tasks}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(dailyProgress.tasks_completed / dailyProgress.daily_limit) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Progress:</span>
                        <span className="text-text-primary">
                          {Math.round((dailyProgress.tasks_completed / dailyProgress.daily_limit) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipDetail;
