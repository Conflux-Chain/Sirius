import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from 'app/components/PageHeader/Loadable';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Form, Input, Checkbox, Button, Row, Col } from '@jnoodle/antd';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { isAddress, isHash } from 'utils';
import ReCAPTCHA from 'react-google-recaptcha';

// @ts-ignore
window.recaptchaOptions = {
  useRecaptchaNet: true,
};

const checkboxStyle = { lineHeight: '2.2857rem', width: '9.1429rem' };

export function Report() {
  const { t } = useTranslation();
  const location = useLocation();
  const [recaptcha, setRecaptcha] = useState(false);

  const search = {
    address: '',
    ...queryString.parse(location.search),
  };
  const addressInitalValue = isAddress(search['address'])
    ? search['address']
    : '';

  const onFinish = (values: any) => {
    // @todo commit form
  };

  const onChange = value => {
    if (value) {
      setRecaptcha(true);
    } else {
      setRecaptcha(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t(translations.report.title)}</title>
        <meta name="description" content={t(translations.report.title)} />
      </Helmet>
      <PageHeader subtitle={t(translations.report.subtitle)}>
        {t(translations.report.title)}
      </PageHeader>
      <Form
        name="nest-messages"
        onFinish={onFinish}
        validateTrigger="onBlur"
        layout="vertical"
        initialValues={{
          address: addressInitalValue,
        }}
        scrollToFirstError={true}
      >
        <Form.Item
          name="address"
          label={t(translations.report.address)}
          rules={[
            {
              required: true,
              message: t(translations.report.error.addressRequired),
            },
            () => ({
              validator(_, value) {
                if (isAddress(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t(translations.report.error.addressInvalid)),
                );
              },
            }),
          ]}
          validateFirst
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="txn_hash"
          label={t(translations.report.txnHash)}
          rules={[
            () => ({
              validator(_, value) {
                if (isHash(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t(translations.report.error.txnHashInvalid)),
                );
              },
            }),
          ]}
          validateFirst
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="checkbox-group"
          label={t(translations.report.selectType)}
          rules={[
            {
              required: true,
              message: t(translations.report.error.typeRequired),
            },
          ]}
        >
          <Checkbox.Group style={{ width: '100%' }}>
            <Row>
              <Col>
                <Checkbox
                  value={t(translations.report.phishHack)}
                  style={checkboxStyle}
                >
                  {t(translations.report.phishHack)}
                </Checkbox>
              </Col>
              <Col>
                <Checkbox
                  value={t(translations.report.scam)}
                  style={checkboxStyle}
                >
                  {t(translations.report.scam)}
                </Checkbox>
              </Col>
              <Col>
                <Checkbox
                  value={t(translations.report.fishy)}
                  style={checkboxStyle}
                >
                  {t(translations.report.fishy)}
                </Checkbox>
              </Col>
              <Col>
                <Checkbox
                  value={t(translations.report.highRisk)}
                  style={checkboxStyle}
                >
                  {t(translations.report.highRisk)}
                </Checkbox>
              </Col>
              <Col>
                <Checkbox
                  value={t(translations.report.spam)}
                  style={checkboxStyle}
                >
                  {t(translations.report.spam)}
                </Checkbox>
              </Col>
              <Col>
                <Checkbox
                  value={t(translations.report.others)}
                  style={checkboxStyle}
                >
                  {t(translations.report.others)}
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          name="description"
          label={t(translations.report.description)}
          rules={[
            {
              required: true,
              message: t(translations.report.error.descriptionRequired),
            },
            {
              min: 30,
              max: 200,
              message: t(translations.report.error.descriptionRequired),
            },
          ]}
          validateFirst
        >
          <Input.TextArea
            showCount
            allowClear
            autoSize={{ minRows: 6, maxRows: 6 }}
            maxLength={200}
            placeholder={t(translations.report.tip)}
          />
        </Form.Item>
        <Form.Item
          name="recaptcha"
          rules={[
            () => ({
              validator() {
                if (recaptcha) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t(translations.report.error.recaptchaRequired)),
                );
              },
            }),
          ]}
        >
          <ReCAPTCHA
            sitekey="6Le0Mb4aAAAAANCTiIFSR3brS43_m3YEZY74cC8y"
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t(translations.report.submit)}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
