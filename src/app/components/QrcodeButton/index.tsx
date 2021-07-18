/**
 *
 * QrcodeButton
 *
 */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import styled from 'styled-components/macro';
import QRCode from 'qrcode.react';
import { Modal } from '@cfxjs/react-ui';
import { Tooltip } from '../Tooltip';
import { translations } from 'locales/i18n';

interface QrcodeButtonProps {
  value: string;
  tooltipText?: string;
  title?: string;
  className?: string;
  size?: number;
}

export const QrcodeButton = React.memo(
  ({ value, tooltipText, title, className, size }: QrcodeButtonProps) => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    const handleClick = () => {
      setVisible(true);
    };
    const handleClose = () => {
      setVisible(false);
    };

    return (
      <>
        <Tooltip
          text={tooltipText || t(translations.general.qrcodeButton.clickToShow)}
        >
          <div
            onClick={handleClick}
            style={{
              cursor: 'pointer',
            }}
          >
            <svg
              className={`icon ${className}`}
              viewBox="0 0 1024 1024"
              width={size || 8}
              height={size || 8}
            >
              <defs>
                <style type="text/css" />
              </defs>
              <path
                d="M639.488 484.864a106.88 106.88 0 0 1-106.88-106.752V124.544c0-58.88 47.872-106.752 106.752-106.752h258.176c58.88 0 106.752 47.744 106.88 106.752v253.44c0 59.008-47.872 106.752-106.752 106.88H639.36zM897.536 93.056H639.488a31.488 31.488 0 0 0-31.616 31.488v253.44c0 17.408 14.08 31.488 31.616 31.488h258.048c17.408 0 31.488-14.08 31.488-31.36V124.544a31.488 31.488 0 0 0-31.488-31.488zM113.92 1015.04a107.008 107.008 0 0 1-106.752-106.88v-253.44c0-59.008 47.744-106.752 106.752-106.88h258.048c59.008 0 106.88 47.872 107.008 106.88v253.44c-0.128 58.88-47.872 106.752-106.88 106.88H113.92z m258.048-391.808H113.92a31.488 31.488 0 0 0-31.488 31.488v253.44c0 17.408 14.08 31.488 31.488 31.488h258.048c17.536 0 31.616-14.08 31.616-31.488v-253.44a31.488 31.488 0 0 0-31.488-31.488zM113.92 484.864a106.88 106.88 0 0 1-106.752-106.752V124.544c0-58.88 47.744-106.752 106.752-106.752h258.048c59.008 0 106.88 47.744 107.008 106.752v253.44c-0.128 59.008-47.872 106.88-106.88 106.88H113.92zM371.968 93.056H113.92a31.488 31.488 0 0 0-31.488 31.488v253.44c0 17.408 14.08 31.488 31.488 31.488h258.048c17.536 0 31.616-14.08 31.616-31.36V124.544a31.488 31.488 0 0 0-31.488-31.488zM570.24 547.84h396.544a37.76 37.76 0 1 1 0 75.392H570.24a37.76 37.76 0 1 1 0-75.392z m54.4 171.904v257.664a37.76 37.76 0 0 1-75.392 0V719.744a37.76 37.76 0 1 1 75.392 0z m181.504 0v151.808a37.632 37.632 0 1 1-75.392 0V719.744a37.632 37.632 0 1 1 75.52 0z m181.504 0v226.944a37.632 37.632 0 1 1-75.392 0V719.744a37.632 37.632 0 1 1 75.52 0z"
                p-id={8134}
              />
            </svg>
          </div>
        </Tooltip>
        <Modal
          wrapClassName="qrcode-modal"
          width="22rem"
          open={visible}
          onClose={handleClose}
        >
          <Modal.Title>{title}</Modal.Title>
          <Modal.Content>
            <QRCode size={200} value={value} />
          </Modal.Content>
        </Modal>
      </>
    );
  },
);
