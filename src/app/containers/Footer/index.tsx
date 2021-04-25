/**
 *
 * Footer
 *
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { Link } from 'app/components/Link/Loadable';
import { media } from 'styles/media';
import { Footer as FooterComp } from 'app/components/Footer/Loadable';
import { TextLogo } from 'app/components/TextLogo/Loadable';
import { translations } from 'locales/i18n';
import { Language } from './Language';
import { ScanEvent } from 'utils/gaConstants';

import iconTwitter from 'images/footer/twitter.svg';
import iconTelegram from 'images/footer/telegram.svg';
import iconDiscord from 'images/footer/discord.svg';
import iconMedium from 'images/footer/medium.svg';
import iconGit from 'images/footer/git.svg';
import iconWeibo from 'images/footer/weibo.svg';
import iconKakao from 'images/footer/kakao-talk.svg';
import iconYoutube from 'images/footer/youtube.svg';
import iconNaver from 'images/footer/naver.svg';
import iconConflux from 'images/footer/conflux.svg';
import iconReddit from 'images/footer/reddit.svg';
import iconWechat from 'images/footer/wechat.svg';
import iconWechatQrcode from 'images/footer/wechat-qrcode.png';

export function Footer() {
  const { t } = useTranslation();

  const left = [<TextLogo key="logo" />];

  const feedbackLink = (
    <Link
      className="footer-link"
      href="https://github.com/Conflux-Chain/sirius/issues"
      ga={{
        category: ScanEvent.menu.category,
        action: ScanEvent.menu.action.feedback,
      }}
    >
      {t(translations.footer.feedback)}
    </Link>
  );
  const websiteLink = (
    <Link
      className="footer-link"
      href="https://confluxnetwork.org"
      ga={{
        category: ScanEvent.menu.category,
        action: ScanEvent.menu.action.confluxNetwork,
      }}
    >
      {t(translations.footer.confluxnetwork)}
    </Link>
  );
  const portalLink = (
    <Link
      className="footer-link"
      href="https://portal.conflux-chain.org"
      ga={{
        category: ScanEvent.menu.category,
        action: ScanEvent.menu.action.confluxPortal,
      }}
    >
      {t(translations.footer.confluxportal)}
    </Link>
  );
  const bountyLink = (
    <Link
      className="footer-link"
      href="https://bounty.conflux-chain.org"
      ga={{
        category: ScanEvent.menu.category,
        action: ScanEvent.menu.action.confluxBounty,
      }}
    >
      {t(translations.footer.confluxbounty)}
    </Link>
  );
  const addressConverterLink = (
    <Link
      className="footer-link"
      href="/address-converter"
      ga={{
        category: ScanEvent.menu.category,
        action: ScanEvent.menu.action.addressConverter,
      }}
    >
      {t(translations.footer.addressFormatConversion)}
    </Link>
  );
  const broadcastTxLink = (
    <Link
      className="footer-link"
      href="/push-tx"
      ga={{
        category: ScanEvent.menu.category,
        action: ScanEvent.menu.action.broadcastTx,
      }}
    >
      {t(translations.footer.broadcastTx)}
    </Link>
  );
  const blocknumberCalcLink = (
    <Link
      className="footer-link"
      href="/block-countdown"
      ga={{
        category: ScanEvent.menu.category,
        action: ScanEvent.menu.action.blocknumberCalc,
      }}
    >
      {t(translations.footer.blocknumberCalc)}
    </Link>
  );

  const icons = (
    <FooterContentIconWrapper>
      <FooterContentIconLink>
        <Link
          href="https://twitter.com/Conflux_Network"
          ga={{
            category: ScanEvent.menu.category,
            action: ScanEvent.menu.action.twitter,
          }}
        >
          <img alt="twitter icon" src={iconTwitter} />
        </Link>
      </FooterContentIconLink>
      <FooterContentIconLink>
        <Link
          href="https://t.me/Conflux_English"
          ga={{
            category: ScanEvent.menu.category,
            action: ScanEvent.menu.action.tme,
          }}
        >
          <img alt="t.me icon" src={iconTelegram} />
        </Link>
      </FooterContentIconLink>
      <FooterContentIconLink>
        <Link
          href="https://discord.com/invite/aCZkf2C"
          ga={{
            category: ScanEvent.menu.category,
            action: ScanEvent.menu.action.discord,
          }}
        >
          <img alt="discord icon" src={iconDiscord} />
        </Link>
      </FooterContentIconLink>
      <FooterContentIconLink>
        <Link
          href="https://medium.com/@ConfluxNetwork"
          ga={{
            category: ScanEvent.menu.category,
            action: ScanEvent.menu.action.medium,
          }}
        >
          <img alt="medium icon" src={iconMedium} />
        </Link>
      </FooterContentIconLink>
      <FooterContentIconLink>
        <Link
          href="https://github.com/conflux-chain"
          ga={{
            category: ScanEvent.menu.category,
            action: ScanEvent.menu.action.github,
          }}
        >
          <img alt="github icon" src={iconGit} />
        </Link>
      </FooterContentIconLink>
      <FooterContentIconLink>
        <Link
          href="https://weibo.com/confluxchain"
          ga={{
            category: ScanEvent.menu.category,
            action: ScanEvent.menu.action.weibo,
          }}
        >
          <img alt="weibo icon" src={iconWeibo} />
        </Link>
      </FooterContentIconLink>
      <FooterContentIconLink>
        <Link
          href="https://open.kakao.com/o/gmyEjl2b"
          ga={{
            category: ScanEvent.menu.category,
            action: ScanEvent.menu.action.kakao,
          }}
        >
          <img alt="kakao icon" src={iconKakao} />
        </Link>
      </FooterContentIconLink>
      <FooterContentIconLink>
        {/* <Link
          href="https://open.kakao.com/o/gmyEjl2b"
          ga={{
            category: ScanEvent.menu.category,
            action: ScanEvent.menu.action.kakao,
          }}
        >
          <img alt="kakao icon" src={iconWechat} />
        </Link> */}
        {/* <Tooltip text={<img alt="kakao icon" src={iconWechat} />}>
          
        </Tooltip> */}
        <StyledIconWechatWrapper>
          <img
            alt="wechat qrcode icon"
            src={iconWechatQrcode}
            className="footer-qrcode"
          />
          <img alt="wechat icon" src={iconWechat} />
        </StyledIconWechatWrapper>
      </FooterContentIconLink>
      {/* @todo wechat */}
      <FooterContentIconLink>
        <Link
          href="https://www.youtube.com/channel/UCFSTmjoSU8jn6DE_4V2TIzA"
          ga={{
            category: ScanEvent.menu.category,
            action: ScanEvent.menu.action.youtube,
          }}
        >
          <img alt="youtube icon" src={iconYoutube} />
        </Link>
      </FooterContentIconLink>
      <FooterContentIconLink>
        <Link
          href="https://blog.naver.com/conflux-chain"
          ga={{
            category: ScanEvent.menu.category,
            action: ScanEvent.menu.action.naver,
          }}
        >
          <img alt="naver icon" src={iconNaver} />
        </Link>
      </FooterContentIconLink>
      <FooterContentIconLink>
        <Link
          href="https://forum.conflux.fun/"
          ga={{
            category: ScanEvent.menu.category,
            action: ScanEvent.menu.action.forum,
          }}
        >
          <img alt="forum icon" src={iconConflux} />
        </Link>
      </FooterContentIconLink>
      <FooterContentIconLink>
        <Link
          href="https://www.reddit.com/r/Conflux_Network/"
          ga={{
            category: ScanEvent.menu.category,
            action: ScanEvent.menu.action.reddit,
          }}
        >
          <img alt="reddit icon" src={iconReddit} />
        </Link>
      </FooterContentIconLink>
    </FooterContentIconWrapper>
  );

  const developResourceLinks = {
    developerDocuments: (
      <Link
        className="footer-link"
        href="https://developer.conflux-chain.org/"
        ga={{
          category: ScanEvent.menu.category,
          action: ScanEvent.menu.action.developerDocuments,
        }}
      >
        {t(translations.footer.developResource.developerDocuments)}
      </Link>
    ),
    confluxStudio: (
      <Link
        className="footer-link"
        href="https://github.com/ObsidianLabs/ConfluxStudio/"
        ga={{
          category: ScanEvent.menu.category,
          action: ScanEvent.menu.action.confluxStudio,
        }}
      >
        {t(translations.footer.developResource.confluxStudio)}
      </Link>
    ),
    confluxTruffle: (
      <Link
        className="footer-link"
        href="https://github.com/Conflux-Chain/conflux-truffle/"
        ga={{
          category: ScanEvent.menu.category,
          action: ScanEvent.menu.action.confluxTruffle,
        }}
      >
        {t(translations.footer.developResource.confluxTruffle)}
      </Link>
    ),
  };

  const rightTop = [
    <FooterWrapper key="right-top">
      <FooterContentWrapper>
        <FooterContentTitle>
          {t(translations.footer.product)}
        </FooterContentTitle>
        <FooterContent>
          <FooterContentRow>
            <FooterContentLink key="1-1">{websiteLink}</FooterContentLink>
            <FooterContentLink key="1-2">{portalLink}</FooterContentLink>
            <FooterContentLink key="1-3">{bountyLink}</FooterContentLink>
          </FooterContentRow>
        </FooterContent>
      </FooterContentWrapper>
      <FooterContentWrapper>
        <FooterContentTitle className="footer-develop-resource">
          {t(translations.footer.developResource.title)}
        </FooterContentTitle>
        <FooterContent>
          <FooterContentRow>
            <FooterContentLink key="1-1">
              {developResourceLinks.developerDocuments}
            </FooterContentLink>
            <FooterContentLink key="1-2">
              {developResourceLinks.confluxStudio}
            </FooterContentLink>
            <FooterContentLink key="1-3">
              {developResourceLinks.confluxTruffle}
            </FooterContentLink>
          </FooterContentRow>
        </FooterContent>
      </FooterContentWrapper>
      <FooterContentWrapper>
        <FooterContentTitle className="footer-tool">
          {t(translations.footer.tool)}
        </FooterContentTitle>
        <FooterContent>
          <FooterContentRow>
            <FooterContentLink key="2-1">
              {addressConverterLink}
            </FooterContentLink>
            <FooterContentLink key="2-2">{broadcastTxLink}</FooterContentLink>
            <FooterContentLink key="2-3">
              {blocknumberCalcLink}
            </FooterContentLink>
          </FooterContentRow>
        </FooterContent>
      </FooterContentWrapper>
      <FooterContentWrapper>
        <FooterContentTitle className="contact-us">
          {t(translations.footer.contactUs)}
        </FooterContentTitle>
        <FooterContent>
          <FooterContentRow>
            <FooterContentLink key="1-1">{feedbackLink}</FooterContentLink>
          </FooterContentRow>
        </FooterContent>
      </FooterContentWrapper>
      <FooterContentWrapper>
        <FooterContentTitle className="preference">
          {t(translations.footer.preference)}
        </FooterContentTitle>
        <FooterContent>
          <FooterContentRow>
            <FooterContentLink key="3-1">
              <Language />
            </FooterContentLink>
          </FooterContentRow>
        </FooterContent>
      </FooterContentWrapper>
    </FooterWrapper>,
    <FooterContentRow key="right-top-icons">{icons}</FooterContentRow>,
  ];
  const rightBottom = [
    <CopyRight key="copyright">{t(translations.footer.copryRight)}</CopyRight>,
  ];

  return (
    <FooterComp left={left} rightTop={rightTop} rightBottom={rightBottom} />
  );
}

// wrapper
const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;

  ${media.m} {
    flex-flow: wrap;
  }
`;
const FooterContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${media.m} {
    margin-bottom: 1.1429rem;
    width: 50%;
  }
`;

// right top
const FooterContentTitle = styled.span`
  margin-bottom: 1.07rem;
  font-weight: 600;
  color: #000558;
  margin-right: 6rem;
  /* margin-right: 8.5714rem;
  width: 5.7143rem;

  &.footer-develop-resource {
    margin-right: 6rem;
    width: auto;
  } */
  /* 
  &.footer-tool {
    margin-right: 12rem;
  }

  &.contact-us {
    margin-right: 6rem;
  } */

  ${media.m} {
    margin-bottom: 0.86rem;
    margin-right: inherit;
  }
`;
const FooterContent = styled.div`
  font-size: 0.86rem;
  display: flex;
  flex-direction: row;
`;

const FooterContentRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterContentLink = styled.span`
  margin-bottom: 0.5rem;

  .link.footer-link {
    color: black;
    font-size: 0.86rem;
    margin-right: 5.1429rem;

    ${media.m} {
      margin-right: inherit;
    }
  }

  ${media.m} {
    .link.footer-link {
      font-size: 0.71rem;
    }
  }
`;
const FooterContentIconWrapper = styled.div`
  margin-top: 1.14rem;
`;
const FooterContentIconLink = styled.span`
  margin-right: 0.57rem;
  img {
    width: 1.2rem;
  }

  ${media.m} {
    margin-top: 0.86rem;
  }
`;

const CopyRight = styled.span`
  opacity: 0.38;

  ${media.s} {
    font-size: 0.71rem;
  }
`;

const StyledIconWechatWrapper = styled.div`
  position: relative;
  display: inline-flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;

  &:hover {
    img.footer-qrcode {
      display: inherit;
    }
  }

  img.footer-qrcode {
    position: absolute;
    width: 8.1429rem;
    height: 8.1429rem;
    max-width: 8.1429rem;
    top: -8.2143rem;
    left: -3.2143rem;
    display: none;
  }
`;
