import { isTestNetEnv } from './hooks/useTestnet';
import lodash from 'lodash';

export const RPC_SERVER = window.location.origin + '/rpcv2'; // cip-37

export const IS_TESTNET = isTestNetEnv();

enum DEFAULT_NETWORK_IDS {
  mainnet = 1029,
  testnet = 1,
}

/**
 * @todo
 * 1. setNFTCacheInfo cacheKey
 * 2. GlobalTip
 *
 * @export
 * @enum {number}
 */
export enum LOCALSTORAGE_KEYS_MAP {
  networkId = 'CONFLUX_SCAN_NETWORK_ID',
  currency = 'CONFLUX_SCAN_LOCALSTORAGE_KEY_CURRENCY',
  ageFormat = 'CONFLUX_SCAN_TABLE_AGE_FORMAT',
  cookieAgreed = 'CONFLUXSCAN_COOKIE_AGREED',
  txnRecords = 'CONFLUXSCAN_TXN_RECORDS',
}

export const NETWORK_ID = (() => {
  let networkId = IS_TESTNET
    ? DEFAULT_NETWORK_IDS.testnet
    : DEFAULT_NETWORK_IDS.mainnet;
  let cacheNetworkId = Number(
    localStorage.getItem(LOCALSTORAGE_KEYS_MAP.networkId),
  );

  if (lodash.isFinite(cacheNetworkId)) {
    networkId = Number(cacheNetworkId);
  }
  return networkId;
})();

export const addressTypeContract = 'contract';
export const addressTypeCommon = 'common';
export const addressTypeInternalContract = 'internalContract';
export const cfxTokenTypes = {
  erc20: 'ERC20',
  erc777: 'ERC777',
  erc721: 'ERC721',
  erc1155: 'ERC1155',
  crc20: 'CRC20',
  crc777: 'CRC777',
  crc721: 'CRC721',
  crc1155: 'CRC1155',
  cfx: 'CFX',
};

// same as connectWallet.notify.action in i18n file
export enum TxnAction {
  default = 100,
  contractWrite = 101,
  contractEdit = 102,
  writeContract = 103,
  readContract = 104,
  sponsorApplication = 105,
  contractDeplpy = 106,
  swapWCFXToCFX = 107,
  swapCFXToWCFX = 108,
}

export const CURRENCY_SYMBOLS = {
  USD: '$',
  CNY: '¥',
  GBP: '£',
  KRW: '₩',
  RUB: '₽',
  EUR: '€',
};

export const getCurrency = () => {
  return localStorage.getItem(LOCALSTORAGE_KEYS_MAP.currency) || 'USD';
};

export const getCurrencySymbol = () => {
  return CURRENCY_SYMBOLS[getCurrency()];
};

export const InternalContracts = {
  'cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2mhjju8k': 'AdminControl',
  'CFX:TYPE.BUILTIN:AAEJUAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2MHJJU8K': 'AdminControl',
  'cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaegg2r16ar': 'SponsorWhitelistControl',
  'CFX:TYPE.BUILTIN:AAEJUAAAAAAAAAAAAAAAAAAAAAAAAAAAAEGG2R16AR':
    'SponsorWhitelistControl',
  'cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaajrwuc9jnb': 'Staking',
  'CFX:TYPE.BUILTIN:AAEJUAAAAAAAAAAAAAAAAAAAAAAAAAAAAJRWUC9JNB': 'Staking',
};
