// Service for daily reward chest/spin wheel
// TODO: Implement daily reward logic and DB integration

export const getDailyRewardStatus = async (userId: string) => {
  // TODO: Fetch daily reward status from DB
  return { claimed: false, nextAvailable: new Date().toISOString() };
};

export const claimDailyReward = async (userId: string) => {
  // TODO: Mark daily reward as claimed and grant reward
  return { success: true, reward: 'coins', amount: 10 };
}; 