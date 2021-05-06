/**
 *
 * Header Search
 *
 */
import React, { useState } from 'react';
import styled from 'styled-components';

import { Translation, useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { useBreakpoint } from 'styles/media';
import { useSearch } from 'utils/hooks/useSearch';
import { AutoComplete, Input, SelectProps } from '@jnoodle/antd';
import { SearchIcon } from '../../../components/SearchIcon/Loadable';
import ClearIcon from '../../../../images/clear.png';
import { defaultTokenIcon } from '../../../../constants';
import { Link } from '../../../components/Link/Loadable';
import { formatAddress } from '../../../../utils/cfx';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import fetch from 'utils/request';
import {
  isAccountAddress,
  isEpochNumber,
  isHash,
  isInnerContractAddress,
  isSpecialAddress,
} from '../../../../utils';
import { appendApiPrefix } from '../../../../utils/api';

const { Search: SearchInput } = Input;

const searchResult = (list: any[], notAvailable = '-') =>
  list.map(l => {
    const token = {
      ...l,
      icon: l.icon || defaultTokenIcon,
      name: l.name || notAvailable,
    };
    return {
      value: formatAddress(token.address),
      label: (
        <TokenItemWrapper>
          <img src={token?.icon || defaultTokenIcon} alt="token icon" />
          <Link href={`/token/${formatAddress(token.address)}`}>
            <Translation>
              {t => (
                <>
                  <div className="title">
                    {token?.name} ({token?.symbol}){' '}
                    <span className="tag">
                      {token?.transferType.replace('ERC', 'CRC')}
                    </span>
                  </div>
                  {token?.address ? (
                    <div className="address">{token?.address}</div>
                  ) : null}
                  {token?.website ? (
                    <div className="website">{token?.website}</div>
                  ) : null}
                </>
              )}
            </Translation>
          </Link>
        </TokenItemWrapper>
      ),
    };
  });

const TokenItemWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  > img {
    width: 24px;
    height: 24px;
    margin-top: 4px;
    margin-right: 10px;
  }

  > a {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 12px;

    .title {
      font-size: 14px;
    }

    .address,
    .website {
      color: #6c6d75;
    }

    .tag {
      color: #6c6d75;
      padding: 1px 5px;
      font-size: 12px;
      background-color: #f9f9f9;
      border: 1px solid #e8e8e8;
      border-radius: 3px;
    }
  }
`;

let controller = new AbortController();

export const Search = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const bp = useBreakpoint();
  const [, setSearch] = useSearch();
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);

  const notAvailable = t(translations.general.notAvailable);

  const onEnterPress = value => {
    setSearch(value);
  };

  const handleSearch = (value: string) => {
    if (
      value &&
      !(
        value === '0x0' ||
        isAccountAddress(value) ||
        // isContractAddress(value) ||
        isInnerContractAddress(value) ||
        isSpecialAddress(value) ||
        isEpochNumber(value) ||
        isHash(value)
      )
    ) {
      // abort pre search
      controller.abort();

      controller = new AbortController();

      fetch(appendApiPrefix('/stat/tokens/name?name=' + value), {
        signal: controller.signal,
      })
        .then(res => {
          if (res && res.list && res.list.length > 0) {
            setOptions([
              {
                label: (
                  <LabelWrapper>{t(translations.header.tokens)}</LabelWrapper>
                ),
                options: searchResult(res.list, notAvailable),
              },
            ]);
          } else {
            setOptions([]);
          }
        })
        .catch(e => {
          if (e.name !== 'AbortError') {
            console.error(e);
          }
        });
    } else {
      setOptions([]);
    }
  };

  const onSelect = (value: string) => {
    history.push(`/token/${value}`);
  };

  return (
    <Container className="header-search-container">
      <AutoComplete
        style={{
          width: '100%',
        }}
        options={options}
        onSelect={onSelect}
        onSearch={_.debounce(handleSearch, 500)}
        dropdownClassName="header-search-dropdown"
      >
        <SearchInput
          allowClear
          onSearch={value => {
            onEnterPress(value);
          }}
          placeholder={
            bp === 's'
              ? t(translations.header.searchPlaceHolderMobile)
              : t(translations.header.searchPlaceHolder)
          }
          onPressEnter={e => {
            onEnterPress(e.currentTarget.value);
          }}
          enterButton={<SearchIcon color="#fff" />}
        />
      </AutoComplete>
    </Container>
  );
};

const LabelWrapper = styled.div`
  background-color: #f9f9f9;
  border-radius: 3px;
  padding: 3px 10px;
  color: #1a1a1a;
`;

const Container = styled.div`
  flex-grow: 1;
  padding: 0 1.5rem;

  // override antd style
  .ant-input-search .ant-input-group .ant-input-affix-wrapper:not(:last-child) {
    border-radius: 16px;
  }

  .ant-input-affix-wrapper {
    border-color: #b6bad2;
    padding-left: 16px;
    padding-right: 16px;
    font-size: 12px;
    color: #333;
    box-shadow: none !important;
    &:hover,
    &:focus {
      border-color: #424a71;
      box-shadow: none !important;
    }
  }
  .ant-input-affix-wrapper-focused {
    border-color: #424a71;
  }

  .ant-input {
    &::placeholder {
      color: rgba(51, 51, 51, 0.6);
    }
    &:hover,
    &:focus {
      border-color: #424a71;
    }
  }

  .ant-input-group-addon {
    position: absolute;
    right: 50px;
    top: 0;
    left: auto !important;
    width: 0;
  }

  .ant-input-search-button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: #424a71;
    border-radius: 16px !important;
    width: 50px;
    z-index: 5;

    &:hover {
      border: none;
      outline: none;
      background: #68719c;
    }
    svg {
      fill: #fff;
    }
  }
  .ant-input-suffix {
    margin-right: 40px;
    border: none;

    .ant-input-clear-icon-hidden {
      display: none;
    }

    .anticon {
      width: 24px;
      height: 100%;
      background: url(${ClearIcon}) no-repeat center center;
      background-size: 16px 16px;
      opacity: 0.6;
      &:hover {
        opacity: 1;
      }
      svg {
        display: none;
      }
    }
  }
`;
