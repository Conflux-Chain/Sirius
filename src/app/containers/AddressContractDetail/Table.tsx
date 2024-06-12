import React, { /*useEffect,*/ useMemo } from 'react';
// import queryString from 'query-string';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
// import { useHistory, useLocation } from 'react-router';
import { TabsTablePanel } from 'app/components/TabsTablePanel/Loadable';
import {
  isCoreContractAddress,
  isZeroAddress,
  // isAccountAddress,
} from 'utils';
import { CFX_TOKEN_TYPES, HIDE_IN_DOT_NET } from 'utils/constants';
import { ContractContent } from './ContractContent';
import { ExcutedAndPendingTxns } from 'app/containers/Transactions/Loadable';
import { Contract } from '../Charts/pow/Loadable';

import {
  // ExcutedTxns,
  CFXTxns,
  CRC20Txns,
  CRC721Txns,
  CRC1155Txns,
  // PendingTxns,
} from 'app/containers/Transactions/Loadable';
import { MinedBlocks } from 'app/containers/Blocks/Loadable';
import { NFTAsset } from 'app/containers/NFTAsset/Loadable';
import styled from 'styled-components';
import { ContractStatus } from '../AddressContractDetail/ContractStatus';

export function Table({ address, addressInfo }) {
  const { t } = useTranslation();
  // const location = useLocation();
  // const history = useHistory();
  // const queries = queryString.parse(location.search);
  const isContract = useMemo(() => isCoreContractAddress(address), [address]);

  // useEffect(() => {
  //   history.replace(
  //     queryString.stringifyUrl({
  //       url: location.pathname,
  //       query: {
  //         accountAddress: address,
  //         ...queries,
  //       },
  //     }),
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [location.search, location.pathname, address, history]);

  const tabs: any = [
    {
      value: `transaction`,
      action: 'accountTransactions',
      label: t(translations.general.transactions),
      content: <ExcutedAndPendingTxns address={address} />,
    },
    {
      hidden: !addressInfo.cfxTransferTab,
      value: `transfers-${CFX_TOKEN_TYPES.cfx}`,
      action: 'cfxTransfers',
      label: t(translations.general.cfxTransfer),
      content: <CFXTxns address={address} />,
    },
    {
      hidden: !addressInfo.erc20TransferTab,
      value: `transfers-${CFX_TOKEN_TYPES.crc20}`,
      action: 'transfersCrc20',
      label: t(translations.general.tokenTxnsErc20),
      content: <CRC20Txns address={address} />,
    },
    {
      hidden: !addressInfo.erc721TransferTab,
      value: `transfers-${CFX_TOKEN_TYPES.crc721}`,
      action: 'transfersCrc721',
      label: t(translations.general.tokenTxnsErc721),
      content: <CRC721Txns address={address} />,
    },
    {
      hidden: !addressInfo.erc1155TransferTab,
      value: `transfers-${CFX_TOKEN_TYPES.crc1155}`,
      action: 'transfersCrc1155',
      label: t(translations.general.tokenTxnsErc1155),
      content: <CRC1155Txns address={address} />,
    },
  ];

  if (HIDE_IN_DOT_NET) {
    tabs.splice(1, 2);
  }

  if (!isZeroAddress(address)) {
    tabs.push({
      hidden: !addressInfo.nftAssetTab,
      value: 'nft-asset',
      action: 'NFTAsset',
      label: t(translations.addressDetail.NFTAsset),
      content: <NFTAsset />,
    });
  }

  const clientWidth = document.body.clientWidth;
  let chartWidth = clientWidth - 36;
  if (clientWidth > 1350) chartWidth = 1350;
  if (chartWidth < 365) chartWidth = 365;
  const analysisPanel = () => (
    <StyledTabWrapper>
      <Contract address={address} />
    </StyledTabWrapper>
  );
  if (isContract) {
    tabs.push(
      {
        value: 'analysis',
        action: 'contractAnalysis',
        label: t(translations.token.analysis),
        content: analysisPanel(),
      },
      {
        value: 'contract-viewer',
        action: 'contractViewer',
        label: (
          <div>
            {t(translations.token.contract)}
            <ContractStatus contract={addressInfo} />
          </div>
        ),
        content: <ContractContent contractInfo={addressInfo} />,
      },
    );
  }

  if (!(isContract || isZeroAddress(address)) && !HIDE_IN_DOT_NET) {
    tabs.push(
      ...[
        {
          hidden: !addressInfo.minedBlockTab,
          value: 'mined-blocks',
          action: 'minedBlocks',
          label: t(translations.addressDetail.minedBlocks),
          content: <MinedBlocks address={address} />,
        },
      ],
    );
  }

  return <TabsTablePanel key="table" tabs={tabs} />;
}
const StyledTabWrapper = styled.div`
  .card {
    padding: 0.3571rem !important;

    .content {
      overflow-x: auto;
      & > div {
        box-shadow: none !important;
      }
    }
  }
`;
