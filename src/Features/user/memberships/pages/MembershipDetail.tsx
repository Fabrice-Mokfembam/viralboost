import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Star, Users, CheckCircle, Zap, Shield, CreditCard, Calendar, Target,  TrendingUp, Gift, AlertCircle, Loader2 } from 'lucide-react';
import { useMemberships, usePurchaseMembership } from '../hooks/useMemberships';
import { useAccount } from '../../accounts/Hooks/useAccount';
import { useGetProfile } from '../../auth/Hooks/useAuth';
import { getUserData } from '../../auth/Utils/authUtils';

const MembershipDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: membershipsResponse, isLoading, error } = useMemberships();
  const { data: accountResponse, isLoading: accountLoading } = useAccount();
  const { data: userProfile } = useGetProfile();
  const purchaseMembershipMutation = usePurchaseMembership();

  const memberships = membershipsResponse?.data?.memberships || [];
  const membership = memberships.find(m => m.id === parseInt(id || '0'));
  
  // Get user data and balance
  const storedUser = getUserData();
  const user = userProfile?.data?.user || storedUser;
  const currentMembershipId = user?.membership?.id;
  const isCurrent = membership?.id === currentMembershipId;
  
  const userBalance = parseFloat(accountResponse?.data?.balance || '0');
  const membershipPrice = parseFloat(membership?.price || '0');
  const canAfford = userBalance >= membershipPrice;
  const isFreeMembership = membershipPrice === 0;

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
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
            <h1 className="text-2xl font-bold text-text-primary">Membership Details</h1>
            <div className="w-10 h-10"></div> {/* Spacer for center alignment */}
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 mb-6">
              {styling.icon}
              <span className="text-cyan-300 font-semibold text-sm">Premium Membership</span>
            </div>
            
            <h2 className="text-4xl font-bold text-text-primary mb-4 bg-gradient-to-r from-text-primary to-cyan-400 bg-clip-text text-transparent">
              {membership.membership_name}
            </h2>
            
            {isCurrent && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 mb-6">
                <CheckCircle size={16} className="text-green-400" />
                <span className="text-green-400 font-semibold text-sm">Your Current Plan</span>
              </div>
            )}
          </div>
        </div>

        {/* Balance and Purchase Info - Only show for paid memberships */}
        {!isFreeMembership && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-3xl p-8 shadow-2xl border border-cyan-500/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-text-primary mb-2">Purchase Information</h3>
                <p className="text-text-muted">Review your balance and purchase eligibility</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Current Balance */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp size={24} className="text-cyan-400" />
                  </div>
                  <p className="text-text-muted text-sm font-medium mb-2">Current Balance</p>
                  <p className="text-3xl font-bold text-text-primary">
                    ${accountLoading ? '...' : userBalance.toFixed(2)}
                  </p>
                </div>

                {/* Membership Price */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CreditCard size={24} className="text-purple-400" />
                  </div>
                  <p className="text-text-muted text-sm font-medium mb-2">Membership Price</p>
                  <p className="text-3xl font-bold text-text-primary">
                    ${membershipPrice.toFixed(2)}
                  </p>
                </div>

                {/* Purchase Status */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {canAfford ? (
                      <CheckCircle size={24} className="text-green-400" />
                    ) : (
                      <AlertCircle size={24} className="text-red-400" />
                    )}
                  </div>
                  <p className="text-text-muted text-sm font-medium mb-2">Purchase Status</p>
                  <p className={`text-xl font-bold ${canAfford ? 'text-green-400' : 'text-red-400'}`}>
                    {canAfford ? 'Can Purchase' : 'Insufficient Balance'}
                  </p>
                </div>
              </div>

            {/* Insufficient Balance Warning */}
            {!canAfford && !isCurrent && (
              <div className="mt-8 p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl border border-red-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertCircle size={24} className="text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-red-400 font-semibold text-lg mb-2">Insufficient Balance</h4>
                    <p className="text-red-300 mb-3">
                      You need <span className="font-bold">${(membershipPrice - userBalance).toFixed(2)}</span> more to purchase this membership.
                    </p>
                    <button 
                      onClick={() => navigate('/v/recharge')}
                      className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Add Funds
                    </button>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        )}

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
                        {isFreeMembership ? 'Free' : `$${membership.price}`}
                      </span>
                      {!isFreeMembership && (
                        <span className={`${styling.textColor} text-xl opacity-80`}>
                          / membership
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className={`${styling.textColor} text-center text-lg leading-relaxed`}>
                    {membership.description}
                  </p>
                </div>

                {/* Purchase Button - Only show if not free membership */}
                {!isFreeMembership && (
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
                )}

                {/* Free Membership Message */}
                {isFreeMembership && (
                  <div className="w-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 py-4 rounded-2xl font-bold text-lg text-center">
                    <CheckCircle size={20} className="inline mr-2" />
                    Free Membership - No Purchase Required
                  </div>
                )}
              </div>
            </div>

            {/* Features & Benefits */}
            <div className="space-y-6">
              {/* Key Features */}
              <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-3xl p-8 shadow-2xl border border-cyan-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                    <Target size={24} className="text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary">Key Features</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-bg-tertiary to-bg-secondary rounded-2xl border border-cyan-500/20">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                      <Calendar size={20} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-text-primary font-semibold text-lg">{membership.tasks_per_day} Tasks Per Day</p>
                      <p className="text-text-muted">Daily task limit for this membership</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-bg-tertiary to-bg-secondary rounded-2xl border border-green-500/20">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <Zap size={20} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-text-primary font-semibold text-lg">Max {membership.max_tasks} Total Tasks</p>
                      <p className="text-text-muted">Maximum tasks available in this plan</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-bg-tertiary to-bg-secondary rounded-2xl border border-purple-500/20">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Star size={20} className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-text-primary font-semibold text-lg">${membership.benefit_amount_per_task} Per Task</p>
                      <p className="text-text-muted">Earnings per completed task</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-3xl p-8 shadow-2xl border border-green-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Shield size={24} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary">Benefits Included</h3>
                </div>
                <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle size={16} className="text-green-400" />
                    </div>
                    <p className="text-text-secondary leading-relaxed text-lg">
                      {membership.description}
                    </p>
                  </div>
                </div>
              </div>

                  {/* Current Membership Status (only show if this is the user's current membership) */}
                  {isCurrent && (
                <>
                  {/* Current Membership Info */}
                  <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-3xl p-8 shadow-2xl border border-green-500/20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <CheckCircle size={24} className="text-green-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-text-primary">Current Membership</h3>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle size={16} className="text-green-400" />
                        </div>
                        <div>
                          <p className="text-text-primary font-semibold text-lg mb-2">You are currently subscribed to this membership</p>
                          <p className="text-text-secondary leading-relaxed">
                            Enjoy all the benefits and features included in this plan. Subscription and progress details will be available soon.
                          </p>
                        </div>
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
