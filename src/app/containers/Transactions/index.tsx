import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/i18n';
import { useTableData } from '../../components/TabsTablePanel';
import { TablePanel } from '../../components/TablePanel';
import { transactionColunms } from '../../../utils/tableColumns';
import { toThousands } from '../../../utils';
import styled from 'styled-components/macro';
import { PageHeader } from '../../components/PageHeader/Loadable';
import { useAge } from '../../../utils/hooks/useAge';
import { TablePanel as TablePanelNew } from 'app/components/TablePanelNew';

export function Transactions() {
  const { t } = useTranslation();
  const [ageFormat, toggleAgeFormat] = useAge();
  const url = '/transaction';

  const columnsTransactionsWidth = [4, 3, 6, 6, 3, 4, 4, 5];
  const columnsTransactions = [
    transactionColunms.hash,
    transactionColunms.method,
    transactionColunms.from,
    transactionColunms.to,
    transactionColunms.value,
    transactionColunms.gasPrice,
    transactionColunms.gasFee,
    transactionColunms.age(ageFormat, toggleAgeFormat),
  ].map((item, i) => ({
    ...item,
    width: columnsTransactionsWidth[i],
  }));

  const { total } = useTableData(url);
  const tip = (
    <StyledTipLabelWrapper>
      {t(translations.transactions.tipCountBefore)}
      <StyledSpan>{toThousands(total)}</StyledSpan>
      {t(translations.transactions.tipCountAfter)}
    </StyledTipLabelWrapper>
  );

  return (
    <>
      <Helmet>
        <title>{t(translations.transactions.title)}</title>
        <meta
          name="description"
          content={t(translations.transactions.description)}
        />
      </Helmet>
      <PageHeader>{t(translations.transactions.title)}</PageHeader>

      <TablePanelNew
        url="/transaction"
        columns={columnsTransactions}
        rowKey="hash"
      ></TablePanelNew>

      {/* @todo, table-refactor, need to remove */}
      <TablePanel
        url={url}
        table={{
          columns: columnsTransactions,
          rowKey: 'hash',
        }}
        tableHeader={tip}
      />
    </>
  );
}

const StyledTipLabelWrapper = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #74798c;
  margin: 0.5rem 0;
`;

const StyledSpan = styled.span`
  color: #1e3de4;
  padding: 0 0.4286rem;
`;
