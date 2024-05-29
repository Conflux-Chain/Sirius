import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { PageHeader } from 'sirius-next/packages/common/dist/components/PageHeader';
import { TabsTablePanel } from 'app/components/TabsTablePanel/Loadable';
import { Overview } from './Overview';
import { IncomingHistory } from './IncomingHistory';
import { VotingHistory } from './VotingHistory';
import { RightStatus } from './RightStatus';

export function Account() {
  const { t } = useTranslation();

  const tabs = [
    {
      value: 'overview',
      label: t(translations.pos.account.overview.title),
      content: <Overview />,
    },
    {
      value: 'incoming-history',
      label: t(translations.pos.account.incomingHistory.title),
      content: <IncomingHistory />,
    },
    {
      value: 'voting-history',
      label: t(translations.pos.account.votingHistory.title),
      content: <VotingHistory />,
    },
    {
      value: 'right-status',
      label: t(translations.pos.account.votingStatus.title),
      content: <RightStatus />,
    },
  ];

  return (
    <>
      <Helmet>
        <title>PoS {t(translations.pos.account.title)}</title>
        <meta
          name="description"
          content={'PoS ' + t(translations.pos.account.description)}
        />
      </Helmet>
      <PageHeader>{t(translations.pos.account.title)}</PageHeader>
      <TabsTablePanel tabs={tabs} />
    </>
  );
}
