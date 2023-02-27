import React from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { ChartTemplate, ChildProps } from 'app/components/Charts/ChartTemplate';
import { OPEN_API_URLS } from 'utils/constants';
import SDK from 'js-conflux-sdk';
import { Wrapper } from './Wrapper';
import BigNumber from 'bignumber.js';

export function CirculatingSupply({ preview = false }: ChildProps) {
  const { t } = useTranslation();

  const props = {
    name: 'circulating',
    preview,
    title: t(translations.highcharts.pow.circulatingSupply.title),
    subtitle: t(translations.highcharts.pow.circulatingSupply.subtitle),
    request: {
      url: OPEN_API_URLS.supply,
      formatter: data => {
        if (data) {
          return [
            {
              name: t(translations.highcharts.pow.circulatingSupply.others),
              y: parseInt(
                new SDK.Drip(
                  new BigNumber(data?.totalCirculating)
                    .minus(data?.nullAddressBalance)
                    .minus(data?.totalStaking)
                    .minus(data?.totalCollateral)
                    .toNumber(),
                ).toCFX(),
              ),
            },
            {
              name: t(
                translations.highcharts.pow.circulatingSupply.totalCollateral,
              ),
              y: parseInt(new SDK.Drip(data?.totalCollateral).toCFX()),
            },
            {
              name: t(
                translations.highcharts.pow.circulatingSupply.totalStaking,
              ),
              y: parseInt(new SDK.Drip(data?.totalStaking).toCFX()),
            },
          ];
        }
        return [];
      },
    },
    options: {
      title: {
        text: t(translations.highcharts.pow.circulatingSupply.title),
      },
      tooltip: {
        pointFormat: `Amount: <b>{point.y}</b><br>Percentage: <b>{point.percentage:.2f}%</b>`,
        valueSuffix: ' CFX',
      },
      series: [
        {
          type: 'pie',
        },
      ],
    },
  };

  return (
    <Wrapper {...props}>
      <ChartTemplate {...props}></ChartTemplate>
    </Wrapper>
  );
}
