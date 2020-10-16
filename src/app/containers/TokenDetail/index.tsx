import React from 'react';
import { Helmet } from 'react-helmet-async';
// import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/i18n';
import { List } from '../../components/List/Loadable';
import { QrcodeButton } from '../../components/QrcodeButton/Loadable';

export function TokenDetail() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t(translations.tokens.title)}</title>
        <meta name="description" content={t(translations.tokens.description)} />
      </Helmet>
      <List
        list={[
          { title: 'contract', children: '1' },
          { title: 'contract', children: '1' },
          { title: 'contract', children: '1' },
          { title: 'contract', children: '1' },
        ]}
      />
      <QrcodeButton
        title="0x87010faf5964d67ed070bc4b8dcafa1e1adc0997"
        value="http://www.baidu.com"
      />
    </>
  );
}
