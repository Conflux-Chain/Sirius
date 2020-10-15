import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/i18n';
import styled from 'styled-components';
import { PageHeader } from '../../components/PageHeader/Loadable';
import { media } from '../../../styles/media';
import { Card, Textarea, Select } from '@cfxjs/react-ui';
import { Description } from '../../components/Description/Loadable';
import { useParams } from 'react-router-dom';
import { useTransactionQuery } from '../../../utils/api';
import { CopyButton } from '../../components/CopyButton/Loadable';
import { Link } from 'react-router-dom';
import SkeletonContainer from '../../components/SkeletonContainer/Loadable';
import { Status } from '../../components/Status';

export const Transactions = () => {
  const { t } = useTranslation();
  const { hash } = useParams<{
    hash: string;
  }>();
  let loading = false;
  const { data, error } = useTransactionQuery({ hash });
  const [dataType, setDataType] = useState('original');
  const handleDataTypeChange = type => setDataType(type);

  if (!data && !error) loading = true;

  /**
   * executed Epoch: ?
   * token transferred: ?
   * gas used/limit: 用哪两个值算?
   * timestamp: todo, need to be formatted
   * inputData: todo, need to be formatted
   * to: todo, need to get token info
   * token transfer: todo, need to get token list
   * status: need clear code and status map
   */
  const {
    epochHeight,
    timestamp,
    status,
    from,
    to,
    value,
    gasPrice,
    gas,
    nonce,
    blockHash,
    storageLimit,
    chainId,
    data: innerData,
    transactionIndex,
  } = data?.result || {};

  return (
    <StyledTransactionsWrapper>
      <Helmet>
        <title>{t(translations.transactions.title)}</title>
        <meta
          name="description"
          content={t(translations.transactions.description)}
        />
      </Helmet>
      <PageHeader>{t(translations.transactions.title)}</PageHeader>
      <StyledCardWrapper>
        <Card className="sirius-Transactions-card">
          <Description title={t(translations.transactions.hash)}>
            <SkeletonContainer shown={loading}>
              {hash} <CopyButton copyText={hash} />
            </SkeletonContainer>
          </Description>
          <Description title={t(translations.transactions.executedEpoch)}>
            {/* todo, with real href */}
            <Link to={'/'}></Link>
          </Description>
          <Description title={t(translations.transactions.proposedEpoch)}>
            {epochHeight}
          </Description>
          <Description title={t(translations.transactions.timestamp)}>
            {/* todo, need to be formatted */}
            {timestamp}
          </Description>
          <Description title={t(translations.transactions.status)}>
            <Status type={2} />
          </Description>
          <Description title={t(translations.transactions.from)}>
            <Link to={`/address/${from}`}>{from}</Link>{' '}
            <CopyButton copyText={from} />
          </Description>
          <Description title={t(translations.transactions.to)}>
            {/* todo */}
            <Link to={`/address/${to}`}>{to}</Link> <CopyButton copyText={to} />
          </Description>
          <Description title={t(translations.transactions.tokenTransferred)}>
            {/* todo, need token info */}
            {}
          </Description>
          <Description title={t(translations.transactions.value)}>
            {/* todo, need to format to cfx */}
            {value}
          </Description>
          <Description title={t(translations.transactions.gasUsed)}>
            {/* todo, the value is 'gas used/gas limit', no gas limit from response */}
            {}
          </Description>
          <Description title={t(translations.transactions.gasPrice)}>
            {/* todo, need to format to Gdrip */}
            {gasPrice}
          </Description>
          <Description title={t(translations.transactions.gasFee)}>
            {gas}
          </Description>
          <Description title={t(translations.transactions.nounce)}>
            {nonce}
          </Description>
          <Description title={t(translations.transactions.blockHash)}>
            <Link to={`/blocks/${blockHash}`}>{blockHash}</Link>{' '}
            <CopyButton copyText={blockHash} />
          </Description>
          <Description title={t(translations.transactions.position)}>
            {transactionIndex}
          </Description>
          <Description title={t(translations.transactions.storageLimit)}>
            {storageLimit}
          </Description>
          <Description title={t(translations.transactions.chainID)}>
            {chainId}
          </Description>
          <Description title={t(translations.transactions.inputData)} noBorder>
            {/* todo, need to be formatted */}
            <StyledTextareaWrapper>
              <Textarea
                className="sirius-Transactions-Textarea"
                width="100%"
                placeholder=""
                value={innerData}
                defaultValue=""
                minHeight="118px"
                variant="solid"
              />
            </StyledTextareaWrapper>
            {/* todo, need to replace with styled select */}
            <Select
              value={dataType}
              onChange={handleDataTypeChange}
              size="small"
            >
              <Select.Option value="original">
                {t(translations.transactions.select.original)}
              </Select.Option>
              <Select.Option value="utf8">
                {t(translations.transactions.select.utf8)}
              </Select.Option>
            </Select>
          </Description>
        </Card>
      </StyledCardWrapper>
    </StyledTransactionsWrapper>
  );
};

const StyledCardWrapper = styled.div`
  .card.sirius-Transactions-card {
    .content {
      padding: 0 18px;
    }
  }
`;

const StyledTransactionsWrapper = styled.div`
  padding: 32px 0;

  ${media.s} {
    padding-bottom: 0;
  }
`;

const StyledTextareaWrapper = styled.span`
  .sirius-Transactions-Textarea {
    textarea {
      color: #a1acbb;
    }
    margin-bottom: 0.8571rem;
  }
`;
