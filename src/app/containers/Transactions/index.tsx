import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/i18n';
import { ColumnsType, useTableData } from '../../components/TabsTablePanel';
import { TablePanel } from '../../components/TablePanel';
import { transactionColunms } from '../../../utils/tableColumns';
import { toThousands } from '../../../utils';
import styled from 'styled-components/macro';
import { PageHeader } from '../../components/PageHeader/Loadable';
import { useAge } from '../../../utils/hooks/useAge';

export function Transactions() {
  const { t } = useTranslation();
  const [ageFormat, toggleAgeFormat] = useAge();
  const url = '/transaction';

  const columnsTransactionsWidth = [4, 6, 6, 4, 3, 4, 5];
  const columnsTransactions: ColumnsType = [
    transactionColunms.hash,
    transactionColunms.from,
    transactionColunms.to,
    transactionColunms.value,
    transactionColunms.gasPrice,
    transactionColunms.gasFee,
    transactionColunms.age(ageFormat, toggleAgeFormat),
  ].map((item, i) => ({ ...item, width: columnsTransactionsWidth[i] }));

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
      <TablePanel
        url={url}
        table={{
          columns: columnsTransactions,
          rowKey: 'hash',
        }}
        tableHeader={tip}
      ></TablePanel>
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
