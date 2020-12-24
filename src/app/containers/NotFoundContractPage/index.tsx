/**
 *
 * NotFoundPage
 *
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { translations } from 'locales/i18n';
import notFoundContract from 'images/home/notFoundContract.svg';

export function NotFoundContractPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <PageWrapper>
      <LeftImage alt="404" src={notFoundContract} />
      <RightWrap>
        <ErrorTitle>{t(translations.notFoundContract.title)}</ErrorTitle>
        <ErrorLabel>{t(translations.notFoundContract.label)}</ErrorLabel>
        <GoTo href="/">{t(translations.notFoundContract.btn)}</GoTo>
      </RightWrap>
    </PageWrapper>
  );
}

// wrapper
const PageWrapper = styled.div`
  display: flex;
  position: absolute;
  height: calc(100% - 5rem);
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background: #f5f6fa;

  ${media.s} {
    height: calc(100% - 116px);
    width: calc(100% - 32px);
    align-items: inherit;
    align-content: center;
  }
`;

// img
const LeftImage = styled.img`
  margin-right: 7rem;
  ${media.s} {
    margin-right: 0;
    max-width: 80%;
  }
`;
const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  ${media.m} {
    padding: 1rem;
    align-items: center;
    text-align: center;
  }
`;

const ErrorTitle = styled.span`
  display: inline-block;
  font-size: 1.5714rem;
  line-height: 2rem;
  color: #424242;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const ErrorLabel = styled.span`
  display: inline-block;
  color: #4b4b4b;
  opacity: 0.4;
  font-weight: 500;
  line-height: 1.2857rem;
  margin-bottom: 1rem;
  max-width: 540px;
`;

const GoTo = styled.a`
  width: 15.7143rem;
  height: 3.5714rem;
  background-color: #fff;
  border-radius: 2.8571rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #545454;
  font-size: 1.1429rem;
  margin-top: 2rem;
`;
