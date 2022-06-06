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
