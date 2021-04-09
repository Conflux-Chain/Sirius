import React from 'react';
import { Loading } from '@cfxjs/react-ui';
import { useTranslation } from 'react-i18next';
import {
  CartesianGrid,
  Line,
  LineChart as Chart,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import dayjs from 'dayjs';
import styled from 'styled-components';
import usePlot from './usePlot';
import { formatNumber } from '../../../utils';
import { trackEvent } from '../../../utils/ga';
import { ScanEvent } from '../../../utils/gaConstants';

const DURATIONS = [
  ['hour', '1H'],
  ['day', '1D'],
  ['month', '1M'],
  ['all', 'ALL'],
];

export const LineChart = ({ width = 500, indicator = 'blockTime' }) => {
  const { t } = useTranslation();
  const clientWidth = document.body.clientWidth;
  const small = width < 500;
  const padding = small ? 16 : 48;
  // get the max x grids which most suitable chart width
  let NUM_X_GRID = Math.floor(Math.min(clientWidth, 1024) / 50);
  if (NUM_X_GRID < 7) NUM_X_GRID = 7;
  if (small) NUM_X_GRID = 6;

  const hasDurationFilter = ![
    'dailyTransaction',
    'dailyTransactionTokens',
    'cfxHoldingAccounts',
  ].includes(indicator);

  const chartWidth =
    width - padding - (hasDurationFilter ? (small ? 50 : 70) : 0);
  const chartHeight = small ? chartWidth * 0.45 : chartWidth * 0.35;

  const {
    plot,
    isError,
    isLoading,
    setDuration,
    duration,
    axisFormat,
    popupFormat,
  } = usePlot('day', NUM_X_GRID, indicator);

  // y axis data range
  const domain =
    plot && plot.length > 0
      ? plot.reduce(
          (acc, cur, index) => {
            if (acc.min == null) acc.min = cur;
            else {
              acc.min = {
                blockTime: 0,
                tps: 0,
                difficulty: Math.min(+acc.min.difficulty, +cur.difficulty),
                hashRate: Math.min(+acc.min.hashRate, +cur.hashRate),
                dailyTransaction: 0,
                dailyTransactionTokens: 0,
              };
            }
            if (acc.max == null) acc.max = cur;
            else {
              acc.max = {
                blockTime: 'auto',
                tps: 'auto',
                difficulty: Math.max(+acc.max.difficulty || 0, +cur.difficulty),
                hashRate: Math.max(+acc.max.hashRate || 0, +cur.hashRate),
                dailyTransaction: 'auto',
                dailyTransactionTokens: Math.max(
                  +acc.max.dailyTransactionTokens || 0,
                  +cur['txnCount'],
                ),
                // dailyTransaction: Math.min(
                //   +acc.max.dailyTransaction,
                //   +cur.txCount,
                // ),
              };
            }
            if (index === plot.length - 1) {
              acc.min.difficulty = acc.min.difficulty * 0.7;
              acc.min.hashRate = acc.min.hashRate * 0.7;
              acc.max.difficulty = acc.max.difficulty * 1.1;
              acc.max.hashRate = acc.max.hashRate * 1.1;
              acc.max.dailyTransactionTokens =
                acc.max.dailyTransactionTokens * 1.1;
            }
            return acc;
          },
          { min: null, max: null },
        )
      : {
          min: {
            blockTime: 0,
            tps: 0,
            difficulty: 0,
            hashRate: 0,
            dailyTransaction: 0,
            dailyTransactionTokens: 0,
            cfxHoldingAccounts: 0,
          },
          max: {
            blockTime: 'auto',
            tps: 'auto',
            difficulty: 'auto',
            hashRate: 'auto',
            dailyTransaction: 'auto',
            dailyTransactionTokens: 'auto',
            cfxHoldingAccounts: 'auto',
          },
        };

  const strokeColor = () => {
    switch (indicator) {
      case 'dailyTransaction':
      case 'dailyTransactionTokens':
        // because of reverse
        return plot &&
          plot.length > 0 &&
          plot[plot.length - 1]['txnCount'] - plot[0]['txnCount'] <= 0
          ? '#1E54FF'
          : '#FA5D8E';
      case 'cfxHoldingAccounts':
        // because of reverse
        return plot &&
          plot.length > 0 &&
          plot[plot.length - 1]['holderCount'] - plot[0]['holderCount'] <= 0
          ? '#1E54FF'
          : '#FA5D8E';
      default:
        return plot &&
          plot.length > 0 &&
          plot[plot.length - 1][indicator] - plot[0][indicator] >= 0
          ? '#1E54FF'
          : '#FA5D8E';
    }
  };

  // x axis date format
  const xAxisFormat = ({ x, y, payload }) => {
    const d = hasDurationFilter
      ? dayjs.unix(payload.value)
      : dayjs(payload.value);
    const [row1, row2] = axisFormat.split('\n');
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={17} y={10} dy={16} textAnchor="end">
          {row2 ? (
            <>
              <tspan x={17} dy={5}>
                {d.format(row1)}
              </tspan>
              <tspan x={17} dy={16}>
                {d.format(row2)}
              </tspan>
            </>
          ) : (
            <tspan x={15} dy={5}>
              {d.format(row1)}
            </tspan>
          )}
        </text>
      </g>
    );
  };

  // y axis number format
  const yAxisFormat = value => {
    return formatNumber(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <TooltipWrapper>
          <p className="label">
            {hasDurationFilter
              ? dayjs.unix(label).format(popupFormat)
              : dayjs(label).format(popupFormat)}
          </p>
          <p className="desc">
            {formatNumber(payload[0].value)}
            {indicator === 'blockTime' ? 's' : ''}
          </p>
        </TooltipWrapper>
      );
    }

    return null;
  };

  const xAxisKey = () => {
    switch (indicator) {
      case 'cfxHoldingAccounts':
        return 'statDay';
      case 'dailyTransaction':
      case 'dailyTransactionTokens':
        return 'day';
      default:
        return 'timestamp';
    }
  };

  const lineKey = () => {
    switch (indicator) {
      case 'dailyTransaction':
      case 'dailyTransactionTokens':
        return 'txnCount';
      case 'cfxHoldingAccounts':
        return 'holderCount';
      default:
        return indicator;
    }
  };

  if (isError) {
    return <div>Error</div>;
  } else {
    return (
      <Container style={{ width }} small={small}>
        <Title>{t(`charts.${indicator}.title`)}</Title>
        <Description>{t(`charts.${indicator}.description`)}</Description>
        {isLoading ? (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        ) : null}
        <Chart
          width={chartWidth}
          height={chartHeight}
          data={plot}
          margin={{
            left: 10,
            right: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid stroke="#eee" />
          {plot ? (
            <XAxis
              dataKey={xAxisKey()}
              tick={xAxisFormat}
              interval={hasDurationFilter ? 0 : Math.floor(30 / NUM_X_GRID)}
              reversed={!hasDurationFilter}
              stroke="#333333"
            />
          ) : null}
          <YAxis
            stroke="#333333"
            tickFormatter={yAxisFormat}
            domain={[domain.min[indicator], domain.max[indicator]]}
            width={
              [
                'difficulty',
                'hashRate',
                'dailyTransaction',
                'dailyTransactionTokens',
                'cfxHoldingAccounts',
              ].includes(indicator)
                ? 60
                : 30
            }
          />
          <Line
            type="linear"
            dataKey={lineKey()}
            stroke={strokeColor()}
            strokeWidth={2}
          />
          <Tooltip content={<CustomTooltip />} />
        </Chart>
        {hasDurationFilter ? (
          <Buttons small={small}>
            {DURATIONS.map(([d, key]) => (
              <Button
                key={key}
                small={small}
                active={d === duration}
                onClick={() => {
                  // ga
                  trackEvent({
                    category: ScanEvent.stats.category,
                    action:
                      ScanEvent.stats.action[`${indicator}IntervalChange`],
                    label: d,
                  });
                  setDuration(d);
                }}
              >
                {key}
              </Button>
            ))}
          </Buttons>
        ) : null}
      </Container>
    );
  }
};

const Container = styled.div`
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  padding: ${props => (props.small ? '8px' : '24px')};
  box-shadow: 0.8571rem 0.5714rem 1.7143rem -0.8571rem rgba(20, 27, 50, 0.12);
  border-radius: 5px;
  min-height: ${props => (props.small ? '200px' : '250px')};

  svg {
    font-size: 12px;
  }
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: calc(50% - 30px);
  width: 40px;
  height: 40px;
  left: calc(50% - 20px);
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.1429rem;
  color: black;
  line-height: 2.1429rem;
`;

const Description = styled.div`
  font-weight: bold;
  line-height: 1.2143rem;
  font-size: 0.8571rem;
  color: #4a6078;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Buttons = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 1.5rem;
  top: ${props => (props.small ? '1.5rem' : '5rem')};
  box-sizing: content-box;
`;

const Button = styled.button`
  cursor: pointer;
  width: ${props => (props.small ? '27px' : '32px')};
  height: ${props => (props.small ? '16px' : '20px')};
  border: 1px solid rgba(59, 85, 145, 0.2);
  color: #3b5591;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7143rem;
  margin-bottom: 0.5714rem;
  background: ${props => (props.active ? 'rgba(59, 85, 145, 0.2)' : '#ffffff')};
  box-shadow: 0.8571rem 0.5714rem 1.7143rem -0.8571rem rgba(6, 6, 8, 0.12);
  border-radius: 0.2857rem;
`;

const TooltipWrapper = styled.div`
  padding: 5px 10px;
  color: #fff;
  font-size: 10px;
  background-color: rgba(113, 143, 245, 0.8);

  p {
    margin: 0;
  }
  .desc {
    font-size: 12px;
    font-weight: bold;
  }
`;
