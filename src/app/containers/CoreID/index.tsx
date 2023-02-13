/**
 *
 * NFT Checker
 *
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { PageHeader } from 'app/components/PageHeader';
import { Input } from '@cfxjs/antd';
import { useHistory, useLocation } from 'react-router-dom';
import { isCurrentNetworkAddress, isBase32Address, isZeroAddress } from 'utils';
import CoreidUtil from '@cubed/coreid-util';
import { NETWORK_ID } from 'utils/constants';
import qs from 'query-string';
import dayjs from 'dayjs';
import { Description } from 'app/components/Description/Loadable';
import { AddressContainer } from 'app/components/AddressContainer';
import { Card } from 'app/components/Card/Loadable';
import { TablePanel as TablePanelNew } from 'app/components/TablePanelNew';
import {
  TabLabel,
  TabsTablePanel,
} from 'app/components/TabsTablePanel/Loadable';

const { Search } = Input;

export function CoreID() {
  const { t } = useTranslation();
  const { search = '', pathname } = useLocation();
  const history = useHistory();
  const { text } = qs.parse(search);
  const [inputValue, setInputValue] = useState<string>(text as string);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{
    type: '' | 'coreid' | 'address' | 'noResult';
    msg?: string;
    status?:
      | 'Valid'
      | 'TooShort'
      | 'Reserved'
      | 'IllegalChar'
      | 'Locked'
      | 'Registered'
      | 'SoldOut';
    // search coreid
    name?: string; // coreid
    resolvedAddress?: string;
    expires?: string;
    registrant?: string;
    controller?: string;
    owner?: string;
    namehash?: string; // tokenid
    // search address
    address?: string;
    reverseRecord?: string;
    userDomains?: Array<{
      name: string;
      address: string;
    }>;
  }>({
    type: '',
  });

  const coreid = useMemo(() => {
    return new CoreidUtil({
      networkId: NETWORK_ID,
    });
  }, []);

  useEffect(() => {
    if (text) {
      searchHandler(text);
    }
  }, [searchHandler, text]);

  const handleChange = e => {
    setInputValue(e.target.value.trim());
  };

  const searchHandler = async value => {
    console.log('search text: ', value);
    console.log('domains: ', await coreid.address(`${value}.web3`));

    const { namehash } = CoreidUtil.utils;

    if (isCurrentNetworkAddress(value)) {
      // cfxtest:aargwwstcp4axhxgkxfuy9pent1vtmaskjwr12xfsj
      let address = value;

      setLoading(true);

      const name = await coreid.name(address);

      if (name) {
        const data = await coreid.multicall([
          {
            method: 'userDomains',
            args: [address],
          },
          {
            method: 'registrant',
            args: [name],
          },
        ]);

        const userDomainsAddress = await coreid.multicall(
          data[0].map((d: string) => ({
            method: 'address',
            args: [d],
          })),
        );

        setData({
          type: 'address',
          address,
          reverseRecord: name,
          registrant: data[1],
          userDomains: data[0].map((d: string, i: number) => ({
            name: d,
            address: userDomainsAddress[i],
          })),
        });
      } else {
        setData({
          type: 'noResult',
          msg: 'address has no reverse record',
        });
      }
    } else if (value.substr(-5) === '.web3' || value.substr(-5) === '.dao') {
      if (value.split('.').length === 2) {
        let name = value;
        // 88888888.web3

        setLoading(true);

        const data = await coreid.multicall([
          {
            method: 'address',
            args: [name],
          },
          {
            method: 'nameExpires',
            args: [name],
          },
          {
            method: 'registrant',
            args: [name],
          },
          {
            method: 'controller',
            args: [name],
          },
          {
            method: 'ownerOf',
            args: [name],
          },
          {
            method: 'status',
            args: [name],
          },
        ]);

        if (data[5] === 'Registered') {
          const expiresTimestamp = data[1].toNumber();

          setData({
            type: 'coreid',
            name,
            resolvedAddress: data[0],
            expires:
              expiresTimestamp === 0
                ? '--'
                : dayjs(expiresTimestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
            registrant: data[2],
            controller: data[3],
            owner: data[4],
            namehash: namehash(name),
            status: data[5],
          });
        } else {
          // not registered
          setData({
            type: 'noResult',
            msg: 'name is not registered',
          });
        }
      } else {
        // at present not support subdomain
        setData({
          type: 'noResult',
          msg: 'name is subdomain',
        });
      }
    } else {
      // TODO invalid search text
      setData({
        type: 'noResult',
        msg: 'name is invalid',
      });
    }

    setLoading(false);
  };

  const handleSearch = value => {
    history.push(`${pathname}?text=${value}`);
  };

  console.log('data is: ', data);

  const getCard = () => {
    let card: React.ReactNode = null;

    if (data.type === 'noResult') {
      card = 'no result, ' + data.msg;
    } else if (data.type === 'coreid') {
      card = (
        <Card>
          <Description title={t(translations.coreId.coreid)}>
            {isZeroAddress(data.resolvedAddress || '') ? (
              data.name
            ) : (
              <AddressContainer
                value={data.resolvedAddress || ''}
              ></AddressContainer>
            )}
          </Description>
          {isZeroAddress(data.resolvedAddress || '') ? null : (
            <Description title={t(translations.coreId.resolvedAddress)}>
              <AddressContainer
                value={data.resolvedAddress || ''}
              ></AddressContainer>
            </Description>
          )}
          <Description title={t(translations.coreId.expires)}>
            {data.expires}
          </Description>
          <Description title={t(translations.coreId.registrant)}>
            <AddressContainer value={data.registrant || ''}></AddressContainer>
          </Description>
          <Description title={t(translations.coreId.controller)}>
            <AddressContainer value={data.controller || ''}></AddressContainer>
          </Description>
          <Description title={t(translations.coreId.tokenid)} noBorder>
            {data.namehash}
          </Description>
        </Card>
      );
    } else if (data.type === 'address') {
      const columns = [
        {
          title: t(translations.coreId.name),
          dataIndex: 'name',
          width: 1,
          key: 'name',
          render(value, row) {
            if (row.address) {
              return <AddressContainer value={row.address}></AddressContainer>;
            } else {
              return <>{value}</>;
            }
          },
        },
      ];

      card = (
        <>
          <Card style={{ marginBottom: '1rem' }}>
            <Description title={t(translations.coreId.address)}>
              <AddressContainer
                value={data.address || ''}
                showENSLabel={false}
              ></AddressContainer>
            </Description>
            <Description title={t(translations.coreId.reverseRecord)}>
              {<AddressContainer value={data.address || ''}></AddressContainer>}
            </Description>
            <Description title={t(translations.coreId.registrant)} noBorder>
              <AddressContainer
                value={data.registrant || ''}
              ></AddressContainer>
            </Description>
          </Card>
          {data.userDomains?.length ? (
            <TabsTablePanel
              tabs={[
                {
                  value: 'ownedCoreids',
                  label: t(translations.coreId.ownedCoreids),
                  content: (
                    <TablePanelNew
                      columns={columns}
                      rowKey="name"
                      dataSource={data.userDomains}
                      pagination={false}
                    ></TablePanelNew>
                  ),
                },
              ]}
            />
          ) : null}
        </>
      );
    }

    return card;
  };

  return (
    <>
      <Helmet>
        <title>{t(translations.header.coreId)}</title>
        <meta
          name="description"
          content={t(translations.metadata.description)}
        />
      </Helmet>
      <PageHeader>{t(translations.coreId.title)}</PageHeader>
      <StyledSubtitleWrapper>
        {t(translations.coreId.subtitle)}
      </StyledSubtitleWrapper>
      <SearchWrapper>
        <Search
          value={inputValue}
          onChange={handleChange}
          onSearch={handleSearch}
          placeholder={t(translations.coreId.inputPlaceholder)}
        />
      </SearchWrapper>
      {getCard()}
    </>
  );
}

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

      .anticon {
        font-size: 18px;
        margin-bottom: 3px;
      }
    }
  }

  .convert-address-error {
    width: 100%;
    margin: 0.5714rem 0;
    font-size: 0.8571rem;
    color: #e64e4e;
    line-height: 1.1429rem;
    padding-left: 0.3571rem;

    ${media.s} {
      width: 100%;
    }
  }
`;

const StyledSubtitleWrapper = styled.div`
  color: #74798c;
  font-size: 1rem;
  line-height: 1.2857rem;
  margin: 1.1429rem 0 1.7143rem;
`;
