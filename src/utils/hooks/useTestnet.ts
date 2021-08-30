const isTestEnv = window.location.hostname.includes('scantest');

export const toTestnet = () => {
  if (isTestEnv)
    return window.location.assign('//testnet-scantest.confluxnetwork.org');
  return window.location.assign('//testnet.confluxscan.io');
};
export const toMainnet = () => {
  if (isTestEnv) return window.location.assign('//scantest.confluxnetwork.org');
  return window.location.assign('//confluxscan.io');
};
