/**
 * TokenDetail
 */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { useMessages } from '@cfxjs/react-ui';
import {
  isAddress,
  isHash,
  tranferToLowerCase,
  formatBalance,
} from '../../../utils';
import { useBalance } from '@cfxjs/react-hooks';
import 'utils/lazyJSSDK';
import { Search as SearchComp } from '../../components/Search/Loadable';
interface FilterProps {
  filter: string;
  tokenAddress: string;
  symbol: string;
  decimals: number;
  onFilter: (value: string) => void;
}

interface Query {
  accountAddress?: string;
  transactionHash?: string;
}

export const Filter = ({
  filter,
  tokenAddress,
  symbol,
  decimals,
  onFilter,
}: FilterProps) => {
  const { t } = useTranslation();
  const lFilter = tranferToLowerCase(filter);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messages, setMessage] = useMessages();
  const [value, setValue] = useState(lFilter);
  const tokenAddrs = [tokenAddress];
  let addr: null | string = null;
  if (isAddress(lFilter)) {
    addr = lFilter;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [balance, [tokenBalanceRaw]] = useBalance(addr, tokenAddrs);
  const tokenBalance = formatBalance(tokenBalanceRaw || '0', decimals);

  useEffect(() => {
    setValue(lFilter);
  }, [lFilter]);

  const onEnterPress = () => {
    if (value === '') {
      return;
    }
    if (!isAddress(value) && !isHash(value)) {
      setMessage({
        text: t(translations.token.transferList.searchError),
      });
      return;
    }
    if (value !== lFilter) {
      onFilter(value);
    }
  };

  return (
    <FilterWrap>
      <SearchComp
        outerClassname="outerContainer"
        inputClassname="transfer-search"
        iconColor="#74798C"
        placeholderText={t(translations.token.transferList.searchPlaceHolder)}
        onEnterPress={onEnterPress}
        onChange={val => setValue(tranferToLowerCase(val))}
        val={value}
      ></SearchComp>
      {tokenBalance !== '0' && (
        <BalanceWrap>
          {`${t(
            translations.token.transferList.balance,
          )}${tokenBalance}${symbol}`}{' '}
        </BalanceWrap>
      )}
    </FilterWrap>
  );
};

const FilterWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  .outerContainer {
    flex-grow: 1;
    width: 14.8571rem;
    .transfer-search.input-container {
      height: 2.28rem;
      .input-wrapper {
        border-radius: 1.14rem;
        background: rgba(0, 84, 254, 0.04);
        input {
          color: #74798c;
          ::placeholder {
            color: rgba(116, 121, 140, 0.6);
            font-size: 12px;
          }
        }
        &.hover {
          border: none;
          input {
            color: #74798c;
          }
        }
        &.focus {
          border: none;
          input {
            color: #74798c;
          }
        }
      }
    }
  }
`;

const BalanceWrap = styled.div`
  background-color: #4b5fe3;
  border-radius: 1.1429rem;
  height: 1.7143rem;
  color: #fff;
  padding: 0.2857rem 1.7143rem;
  margin-left: 1.2857rem;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;
