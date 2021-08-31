import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { translations } from 'locales/i18n';
import { PageHeader } from 'app/components/PageHeader/Loadable';
import { tokenColunms } from 'utils/tableColumns';
import styled from 'styled-components/macro';
import { Tooltip } from 'app/components/Tooltip/Loadable';
import { cfxTokenTypes } from 'utils/constants';
import queryString from 'query-string';
// import { useGlobal } from 'utils/hooks/useGlobal';
import { TablePanel as TablePanelNew } from 'app/components/TablePanelNew';

import imgInfo from 'images/info.svg';

interface RouteParams {
  tokenType: string;
}

export function Tokens() {
  const { t } = useTranslation();
  // const { data: globalData } = useGlobal();
  const { tokenType = cfxTokenTypes.erc20 } = useParams<RouteParams>();
  const { page = 1, pageSize = 10 } = queryString.parse(window.location.search);

  let columnsWidth = [1, 6, 3, 3, 3, 3, 3, 4];
  let columns = [
    tokenColunms.number(page, pageSize),
    tokenColunms.token,
    tokenColunms.contract(),
    {
      ...tokenColunms.price,
      sorter: true,
    },
    {
      ...tokenColunms.marketCap,
      sorter: true,
    },
    {
      ...tokenColunms.transfer,
      sorter: true,
    },
    {
      ...tokenColunms.holders,
      sorter: true,
    },
    tokenColunms.projectInfo,
  ].map((item, i) => ({ ...item, width: columnsWidth[i] }));

  let url = `/stat/tokens/list?transferType=${
    cfxTokenTypes.erc20
  }&reverse=true&orderBy=totalPrice&${queryString.stringify({
    fields: [
      'transferCount',
      'icon',
      'price',
      'totalPrice',
      'quoteUrl',
      'transactionCount',
      'erc20TransferCount',
    ],
  })}`;
  // let url = `/stat/tokens/list?transferType=${cfxTokenTypes.erc20}&reverse=true&orderBy=totalPrice&fields=transferCount,icon,price,totalPrice,quoteUrl,transactionCount,erc20TransferCount&currency=${globalData.currency}`; // @todo wait for new api handler
  let title = t(translations.header.tokens20);

  if (
    tokenType === cfxTokenTypes.erc721 ||
    tokenType === cfxTokenTypes.crc721
  ) {
    columnsWidth = [1, 7, 5, 3, 3, 4];
    columns = [
      tokenColunms.number(page, pageSize),
      tokenColunms.token,
      tokenColunms.contract(),
      {
        ...tokenColunms.transfer,
        sorter: true,
      },
      {
        ...tokenColunms.holders,
        sorter: true,
      },
      tokenColunms.projectInfo,
    ].map((item, i) => ({ ...item, width: columnsWidth[i] }));

    url = `/stat/tokens/list?transferType=${
      cfxTokenTypes.erc721
    }&reverse=true&orderBy=transferCount&${queryString.stringify({
      fields: ['transferCount', 'icon', 'transactionCount'],
    })}`;
    // url = `/stat/tokens/list?transferType=${cfxTokenTypes.erc721}&reverse=true&orderBy=transferCount&fields=transferCount,icon,transactionCount&currency=${globalData.currency}`; // @todo wait for new api handler
    title = t(translations.header.tokens721);
  }

  if (
    tokenType === cfxTokenTypes.erc1155 ||
    tokenType === cfxTokenTypes.crc1155
  ) {
    columnsWidth = [1, 5, 4, 2, 2, 3];
    columns = [
      tokenColunms.number(page, pageSize),
      tokenColunms.token,
      tokenColunms.contract(),
      {
        ...tokenColunms.transfer,
        sorter: true,
      },
      {
        ...tokenColunms.holders,
        sorter: true,
      },
      tokenColunms.projectInfo,
    ].map((item, i) => ({ ...item, width: columnsWidth[i] }));

    url = `/stat/tokens/list?transferType=${
      cfxTokenTypes.erc1155
    }&reverse=true&orderBy=transferCount&${queryString.stringify({
      fields: ['transferCount', 'icon', 'transactionCount'],
    })}`;
    // url = `/stat/tokens/list?transferType=${cfxTokenTypes.erc1155}&reverse=true&orderBy=transferCount&fields=transferCount,icon,transactionCount&currency=${globalData.currency}`; // @todo wait for new api handler
    title = t(translations.header.tokens1155);
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={t(title)} />
      </Helmet>
      <PageHeader>
        {title}
        <Tooltip
          hoverable
          text={t(translations.tokens.crcTip, {
            crc: tokenType.replace('CRC', 'CRC-'),
            erc: tokenType.replace('CRC', 'ERC-'),
          })}
          placement="top"
        >
          <IconWrapper>
            <img src={imgInfo} alt="?" />
          </IconWrapper>
        </Tooltip>
      </PageHeader>

      <TableWrapper>
        <TablePanelNew
          url={url}
          columns={columns}
          rowKey="address"
        ></TablePanelNew>
      </TableWrapper>
    </>
  );
}

const IconWrapper = styled.div`
  padding-left: 0.2857rem;
  width: 1.2857rem;
  cursor: pointer;
`;

const TableWrapper = styled.div`
  .token-list {
    table {
      tbody td:nth-child(2) img {
        width: 20px;
        height: 20px;
        margin-right: 7px;
      }
    }
  }
`;
