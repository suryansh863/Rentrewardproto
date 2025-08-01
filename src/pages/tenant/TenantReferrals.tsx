import { useState } from 'react';
import { useTenantData } from '../../contexts';
import { UserPlusIcon, ClipboardDocumentIcon, CheckIcon, ShareIcon } from '@heroicons/react/24/outline';
import BackButton from '../../components/common/BackButton';

const TenantReferrals = () => {
  const { tenant } = useTenantData();
  const [copied, setCopied] = useState(false);

  if (!tenant) {
    return <div className="text-center text-red-500">Error loading tenant data</div>;
  }

  const referralLink = `${window.location.origin}/signup?ref=${tenant.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareMessage = `🏠 Join RentRewards and turn your rent into rewards! Use my referral link to get started: ${referralLink}`;

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
      url: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('🏠 Join RentRewards and turn your rent into rewards!')}`,
    },
    {
      name: 'Facebook',
      icon: '📘',
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent('🏠 Join RentRewards and turn your rent into rewards!')}`,
    },
    {
      name: 'Twitter',
      icon: '🐦',
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`,
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
      url: `mailto:?subject=${encodeURIComponent('Join RentRewards!')}&body=${encodeURIComponent(shareMessage)}`,
    },
  ];

  const handleSocialShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="space-y-6 p-4">
      <BackButton to="/tenant" label="Back to Dashboard" className="mb-4" />
      
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2 flex items-center justify-center">
          <UserPlusIcon className="w-6 h-6 mr-2" />
          Refer Friends
        </h2>
        <p className="text-secondary">
          Share RentRewards with friends and earn bonus points for every successful referral!
        </p>
      </div>

      {/* Referral Code */}
      <div className="card-primary stat-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Your Referral Code</h3>
            <p className="text-4xl font-bold">{tenant.referralCode}</p>
            <p className="text-sm mt-2 opacity-80">Share this code to earn points</p>
          </div>
          <UserPlusIcon className="w-12 h-12 opacity-50" />
        </div>
      </div>

      {/* Referral Link */}
      <div className="card-gradient">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Your Referral Link</h3>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="form-input flex-1 text-sm"
          />
          <button
            onClick={handleCopy}
            className="btn-primary px-4 py-2 flex items-center justify-center whitespace-nowrap"
          >
            {copied ? <CheckIcon className="w-5 h-5 mr-2" /> : <ClipboardDocumentIcon className="w-5 h-5 mr-2" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Share this link with friends and family to help them discover RentRewards!
        </p>
      </div>

      {/* Social Sharing */}
      <div className="card-gradient">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
          <ShareIcon className="w-5 h-5 mr-2" />
          Share on Social Media
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Share your referral link directly through your favorite apps
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {socialShareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => handleSocialShare(option.url)}
              className={`${option.color} text-white p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl`}
            >
              <span className="text-2xl mb-2">{option.icon}</span>
              <span className="text-xs font-medium">{option.name}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-blue-500 text-lg">💡</span>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">Sharing Tips</h4>
              <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                <li>• Share with friends who are looking for rental properties</li>
                <li>• Post in local community groups and forums</li>
                <li>• Include a personal message about your experience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card-success">
          <h3 className="text-lg font-semibold mb-1">Successful Referrals</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="text-white/80 text-sm mt-2">Friends joined through your link</p>
        </div>
        
        <div className="card-warning">
          <h3 className="text-lg font-semibold mb-1">Bonus Points Earned</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="text-white/80 text-sm mt-2">Points from referral bonuses</p>
        </div>
      </div>

      {/* How it Works */}
      <div className="card-gradient">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">How Referrals Work</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">Share Your Link</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Send your unique referral link to friends and family</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">They Sign Up</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your friend creates an account using your referral link</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">Earn Rewards</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Both you and your friend receive bonus reward points!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantReferrals; 