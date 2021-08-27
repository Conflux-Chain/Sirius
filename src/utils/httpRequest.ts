import qs from 'query-string';
import fetch from './request';

export const v1Prefix = '/v1';
export const statPrefix = '/stat';

export const sendRequest = config => {
  const url = config.url.startsWith('/stat')
    ? config.url
    : `${v1Prefix}${
        config.url.startsWith('/') ? config.url : '/' + config.url
      }`;
  return fetch(qs.stringifyUrl({ url: url, query: config.query }), {
    method: config.type || 'GET',
    body: config.body,
    headers: config.headers,
  });
};

export const reqReport = (param?: object) => {
  return sendRequest({
    url: `${statPrefix}/recaptcha/siteverify`,
    type: 'POST',
    body: JSON.stringify(param),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const reqTransactionEventlogs = (param?: object, extra?: object) => {
  return sendRequest({
    url: `/eventLog`,
    query: param,
    ...extra,
  });
};

export const reqBlockDetail = (param?: object, extra?: object) => {
  return sendRequest({
    url: `/block/${param && param['hash']}`,
    ...extra,
  });
};

export const reqTransactionDetail = (param?: object, extra?: object) => {
  return sendRequest({
    url: `/transaction/${param && param['hash']}`,
    query: extra,
  });
};

export const reqContract = (param?: object, extra?: object) => {
  return sendRequest({
    url: `/contract/${param && param['address']}`,
    query: param,
    ...extra,
  });
};

export const reqContractAndToken = (param?: object, extra?: object) => {
  return sendRequest({
    url: `/contract-and-token`,
    query: param,
    ...extra,
  });
};

export const reqTransferList = (param?: object, extra?: object) => {
  return sendRequest({
    url: `/transfer`,
    query: param,
    ...extra,
  });
};

export const reqTokenList = (param?: object, extra?: object) => {
  return sendRequest({
    url: `/token`,
    query: param,
    ...extra,
  });
};

export const reqTokenListByName = (param?: object, extra?: object) => {
  return sendRequest({
    url: '/stat/tokens/name',
    query: param,
    ...extra,
  });
};

export const reqToken = (param?: object, extra?: object) => {
  return sendRequest({
    url: `/token/${param && param['address']}`,
    query: param,
    ...extra,
  });
};

export const reqTopStatistics = (param: any, extra?: object) => {
  if (
    ['cfxSend', 'cfxReceived', 'txnSend', 'txnReceived'].includes(param.action)
  ) {
    return sendRequest({
      url: `${statPrefix}/tx/top-by-type`,
      query: {
        span: param.span.slice(0, -1),
        type: param.span.slice(-1),
        action: param.action,
        rows: 10,
      },
      ...extra,
    });
  } else if (['topMiner'].includes(param.action)) {
    return sendRequest({
      url: `${statPrefix}/miner/top-by-type`,
      query: {
        span: param.span.slice(0, -1),
        type: param.span.slice(-1),
        rows: 10,
      },
      ...extra,
    });
  } else if (['top-gas-used'].includes(param.action)) {
    return sendRequest({
      url: `${statPrefix}/top-gas-used`,
      query: {
        span: param.span,
        rows: 10,
      },
      ...extra,
    });
  } else if (['overview'].includes(param.action)) {
    return sendRequest({
      url: `${statPrefix}/recent-overview`,
      query: {
        days: param.span === '24h' ? '1' : param.span.slice(0, -1),
      },
      ...extra,
    });
  } else {
    // rank_contract_by_number_of_participants_1d;
    // rank_contract_by_number_of_participants_3d;
    // rank_contract_by_number_of_participants_7d;
    // rank_contract_by_number_of_participants_30d;
    // rank_contract_by_number_of_receivers_1d;
    // rank_contract_by_number_of_receivers_3d;
    // rank_contract_by_number_of_receivers_7d;
    // rank_contract_by_number_of_receivers_30d;
    // rank_contract_by_number_of_senders_1d;
    // rank_contract_by_number_of_senders_3d;
    // rank_contract_by_number_of_senders_7d;
    // rank_contract_by_number_of_senders_30d;
    // rank_contract_by_number_of_transfers_1d;
    // rank_contract_by_number_of_transfers_3d;
    // rank_contract_by_number_of_transfers_7d;
    // rank_contract_by_number_of_transfers_30d;
    let span = param.span;
    if (param.span === '24h') span = '1d';
    return sendRequest({
      url: `${statPrefix}/top-cfx-holder`,
      query: {
        type: `${param.action}_${span}`,
        limit: 10,
      },
      ...extra,
    });
  }
};

export const reqCfxSupply = (extra?: object) => {
  return sendRequest({
    url: `/supply`,
    ...extra,
  });
};

export const reqHomeDashboard = (extra?: object) => {
  return sendRequest({
    url: `/homeDashboard`,
    ...extra,
  });
};

export const reqContractNameTag = (name: string, extra?: object) => {
  return sendRequest({
    url: `${statPrefix}/contract/registered/name?name=${name}`,
    ...extra,
  });
};

export const reqContractLicense = () => {
  return sendRequest({
    url: `/contract/license`,
  });
};

export const reqContractCompiler = () => {
  return sendRequest({
    url: `/contract/compiler`,
  });
};

export const reqContractVerification = param => {
  return sendRequest({
    url: `/contract/verify`,
    type: 'POST',
    body: JSON.stringify(param),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const reqTransactions = (extra?: object) => {
  return sendRequest({
    url: `/transaction`,
    ...extra,
  });
};

export const reqNFTBalances = (extra?: object) => {
  return sendRequest({
    url: `/stat/nft/checker/balance`,
    ...extra,
  });
};

export const reqNFTTokenIds = (extra?: object) => {
  return sendRequest({
    url: `/stat/nft/checker/token`,
    ...extra,
  });
};
export const reqNFTTokenIdsInTokenPage = (extra?: object) => {
  return sendRequest({
    url: `/stat/nft/active-token-ids`,
    ...extra,
  });
};
export const reqNFTInfo = (extra?: object) => {
  // ?contractAddress=cfx:acb3fcbj8jantg52jbg66pc21jgj2ud02pj1v4hkwn&tokenId=424873
  return sendRequest({
    url: `/stat/nft/checker/preview`,
    ...extra,
  });
};

export const reqProjectConfig = (extra?: object) => {
  return new Promise((resolve, reject) => {
    resolve({
      networks: [
        {
          name: 'Conflux Tethys',
          id: 1029,
          contracts: {
            faucet: 'cfx:acbkxbtruayaf2he1899e1533x4wg2a07eyjjrzu31', // 0x829985ed802802e0e4bfbff25f79ccf5236016e9
            faucetLast: 'cfx:acgzz08m8z2ywkeda0jzu52fgaz9u95y1y50rnwmt3', // 0x8d5adbcaf5714924830591586f05302bf87f74bd
            contractManager: 'cfx:aca514ancmbdu9u349u4m7d0u4jjdv83pyxbdunbz7', // 0x81bbe80b1282387e19d7e1a57476869081c7d965
            wcfx: 'cfx:acg158kvr8zanb1bs048ryb6rtrhr283ma70vz70tx', // 0x8d7df9316faa0586e175b5e6d03c6bda76e3d950
            governance: 'cfx:achvp1x7t17uf2wdad3pdvd0ujz4vfndv2k5x6cpyn', // 0x8f165e7d7dfb02e24300f2c1c476822ba895638e

            // inner address
            adminControl: 'cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2mhjju8k', // 0x0888000000000000000000000000000000000000
            sponsorWhitelistControl:
              'cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaegg2r16ar', // 0x0888000000000000000000000000000000000001
            staking: 'cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaajrwuc9jnb', // 0x0888000000000000000000000000000000000002

            // zero address
            zero: 'cfx:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0sfbnjm2', // 0x0000000000000000000000000000000000000000
          },
        },
        {
          name: 'Conflux Testnet',
          id: 1,
          contracts: {
            faucet: 'cfxtest:acbkxbtruayaf2he1899e1533x4wg2a07e8d57x477', // 0x8fc71dbd0e0b3be34fbee62796b65e09c8fd19b8
            faucetLast: 'cfxtest:acgzz08m8z2ywkeda0jzu52fgaz9u95y1yv785yanx', // 0x8097e818c2c2c1524c41f0fcbda143520046d117
            contractManager:
              'cfxtest:aca514ancmbdu9u349u4m7d0u4jjdv83py3muarnv1', // 0x81bbe80b1282387e19d7e1a57476869081c7d965
            wcfx: 'cfxtest:achs3nehae0j6ksvy1bhrffsh1rtfrw1f6w1kzv46t', // 0x8eecac87012c8e25d1a5c27694ae3ddaf2b6572f, note: not same as mainnet WCFX ?
            governance: 'cfxtest:achvp1x7t17uf2wdad3pdvd0ujz4vfndv2duapegub', // 0x8f3f525d17159351e4b34fe766ef139470da0b02

            // inner address
            adminControl: 'cfxtest:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaawby2s44d', // 0x0888000000000000000000000000000000000000
            sponsorWhitelistControl:
              'cfxtest:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaeprn7v0eh', // 0x0888000000000000000000000000000000000001
            staking: 'cfxtest:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaajh3dw3ctn', // 0x0888000000000000000000000000000000000002

            // zero address
            zero: 'cfxtest:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa6f0vrcsw', // 0x0000000000000000000000000000000000000000
          },
        },
        {
          name: 'Conflux PoS',
          id: 8888,
          contracts: {
            faucet: 'net8888:ach6shr7b2fx124t15xctfz0n2e6v9j31ayt6833gh', // 0x8fc71dbd0e0b3be34fbee62796b65e09c8fd19b8
            faucetLast: 'net8888:acakt4a22nbpcywpjh2t3trbjrkaav0vc6y4mnur6b', // 0x8097e818c2c2c1524c41f0fcbda143520046d117
            contractManager:
              'net8888:aca514ancmbdu9u349u4m7d0u4jjdv83pyk5mtkf5u', // 0x81bbe80b1282387e19d7e1a57476869081c7d965
            wcfx: 'net8888:achs3nehae0j6ksvy1bhrffsh1rtfrw1f6cgx4zy0j', // 0x8eecac87012c8e25d1a5c27694ae3ddaf2b6572f, note: not same as mainnet WCFX ?
            governance: 'net8888:achx8yw7c6m3gyte0rh8s31tcsmhb0unajzt74tk4s', // 0x8f3f525d17159351e4b34fe766ef139470da0b02

            // inner address
            adminControl: 'net8888:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaacus1myue', // 0x0888000000000000000000000000000000000000
            sponsorWhitelistControl:
              'net8888:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaae66vwz2sa', // 0x0888000000000000000000000000000000000001
            staking: 'net8888:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaj1j377pfp', // 0x0888000000000000000000000000000000000002

            // zero address
            zero: 'net8888:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaapyp8kpez', // 0x0000000000000000000000000000000000000000
          },
        },
      ],
      networkId: 8888,
    });
  });
};
