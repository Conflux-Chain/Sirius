import React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { LineChart as Chart } from '../../components/Chart/Loadable';
import { media } from 'styles/media';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/i18n';

export function Charts() {
  const { t } = useTranslation();
  const clientWidth = document.body.clientWidth;
  let chartWidth = clientWidth - 72;

  // TODO will be adjusted according to page breakpoints in the future
  if (chartWidth > 1024) chartWidth = 1024;
  if (chartWidth < 365) chartWidth = 365;

  return (
    <>
      <Helmet>
        <title>{t(translations.charts.title)}</title>
        <meta name="description" content={t(translations.charts.description)} />
      </Helmet>
      <PageWrap>
        <HeaderWrap>
          <div className="subtitle">{t(translations.charts.subtitle)}</div>
          <div className="title">{t(translations.charts.title)}</div>
        </HeaderWrap>
        <ChartsWrap>
          <Chart width={chartWidth} indicator="blockTime" />
          <Chart width={chartWidth} indicator="tps" />
          <Chart width={chartWidth} indicator="difficulty" />
          <Chart width={chartWidth} indicator="hashRate" />
        </ChartsWrap>
      </PageWrap>
    </>
  );
}

const ChartsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    margin-right: 0;
    margin-bottom: 24px;
    background-color: #fff;
  }
  > div:last-child {
    margin-bottom: 0;
  }

  @media (min-width: 872px) {
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;

    > div {
      margin-bottom: 24px !important;
    }
  }
`;

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 0 8px;
  ${media.s} {
    padding: 16px 0;
  }
`;

const HeaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.1429rem;
  padding: 0 ${props => `${props.padding}px`};
  .subtitle {
    font-size: 1rem;
    color: #7e8598;
    line-height: 1.7143rem;
    margin-bottom: 0.8571rem;
  }
  .title {
    font-size: 1.7143rem;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 2.2857rem;
  }
`;
