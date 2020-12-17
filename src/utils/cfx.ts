import {
  Conflux,
  format as cfxFormat,
} from 'js-conflux-sdk/dist/js-conflux-sdk.umd.min.js';
import { Faucet } from 'conflux-sponsorfaucet';
import { isTestNetEnv } from './hooks/useTestnet';
const cfxUrl = window.location.origin + '/rpc';

const cfx = new Conflux({
  url: cfxUrl,
});
const mainnetFaucetAddress = '0x8d5adbcaf5714924830591586f05302bf87f74bd';
const mainnetFaucetLastAddress = '0x8d5adbcaf5714924830591586f05302bf87f74bd';
const testnetFaucetAddress = '0x8fc71dbd0e0b3be34fbee62796b65e09c8fd19b8';
const testnetFaucetLastAddress = '0x8097e818c2c2c1524c41f0fcbda143520046d117';
const faucetAddress = isTestNetEnv()
  ? testnetFaucetAddress
  : mainnetFaucetAddress;
const faucetLastAddress = isTestNetEnv()
  ? testnetFaucetLastAddress
  : mainnetFaucetLastAddress;
const faucet = new Faucet(cfxUrl, faucetAddress, faucetLastAddress);
export const decodeContract = ({ abi, address, transacionData }) => {
  const contract = cfx.Contract({ abi, address });
  return contract.abi.decodeData(transacionData);
};
export { cfx, faucetAddress, faucet, cfxFormat };
