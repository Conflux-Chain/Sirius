import React from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/i18n';
import { ColumnsType } from '../../components/TabsTablePanel';
import {
  TabsTablePanel,
  TabLabel,
} from '../../components/TabsTablePanel/Loadable';
import { blockColunms, transactionColunms } from '../../../utils/tableColumns';

export function BottomTablePanel({ hash: blockHash }) {
  const { t } = useTranslation();

  const columnsTransactions: ColumnsType = [
    transactionColunms.hash,
    transactionColunms.from,
    transactionColunms.to,
    transactionColunms.value,
    transactionColunms.gasFee,
    transactionColunms.gasPrice,
    transactionColunms.age,
  ];

  const columnsBlocks: ColumnsType = [
    blockColunms.epoch,
    blockColunms.position,
    blockColunms.hash,
    blockColunms.txns,
    blockColunms.miner,
    blockColunms.difficulty,
    blockColunms.gasUsedPercent,
    blockColunms.age,
  ];

  const tabs = [
    {
      value: 'blocks',
      label: count => (
        <TabLabel
          left={t(translations.blocks.tabs.labelCountBefore)}
          right={t(translations.blocks.tabs.labelCountAfter, {
            type: 'blocks',
          })}
          count={count}
        >
          {t(translations.blocks.tabs.transactions)}
        </TabLabel>
      ),
      url: `/transaction?blockHash=${blockHash}`,
      table: {
        columns: columnsTransactions,
        rowKey: 'hash',
      },
    },
    {
      value: 'transaction',
      label: count => (
        <TabLabel
          left={t(translations.blocks.tabs.labelCountBefore)}
          right={t(translations.blocks.tabs.labelCountAfter, {
            type: 'transactions',
          })}
          count={count}
        >
          {t(translations.blocks.tabs.referenceBlocks)}
        </TabLabel>
      ),
      hideTotalZero: true,
      url: `/block?referredBy=${blockHash}`,
      table: {
        columns: columnsBlocks,
        rowKey: 'hash',
      },
    },
  ];

  return <TabsTablePanel tabs={tabs} />;
}
