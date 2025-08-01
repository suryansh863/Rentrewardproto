import { useState } from 'react';
import { useOwnerData } from '../../contexts';
import { 
  UserPlusIcon, 
  ClipboardDocumentIcon, 
  CheckIcon, 
  ShareIcon,
  BuildingOfficeIcon,
  UsersIcon,
  TrophyIcon,
  ChartBarIcon,
  StarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import BackButton from '../../components/common/BackButton';

const OwnerReferrals = () => {
  const { owner } = useOwnerData();
  const [copied, setCopied] = useState(false);

  if (!owner) {
    return <div className="text-center text-red-500">Error loading owner data</div>;
  }

  const referralLink = `${window.location.origin}/owner/signup?ref=${owner.referralCode}`;
  const totalReferredOwners = owner.referrals.length;
  const joinedReferrals = owner.referrals.filter(ref => ref.status === 'joined');
  const pendingReferrals = owner.referrals.filter(ref => ref.status === 'invited');
  const totalBonus = owner.referrals.reduce((sum, ref) => sum + (ref.bonusEarned || 0), 0);
  const totalPropertiesAdded = joinedReferrals.reduce((sum, ref) => sum + (ref.propertiesAdded || 0), 0);
  const totalTenantsOnboarded = joinedReferrals.reduce((sum, ref) => sum + (ref.tenantsOnboarded || 0), 0);
  
  // Calculate potential bonus from pending referrals
  const potentialBonus = pendingReferrals.length * 1000; // AED 1000 per new referral
  
  // Performance metrics
  const conversionRate = totalReferredOwners > 0 ? Math.round((joinedReferrals.length / totalReferredOwners) * 100) : 0;
  const avgPropertiesPerReferral = joinedReferrals.length > 0 ? Math.round(totalPropertiesAdded / joinedReferrals.length * 10) / 10 : 0;
  const avgTenantsPerReferral = joinedReferrals.length > 0 ? Math.round(totalTenantsOnboarded / joinedReferrals.length * 10) / 10 : 0;
  
  // Top performer
  const topPerformer = joinedReferrals.length > 0 
    ? joinedReferrals.reduce((top, current) => 
        ((current.propertiesAdded || 0) + (current.tenantsOnboarded || 0)) > ((top.propertiesAdded || 0) + (top.tenantsOnboarded || 0))
          ? current : top
      ) 
    : null;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareMessage = `🏢 Join RentRewards as a property owner and manage your rentals efficiently! Use my referral link: ${referralLink}`;

  const socialShareOptions = [
    {
      name: 'WhatsApp',
      icon: '📱',
      color: 'bg-green-500 hover:bg-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
    },
    {
      name: 'Telegram',
      icon: '✈️',
      color: 'bg-blue-500 hover:bg-blue-600',
      url: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('🏢 Join RentRewards as a property owner!')}`,
    },
    {
      name: 'Facebook',
      icon: '📘',
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent('🏢 Join RentRewards as a property owner and manage your rentals efficiently!')}`,
    },
    {
      name: 'Twitter',
      icon: '🐦',
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`,
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
    },
    {
      name: 'SMS',
      icon: '💬',
      color: 'bg-purple-500 hover:bg-purple-600',
      url: `sms:?body=${encodeURIComponent(shareMessage)}`,
    },
    {
      name: 'Email',
      icon: '📧',
      color: 'bg-gray-600 hover:bg-gray-700',
      url: `mailto:?subject=${encodeURIComponent('Join RentRewards as a Property Owner!')}&body=${encodeURIComponent(shareMessage)}`,
    },
  ];

  const handleSocialShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="space-y-8 p-6">
      <BackButton to="/owner" label="Back to Dashboard" className="mb-4" />
      {/* Header */}
      <div className="card-gradient hero-pattern">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center">
              <UserPlusIcon className="w-8 h-8 mr-3" />
              Referral Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your referral performance and maximize your earning potential
            </p>
          </div>
          <div className="hidden lg:block">
            <ChartBarIcon className="w-20 h-20 text-indigo-500 animate-pulse-slow" />
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-success stat-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Total Referred</h3>
              <p className="text-4xl font-bold">{totalReferredOwners}</p>
              <p className="text-sm mt-2 opacity-80">{joinedReferrals.length} joined, {pendingReferrals.length} pending</p>
            </div>
            <UserPlusIcon className="w-12 h-12 opacity-50" />
          </div>
        </div>

        <div className="card-primary stat-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Total Bonus Earned</h3>
              <p className="text-4xl font-bold">AED {totalBonus.toLocaleString()}</p>
              <p className="text-sm mt-2 opacity-80">From successful referrals</p>
            </div>
            <CurrencyDollarIcon className="w-12 h-12 opacity-50" />
          </div>
        </div>

        <div className="card-warning stat-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Potential Bonus</h3>
              <p className="text-4xl font-bold">AED {potentialBonus.toLocaleString()}</p>
              <p className="text-sm mt-2 opacity-80">From pending invites</p>
            </div>
            <TrophyIcon className="w-12 h-12 opacity-50" />
          </div>
        </div>

        <div className="card-gradient stat-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Conversion Rate</h3>
              <p className="text-4xl font-bold">{conversionRate}%</p>
              <p className="text-sm mt-2 opacity-80">Invites to joiners</p>
            </div>
            <ChartBarIcon className="w-12 h-12 opacity-50" />
          </div>
        </div>
      </div>

      {/* Impact Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Referral Impact */}
        <div className="card-gradient">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <BuildingOfficeIcon className="w-6 h-6 mr-2" />
            Referral Impact
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center">
                <BuildingOfficeIcon className="w-8 h-8 text-indigo-500 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100">Properties Added</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Through your referrals</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{totalPropertiesAdded}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg: {avgPropertiesPerReferral}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center">
                <UsersIcon className="w-8 h-8 text-emerald-500 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100">Tenants Onboarded</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">By referred owners</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{totalTenantsOnboarded}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg: {avgTenantsPerReferral}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center">
                <ChartBarIcon className="w-8 h-8 text-purple-500 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100">Platform Growth</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your contribution</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{((totalPropertiesAdded + totalTenantsOnboarded) * 0.15).toFixed(1)}%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Estimated impact</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performer & Bonus Structure */}
        <div className="space-y-6">
          {/* Top Performer */}
          {topPerformer && (
            <div className="card-success">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                <StarIcon className="w-6 h-6 mr-2" />
                Top Performing Referral
              </h3>
              <div className="bg-white/30 dark:bg-gray-800/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">{topPerformer.name}</h4>
                  <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">
                    🏆 Top Performer
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{topPerformer.propertiesAdded || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Properties</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{topPerformer.tenantsOnboarded || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tenants</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">AED {topPerformer.bonusEarned || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bonus Generated</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bonus Structure */}
          <div className="card-gradient">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <CurrencyDollarIcon className="w-6 h-6 mr-2" />
              Bonus Structure
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">New Owner Signup</span>
                <span className="font-bold text-green-600 dark:text-green-400">AED 1,000</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">First Property Added</span>
                <span className="font-bold text-green-600 dark:text-green-400">AED 500</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">First Tenant Onboarded</span>
                <span className="font-bold text-green-600 dark:text-green-400">AED 300</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Milestone Bonus (5+ referrals)</span>
                  <span className="font-bold text-orange-600 dark:text-orange-400">AED 2,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="card-gradient">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
          <ShareIcon className="w-6 h-6 mr-2" />
          Share Your Referral Link
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Share this link with other property owners to earn bonuses when they join RentRewards!
        </p>
        
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleCopy}
              className="btn-primary flex items-center space-x-2"
            >
              {copied ? (
                <>
                  <CheckIcon className="w-5 h-5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <ClipboardDocumentIcon className="w-5 h-5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Sharing */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Share on Social Media</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {socialShareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => handleSocialShare(option.url)}
              className={`${option.color} text-white p-3 rounded-lg flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 shadow-md`}
              title={`Share on ${option.name}`}
            >
              <span className="text-2xl mb-1">{option.icon}</span>
              <span className="text-xs font-medium">{option.name}</span>
            </button>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Referral Tips</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Share with property owners who manage multiple units</li>
            <li>• Best results come from personal recommendations</li>
            <li>• Follow up with invited contacts after a few days</li>
            <li>• Highlight the benefits of automated rent tracking</li>
          </ul>
        </div>
      </div>

      {/* How It Works */}
      <div className="card-gradient">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
          <TrophyIcon className="w-6 h-6 mr-2" />
          How the Referral Program Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Share Your Link</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Send your unique referral link to other property owners through social media, email, or direct messaging
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">They Join & Grow</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              When they sign up using your link and start adding properties and tenants, you both benefit from the platform
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Earn Rewards</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You receive bonus payments based on their activity, and they get special welcome benefits for joining through your referral
            </p>
          </div>
        </div>
      </div>

      {/* Referred Owners Table */}
      <div className="card-gradient">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
          <UsersIcon className="w-6 h-6 mr-2" />
          Your Referred Owners ({totalReferredOwners})
        </h2>
        {totalReferredOwners > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Owner Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Properties
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Tenants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Impact Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Bonus Earned
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {owner.referrals.map(referral => {
                  const impactScore = (referral.propertiesAdded || 0) + (referral.tenantsOnboarded || 0);
                  const isTopPerformer = topPerformer?.id === referral.id;
                  
                  return (
                    <tr key={referral.id} className={`hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors ${isTopPerformer ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{referral.name.charAt(0)}</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <div className="font-medium text-gray-900 dark:text-gray-100">{referral.name}</div>
                              {isTopPerformer && (
                                <span className="ml-2 text-yellow-500" title="Top Performer">🏆</span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{referral.email}</div>
                            {referral.joinedDate && (
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                Joined {new Date(referral.joinedDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          referral.status === 'joined' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        }`}>
                          {referral.status === 'joined' ? '✅ Active' : '⏳ Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <BuildingOfficeIcon className="w-5 h-5 text-indigo-500 mr-2" />
                          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{referral.propertiesAdded || 0}</span>
                        </div>
                        {referral.status === 'joined' && (
                          <div className="text-xs text-gray-500 dark:text-gray-500">Properties added</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <UsersIcon className="w-5 h-5 text-emerald-500 mr-2" />
                          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{referral.tenantsOnboarded || 0}</span>
                        </div>
                        {referral.status === 'joined' && (
                          <div className="text-xs text-gray-500 dark:text-gray-500">Tenants onboarded</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${
                            impactScore >= 5 ? 'bg-green-500' : 
                            impactScore >= 3 ? 'bg-yellow-500' : 
                            impactScore >= 1 ? 'bg-blue-500' : 'bg-gray-400'
                          }`}></div>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">{impactScore}</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          {impactScore >= 5 ? 'High Impact' : 
                           impactScore >= 3 ? 'Medium Impact' : 
                           impactScore >= 1 ? 'Growing' : 'New'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-lg text-emerald-600 dark:text-emerald-400">
                          AED {referral.bonusEarned ? referral.bonusEarned.toLocaleString() : '0'}
                        </div>
                        {referral.status === 'invited' && (
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            Potential: AED 1,000+
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <UserPlusIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Start Building Your Network</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Invite property owners to join RentRewards and earn bonuses for each successful referral. 
              Your referrals will appear here with detailed analytics.
            </p>
            <button
              onClick={handleCopy}
              className="btn-primary"
            >
              <ClipboardDocumentIcon className="w-5 h-5 mr-2" />
              Copy Referral Link to Start
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerReferrals; 