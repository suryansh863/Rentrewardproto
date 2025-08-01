import { useState } from 'react';
import { useTenantData } from '../../contexts';
import { rewards as rewardsCatalog } from '../../data';
import { GiftIcon, SparklesIcon, ShoppingBagIcon, FilmIcon, TruckIcon } from '@heroicons/react/24/outline';
import BackButton from '../../components/common/BackButton';
import type { RewardCategory } from '../../types';

const TenantRewards = () => {
  const { tenant } = useTenantData();
  const [selectedCategory, setSelectedCategory] = useState<RewardCategory | 'all'>('all');
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);

  if (!tenant) {
    return <div className="text-center text-red-500">Error loading tenant data</div>;
  }

  const filteredRewards = selectedCategory === 'all' 
    ? rewardsCatalog 
    : rewardsCatalog.filter(reward => reward.category === selectedCategory);

  const handleRedeem = (reward: any) => {
    setSelectedReward(reward);
    setShowRedeemModal(true);
  };

  const confirmRedeem = () => {
    // In a real app, this would call an API
    alert(`Successfully redeemed ${selectedReward.name}!`);
    setShowRedeemModal(false);
    setSelectedReward(null);
  };

  const categoryIcons = {
    shopping: ShoppingBagIcon,
    food: GiftIcon,
    entertainment: FilmIcon,
    travel: TruckIcon,
  };

  const categoryColors = {
    shopping: 'from-blue-500 to-indigo-600',
    food: 'from-emerald-500 to-green-600',
    entertainment: 'from-purple-500 to-pink-600',
    travel: 'from-amber-500 to-orange-600',
  };

  return (
    <div className="space-y-6 p-4">
      <BackButton to="/tenant" label="Back to Dashboard" className="mb-4" />
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Rewards Catalog</h2>
        <p className="text-secondary">Redeem your points for amazing rewards</p>
      </div>
      <div className="card-primary stat-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              <SparklesIcon className="w-6 h-6 mr-2" />
              Your Rewards
            </h2>
            <p className="text-white/90 mb-4">
              You have <span className="font-bold text-3xl">{tenant.rewardPoints.toLocaleString()}</span> points to spend
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <GiftIcon className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="card-gradient">
        <h3 className="text-lg font-semibold text-primary mb-4">Categories</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All Rewards
          </button>
          {Object.entries(categoryColors).map(([category, gradient]) => {
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as RewardCategory)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
                  selectedCategory === category
                    ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredRewards.map(reward => {
          const canAfford = tenant.rewardPoints >= reward.pointsCost;
          const IconComponent = categoryIcons[reward.category as keyof typeof categoryIcons];
          const gradient = categoryColors[reward.category as keyof typeof categoryColors];
          
          return (
            <div
              key={reward.id}
              className={`card-gradient hover:scale-105 transition-all duration-300 ${
                !canAfford ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-primary mb-1">{reward.name}</h4>
                  <p className="text-secondary text-sm mb-2">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <SparklesIcon className="w-4 h-4 text-amber-500 mr-1" />
                      <span className="font-semibold text-primary">{reward.pointsCost.toLocaleString()} points</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      reward.category === 'shopping' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                      reward.category === 'food' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                      reward.category === 'entertainment' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' :
                      'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                    }`}>
                      {reward.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleRedeem(reward)}
                disabled={!canAfford}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                  canAfford
                    ? `btn-primary`
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                }`}
              >
                {canAfford ? 'Redeem Now' : 'Insufficient Points'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Redeem Modal */}
      {showRedeemModal && selectedReward && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className={`w-16 h-16 bg-gradient-to-r ${categoryColors[selectedReward.category as keyof typeof categoryColors]} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {(() => {
                  const IconComponent = categoryIcons[selectedReward.category as keyof typeof categoryIcons];
                  return <IconComponent className="w-8 h-8 text-white" />;
                })()}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Redemption</h3>
              <p className="text-gray-600">Are you sure you want to redeem this reward?</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-800">{selectedReward.name}</h4>
              <p className="text-gray-600 text-sm mb-2">{selectedReward.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cost:</span>
                <span className="font-semibold text-gray-800 flex items-center">
                  <SparklesIcon className="w-4 h-4 text-amber-500 mr-1" />
                  {selectedReward.pointsCost.toLocaleString()} points
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRedeemModal(false)}
                className="btn-secondary flex-1 py-3"
              >
                Cancel
              </button>
              <button
                onClick={confirmRedeem}
                className="btn-primary flex-1 py-3"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantRewards; 