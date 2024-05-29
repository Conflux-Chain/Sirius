import { useLocation } from 'react-router-dom';
import { useBreakpoint } from 'sirius-next/packages/common/dist/utils/media';
import qs from 'query-string';

export const usePlatform = () => {
  const { search } = useLocation();
  const bp = useBreakpoint();

  const queries = qs.parse(search || '');
  const isDapp = queries.platform === 'dapp';

  let platform = '';

  if (bp === 's' || bp === 'm') {
    platform = 'mobile';
  } else {
    platform = 'pc';
  }

  return {
    platform,
    isDapp,
  };
};
