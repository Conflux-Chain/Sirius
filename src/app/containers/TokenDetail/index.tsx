import React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@cfxjs/react-ui';
import { Link } from '../../components/Link/Loadable';
import { translations } from '../../../locales/i18n';
import { Basic } from './Basic';
import { Transfers } from './Transfers';
import { useTokenQuery } from '../../../utils/api';
import { Tooltip } from '../../components/Tooltip/Loadable';

interface RouteParams {
  tokenAddress: string;
}

export function TokenDetail() {
  const { t } = useTranslation();
  const { tokenAddress } = useParams<RouteParams>();
  const params = {
    address: tokenAddress,
    fields: 'transferCount,icon',
  };
  let { data, error } = useTokenQuery(params, !!tokenAddress);

  if (!data && !error) {
    data = {};
  }

  return (
    <>
      <Helmet>
        <title>{t(translations.tokens.title)}</title>
        <meta name="description" content={t(translations.tokens.description)} />
      </Helmet>
      <TokenDetailWrap>
        {data.name ? (
          <HeaderWrap>
            {!data.isCustodianToken ? (
              <img className="img" alt="icon" src={data.icon} />
            ) : (
              <Tooltip
                hoverable
                text={
                  <span>
                    {t(translations.token.shuttleflow)}
                    <Link href="https//shuttleflow.io" target="_blank">
                      Shuttleflow
                    </Link>
                  </span>
                }
              >
                <img alt="icon" src={data.icon} />
              </Tooltip>
            )}
            <div className="basic-name">{data.name}</div>
            <div className="basic-symbol">{`(${data.symbol})`}</div>
          </HeaderWrap>
        ) : (
          <SkeletonWrap>
            <Skeleton className="sirius-tokendetail-skeleton"></Skeleton>
          </SkeletonWrap>
        )}
        <Basic {...data} tokenAddress={tokenAddress} />
        <Transfers
          decimals={data.decimals}
          tokenAddress={tokenAddress}
          symbol={data.symbol}
        />
      </TokenDetailWrap>
    </>
  );
}

const TokenDetailWrap = styled.div`
  padding: 2.2857rem 0;
`;

const SkeletonWrap = styled.div`
  .skeleton.sirius-tokendetail-skeleton.text {
    width: 8.5714rem;
    height: 2.5714rem;
    margin-bottom: 1.7143rem;
  }
`;

const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  line-height: 2.2857rem;
  margin-bottom: 1.7143rem;
  .img {
    width: 20px;
    height: 20px;
  }
  .basic-name {
    font-size: 1.7143rem;
    font-weight: 500;
    color: #1a1a1a;
    margin: 0 0.5714rem;
  }
  .basic-symbol {
    color: #74798c;
    font-size: 1rem;
  }
`;
