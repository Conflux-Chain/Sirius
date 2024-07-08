import React from 'react';
import dayjs from 'dayjs';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { StockChartTemplate } from '@cfxjs/sirius-next-common/dist/components/Charts/StockChartTemplate';
import { ChildProps } from '@cfxjs/sirius-next-common/dist/components/Charts/config';
import { OPEN_API_URLS } from 'utils/constants';

export function CFXDailyBurn({ preview = false }: ChildProps) {
  const { t } = useTranslation();

  const props = {
    request: {
      url: OPEN_API_URLS.cfxDailyBurn,
      formatter: data => {
        const data1: any = [];
        const data2: any = [];

        data?.list?.map((d, i) => {
          const t = dayjs.utc(d.statTime).valueOf();
          data1.push([
            t,
            Number(new BigNumber(d.burntGasFeeTotal).div(1e18).toNumber()),
          ]);
          data2.push([
            t,
            Number(new BigNumber(d.burntStorageFeeTotal).div(1e18).toNumber()),
          ]);
        });

        return [data1, data2];
      },
    },
    options: {
      chart: {
        zoomType: 'x',
      },
      header: {
        titleShow: false,
        breadcrumbShow: false,
      },
      title: {
        text: t(translations.highcharts.burntFeesAnalysis.CFXDailyBurn),
      },
      subtitle: {
        text: t(translations.highcharts.subtitle),
      },
      xAxis: {
        type: 'datetime',
      },
      tooltip: {
        shared: true,
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
      },
      navigator: {
        enabled: false,
      },
      scrollbar: {
        enabled: false,
      },
      series: [
        {
          type: 'column',
          name: `<span>${t(
            translations.highcharts.burntFeesAnalysis['1559MetricsBurn'],
          )}</span>`,
          color: '#7cb5ec',
        },
        {
          type: 'column',
          name: `<span>${t(
            translations.highcharts.burntFeesAnalysis['storageBurn'],
          )}</span>`,
          color: '#90ed7d',
        },
      ],
    },
  };

  return <StockChartTemplate {...props}></StockChartTemplate>;
}
