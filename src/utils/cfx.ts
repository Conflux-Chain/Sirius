import {
  Conflux,
  format as cfxFormat,
} from 'js-conflux-sdk/dist/js-conflux-sdk.umd.min.js';
import { Faucet } from 'conflux-sponsorfaucet';
import { isTestNetEnv } from './hooks/useTestnet';
const cfxUrl = window.location.origin + '/rpc';

const cfx = new Conflux({
  url: cfxUrl,
  networkId: isTestNetEnv() ? 1 : 1029,
  // https://github.com/Conflux-Chain/js-conflux-sdk/blob/new-checksum/CHANGE_LOG.md#v150
  // use hex address to compatible with history function
  // TODO cip-37
  useHexAddressInParameter: true,
});
const mainnetFaucetAddress = '0x829985ed802802e0e4bfbff25f79ccf5236016e9';
const mainnetFaucetLastAddress = '0x8d5adbcaf5714924830591586f05302bf87f74bd';
const testnetFaucetAddress = '0x8fc71dbd0e0b3be34fbee62796b65e09c8fd19b8';
const testnetFaucetLastAddress = '0x8097e818c2c2c1524c41f0fcbda143520046d117';
const faucetAddress = isTestNetEnv()
  ? testnetFaucetAddress
  : mainnetFaucetAddress;
const faucetLastAddress = isTestNetEnv()
  ? testnetFaucetLastAddress
  : mainnetFaucetLastAddress;
const testnetContractManagerAddress =
  '0x81bbe80b1282387e19d7e1a57476869081c7d965';
const mainnetContractManagerAddress =
  '0x81bbe80b1282387e19d7e1a57476869081c7d965';
const contractManagerAddress = isTestNetEnv()
  ? testnetContractManagerAddress
  : mainnetContractManagerAddress;
const faucet = new Faucet(cfxUrl, faucetAddress, faucetLastAddress);
export const decodeContract = ({ abi, address, transacionData }) => {
  const contract = cfx.Contract({ abi, address });
  return contract.abi.decodeData(transacionData);
};
export { cfx, faucetAddress, faucet, cfxFormat, contractManagerAddress };
