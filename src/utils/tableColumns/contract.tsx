import React from 'react';
import { Translation } from 'react-i18next';
import { translations } from '../../locales/i18n';
import styled from 'styled-components/macro';
import { Link } from '../../app/components/Link/Loadable';
import { Text } from '../../app/components/Text/Loadable';
import { defaultTokenIcon } from '../../constants';
import { formatString, formatNumber } from '..';

interface Query {
  accountAddress?: string;
  transactionHash?: string;
}

export const number = {
  title: (
    <Translation>
      {t => t(translations.general.table.contracts.number)}
    </Translation>
  ),
  key: 'epochNumber',
  render: (value, row, index) => {
    return index + 1;
  },
};

export const name = {
  title: (
    <Translation>
      {t => t(translations.general.table.contracts.name)}
    </Translation>
  ),
  key: 'blockIndex',
  render: row => (
    <StyledIconWrapper>
      <img src={row?.icon || defaultTokenIcon} alt="contract icon" />
      <Link href={`/address/${row.address}`}>
        <Text span hoverValue={`${row?.name} (${row?.symbol})`}>
          {formatString(`${row?.name}`, 28)}
        </Text>
      </Link>
    </StyledIconWrapper>
  ),
};

export const contract = {
  title: (
    <Translation>
      {t => t(translations.general.table.contracts.address)}
    </Translation>
  ),
  dataIndex: 'address',
  key: 'address',
  render: value => (
    <Link href={`/address/${value}`}>
      <Text span hoverValue={value}>
        {formatString(value, 'address')}
      </Text>
    </Link>
  ),
};

export const transactionCount = {
  title: (
    <Translation>
      {t => t(translations.general.table.contracts.transactionCount)}
    </Translation>
  ),
  dataIndex: 'txCount',
  key: 'txCount',
  render: value => <span>{formatNumber(value)}</span>,
};

export const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 1.1429rem;
    height: 1.1429rem;
    margin-right: 0.5714rem;
  }
`;
