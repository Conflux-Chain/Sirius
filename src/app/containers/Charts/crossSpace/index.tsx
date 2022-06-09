import React from 'react';
import { Row, Col /*, Divider */ } from '@cfxjs/antd';
import { PageHeader } from 'app/components/PageHeader/Loadable';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { StyledChartPreviewWrapper } from '../common/StyledChartPreviewWrapper';

import { DailyCFXTransfer } from './DailyCFXTransfer';
// TODO disable for temporary, wait for api update
// import { Contract } from './Contract';

export function Chart() {
  const { t } = useTranslation();

  return (
    <StyledChartPreviewWrapper>
      <PageHeader
        subtitle={t(translations.highcharts.crossSpace.preview.subtitle)}
      >
        {t(translations.highcharts.crossSpace.preview.title)}
      </PageHeader>
      <Row justify="space-between">
        <Col>
          <div className="tip">
            {t(translations.highcharts.crossSpace.preview.tip)}
          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]}>
        {/* <Divider orientation="left">
          {t(translations.highcharts.crossSpace.preview.finalizedInterval)}
        </Divider> */}
        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
          <DailyCFXTransfer preview={true} />
        </Col>
        {/* <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
          <Contract preview={true} />
        </Col> */}
      </Row>
    </StyledChartPreviewWrapper>
  );
}
