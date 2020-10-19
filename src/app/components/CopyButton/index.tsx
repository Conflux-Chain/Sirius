/**
 *
 * CopyButton
 *
 */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '../Tooltip';
import { Copy } from '@geist-ui/react-icons';
import { translations } from 'locales/i18n';

interface CopyButtonProps {
  size?: number;
  copyText: string;
  tooltipText?: string;
  color?: string;
}

export const CopyButton = ({
  size,
  copyText,
  tooltipText,
  color,
}: CopyButtonProps) => {
  const { t } = useTranslation();
  const [text, setText] = useState(
    tooltipText || t(translations.general.copyButton.copyToClipboard),
  );
  const handleClick = () => {
    const oInput = document.createElement('input');
    oInput.value = copyText;
    document.body.appendChild(oInput);
    oInput.select();
    const copyResult = document.execCommand('copy');
    document.body.removeChild(oInput);
    if (copyResult) {
      setText(t(translations.general.copyButton.success));
    } else {
      setText(t(translations.general.copyButton.failed));
    }
  };

  const handleChange = (visible: boolean) => {
    if (!visible) {
      setText(
        tooltipText || t(translations.general.copyButton.copyToClipboard),
      );
    }
  };
  return (
    <Tooltip placement="top" text={text} onVisibleChange={handleChange}>
      <div
        onClick={handleClick}
        style={{
          cursor: 'pointer',
        }}
      >
        <img alt="copy" src="/copy.svg" />
      </div>
    </Tooltip>
  );
};
