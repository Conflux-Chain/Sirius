import {
  Conflux,
  format as cfxFormat,
} from 'js-conflux-sdk/dist/js-conflux-sdk.umd.min.js';
import { Faucet } from 'conflux-sponsorfaucet';
import { isTestNetEnv } from './hooks/useTestnet';
const cfxUrl = window.location.origin + '/rpc';

const mainNetworkId = 1029;
const testnetNetworkId = 1;
// do not support other private network
const networkId = isTestNetEnv() ? testnetNetworkId : mainNetworkId;

const cfx = new Conflux({
  url: cfxUrl,
  networkId,
  // https://github.com/Conflux-Chain/js-conflux-sdk/blob/new-checksum/CHANGE_LOG.md#v150
  // use hex address to compatible with history function
  // cip-37
  // useHexAddressInParameter: true,
});

/**
 * format cfx address
 * @param address origin address
 * @param option address format options
 */
const formatAddress = (address: string | undefined, option: any = {}) => {
  if (!address || address.length < 40) return '';
  const addressOptions = Object.assign(
    {
      networkId,
      hex: false,
      withType: false,
    },
    option,
  );
  try {
    if (!addressOptions.hex)
      return cfxFormat.address(
        address,
        addressOptions.networkId,
        addressOptions.withType,
      );
    else
      return cfxFormat.hexAddress(
        cfxFormat.address(address, addressOptions.networkId),
      );
  } catch (e) {
    console.info('formatAddress:', address, e.message);
    return '';
  }
};

// faucet address

const mainnetFaucetAddress = formatAddress(
  '0x829985ed802802e0e4bfbff25f79ccf5236016e9',
  { networkId: mainNetworkId },
);
const mainnetFaucetLastAddress = formatAddress(
  '0x8d5adbcaf5714924830591586f05302bf87f74bd',
  { networkId: mainNetworkId },
);
const testnetFaucetAddress = formatAddress(
  '0x8fc71dbd0e0b3be34fbee62796b65e09c8fd19b8',
  { networkId: testnetNetworkId },
);
const testnetFaucetLastAddress = formatAddress(
  '0x8097e818c2c2c1524c41f0fcbda143520046d117',
  { networkId: testnetNetworkId },
);
const faucetAddress = isTestNetEnv()
  ? testnetFaucetAddress
  : mainnetFaucetAddress;
const faucetLastAddress = isTestNetEnv()
  ? testnetFaucetLastAddress
  : mainnetFaucetLastAddress;

// contract manager address

const testnetContractManagerAddress = formatAddress(
  '0x81bbe80b1282387e19d7e1a57476869081c7d965',
  { networkId: testnetNetworkId },
);
const mainnetContractManagerAddress = formatAddress(
  '0x81bbe80b1282387e19d7e1a57476869081c7d965',
  { networkId: testnetNetworkId },
);
const contractManagerAddress = isTestNetEnv()
  ? testnetContractManagerAddress
  : mainnetContractManagerAddress;

const faucet = new Faucet(cfxUrl, faucetAddress, faucetLastAddress);

export const decodeContract = ({ abi, address, transacionData }) => {
  const contract = cfx.Contract({ abi, address });
  return contract.abi.decodeData(transacionData);
};

export {
  cfx,
  formatAddress,
  faucetAddress,
  faucet,
  cfxFormat,
  contractManagerAddress,
  networkId,
  mainNetworkId,
  testnetNetworkId,
};
