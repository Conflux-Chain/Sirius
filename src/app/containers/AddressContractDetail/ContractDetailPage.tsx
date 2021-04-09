/**
 *
 * ContractDetailPage
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { useBreakpoint } from 'styles/media';
import { Apply, Copy, Edit, Jump, Qrcode } from './HeadLineButtons';
import {
  BalanceCard,
  NonceCard,
  StorageStakingCard,
  TokensCard,
} from './AddressInfoCards';
import { AddressMetadata, ContractMetadata, Table } from './Loadable';
import { Text } from 'app/components/Text';
import { useContract } from 'utils/api';
import {
  Bottom,
  Head,
  HeadAddressLine,
  Main,
  Middle,
  Title,
  Top,
} from './layouts';
import {
  isContractAddress,
  isInnerContractAddress,
  isSpecialAddress,
} from 'utils';
import ContractIcon from '../../../images/contract-icon.png';
import warningInfo from '../../../images/info-white.svg';
import InternalContractIcon from '../../../images/internal-contract-icon.png';
import styled from 'styled-components/macro';

interface RouteParams {
  address: string;
}

export const ContractDetailPage = memo(() => {
  const { t } = useTranslation();
  const { address } = useParams<RouteParams>();
  const bp = useBreakpoint();
  const history = useHistory();

  const { data: contractInfo } = useContract(address, [
    'name',
    'icon',
    'sponsor',
    'admin',
    'from',
    'code',
    'website',
    'transactionHash',
    'cfxTransferCount',
    'erc20TransferCount',
    'erc721TransferCount',
    'erc1155TransferCount',
    'stakingBalance',
    'sourceCode',
    'abi',
  ]);

  useEffect(() => {
    // contract created by other contract, such as 0x8a497f33c6f9e12adf918594ffb5ab5083448e45
    // contractInfo.transactionHash === undefined
    // if (!isInnerContractAddress(address) && !contractInfo.transactionHash) {
    if (
      !isContractAddress(address) &&
      !isInnerContractAddress(address) &&
      !isSpecialAddress(address)
    ) {
      history.replace(`/notfound/${address}`, {
        type: 'contract',
      });
    }
  }, [address, history]);

  const websiteUrl = contractInfo?.website || '';
  const hasWebsite =
    !!websiteUrl &&
    websiteUrl !== 'https://' &&
    websiteUrl !== 'http://' &&
    websiteUrl !== t(translations.general.loading);

  return (
    <>
      <Helmet>
        <title>{`${t(translations.contractDetail.title)} ${address}`}</title>
        <meta
          name="description"
          content={`${t(translations.contractDetail.content)} ${address}`}
        />
      </Helmet>
      <Main key="main">
        <Head key="head">
          <Title>
            {isInnerContractAddress(address)
              ? `${t(translations.general.internalContract)}: ${
                  contractInfo.name
                }`
              : isSpecialAddress(address)
              ? t(translations.general.specialAddress)
              : t(translations.general.contract)}
          </Title>
          <HeadAddressLine>
            {bp === 's' ? (
              <Text maxWidth="14.75rem">{address}</Text>
            ) : (
              <IconWrapper>
                {isInnerContractAddress(address) ? (
                  <img
                    src={InternalContractIcon}
                    alt={t(translations.general.internalContract)}
                  />
                ) : isSpecialAddress(address) ? null : (
                  <img
                    src={ContractIcon}
                    alt={t(translations.general.contract)}
                  />
                )}
                &nbsp;
                <span>{address}</span>
              </IconWrapper>
            )}
            <Copy address={address} />
            <Qrcode address={address} />
            <Edit address={address} />
            <Apply address={address} />
            {hasWebsite && (
              <Jump
                onClick={() => {
                  const url = websiteUrl.startsWith('http')
                    ? websiteUrl
                    : `http://${websiteUrl}`;
                  window.open(url);
                }}
              />
            )}
            {isSpecialAddress(address) ? (
              <WarningInfoWrapper>
                <img src={warningInfo} alt="warning" />
                <span>{t(translations.general.invalidAddressWarning)}</span>
              </WarningInfoWrapper>
            ) : null}
          </HeadAddressLine>
        </Head>
        <Top key="top">
          <BalanceCard accountInfo={contractInfo} />
          <TokensCard address={address} />
          <StorageStakingCard accountInfo={contractInfo} />
          <NonceCard accountInfo={contractInfo} />
        </Top>
        {/* internal contract hide meta data panel */}
        {isContractAddress(address) && (
          <Middle key="middle">
            {contractInfo.stakingBalance != null &&
            contractInfo.stakingBalance !== '0' ? (
              <StakingWrapper>
                <AddressMetadata address={address} accountInfo={contractInfo} />
              </StakingWrapper>
            ) : null}
            <ContractMetadata address={address} contractInfo={contractInfo} />
          </Middle>
        )}
        <Bottom key="bottom">
          <Table key="table" address={address} addressInfo={contractInfo} />
        </Bottom>
      </Main>
    </>
  );
});

const StakingWrapper = styled.div`
  margin-bottom: 24px;
`;

const IconWrapper = styled.span`
  margin-right: 2px;

  img {
    width: 16px;
    height: 16px;
    margin-bottom: 4px;
  }
`;

const WarningInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: #c65252;
  padding: 5px 16px;
  margin-bottom: 5px;
  margin-top: 5px;
  color: #fff;

  span {
    margin-left: 5px;
  }
`;
