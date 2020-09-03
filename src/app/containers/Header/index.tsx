/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectHeader } from './selectors';
import { headerSaga } from './saga';

import { Header as HeaderComp } from '../../components/Header';

interface Props {}

export const Header = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: headerSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const header = useSelector(selectHeader);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const logo = <span key="1">header logo</span>;
  const left = [<span key="1">Blocks&Transaction</span>];
  const right = [<span key="1">EN</span>];

  return (
    <Wrapper>
      <HeaderComp logo={logo} left={left} right={right} />
    </Wrapper>
  );
});

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 5rem;
  align-items: stretch;
  display: flex;
  border: 1px solid red;
`;
