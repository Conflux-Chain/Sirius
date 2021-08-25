import React, { useContext } from 'react';
import { getCurrency } from 'utils/constants';
import { Conflux } from 'js-conflux-sdk/dist/js-conflux-sdk.umd.min.js';

import { createGlobalState } from 'react-use';

const defatultGlobalData = {
  currency: getCurrency(),
};

export const GlobalContext = React.createContext<{
  data: {
    currency: string;
  };
  setGlobalData: (data) => void;
}>({
  data: defatultGlobalData,
  setGlobalData: data => {},
});

export const GlobalProvider = function ({ children, data: outerData }) {
  const [data, setGlobalData] = React.useState<any>({
    ...defatultGlobalData,
    ...outerData,
  });

  return React.createElement(
    GlobalContext.Provider,
    {
      value: {
        data,
        setGlobalData,
      },
      key: Math.random(),
    },
    children,
  );
};
GlobalProvider.defaultProps = {
  data: defatultGlobalData,
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};

// react-use version, to solve useContext can not update global value in App.ts
export interface ContractsType {
  [index: string]: string;
  contractManager: string;
  faucet: string;
  faucetLast: string;
  wcfx: string;
  governance: string;
}

export interface NetworksType {
  name: string;
  id: number;
  contracts: ContractsType;
}

export interface GlobalDataType {
  networks: Array<NetworksType>;
  networkId: number;
  contracts: ContractsType;
  cfx: any;
}

const DEFAULT_NETWORK_ID = 1029; // mainnet

// @todo, if no default global data, homepage should loading until getProjectConfig return resp
export const useGlobalData = createGlobalState<object>({
  networks: [
    {
      name: 'Conflux Tethys',
      id: 1029,
      contracts: {
        faucet: '',
        faucetLast: '',
      },
    },
    {
      name: 'Conflux Testnet',
      id: 1,
      contracts: {
        faucet: '',
        faucetLast: '',
      },
    },
  ],
  networkId: DEFAULT_NETWORK_ID,
  cfx: new Conflux({
    networkId: DEFAULT_NETWORK_ID,
  }),
  contracts: {},
});
