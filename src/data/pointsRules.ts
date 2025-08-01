import type { PointsRules } from '../types';

export const pointsRules: PointsRules = {
  onTimeRent: {
    basePoints: 10, // Points per 1000 AED of rent
    earlySubmissionBonus: 5, // Additional points if submitted 3+ days before due date
    lateSubmissionPenalty: 5, // Points deducted if submitted after due date
    minimumPoints: 0 // Cannot go below zero
  },
  referrals: {
    tenantReferral: {
      invited: 0,
      joined: 500
    },
    ownerReferral: {
      invited: 0,
      joined: 1000,
      perPropertyBonus: 500,
      perTenantBonus: 100
    }
  }
}; 