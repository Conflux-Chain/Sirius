import React from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { ChartTemplate } from './ChartTemplate';
import { StockChartTemplate, ChildProps } from './StockChartTemplate';
import { OPEN_API_URLS } from 'utils/constants';
import { Wrapper } from './Wrapper';
import BigNumber from 'bignumber.js';

export function Token({
  preview = false,
  address,
}: ChildProps & { address: string }) {
  const { t } = useTranslation();

  const props = {
    plain: true,
    preview: preview,
    name: '',
    title: t(translations.highcharts.token.title),
    subtitle: t(translations.highcharts.token.subtitle),
    request: {
      url: OPEN_API_URLS.token,
      query: {
        base32: address,
        limit: 100,
      },
      formatter: data => {
        const data1: any = [];
        const data2: any = [];
        const data3: any = [];
        const data4: any = [];

        data?.list?.map((d, i) => {
          const t = dayjs.utc(d.createdAt).valueOf();
          data1.push([t, new BigNumber(d.transferAmount).div(1e18).toNumber()]);
          data2.push([t, Number(d.transferCount)]);
          data3.push([t, Number(d.uniqueReceiver)]);
          data4.push([t, Number(d.uniqueSender)]);
        });

        return [data1, data2, data3, data4];
      },
    },
    options: {
      chart: {
        zoomType: 'x',
        type: 'line',
      },
      title: {
        text: t(translations.highcharts.token.title),
      },
      subtitle: {
        text: t(translations.highcharts.subtitle),
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: t(translations.highcharts.token.yAxisTitle),
        },
      },
      series: [
        {
          name: `[ <span style="color:rgb(124, 181, 236);">${t(
            translations.highcharts.token.seriesName,
          )}</span> ]`,
        },
        {
          name: `[ <span style="color:rgb(124, 181, 236);">${t(
            translations.highcharts.token.seriesName2,
          )}</span> ]`,
        },
        {
          name: `[ <span style="color:rgb(124, 181, 236);">${t(
            translations.highcharts.token.seriesName3,
          )}</span> ]`,
        },
        {
          name: `[ <span style="color:rgb(124, 181, 236);">${t(
            translations.highcharts.token.seriesName4,
          )}</span> ]`,
        },
      ],
    },
  };

  return (
    <Wrapper {...props}>
      {localStorage.getItem('USE-STOCK') === 'true' ? (
        <StockChartTemplate {...props}></StockChartTemplate>
      ) : (
        <ChartTemplate {...props}></ChartTemplate>
      )}
    </Wrapper>
  );
}
