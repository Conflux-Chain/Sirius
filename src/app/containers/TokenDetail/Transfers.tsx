import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { media } from '../../../styles/media';
import { translations } from '../../../locales/i18n';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Text } from 'app/components/Text';
import { Link } from 'app/components/Link/Loadable';
import { formatString, isAddress, isHash } from 'utils';
import {
  TabsTablePanel,
  TabLabel,
} from '../../components/TabsTablePanel/Loadable';
import { Filter } from './Filter';
import { tokenColunms } from '../../../utils/tableColumns';

interface TransferProps {
  tokenAddress: string;
  symbol: string;
  decimals: number;
}
interface Query {
  accountAddress?: string;
  transactionHash?: string;
}

export function Transfers({ tokenAddress, symbol, decimals }: TransferProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  let {
    pageSize: parsedPageSize,
    accountAddress: filterAddr,
    transactionHash: filterHash,
    ...others
  } = queryString.parse(location.search);
  if (!parsedPageSize) {
    parsedPageSize = '10';
  }

  const filter = (filterAddr as string) || (filterHash as string) || '';

  const onFilter = (filter: string) => {
    let object: Query = {};
    if (isAddress(filter)) {
      object.accountAddress = filter;
    } else if (isHash(filter)) {
      object.transactionHash = filter;
    }
    const urlWithQuery = queryString.stringifyUrl({
      url: location.pathname,
      query: {
        ...others,
        page: '1',
        pageSize: parsedPageSize as string,
        ...object,
      },
    });
    history.push(urlWithQuery);
  };

  const columnsWidth = [3, 4, 4, 4, 3];
  const columns = [
    {
      ...tokenColunms.txnHash,
      render: value => (
        <Link>
          <Text onClick={() => onFilter(value)} span hoverValue={value}>
            {formatString(value, 'hash')}
          </Text>
        </Link>
      ),
    },
    tokenColunms.age,
    {
      ...tokenColunms.from,
      render: (value, row, index) =>
        tokenColunms.from.render(value, row, index, {
          baseAddress: tokenAddress,
        }),
    },
    {
      ...tokenColunms.to,
      render: (value, row, index) =>
        tokenColunms.to.render(value, row, index, {
          baseAddress: tokenAddress,
        }),
    },
    {
      ...tokenColunms.quantity,
      render: (value, row, index) =>
        tokenColunms.quantity.render(value, row, index, {
          decimals,
        }),
    },
  ].map((item, i) => ({ ...item, width: columnsWidth[i] }));

  const tabs = [
    {
      value: 'transfers',
      label: (count: number) => {
        return (
          <LabelWrap>
            {t(translations.token.transfers)}
            <TabLabel count={count} />
          </LabelWrap>
        );
      },
      url: `/transfer?address=${tokenAddress}`,
      table: {
        columns: columns,
        rowKey: row => `${row.transactionHash}${row.transactionLogIndex}`,
      },
    },
  ];

  return (
    <TransfersWrap>
      <TabsTablePanel tabs={tabs} />
      <Filter
        decimals={decimals}
        symbol={symbol}
        tokenAddress={tokenAddress}
        onFilter={onFilter}
        filter={filter}
      />
    </TransfersWrap>
  );
}

const TransfersWrap = styled.div`
  position: relative;
  ${media.s} {
    padding-top: 4rem;
  }
`;

const LabelWrap = styled.div`
  display: flex;
  color: #1a1a1a;
  font-weight: 700;
  font-size: 1.1429rem;
`;
