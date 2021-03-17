import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { translations } from '../../../locales/i18n';
import { TablePanel } from '../../components/TablePanel/Loadable';
import { ColumnsType } from '../../components/TabsTablePanel';
import { TipLabel } from '../../components/TabsTablePanel/Loadable';
import { PageHeader } from '../../components/PageHeader/Loadable';
import { useTableData } from './../../components/TabsTablePanel/useTableData';
import { tokenColunms } from '../../../utils/tableColumns';
import styled from 'styled-components/macro';
import { Tooltip } from '../../components/Tooltip/Loadable';
import { cfxTokenTypes } from '../../../utils/constants';
import queryString from 'query-string';

import imgInfo from 'images/info.svg';

interface RouteParams {
  tokenType: string;
}

export function Tokens() {
  const { t } = useTranslation();
  const { tokenType } = useParams<RouteParams>();
  const { page = 1, pageSize = 10 } = queryString.parse(window.location.search);

  let columnsWidth = [1, 6, 3, 3, 3, 2, 4];
  let columns: ColumnsType = [
    tokenColunms.number(page, pageSize),
    tokenColunms.token,
    tokenColunms.price,
    tokenColunms.marketCap,
    tokenColunms.transfer,
    tokenColunms.holders,
    tokenColunms.contract(),
  ].map((item, i) => ({ ...item, width: columnsWidth[i] }));

  let url = `/stat/tokens/list?transferType=${cfxTokenTypes.erc20}&reverse=true&orderBy=totalPrice&fields=transferCount,icon,price,totalPrice,quoteUrl,transactionCount,erc20TransferCount`;

  let title = t(translations.header.tokens20);

  let sortOrder = 'desc';
  let sortKey = 'totalPrice';

  if (tokenType === cfxTokenTypes.erc721) {
    columnsWidth = [1, 8, 4, 4, 5];
    columns = [
      tokenColunms.number(page, pageSize),
      tokenColunms.token,
      tokenColunms.transfer,
      tokenColunms.holders,
      tokenColunms.contract(),
    ].map((item, i) => ({ ...item, width: columnsWidth[i] }));

    url = `/stat/tokens/list?transferType=${cfxTokenTypes.erc721}&reverse=true&orderBy=erc721TransferCount&fields=transferCount,icon,transactionCount,erc721TransferCount`;
    title = t(translations.header.tokens721);
    sortKey = 'erc721TransferCount';
  }

  if (tokenType === cfxTokenTypes.erc1155) {
    columnsWidth = [1, 7, 5, 10];
    columns = [
      tokenColunms.number(page, pageSize),
      tokenColunms.token,
      tokenColunms.transfer,
      tokenColunms.contract(true),
    ].map((item, i) => ({ ...item, width: columnsWidth[i] }));

    url = `/stat/tokens/list?transferType=${cfxTokenTypes.erc1155}&reverse=true&orderBy=erc1155TransferCount&fields=transferCount,icon,transactionCount,erc1155TransferCount`;
    title = t(translations.header.tokens1155);
    sortKey = 'erc1155TransferCount';
  }

  const { total } = useTableData(url);
  const [queryUrl, setQueryUrl] = useState(url);

  const sorter = (column, table, oldUrl) => {
    let sortOrder = table.sortOrder === 'asc' ? 'desc' : 'asc';
    let sortKey = column.dataIndex;
    // deal with especial key
    if (sortKey === 'transferCount') {
      if (tokenType === cfxTokenTypes.erc721) {
        sortKey = 'erc721TransferCount';
      } else if (tokenType === cfxTokenTypes.erc1155) {
        sortKey = 'erc1155TransferCount';
      }
    }
    table.sortOrder = sortOrder;
    table.sortKey = sortKey;
    const newUrl = oldUrl
      .replace(
        /reverse=[^&]*/g,
        sortOrder === 'asc' ? 'reverse=true' : 'reverse=false',
      )
      .replace(/orderBy=[^&]*/g, 'orderBy=' + sortKey);
    console.log(newUrl);
    setQueryUrl(newUrl);
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={t(title)} />
      </Helmet>
      <PageHeader
        subtitle={
          <TipLabel
            total={total}
            left={t(translations.tokens.tipCountBefore)}
            right={t(translations.tokens.tipCountAfter)}
          />
        }
      >
        {title}
        {!tokenType || tokenType === cfxTokenTypes.erc20 ? (
          <Tooltip
            hoverable
            text={
              <div
                dangerouslySetInnerHTML={{
                  __html: t(translations.tokens.dataSource),
                }}
              />
            }
            placement="top"
          >
            <IconWrapper>
              <img src={imgInfo} alt="?" />
            </IconWrapper>
          </Tooltip>
        ) : null}
      </PageHeader>

      <TablePanel
        table={{
          columns: columns,
          rowKey: 'address',
          sorter,
          sortOrder,
          sortKey,
        }}
        url={queryUrl}
      />
    </>
  );
}

const IconWrapper = styled.div`
  padding-left: 0.2857rem;
  width: 1.2857rem;
  cursor: pointer;
`;
