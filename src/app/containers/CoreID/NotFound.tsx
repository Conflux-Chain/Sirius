import React from 'react';
import imgNotFound from 'images/home/notFoundAddress.svg';
import styled from 'styled-components/macro';

export const NotFound = ({ children = 'reason' }) => {
  return (
    <StyledWrapper>
      <div>
        <img src={imgNotFound} alt="coreid search result not found"></img>
      </div>
      <div className="msg">{children}</div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 30rem;
  justify-content: center;

  img {
    width: 240px;
  }

  .msg {
    font-style: normal;
    font-weight: 450;
    font-size: 22px;
    line-height: 28px;
    color: var(--theme-color-gray2);
    margin-top: 2rem;
  }
`;
