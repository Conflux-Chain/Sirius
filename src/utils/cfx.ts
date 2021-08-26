import {
  Conflux,
  format as cfxFormat,
  address as cfxAddress,
} from 'js-conflux-sdk/dist/js-conflux-sdk.umd.min.js';

import { NETWORK_ID, RPC_SERVER } from './constants';

const cfx = new Conflux({
  url: RPC_SERVER,
  networkId: NETWORK_ID,
});

cfx.getClientVersion().then(v => {
  console.log('conflux-network-version:', v);
});

/**
 * format cfx address
 * @param address origin address
 * @param option address format options
 */
const formatAddress = (address: string, option: any = {}) => {
  // if (!address || address.length < 40) return '';
  // do not support private net
  // if (address.toLowerCase().startsWith('net')) return '';
  // conflux net must same with address prefix
  // TODO should write contract params follow this rule?
  // if (address.toLowerCase().startsWith('cfx:') && IS_TESTNET) return '';
  // if (address.toLowerCase().startsWith('cfxtest:') && !IS_TESTNET) return '';

  // @todo, check address is a valid conflux address

  let result = '';
  try {
    result = address.replace(/(._):(._):(.\*)/, '$1:$3').toLowerCase();
    return result;
  } catch (e) {
    console.warn('formatAddress:', address, e.message);
    // transfer to is not valid conflux address, need show error tip
    return address.startsWith('0x') && address.length === 42
      ? 'invalid-' + address
      : '';
  }
};

export { cfx, formatAddress, cfxFormat, cfxAddress };
