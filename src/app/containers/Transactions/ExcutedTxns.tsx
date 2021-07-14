import React from 'react';
import { tokenColunms, transactionColunms } from 'utils/tableColumns';
import { useAge } from 'utils/hooks/useAge';
import { TablePanel } from 'app/components/TablePanelNew';
import { Title, Footer } from './Common';

interface Props {
  address: string;
}

export const ExcutedTxns = ({ address }: Props) => {
  const [ageFormat, toggleAgeFormat] = useAge();

  const url = `/transaction?accountAddress=${address}`;

  const columnsWidth = [4, 3, 7, 6, 3, 3, 3, 4];
  const columns = [
    transactionColunms.hash,
    transactionColunms.method,
    tokenColunms.from,
    tokenColunms.to,
    transactionColunms.value,
    transactionColunms.gasPrice,
    transactionColunms.gasFee,
    transactionColunms.age(ageFormat, toggleAgeFormat),
  ].map((item, i) => ({ ...item, width: columnsWidth[i] }));

  const title = ({ total }) => (
    <Title
      address={address}
      total={total}
      showDatepicker={true}
      showFilter={true}
      filterOptions={[
        'txTypeAll',
        'txTypeOutgoing',
        'txTypeIncoming',
        'status1',
        'txTypeCreate',
      ]}
    />
  );

  const footer = <Footer pathname="transaction" />;

  return (
    <TablePanel
      url={url}
      columns={columns}
      rowKey="hash"
      footer={footer}
      title={title}
    ></TablePanel>
  );
};
