import React, { useMemo, useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import queryString from 'query-string';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-mode-solidity/build/remix-ide/mode-solidity';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Button, useClickAway } from '@cfxjs/react-ui';
import { Card } from 'app/components/Card/Loadable';
import { useLocation, useHistory } from 'react-router';
import {
  transactionColunms,
  tokenColunms,
  blockColunms,
} from 'utils/tableColumns';
import { StyledIconWrapper } from 'utils/tableColumns/token';
import { Link } from 'app/components/Link';
import { Text } from 'app/components/Text';
import { ColumnsType } from '../../components/TabsTablePanel';
import {
  TabLabel,
  TabsTablePanel,
} from '../../components/TabsTablePanel/Loadable';
import { isContractAddress, formatString } from 'utils';
import { useContract } from 'utils/api';
import { media } from 'styles/media';
import { Check } from '@zeit-ui/react-icons';
import { defaultTokenIcon } from '../../../constants';
import imgDot from 'images/contract-address/dot-dot-dot.svg';
import PickerWithQuery from './PickerWithQuery';
import { ActionButton } from './ActionButton';

const AceEditorStyle = {
  width: '100%',
};

function ContractSourceCodeAbi({ sourceCode, abi }) {
  const { t } = useTranslation();

  const [isSourceCode, setIsSourceCode] = useState(true);

  return (
    <>
      <ContractBody>
        <ButtonWrapper>
          <Button
            className={clsx(
              isSourceCode && 'enabled',
              'source-btn',
              'btnWeight',
            )}
            onClick={() => setIsSourceCode(true)}
          >
            {t(translations.contract.sourceCodeShort)}
          </Button>
          <Button
            className={clsx(!isSourceCode && 'enabled', 'abi-btn', 'btnWeight')}
            onClick={() => setIsSourceCode(false)}
          >
            {t(translations.contract.abiShort)}
          </Button>
          <div className="line"></div>
        </ButtonWrapper>
        <Card>
          <AceEditor
            readOnly
            style={AceEditorStyle}
            mode="solidity"
            theme="github"
            name="UNIQUE_ID_OF_DIV"
            setOptions={{
              showLineNumbers: true,
            }}
            showGutter={false}
            showPrintMargin={false}
            value={isSourceCode ? sourceCode : abi}
          />
        </Card>
      </ContractBody>
    </>
  );
}
const ContractBody = styled.div`
  padding-bottom: 3.5714rem;
`;
const ButtonWrapper = styled.div`
  width: 100%;
  float: left;
  box-sizing: border-box;
  padding: 0 1.2857rem;
  margin: 0.5714rem 0;
  .line {
    height: 0.0714rem;
    background-color: #e8e9ea;
    margin-top: 0.5714rem;
  }
  .btn {
    color: #74798c;
    font-size: 1rem;
  }
  .btn.btnWeight {
    border-radius: 1.1429rem;
    padding: 0 1rem;
    min-width: initial;
    height: 1.8571rem;
    line-height: 1.8571rem;
    border: none;
    top: 0px;
    background-color: #f5f8ff;
    &:hover {
      color: #ffffff;
      background-color: rgba(0, 84, 254, 0.8);
    }
    &:active {
      color: #ffffff;
      background-color: rgba(0, 84, 254, 0.8);
    }
    .text {
      top: 0px !important;
    }
  }
  .enabled.btn {
    color: #ffffff;
    background-color: rgba(0, 84, 254, 0.8);
  }

  .abi-btn.btn {
    margin-left: 0.2857rem;
  }
`;

const TX_DIRECTION = ['all', 'outgoing', 'incoming'];

const TxDirectionFilter = ({ onChange }) => {
  const location = useLocation();
  const { txType } = queryString.parse(location.search || '');
  const defaultDirection = TX_DIRECTION.indexOf(txType as string);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(
    defaultDirection === -1 ? 0 : defaultDirection,
  );
  useClickAway(dropdownRef, () => visible && setVisible(false));
  const { t } = useTranslation();

  const select = selected => {
    setSelected(selected);
    onChange && onChange(TX_DIRECTION[selected]);
    setVisible(false);
  };

  const opts = [
    translations.general.viewAll,
    translations.transaction.viewOutgoingTxns,
    translations.transaction.viewIncomingTxns,
  ].map((text, idx) => (
    <div
      key={idx}
      onClick={() => select(idx)}
      className={clsx('opt', selected === idx && 'selected')}
    >
      <span>{t(text)}</span>
      <Check />
    </div>
  ));

  return (
    <div>
      <ActionButton onClick={() => setVisible(!visible)} src={imgDot} />
      {visible && (
        <TxDirectionFilterDropdown key="tx-filter-dropdown" ref={dropdownRef}>
          {opts}
        </TxDirectionFilterDropdown>
      )}
    </div>
  );
};

const TxDirectionFilterDropdown = styled.div`
  position: absolute;
  right: 0;
  box-shadow: 0rem 0.43rem 1.14rem 0rem rgba(20, 27, 50, 0.08);
  border-radius: 0.14rem;
  background-color: white;
  width: max-content;
  margin-top: 0.7143rem;
  z-index: 10;
  div.opt {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 1.57rem;
    padding: 0.29rem 1.14rem;
    color: #65709a;
    svg {
      visibility: hidden;
      margin-left: 0.5rem;
    }
    &.selected {
      background-color: #65709a;
      color: white;
      svg {
        visibility: visible;
      }
    }
  }
  ${media.s} {
    right: unset;
    left: 0;
  }
`;

export function Table({ address }) {
  const { t } = useTranslation();
  const loadingText = t(translations.general.loading);
  const location = useLocation();
  const history = useHistory();
  const queries = queryString.parse(location.search);
  const [filterVisible, setFilterVisible] = useState(
    queries?.tab !== 'contract',
  );
  const isContract = useMemo(() => isContractAddress(address), [address]);
  const [txFilterVisible, setTxFilterVisible] = useState(
    queries?.tab !== 'mined-blocks' &&
      queries?.tab !== 'transfers' &&
      !isContract,
  );
  const { minTimestamp, maxTimestamp } = queryString.parse(
    location.search || '',
  );

  let { data: contractInfo } = useContract(isContract && address, [
    'sourceCode',
    'abi',
  ]);
  useEffect(() => {
    history.replace(
      queryString.stringifyUrl({
        url: location.pathname,
        query: {
          accountAddress: address,
          ...queries,
        },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, location.pathname, address, history]);

  const columnsTransactionsWidth = [4, 5, 4, 3, 4, 4, 5];
  const columnsTransactions: ColumnsType = [
    transactionColunms.hash,
    {
      ...tokenColunms.from,
      render: (value, row, index) => {
        return tokenColunms.from.render(value, row, index, {
          isToken: false,
        });
      },
    },
    {
      ...tokenColunms.to,
      render: (value, row, index) => {
        return tokenColunms.to.render(value, row, index, {
          isToken: false,
        });
      },
    },
    transactionColunms.value,
    transactionColunms.gasPrice,
    transactionColunms.gasFee,
    transactionColunms.age,
  ].map((item, i) => ({ ...item, width: columnsTransactionsWidth[i] }));

  const columnsTokensWidth = [3, 3, 3, 3, 4, 4];
  const columnsTokenTrasfers: ColumnsType = [
    tokenColunms.txnHash,
    {
      ...tokenColunms.from,
      render: (value, row, index) =>
        tokenColunms.from.render(value, row, index, {
          isToken: false,
        }),
    },
    {
      ...tokenColunms.to,
      render: (value, row, index) =>
        tokenColunms.to.render(value, row, index, {
          isToken: false,
        }),
    },
    tokenColunms.quantity,
    {
      ...tokenColunms.token,
      render: row => (
        <StyledIconWrapper>
          {row?.token
            ? [
                <img
                  key="img"
                  src={row?.token?.icon || defaultTokenIcon}
                  alt="token icon"
                />,
                <Link key="link" href={`/token/${row?.token?.address}`}>
                  <Text
                    span
                    hoverValue={`${row?.token?.name} (${row?.token?.symbol})`}
                  >
                    {formatString(
                      `${row?.token?.name} (${row?.token?.symbol})`,
                      'tag',
                    )}
                  </Text>
                </Link>,
              ]
            : loadingText}
        </StyledIconWrapper>
      ),
    },
    tokenColunms.age,
  ].map((item, i) => ({ ...item, width: columnsTokensWidth[i] }));

  const columnsBlocksWidth = [4, 2, 3, 2, 3, 3, 3, 4];
  const columnsMinedBlocks: ColumnsType = [
    blockColunms.epoch,
    blockColunms.position,
    blockColunms.hash,
    blockColunms.txns,
    blockColunms.miner,
    blockColunms.difficulty,
    blockColunms.gasUsedPercent,
    blockColunms.age,
  ].map((item, i) => ({ ...item, width: columnsBlocksWidth[i] }));

  const tabs = [
    {
      value: 'transaction',
      label: (total: number, realTotal: number) => {
        return (
          <>
            {t(translations.blocksAndTransactions.transactions)}
            <TabLabel total={total} realTotal={realTotal} />
          </>
        );
      },
      url: `/transaction?accountAddress=${address}`,
      pagination: true,
      table: {
        columns: columnsTransactions,
        rowKey: 'hash',
      },
    },
    {
      value: 'transfers',
      label: (total: number, realTotal: number) => {
        return (
          <>
            {t(translations.general.tokenTxns)}
            <TabLabel total={total} realTotal={realTotal} />
          </>
        );
      },
      pagination: true,
      url: `/transfer?accountAddress=${address}`,
      table: {
        columns: columnsTokenTrasfers,
        rowKey: row => `${row.transactionHash}${row.transactionLogIndex}`,
      },
    },
    isContract
      ? {
          value: 'contract-viewer',
          label: t(translations.token.contract),
          content: (
            <ContractSourceCodeAbi
              sourceCode={contractInfo?.sourceCode}
              abi={contractInfo?.abi}
            />
          ),
        }
      : {
          value: 'mined-blocks',
          hideTotalZero: true,
          pagination: true,
          label: (total: number, realTotal: number) => {
            return (
              <>
                {t(translations.addressDetail.minedBlocks)}
                <TabLabel total={total} realTotal={realTotal} />
              </>
            );
          },

          url: `/block?miner=${address}`,
          table: {
            columns: columnsMinedBlocks,
            rowKey: 'hash',
          },
        },
  ];

  return (
    <TableWrap>
      {filterVisible && (
        <FilterWrap>
          <PickerWithQuery
            key="date-picker-query"
            minTimestamp={minTimestamp}
            maxTimestamp={maxTimestamp}
            onChange={dateQuery => {
              if (!dateQuery)
                return history.push(
                  queryString.stringifyUrl({
                    url: location.pathname,
                    query: {
                      ...queries,
                      minTimestamp: undefined,
                      maxTimestamp: undefined,
                    },
                  }),
                );

              let minTimestamp, maxTimestamp;

              if (dateQuery[0]) {
                minTimestamp = Math.round(
                  new Date(dateQuery[0].toISOString()).getTime() / 1000,
                );
              }

              if (dateQuery[1]) {
                maxTimestamp = Math.round(
                  new Date(dateQuery[1].toISOString()).getTime() / 1000,
                );
              }

              if (
                minTimestamp !== undefined &&
                minTimestamp === queries.minTimestamp
              )
                return;
              if (
                maxTimestamp !== undefined &&
                maxTimestamp === queries.maxTimestamp
              )
                return;
              history.push(
                queryString.stringifyUrl({
                  url: location.pathname,
                  query: {
                    ...queries,
                    minTimestamp,
                    maxTimestamp,
                  },
                }),
              );
            }}
          />
          {txFilterVisible && (
            <TxDirectionFilter
              key="tx-filter"
              onChange={txType => {
                if (queries?.txType !== txType)
                  history.push(
                    queryString.stringifyUrl({
                      url: location.pathname,
                      query: {
                        ...queries,
                        txType,
                      },
                    }),
                  );
              }}
            />
          )}
        </FilterWrap>
      )}
      <TabsTablePanel
        key="table"
        tabs={tabs}
        onTabsChange={value => {
          if (value === 'transfers' || value === 'mined-blocks' || isContract)
            setTxFilterVisible(false);
          else setTxFilterVisible(true);
          if (value === 'contract-viewer') return setFilterVisible(false);
          setFilterVisible(true);
        }}
      />
    </TableWrap>
  );
}

const TableWrap = styled.div`
  position: relative;
`;

const FilterWrap = styled.div`
  position: absolute;
  right: 0;
  top: 0.7143rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${media.s} {
    flex-direction: column;
    align-items: flex-start;
    right: unset;
    left: 0;
    top: 7rem;
    z-index: 10;
  }
`;
