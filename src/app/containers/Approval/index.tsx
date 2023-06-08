import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { PageHeader } from 'app/components/PageHeader';
import { Input, Button, Switch, message } from '@cfxjs/antd';
import { useHistory, useLocation } from 'react-router-dom';
import { isCurrentNetworkAddress } from 'utils';
import qs from 'query-string';
import { NotFound } from './NotFound';
import { reqApprovals } from 'utils/httpRequest';
import { isValidCfxAddress } from '@conflux-dev/conflux-address-js';
import { transactionColunms, tokenColunms } from 'utils/tableColumns';
import { TablePanel as TablePanelNew } from 'app/components/TablePanelNew';
import { useAge } from 'utils/hooks/useAge';
import { InfoIconWithTooltip } from 'app/components/InfoIconWithTooltip/Loadable';
import { Select } from 'app/components/Select';
import queryString from 'query-string';
import { usePortal } from 'utils/hooks/usePortal';
import { abi as ERC20ABI } from 'utils/contract/ERC20.json';
import { abi as ERC721ABI } from 'utils/contract/ERC721.json';
import { abi as ERC1155ABI } from 'utils/contract/ERC1155.json';
import { RPC_SERVER, NETWORK_ID } from 'utils/constants';
import SDK from 'js-conflux-sdk/dist/js-conflux-sdk.umd.min.js';

const { Search } = Input;

export function Approval() {
  const { accounts, provider } = usePortal();
  const { t } = useTranslation();
  const { search = '', pathname } = useLocation();
  const history = useHistory();
  const { text } = qs.parse(search);
  const [inputValue, setInputValue] = useState<string>(text as string);
  const [msg, setMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [ageFormat, toggleAgeFormat] = useAge();

  const getContract = useCallback(
    (address: string, type: string) => {
      const CFX = new SDK.Conflux({
        url: RPC_SERVER,
        networkId: NETWORK_ID,
      });

      CFX.provider = provider;

      const typeMap = {
        ERC20: ERC20ABI,
        ERC721: ERC721ABI,
        ERC1155: ERC1155ABI,
      };

      return CFX.Contract({
        abi: typeMap[type],
        address,
      });
    },
    [provider],
  );

  const [list, setList] = useState<
    Array<{
      contract: string;
      hash: string;
      spender: string;
      spenderName: string;
      tokenInfo: {
        base32: string;
        decimals: number;
        iconUrl: string;
        name: string;
        symbol: string;
        type: string;
      };
      updatedAt: string;
      value: string;
    }>
  >([]);

  const options = [
    // {
    //   key: 'all',
    //   name: t(translations.approval.select.all),
    //   rowKey: 'all',
    // },
    {
      key: 'ERC20',
      name: t(translations.approval.select.ERC20),
      rowKey: 'ERC20',
    },
    {
      key: 'ERC721',
      name: t(translations.approval.select.ERC721),
      rowKey: 'ERC721',
    },
    {
      key: 'ERC1155',
      name: t(translations.approval.select.ERC1155),
      rowKey: 'ERC1155',
    },
  ];
  const location = useLocation();
  const { type: queryType } = queryString.parse(location.search);

  let queryNumber = '1';
  if (queryType) {
    const index = options.findIndex(o => o.key === queryType);
    if (index > -1) {
      queryNumber = String(index);
    }
  }

  const [number, setNumber] = useState(queryNumber);

  useEffect(() => {
    if (queryNumber !== number) {
      setNumber(queryNumber);
    }
  }, [queryNumber, number]);

  useEffect(() => {
    setMsg('');

    if (text) {
      if (
        isValidCfxAddress(text as string) &&
        isCurrentNetworkAddress(text as string)
      ) {
        setLoading(true);
        // query approval list
        reqApprovals({
          query: {
            account: text,
            tokenType: options[number].key,
          },
        })
          .then(d => {
            setList(
              d.list.map(l => ({
                ...l,
                tokenInfo: {
                  ...l.tokenInfo,
                  address: l.tokenInfo.base32,
                },
              })),
            );
          })
          .catch(e => {
            console.log('request approvals error: ', e);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setMsg(t(translations.approval.errors.invalidAddress));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, number]);

  const handleTypeChange = number => {
    history.push(
      queryString.stringifyUrl({
        url: location.pathname,
        query: {
          ...queryString.parse(location.search),
          type: options[number].key,
        },
      }),
    );
  };

  const handleSwitchChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    history.push(
      queryString.stringifyUrl({
        url: location.pathname,
        query: {
          ...queryString.parse(location.search),
          viewAll: checked ? '1' : '0',
        },
      }),
    );
  };

  const handleChange = e => {
    const value = e.target.value.trim();

    setInputValue(value);
  };

  const handleSearch = value => {
    history.push(`${pathname}?text=${value}`);
  };

  const handleRevoke = data => {
    console.log('handle revoke: ', data);
    const contract = getContract(data.contract, data.tokenInfo.type);

    let tx;

    if (data.tokenInfo.type === 'ERC20') {
      tx = contract
        .approve(data.spender, 0)
        .sendTransaction({ from: accounts[0] });
    } else if (data.tokenInfo.type === 'ERC721') {
      // revoke all
      tx = contract
        .setApprovalForAll(data.spender, false)
        .sendTransaction({ from: accounts[0] });

      // revoke single tokenId
      // tx = contract
      //   // .approve(SDK.format.address(SDK.CONST.ZERO_ADDRESS_HEX, NETWORK_ID), data.value)
      //   .approve(SDK.CONST.ZERO_ADDRESS_HEX, data.value)
      //   .sendTransaction({ from: accounts[0] });
    } else if (data.tokenInfo.type === 'ERC1155') {
      tx = contract
        .setApprovalForAll(data.spender, false)
        .sendTransaction({ from: accounts[0] });
    }

    tx.then(res => {
      console.log('revoke success: ', res);
      message.info(t(translations.approval.tips.success));
    }).catch(e => {
      console.log('revoke error: ', e);
      message.info(t(translations.approval.tips.failed));
    });
  };

  useEffect(() => {
    // initial search
    if (!text && accounts.length) {
      handleSearch(accounts[0]);
      setInputValue(accounts[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, text]);

  console.log('list: ', list);

  const getContent = () => {
    if (msg) {
      return <NotFound>{msg}</NotFound>;
    } else {
      const columns = [
        {
          ...transactionColunms.hash,
          dataIndex: 'hash',
          key: 'hash',
        },
        {
          ...tokenColunms.token,
          dataIndex: 'tokenInfo',
          key: 'tokenInfo',
        },
        {
          title: t(translations.approval.tokenType),
          dataIndex: 'tokenInfo',
          key: 'tokenInfo',
          width: 1,
          render: data => {
            return data.type.replace('ERC', 'CRC');
          },
        },
        {
          title: t(translations.approval.amount),
          dataIndex: 'value',
          key: 'value',
          width: 1,
          render: data => {
            return data;
          },
        },
        {
          ...tokenColunms.contract(false),
          dataIndex: 'contract',
          key: 'contract',
        },
        {
          ...transactionColunms.age(ageFormat, toggleAgeFormat),
          dataIndex: 'updatedAt',
          key: 'updatedAt',
        },

        {
          title: t(translations.approval.operation),
          dataIndex: 'operation',
          key: 'operation',
          width: 1,
          render: (_, row) => {
            return (
              <Button
                size="small"
                onClick={() => handleRevoke(row)}
                disabled={accounts[0] !== text}
              >
                {t(translations.approval.revoke)}
              </Button>
            );
          },
        },
      ].map((item, i) => ({
        ...item,
        width: [3, 5, 3, 3, 3, 3, 3][i],
      }));

      return (
        <StyledContentWrapper>
          <div className="menuContainer">
            <InfoIconWithTooltip info={t(translations.approval.tips.view)}>
              {t(translations.approval.view)}
            </InfoIconWithTooltip>
            <Switch
              defaultChecked
              onChange={handleSwitchChange}
              size="small"
              className="switch"
            />
            <Select
              value={number}
              onChange={handleTypeChange}
              disableMatchWidth
              size="small"
              className="btnSelectContainer"
              variant="text"
            >
              {options.map((o, index) => {
                return (
                  <Select.Option key={o.key} value={String(index)}>
                    {o.name}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
          <TablePanelNew
            columns={columns}
            rowKey="hash"
            dataSource={list}
            loading={loading}
            pagination={false}
            scroll={{ x: 1300 }}
          ></TablePanelNew>
        </StyledContentWrapper>
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>{t(translations.header.cns)}</title>
        <meta
          name="description"
          content={t(translations.metadata.description)}
        />
      </Helmet>
      <PageHeader>{t(translations.approval.title)}</PageHeader>
      <StyledSubtitleWrapper>
        <span className="subtitle">{t(translations.approval.subtitle)}</span>
        <InfoIconWithTooltip
          info={t(translations.approval.tips.support)}
        ></InfoIconWithTooltip>
      </StyledSubtitleWrapper>
      <SearchWrapper>
        <Search
          value={inputValue}
          onChange={handleChange}
          onSearch={handleSearch}
          placeholder={t(translations.approval.inputPlaceholder)}
          loading={loading}
        />
      </SearchWrapper>
      {getContent()}
    </>
  );
}

const StyledContentWrapper = styled.div`
  position: relative;

  .menuContainer {
    position: absolute;
    right: 16px;
    top: 12px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
  }

  .switch {
    margin: 0 8px;
  }

  .select.btnSelectContainer .option.selected,
  .selectLabel {
    color: #8890a4;
    font-size: 0.8571rem;
    font-weight: normal;
  }

  .select.btnSelectContainer {
    background: rgba(30, 61, 228, 0.04);
    &:hover {
      background: rgba(30, 61, 228, 0.08);
    }
  }
`;

const SearchWrapper = styled.div`
  margin-bottom: 24px;

  .ant-input-search {
    max-width: 500px;
  }

  .ant-input {
    border-radius: 16px !important;
    background: rgba(30, 61, 228, 0.04);
    border: none !important;
    padding-right: 41px;
  }

  .ant-input-group-addon {
    background: transparent !important;
    left: -38px !important;
    z-index: 80;

    .ant-btn {
      background: transparent !important;
      border: none !important;
      padding: 0 !important;
      margin: 0 !important;
      line-height: 1 !important;
      box-shadow: none !important;

      &:after {
        display: none !important;
      }

      &:before {
        background-color: transparent !important;
      }

      .anticon {
        font-size: 18px;
        margin-bottom: 3px;
      }
    }
  }

  /* .convert-address-error {
    width: 100%;
    margin: 0.5714rem 0;
    font-size: 0.8571rem;
    color: #e64e4e;
    line-height: 1.1429rem;
    padding-left: 0.3571rem;

    ${media.s} {
      width: 100%;
    }
  } */
`;

const StyledSubtitleWrapper = styled.div`
  color: #74798c;
  font-size: 1rem;
  line-height: 1.2857rem;
  margin: 1.1429rem 0 1.7143rem;
  display: flex;

  .subtitle {
    margin-right: 2px;
  }
`;
