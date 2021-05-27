import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { media, useBreakpoint } from 'styles/media';
import { translations } from 'locales/i18n';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { isAddress, isHash, toThousands } from 'utils';
import { TabsTablePanel } from 'app/components/TabsTablePanel/Loadable';
import {
  TableSearchDatepicker,
  TableSearchInput,
} from 'app/components/TablePanel';
import { tokenColunms } from 'utils/tableColumns';
import { cfxTokenTypes } from 'utils/constants';
import { useAge } from 'utils/hooks/useAge';
import { Card } from 'app/components/Card';
import { LineChart as Chart } from 'app/components/Chart/Loadable';
import { DownloadCSV } from 'app/components/DownloadCSV/Loadable';

interface TransferProps {
  tokenName: string;
  address: string;
  symbol: string;
  decimals: number;
  totalSupply: number;
  price: number;
  holderCount: number;
  transferType: string;
  isRegistered: boolean;
}
interface Query {
  accountAddress?: string;
  transactionHash?: string;
  tokenId?: string;
}

export function Transfers({ tokenData }: { tokenData: TransferProps }) {
  const {
    tokenName,
    address: tokenAddress,
    symbol,
    decimals,
    totalSupply,
    price,
    // holderCount,
    transferType = typeof tokenData.decimals !== 'undefined'
      ? cfxTokenTypes.erc20
      : '',
    isRegistered,
  } = tokenData;
  const bp = useBreakpoint();
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const [ageFormat, toggleAgeFormat] = useAge();

  let {
    page = 1,
    pageSize = 10,
    accountAddress: filterAddr,
    transactionHash: filterHash,
    tokenId: filterTokenId,
    tab: currentTab,
    ...others
  } = queryString.parse(location.search);

  const filter =
    (filterAddr as string) ||
    (filterHash as string) ||
    (filterTokenId as string) ||
    '';

  const onFilter = (filter: string) => {
    let object: Query = {};
    if (isAddress(filter)) {
      object.accountAddress = filter;
    } else if (isHash(filter)) {
      object.transactionHash = filter;
    } else if (transferType !== cfxTokenTypes.erc20 && filter.trim()) {
      object.tokenId = filter;
    }
    const urlWithQuery = queryString.stringifyUrl({
      url: location.pathname,
      query: {
        ...others,
        page: '1',
        pageSize: pageSize as string,
        ...object,
      },
    });
    history.push(urlWithQuery);
  };

  let columnsWidth = [3, 6, 6, 4, 4];
  let columns = [
    // {
    //   ...tokenColunms.txnHash,
    //   render: value => {
    //     if (value === filter) {
    //       return (
    //         <Text onClick={() => onFilter(value)} span hoverValue={value}>
    //           {formatString(value, 'hash')}
    //         </Text>
    //       );
    //     } else {
    //       return (
    //         <Link>
    //           <Text onClick={() => onFilter(value)} span hoverValue={value}>
    //             {formatString(value, 'hash')}
    //           </Text>
    //         </Link>
    //       );
    //     }
    //   },
    // },
    tokenColunms.txnHash,
    tokenColunms.from,
    tokenColunms.to,
    {
      ...tokenColunms.quantity,
      render: (value, row, index) =>
        tokenColunms.quantity.render(value, row, index, {
          decimals,
        }),
    },
    tokenColunms.age(ageFormat, toggleAgeFormat),
  ].map((item, i) => ({ ...item, width: columnsWidth[i] }));

  if (transferType === cfxTokenTypes.erc721) {
    columnsWidth = [3, 6, 6, 4, 3];
    columns = [
      tokenColunms.txnHash,
      tokenColunms.from,
      tokenColunms.to,
      tokenColunms.tokenId,
      tokenColunms.age(ageFormat, toggleAgeFormat),
    ].map((item, i) => ({ ...item, width: columnsWidth[i] }));
  }
  if (transferType === cfxTokenTypes.erc1155) {
    columnsWidth = [3, 7, 7, 3, 4, 4];
    columns = [
      tokenColunms.txnHash,
      tokenColunms.from,
      tokenColunms.to,
      tokenColunms.quantity,
      tokenColunms.tokenId,
      tokenColunms.age(ageFormat, toggleAgeFormat),
    ].map((item, i) => ({ ...item, width: columnsWidth[i] }));
  }

  // holders
  let holdersColumnsWidth = [2, 10, 6, 4];
  let holdersColumns = [
    tokenColunms.number(page, pageSize),
    tokenColunms.account,
    tokenColunms.balance(
      transferType === cfxTokenTypes.erc20 ? decimals : 0,
      price,
      transferType,
    ),
    tokenColunms.percentage(totalSupply),
  ].map((item, i) => ({ ...item, width: holdersColumnsWidth[i] }));

  // let holders1155ColumnsWidth = [2, 10, 10];
  // let holders1155Columns = [
  //   tokenColunms.number(page, pageSize),
  //   tokenColunms.account,
  //   tokenColunms.balance(
  //     transferType === cfxTokenTypes.erc20 ? decimals : 0,
  //     price,
  //     transferType,
  //   ),
  // ].map((item, i) => ({ ...item, width: holders1155ColumnsWidth[i] }));

  const tabs: any = [
    {
      value: 'transfers',
      action: 'tokenTransfers',
      label: t(translations.token.transfers),
      // address filter contract transfers events
      // accountAddress filter from or to transfers, regard accountAddress as ordinary address
      url: `/transfer?address=${tokenAddress}&transferType=${transferType}`,
      table: {
        columns: columns,
        rowKey: (row, index) => `${row.transactionHash}${index}`,
      },
      tableHeader: ({ total }) => (
        <StyledSearchAreaWrapper>
          <StyledTotalWrapper>
            {t(translations.general.totalRecord, {
              total: toThousands(total),
            })}
          </StyledTotalWrapper>
          <div className="token-search-container">
            <TableSearchInput
              decimals={decimals}
              symbol={symbol}
              tokenAddress={tokenAddress}
              transferType={transferType}
              onFilter={onFilter}
              filter={filter}
              placeholder={
                transferType === cfxTokenTypes.erc20
                  ? t(
                      translations.token.transferList.searchPlaceHolder,
                    ).replace(bp === 's' ? / \/ /gi : '/', '/')
                  : t(
                      translations.token.transferList
                        .searchPlaceHolderWithTokenId,
                    ).replace(bp === 's' ? / \/ /gi : '/', '/')
              }
            />
            <TableSearchDatepicker />
          </div>
        </StyledSearchAreaWrapper>
      ),
      tableFooter: (
        <DownloadCSV
          url={queryString.stringifyUrl({
            url: '/v1/report/transfer',
            query: {
              transferType: transferType,
              address: tokenAddress,
              limit: '5000',
              reverse: 'true',
            },
          })}
        />
      ),
    },
  ];

  if (
    isRegistered &&
    (transferType === cfxTokenTypes.erc20 ||
      transferType === cfxTokenTypes.erc721)
  ) {
    tabs.push({
      value: 'holders',
      action: 'tokenHolders',
      label: t(translations.token.holders),
      url: `/stat/tokens/holder-rank?address=${tokenAddress}&reverse=true&orderBy=balance`,
      table: {
        className: 'monospaced',
        columns: holdersColumns,
        rowKey: row => `${tokenAddress}${row.account.address}`,
      },
      tableHeader: ({ total }) => (
        <StyledTotalWrapper>
          {t(translations.general.totalRecord, {
            total: toThousands(total),
          })}
        </StyledTotalWrapper>
      ),
    });
  }

  // if (transferType === cfxTokenTypes.erc1155) {
  //   tabs.push({
  //     value: 'holders',
  //     action: 'tokenHolders',
  //     label: () => {
  //       return (
  //         <>
  //           {t(translations.token.holders)}
  //           <TabLabel total={holderCount} realTotal={holderCount} />
  //         </>
  //       );
  //     },
  //     url: `/stat/tokens/holder-rank?address=${tokenAddress}&reverse=true&orderBy=balance`,
  //     table: {
  //       className: 'monospaced',
  //       columns: holders1155Columns,
  //       rowKey: row => `${tokenAddress}${row.account.address}`,
  //     },
  //   });
  // }

  const clientWidth = document.body.clientWidth;
  let chartWidth = clientWidth - 36;

  if (clientWidth > 1350) chartWidth = 1350;
  if (chartWidth < 365) chartWidth = 365;

  const analysisPanel = () => (
    <StyledTabWrapper>
      <Card>
        <Chart
          width={chartWidth}
          indicator="tokenAnalysis"
          tokenInfo={{
            name: tokenName,
            address: tokenAddress,
            type: transferType,
          }}
        />
      </Card>
    </StyledTabWrapper>
  );

  const analysisTab = {
    value: 'analysis',
    action: 'tokenAnalysis',
    label: t(translations.token.analysis),
    content: analysisPanel(),
  };

  if (isRegistered) {
    tabs.push(analysisTab);
  }

  return transferType ? <TabsTablePanel tabs={tabs} /> : null;
}

const StyledSearchAreaWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .token-search-container {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;

    ${media.s} {
      justify-content: flex-start;
      margin-top: 0.3571rem;
    }
  }

  ${media.s} {
    justify-content: flex-start;
  }
`;

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

const StyledTotalWrapper = styled.div`
  padding: 8px;
  ${media.s} {
    width: 100%;
  }
`;
