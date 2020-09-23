import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/i18n';
import TablePanel, { ColumnsType, TipLabel } from '../../components/TablePanel';
import styled from 'styled-components';
import Text from './../../components/Text';
import { media } from './../../../styles/media';

const StyledBlocksAndTransactionsWrapper = styled.div`
  max-width: 73.1429rem;
  margin: 0 auto;
  padding-top: 0.8571rem;

  ${media.s} {
    padding: 0.2857rem 1.1429rem 1.1429rem;
  }
`;

const StyledTextWrapper = styled.span`
  font-family: CircularStd-Book, CircularStd;
  font-weight: 400;
  line-height: 1.7143rem;
  font-size: 1rem;
  &:hover {
    font-family: CircularStd-Bold, CircularStd;
    font-weight: 500;
    color: #0054fe;
  }
`;

const renderTextEllipsis = value => {
  return (
    <Text span maxwidth={'5.7143rem'} hoverValue={value}>
      <StyledTextWrapper>{value}</StyledTextWrapper>
    </Text>
  );
};

export const BlocksAndTransactions = () => {
  const { t } = useTranslation();
  const [tip, setTip] = useState<any>();

  const columnsBlocks: ColumnsType = [
    {
      title: 'Epoch',
      dataIndex: 'epochNumber',
      key: 'epochNumber',
      width: 100,
      render: renderTextEllipsis,
    },
    {
      title: 'Position',
      dataIndex: 'blockIndex',
      key: 'blockIndex',
      width: 100,
    },
    {
      title: 'Txns',
      dataIndex: 'transactionCount',
      key: 'transactionCount',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Miner',
      dataIndex: 'miner',
      key: 'miner',
      width: 100,
      render: value => renderTextEllipsis(value),
    },
    { title: 'Avg.Gas Price', dataIndex: 'gas', key: 'gas', width: 100 }, // todo, no gas price
    {
      title: 'Gas Used/Limit',
      dataIndex: 'gasLimit',
      key: 'gasLimit',
      width: 100,
    },
    { title: 'Reward', dataIndex: 'reward', key: 'reward', width: 100 }, // todo, no reward
    {
      title: 'Age',
      dataIndex: 'syncTimestamp',
      key: 'syncTimestamp',
      width: 100,
    }, // todo, how to calculate age value ?
  ];

  const columnsTransactions: ColumnsType = [
    {
      title: 'Hash',
      dataIndex: 'hash',
      key: 'hash',
      width: 100,
      render: value => renderTextEllipsis(value),
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      width: 100,
      render: value => renderTextEllipsis(value),
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      width: 100,
      render: value => renderTextEllipsis(value),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: 100,
    },
    {
      title: 'Gas Price',
      dataIndex: 'gasPrice',
      key: 'gasPrice',
      width: 100,
    },
    {
      title: 'Gas Fee',
      dataIndex: 'gas',
      key: 'gas',
      width: 100,
    },
    {
      title: 'Age',
      dataIndex: 'syncTimestamp',
      key: 'syncTimestamp',
      width: 100,
    },
  ];

  const tabs = [
    {
      value: 'blocks',
      label: 'Blocks',
      url: '/block/list',
      table: {
        columns: columnsBlocks,
        rowKey: 'hash',
      },
      onDataChange: ({ data }) => {
        const left = t(translations.blocksAndTransactions.tipCountBefore);
        const right = t(translations.blocksAndTransactions.tipCountAfter, {
          type: 'blocks',
        });

        setTip(
          <TipLabel
            count={data ? data.result?.total : 0}
            left={left}
            right={right}
            key="blocks"
          />,
        );
      },
    },
    {
      value: 'transaction',
      label: 'Transactions',
      url: '/transaction/list',
      table: {
        columns: columnsTransactions,
        rowKey: 'hash',
      },
      onDataChange: ({ data }) => {
        const left = t(translations.blocksAndTransactions.tipCountBefore);
        const right = t(translations.blocksAndTransactions.tipCountAfter, {
          type: 'transactions',
        });
        setTip(
          <TipLabel
            count={data ? data.result?.total : 0}
            left={left}
            right={right}
            key="transactions"
          />,
        );
      },
    },
  ];

  return (
    <StyledBlocksAndTransactionsWrapper>
      <Helmet>
        <title>{t(translations.blocksAndTransactions.title)}</title>
        <meta
          name="description"
          content={t(translations.blocksAndTransactions.description)}
        />
      </Helmet>
      {tip}
      <TablePanel tabs={tabs} />
    </StyledBlocksAndTransactionsWrapper>
  );
};
