import React from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { StockChartTemplate } from 'sirius-next/packages/common/dist/components/Charts/StockChartTemplate';
import { PreviewChartTemplate } from 'sirius-next/packages/common/dist/components/Charts/PreviewChartTemplate';
import { ChildProps } from 'sirius-next/packages/common/dist/components/Charts/config';
import { OPEN_API_URLS } from 'utils/constants';
import BigNumber from 'bignumber.js';

export function DailyParticipation({ preview = false }: ChildProps) {
  const { t } = useTranslation();

  const props = {
    request: {
      url: OPEN_API_URLS.PoSDailyParticipationRate,
      query: preview
        ? {
            limit: '30',
            intervalType: 'day',
          }
        : undefined,
      formatter: data => {
        return [
          data?.list?.map((d, i) => {
            return [
              dayjs.utc(d.day).valueOf(),
              Number(new BigNumber(d.v).toFixed(2)),
            ];
          }),
        ];
      },
    },
    options: {
      chart: {
        zoomType: 'x',
      },
      header: {
        title: {
          text: t(translations.highcharts.pos.participation.title),
        },
        subtitle: {
          text: t(translations.highcharts.pos.participation.subtitle),
        },
        breadcrumb: [
          {
            name: t(translations.highcharts.pos.breadcrumb.charts),
            path: '/pos-charts',
          },
          {
            name: t(
              translations.highcharts.pos.breadcrumb['participation-rate'],
            ),
            path: '/pos-charts/participation-rate',
          },
        ],
      },
      title: {
        text: t(translations.highcharts.pos.participation.title),
      },
      subtitle: {
        text: t(translations.highcharts.subtitle),
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: t(translations.highcharts.pos.participation.yAxisTitle),
        },
      },
      tooltip: {
        valueSuffix: '%',
      },
      series: [
        {
          type: 'area',
          name: `<span>${t(
            translations.highcharts.pos.participation.seriesName,
          )}</span>`,
        },
      ],
    },
  };

  return preview ? (
    <PreviewChartTemplate {...props}></PreviewChartTemplate>
  ) : (
    <StockChartTemplate {...props}></StockChartTemplate>
  );
}
