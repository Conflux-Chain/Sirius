import React from 'react';
import { tokenColunms } from 'utils/tableColumns';
import { useAge } from 'utils/hooks/useAge';
import { TablePanel } from 'app/components/TablePanelNew';
import { Title, Footer } from './components';
import { cfxTokenTypes } from 'utils/constants';

interface Props {
  address: string;
}

export const CRC1155Txns = ({ address }: Props) => {
  const [ageFormat, toggleAgeFormat] = useAge();
  const url = `/transfer?accountAddress=${address}&transferType=${cfxTokenTypes.erc1155}`;

  const columnsWidth = [3, 7, 6, 2, 2, 3, 6, 4];
  const columns = [
    tokenColunms.txnHash,
    {
      ...tokenColunms.from,
      render(text, record, index) {
        return tokenColunms.from.render(text, record, index, false);
      },
    },
    tokenColunms.to,
    tokenColunms.fromType,
    tokenColunms.quantity,
    tokenColunms.tokenId(),
    tokenColunms.token2,
    tokenColunms.age(ageFormat, toggleAgeFormat),
  ].map((item, i) => ({ ...item, width: columnsWidth[i] }));

  const title = ({ total, listLimit }) => (
    <Title
      address={address}
      total={total}
      listLimit={listLimit}
      showFilter={true}
      showSearch={true}
      searchOptions={{
        transactionHash: true,
        fromOrTo: true,
        epoch: true,
        rangePicker: true,
        tokenId: true,
        token: true,
        button: {
          col: {
            xs: 24,
            sm: 6,
            md: 6,
            lg: 6,
            xl: 6,
          },
        },
      }}
      filterOptions={['txTypeAll', 'txTypeOutgoing', 'txTypeIncoming']}
    />
  );

  const footer = <Footer pathname="transfer" type={cfxTokenTypes.erc1155} />;

  return (
    <TablePanel
      url={url}
      columns={columns}
      footer={footer}
      title={title}
    ></TablePanel>
  );
};
