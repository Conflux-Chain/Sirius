/**
 *
 * Modal
 *
 */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/i18n';
import styled, { keyframes } from 'styled-components/macro';
import clsx from 'clsx';
import { usePortal } from 'utils/hooks/usePortal';
import { useTestnet } from 'utils/hooks/useTestnet';
import { formatAddress } from './util';
import { Link as ScanLink } from './Link';
import { RotateImg } from './RotateImg';
import { History } from './History';
// @todo extract an independent component, do not use outside one
import { CopyButton } from './../CopyButton';
import { useNotifications } from '@cfxjs/react-ui';
import XCircleFill from '@zeit-ui/react-icons/xCircleFill';

import iconLogo from './assets/logo.png';
import iconClose from './assets/close.svg';
import iconLoading from './assets/loading.svg';

interface Modal {
  className?: string;
  show: boolean;
  onClose?: () => void;
}

export const Modal = ({
  className,
  show = false,
  onClose = () => {},
}: Modal) => {
  const { t } = useTranslation();
  // @todo dependence of utils/useTestnet
  const isTestnet = useTestnet();
  const { installed, login, connected, accounts, chainId } = usePortal();
  const [, setNotifications] = useNotifications();

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'inherit';
    }
    return () => {
      document.body.style.overflow = 'inherit';
    };
  }, [show]);

  const handleClose = () => {
    onClose();
  };

  const handleLogin = () => {
    if (
      (chainId === '0x405' && !isTestnet) ||
      (chainId !== '0x405' && isTestnet)
    ) {
      login();
    } else {
      let content = t(translations.connectWallet.modal.switchToMainnet);
      if (isTestnet) {
        content = t(translations.connectWallet.modal.switchToTestnet);
      }
      setNotifications({
        icon: <XCircleFill color="#e15c56" />,
        title: t(translations.connectWallet.modal.networkNotice),
        content,
        delay: 5000,
      });
    }
  };

  let title: string = t(translations.connectWallet.modal.title);
  let portal: React.ReactNode = t(
    translations.connectWallet.modal.confluxPortal,
  );
  let logo = (
    <img className="modal-portal-logo" src={iconLogo} alt="logo"></img>
  );
  let tip: React.ReactNode = (
    <div className="modal-tip">
      <span>{t(translations.connectWallet.modal.newToConflux)}</span>
      <a
        href="https://portal.conflux-chain.org/"
        target="_blank"
        className="modal-tip-link"
        rel="noopener noreferrer"
      >
        {' '}
        {t(translations.connectWallet.modal.learnMore)}
      </a>
    </div>
  );

  if (installed) {
    if (connected === 0) {
      portal = (
        <>
          <span className="modal-portal-name">
            {t(translations.connectWallet.modal.confluxPortal)}
          </span>
          {logo}
        </>
      );
    } else if (connected === 1) {
      title = t(translations.connectWallet.modal.account);
      portal = (
        <>
          <span className="modal-portal-connected-title">
            {t(translations.connectWallet.modal.connectedWithConfluxPortal)}
          </span>
          <span className="modal-portal-name">
            {formatAddress(accounts[0])}
          </span>
          <span className="modal-portal-connected-tip">
            <span className="modal-portal-connected-copy">
              {t(translations.connectWallet.modal.copyAddress)}{' '}
              <CopyButton copyText={accounts[0]} size={10}></CopyButton>
            </span>
            <ScanLink href={`/address/${accounts[0]}`}>
              {t(translations.connectWallet.modal.viewOnConfluxScan)}
            </ScanLink>
          </span>
        </>
      );
      tip = null;
    } else if (connected === 2) {
      portal = (
        <>
          <span className="modal-portal-loading">
            <RotateImg
              src={iconLoading}
              alt="loading-icon"
              className="modal-portal-loading-icon"
            ></RotateImg>
            <span>{t(translations.connectWallet.modal.initializing)}</span>
          </span>
          {logo}
        </>
      );
    }
  } else {
    portal = (
      <a
        href="https://portal.conflux-chain.org/"
        target="_blank"
        className="modal-portal-link"
        rel="noopener noreferrer"
      >
        {t(translations.connectWallet.modal.installConfluxPortal)}
      </a>
    );
  }

  return (
    <ModalWrapper
      className={clsx('connect-wallet-modal', className, {
        show: show,
        connected: connected === 1,
      })}
    >
      <div className="modal-body">
        <div className="modal-title">{title}</div>
        <div
          className={clsx('modal-portal', {
            connected: connected === 1,
          })}
          onClick={handleLogin}
        >
          {portal}
        </div>
        {tip}
        <img
          className="modal-close"
          src={iconClose}
          alt="close-button"
          onClick={handleClose}
        ></img>
      </div>
      <History></History>
    </ModalWrapper>
  );
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const linkColor = '#0e47ef';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.25);
  display: none;

  &.show {
    display: inherit;
  }

  &.connected {
    .modal-body {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .modal-portal {
      flex-direction: column;
      align-items: flex-start;
      cursor: inherit;
    }
  }

  .modal-body {
    position: relative;
    /* position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0; */
    /* margin: auto; */
    /* height: 202px; */
    width: 32rem;
    background: #ffffff;
    box-shadow: 0.5714rem 2.1429rem 5.7143rem 0rem rgba(112, 126, 158, 0.24);
    padding: 1.7143rem 2.2857rem;
    box-sizing: border-box;
    border-radius: 0.5714rem;
  }

  .modal-title {
    font-size: 18px;
    font-weight: 500;
    color: #333333;
  }

  .modal-portal {
    width: 27.4286rem;
    /* height: 4.1429rem; */
    border-radius: 0.2857rem;
    border: 1px solid #cccccc;
    margin-top: 1.1429rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.1429rem 1.1429rem;
    cursor: pointer;

    .modal-portal-connected-title,
    .modal-portal-connected-tip {
      font-size: 14px;
      color: #74798c;
    }

    .modal-portal-connected-copy {
      margin-right: 0.4286rem;
    }

    .modal-portal-loading {
      display: flex;

      .modal-portal-loading-icon {
        margin-right: 0.4286rem;
        animation: ${rotate} 1.5s ease-in-out infinite;
      }
    }

    .modal-portal-name {
      font-size: 18px;
      color: #3a3a3a;
      margin: 0.2857rem 0;
    }

    .modal-portal-logo {
      width: 1.8571rem;
      height: 1.8571rem;
    }

    .modal-portal-link {
      font-size: 18px;
      color: ${linkColor};
      text-decoration: underline;
    }
  }

  .modal-tip {
    margin-top: 1.7143rem;

    .modal-tip-link {
      color: ${linkColor};
    }
  }

  .modal-close {
    position: absolute;
    width: 1.7143rem;
    height: 1.7143rem;
    top: 0.8571rem;
    right: 0.8571rem;
    cursor: pointer;
    opacity: 0.75;

    &:hover {
      opacity: 1;
    }
  }
`;
