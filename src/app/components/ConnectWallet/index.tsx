/**
 *
 * ConnectWallet
 *
 */
import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { usePortal } from 'utils/hooks/usePortal';

interface Props {
  children?: React.ReactChild;
  profile?: boolean;
}

export const ConnectButton = ({ children, profile = false }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const { installed, connected } = usePortal();

  const handleClick = () => {
    if (profile || !installed || connected === 0) {
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <span onClick={handleClick}>{children}</span>
      <Modal show={showModal} onClose={handleClose}></Modal>
    </>
  );
};

export const ConnectWallet = () => {
  return (
    <ConnectButton profile={true}>
      <Button />
    </ConnectButton>
  );
};
