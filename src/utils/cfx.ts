import {
  Conflux,
  format as cfxFormat,
  address as cfxAddress,
} from 'js-conflux-sdk/dist/js-conflux-sdk.umd.min.js';
import Faucet from './sponsorFaucet/faucet';

import { IS_TESTNET, NETWORK_ID, RPC_SERVER } from './constants';

const cfx = new Conflux({
  url: RPC_SERVER,
  networkId: NETWORK_ID,
});

cfx.getClientVersion().then(v => {
  console.log('conflux-network-version:', v);
});

// global show hex address switch
export const getGlobalShowHexAddress = () => {
  return localStorage.getItem('conflux-scan-show-hex-address') === 'true';
};

/**
 * format cfx address
 * @param address origin address
 * @param option address format options
 */
const formatAddress = (address: string | undefined, option: any = {}) => {
  if (!address || address.length < 40) return '';
  // do not support private net
  if (address.toLowerCase().startsWith('net')) return '';
  // conflux net must same with address prefix
  // TODO should write contract params follow this rule?
  if (address.toLowerCase().startsWith('cfx:') && IS_TESTNET) return '';
  if (address.toLowerCase().startsWith('cfxtest:') && !IS_TESTNET) return '';
  const addressOptions = Object.assign(
    {
      networkId: NETWORK_ID,
      hex: getGlobalShowHexAddress(),
      withType: false,
    },
    option,
  );
  try {
    if (addressOptions.hex) {
      return cfxFormat.hexAddress(
        cfxFormat.address(address, addressOptions.networkId),
      );
    }
    if (!addressOptions.withType) {
      // TODO simplifyCfxAddress
      return cfxFormat.address(
        cfxFormat.hexAddress(address),
        addressOptions.networkId,
      );
    }
    return cfxFormat.address(
      address,
      addressOptions.networkId,
      addressOptions.withType,
    );
  } catch (e) {
    console.warn('formatAddress:', address, e.message);
    // transfer to is not valid conflux address, need show error tip
    return address.startsWith('0x') && address.length === 42
      ? 'invalid-' + address
      : '';
  }
};

export const adminControlAddress = formatAddress(
  '0x0888000000000000000000000000000000000000',
);
export const sponsorWhitelistControlAddress = formatAddress(
  '0x0888000000000000000000000000000000000001',
);
export const stakingAddress = formatAddress(
  '0x0888000000000000000000000000000000000002',
);
export const zeroAddress = formatAddress(
  '0x0000000000000000000000000000000000000000',
);

const faucetAddress = IS_TESTNET
  ? '0x8fc71dbd0e0b3be34fbee62796b65e09c8fd19b8'
  : '0x829985ed802802e0e4bfbff25f79ccf5236016e9';
const faucetLastAddress = IS_TESTNET
  ? '0x8097e818c2c2c1524c41f0fcbda143520046d117'
  : '0x8d5adbcaf5714924830591586f05302bf87f74bd';

// contract manager address, hex format: 0x81bbe80b1282387e19d7e1a57476869081c7d965
const contractManagerAddress = IS_TESTNET
  ? 'cfxtest:aca514ancmbdu9u349u4m7d0u4jjdv83py3muarnv1'
  : 'cfx:aca514ancmbdu9u349u4m7d0u4jjdv83pyxbdunbz7';

const faucet = new Faucet(RPC_SERVER, faucetAddress, faucetLastAddress);

export const decodeContract = ({ abi, address, transacionData }) => {
  const contract = cfx.Contract({ abi, address, decodeByteToHex: true });
  return contract.abi.decodeData(transacionData);
};

export {
  cfx,
  formatAddress,
  faucetAddress,
  faucetLastAddress,
  faucet,
  cfxFormat,
  cfxAddress,
  contractManagerAddress,
};
