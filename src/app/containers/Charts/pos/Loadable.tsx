import { lazyLoad } from 'utils/loadable';

export const Chart = lazyLoad(
  () => import('./index'),
  module => module.Chart,
);

export const FinalizedInterval = lazyLoad(
  () => import('./FinalizedInterval'),
  module => module.FinalizedInterval,
);

export const DailyAccounts = lazyLoad(
  () => import('./DailyAccounts'),
  module => module.DailyAccounts,
);

export const DailyStaking = lazyLoad(
  () => import('./DailyStaking'),
  module => module.DailyStaking,
);

export const DailyAPY = lazyLoad(
  () => import('./DailyAPY'),
  module => module.DailyAPY,
);

export const TotalReward = lazyLoad(
  () => import('./TotalReward'),
  module => module.TotalReward,
);

export const DailyRewardRank = lazyLoad(
  () => import('./DailyRewardRank'),
  module => module.DailyRewardRank,
);

export const DailyDeposit = lazyLoad(
  () => import('./DailyDeposit'),
  module => module.DailyDeposit,
);

export const DailyParticipation = lazyLoad(
  () => import('./DailyParticipation'),
  module => module.DailyParticipation,
);

export const DailyRewardInfo = lazyLoad(
  () => import('./DailyRewardInfo'),
  module => module.DailyRewardInfo,
);
