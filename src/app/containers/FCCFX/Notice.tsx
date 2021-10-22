import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@jnoodle/antd';
import { Remark } from 'app/components/Remark';
import { translations } from 'locales/i18n';
import styled from 'styled-components/macro';

export function Notice({ show = false, onClose = () => {} }) {
  const { t } = useTranslation();

  return (
    <Modal
      title={t(translations.fccfx.notice.title)}
      visible={show}
      onOk={onClose}
      onCancel={onClose}
      okText={t(translations.fccfx.notice.confirm)}
      cancelButtonProps={{
        hidden: true,
      }}
      width="750px"
    >
      <StyledRemarkWrapper>
        <Remark
          className="remark"
          hideTitle
          items={[
            t(translations.fccfx.notice.items.first),
            t(translations.fccfx.notice.items.second),
            t(translations.fccfx.notice.items.third),
            t(translations.fccfx.notice.items.fourth),
            t(translations.fccfx.notice.items.fifth),
          ]}
        ></Remark>
      </StyledRemarkWrapper>
    </Modal>
  );
}

const StyledRemarkWrapper = styled.div`
  .remark {
    .content {
      line-height: 24px;

      div:not(:last-child) {
        margin-bottom: 16px;
      }
    }
  }
`;
