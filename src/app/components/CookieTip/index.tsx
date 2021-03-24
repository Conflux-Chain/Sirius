import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import CookieIcon from '../../../images/cookie.svg';
import { translations } from '../../../locales/i18n';
import docCookies from '../../../utils/cookie';

export const CookieTip = () => {
  const { t } = useTranslation();
  const key = 'confluxscan_cookie_agreed';
  const [cookieAgreed, setCookieAgreed] = useState(!!docCookies.getItem(key));
  const agreeCookie = () => {
    // @ts-ignore
    docCookies.setItem(key, 'true', Infinity);
    setCookieAgreed(true);
  };
  return cookieAgreed ? null : (
    <CookieTipWrapper>
      <img src={CookieIcon} alt="" />
      <span
        dangerouslySetInnerHTML={{
          __html: t(translations.footer.cookie),
        }}
      />
      <span className="cookie-agree" onClick={agreeCookie}>
        {t(translations.footer.cookieAgree)}
      </span>
    </CookieTipWrapper>
  );
};

const CookieTipWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 21px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
  background: #282e44;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  a {
    color: #ddd;
    border-bottom: 1px solid #ddd;
    padding-bottom: 2px;

    &:hover {
      color: #fff;
      border-bottom: 1px solid #fff;
    }
  }

  .cookie-agree {
    display: inline-block;
    margin-left: 10px;
    width: 87px;
    height: 30px;
    background: #f9fafb;
    color: #000000;
    border-radius: 2px;
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
  }
`;
