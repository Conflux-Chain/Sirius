import {
  API_HOST_MAP,
  DOMAIN,
  IS_STAGE,
} from 'sirius-next/packages/common/dist/env';
import { NETWORK_TYPES } from 'env/types';
import logo from 'images/core-space/logo.svg';

export const ENV_NETWORK_ID = 1029;
export const ENV_NETWORK_TYPE = NETWORK_TYPES.CORE_MAINNET;
export const ENV_OPEN_API_HOST =
  API_HOST_MAP.openAPIHost ||
  (IS_STAGE
    ? `https://api-stage.confluxscan${DOMAIN}`
    : `https://api.confluxscan${DOMAIN}`);
export const ENV_RPC_SERVER =
  API_HOST_MAP.rpcHost || 'https://main.confluxrpc.com';
export const ENV_FC_ADDRESS = 'cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2';
export const ENV_FC_EXCHANGE_ADDRESS =
  'cfx:acdrd6ahf4fmdj6rgw4n9k4wdxrzfe6ex6jc7pw50m';
export const ENV_FC_EXCHANGE_INTEREST_ADDRESS =
  'cfx:acag8dru4527jb1hkmx187w0c7ymtrzkt2schxg140';
export const ENV_CROSS_SPACE_ADDRESS =
  'cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa2sn102vjv';
export const ENV_ENS_REGISTRY_ADDRESS =
  'cfx:acemru7fu1u8brtyn3hrtae17kbcd4pd9uwbspvnnm';
export const ENV_ENS_PUBLIC_RESOLVER_ADDRESS =
  'cfx:acasaruvgf44ss67pxzfs1exvj7k2vyt863f72n6up';
export const ENV_ENS_REVERSE_REGISTRAR_ADDRESS =
  'cfx:acfarpzehntpre0thg8x7dp0ajw4ms328ps634v1zk';
export const ENV_LOGO = logo;
