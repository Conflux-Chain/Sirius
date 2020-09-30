/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components/macro';
import { SWRConfig } from 'swr';

import { GlobalStyle } from 'styles/global-styles';

import { Header } from './containers/Header/index';
import { Footer } from './containers/Footer/Loadable';
import { HomePage } from './containers/HomePage/Loadable';
import { BlocksAndTransactions } from './containers/BlocksAndTransactions/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

export function App() {
  const { t } = useTranslation();
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        refreshInterval: 0,
      }}
    >
      <BrowserRouter>
        <Helmet titleTemplate="%s - ConfluxScan" defaultTitle="ConfluxScan">
          <meta
            name="description"
            content={t(translations.homepage.description)}
          />
        </Helmet>
        <Header />
        <Main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/blocks-and-transactions"
              component={BlocksAndTransactions}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </Main>
        <Route component={Footer} />
        <GlobalStyle />
      </BrowserRouter>
    </SWRConfig>
  );
}

const Main = styled.div`
  border: 1px solid blue;
  margin-top: 5rem;
`;
