import React from 'react';
import { Row, Col, Divider } from '@cfxjs/antd';
import { PageHeader } from 'app/components/PageHeader/Loadable';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import styled from 'styled-components/macro';
import dayjs from 'dayjs';

import { BlockTime } from './BlockTime';
import { TPS } from './TPS';
import { HashRate } from './HashRate';
import { TotalSupply } from './TotalSupply';
import { CirculatingSupply } from './CirculatingSupply';
import { Difficulty } from './Difficulty';
import { Tx } from './Tx';

export function NewChart() {
  const { t } = useTranslation();

  const format = 'DD MMM YYYY';
  const current = dayjs().subtract(1, 'day');
  const oneMonthBefore = current.subtract(30, 'day');

  return (
    <StyledChartPreviewWrapper>
      <PageHeader subtitle={t(translations.highcharts.preview.subtitle)}>
        {t(translations.highcharts.preview.title)}
      </PageHeader>
      <Row justify="space-between">
        <Col>
          <div className="tip">{t(translations.highcharts.preview.tip)}</div>
        </Col>
        <Col>
          <div className="duration">
            {oneMonthBefore.format(format)} - {current.format(format)}
          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]}>
        <Divider orientation="left">Market Data</Divider>
        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
          <TotalSupply preview={true} />
        </Col>
        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
          <CirculatingSupply preview={true} />
        </Col>
        <Divider orientation="left">Blockchain Data</Divider>
        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
          <BlockTime preview={true} />
        </Col>
        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
          <TPS preview={true} />
        </Col>
        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
          <HashRate preview={true} />
        </Col>
        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
          <Difficulty preview={true} />
        </Col>
        <Divider orientation="left">Transaction</Divider>
        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
          <Tx preview={true} />
        </Col>
      </Row>
    </StyledChartPreviewWrapper>
  );
}

const StyledChartPreviewWrapper = styled.div`
  .tip,
  .duration {
    font-size: 16px;
    margin: 0 0 12px 0;
    color: var(--theme-color-gray4);
  }

  .duration {
    color: var(--theme-color-blue0);
  }

  div.ant-divider.ant-divider-horizontal {
    margin: 0;
    color: var(--theme-color-blue0);
  }
`;
