import React from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/i18n';
import { Table, Pagination } from '@cfxjs/react-ui';
import { Card } from '../Card';
import styled from 'styled-components/macro';
import { media, useBreakpoint } from '../../../styles/media';
import { PaginationProps } from '@cfxjs/react-ui/dist/pagination/pagination';
import { Props as TableProps } from '@cfxjs/react-ui/dist/table/table';
import { useTableData } from '../TabsTablePanel/useTableData';
import { Skeleton } from '@cfxjs/react-ui';
import clsx from 'clsx';

export type { ColumnsType } from '@cfxjs/react-ui/dist/table/table';

export type TablePanelType = {
  url: string;
  pagination?: PaginationProps | boolean;
  table: TableProps<unknown>;
};

const mockTableConfig = columns => {
  const mockTableColumns = columns.map((item, i) => ({
    id: i,
    dataIndex: 'key',
    width: item.width,
    render: () => <Skeleton />,
  }));
  let mockTableData: Array<{ id: number }> = [];
  const mockTableRowKey: string = 'id';
  for (let i = 0; i < 10; i++) {
    mockTableData.push({ id: i });
  }
  return {
    mockTableColumns,
    mockTableData,
    mockTableRowKey,
  };
};

// pagination default config
const defaultPaginationConfig: PaginationProps = {
  total: 0,
  page: 1,
  pageSize: 10,
  showPageSizeChanger: true,
  showQuickJumper: true,
  size: 'small',
  variant: 'solid',
  onPageChange: () => {},
  onPageSizeChange: () => {},
};
// mobile pagination default config
const defaultPaginationMobileConfig: PaginationProps = {
  ...defaultPaginationConfig,
  labelPageSizeBefore: '',
  labelPageSizeAfter: '',
  limit: 3,
};
// table default config
const defaultTableConfig: TableProps<unknown> = {
  data: [],
  rowKey: 'key',
  columns: [],
  variant: 'solid',
};

export const TablePanel = ({ url, pagination, table }: TablePanelType) => {
  const {
    pageNumber,
    pageSize,
    total,
    data,
    error,
    gotoPage,
    setPageSize,
  } = useTableData(url);

  const { t } = useTranslation();
  const breakpoint = useBreakpoint();
  const paginationObject = typeof pagination === 'boolean' ? {} : pagination;
  const mergedPaginationConfig = {
    labelPageSizeBefore: t(translations.general.pagination.labelPageSizeBefore),
    labelPageSizeAfter: t(translations.general.pagination.labelPageSizeAfter),
    labelJumperBefore: t(translations.general.pagination.labelJumperBefore),
    labelJumperAfter: t(translations.general.pagination.labelJumperAfter),
    simple: breakpoint === 's',
    ...(breakpoint === 's'
      ? defaultPaginationMobileConfig
      : defaultPaginationConfig),
    ...paginationObject,
  };
  let tableData = table.data;
  let tableColumns = table.columns;
  let tableRowKey = table.rowKey;

  let { mockTableColumns, mockTableData, mockTableRowKey } = mockTableConfig(
    table.columns,
  );

  if (!data && !error) {
    tableData = mockTableData;
    tableColumns = mockTableColumns;
    tableRowKey = mockTableRowKey;
  }

  if (data && !error) {
    tableData = data.result?.list || table.data;
  }

  return (
    <>
      <StyledTableWrapper>
        <Card>
          <Table
            className={clsx('sirius-table', table.className)}
            tableLayout="fixed"
            columns={tableColumns}
            data={tableData}
            rowKey={tableRowKey}
            scroll={{ x: 800 }}
          />
        </Card>
      </StyledTableWrapper>
      {pagination !== false && (
        <StyledPaginationWrapper>
          <Pagination
            {...mergedPaginationConfig}
            className={clsx(
              'sirius-pagination',
              mergedPaginationConfig.className,
            )}
            onPageChange={(page: number) => gotoPage(page)}
            onPageSizeChange={(page: number, pageSize: number) =>
              setPageSize(pageSize)
            }
            page={Number(pageNumber)}
            pageSize={Number(pageSize)}
            total={total}
          />
        </StyledPaginationWrapper>
      )}
    </>
  );
};

TablePanel.defaultProps = {
  url: '',
  pagination: defaultPaginationConfig,
  table: defaultTableConfig,
};

const StyledTableWrapper = styled.div`
  .table.sirius-table {
    line-height: 1.7143rem;
    .table-content {
      padding: 0 0 1rem;
    }
    th.table-cell {
      white-space: nowrap;
      padding: 1.1429rem calc((0.5714rem / 2) * 3);
    }
    td.table-cell {
      font-size: 1rem;
      font-weight: 400;
      color: #333333;
      padding: 1.2857rem calc((0.5714rem / 2) * 3);
      white-space: nowrap;

      ${media.s} {
        padding: 1.1429rem;
      }
    }
  }
`;

const StyledPaginationWrapper = styled.div`
  .pagination.sirius-pagination {
    margin: 1.7143rem 0;
    .left,
    .right {
      margin-top: 0;
    }
    button:not(.active) {
      background-color: rgba(0, 84, 254, 0.04);
      &:not(.disabled):hover {
        background-color: rgba(0, 84, 254, 0.1);
      }
    }
    .input-wrapper.solid,
    .select {
      background-color: rgba(0, 84, 254, 0.04);
      border-color: transparent;
      &.hover,
      &:hover {
        background-color: #e0eaff;
        border-color: transparent;
      }
      input {
        color: #74798c;
        font-size: 1rem;
        font-weight: 500;
      }
      &.focus:not(.disabled),
      &.hover:not(.disabled) {
        input {
          color: #74798c;
        }
      }
    }
    div.text,
    button:not(.active),
    .option span {
      font-size: 1rem;
      font-weight: 500;
      color: #74798c;
      line-height: 1.2857rem;
    }

    ${media.s} {
      margin-bottom: 0.4286rem;
    }
  }
`;
