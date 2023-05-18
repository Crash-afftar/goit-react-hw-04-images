import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';

const Modal = ({ image, onClose }) => {
  const onKeyDown = useCallback(
    (event) => {
      if (event.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const onOverlay = useCallback(
    (event) => {
      if (event.currentTarget === event.target) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return createPortal(
    <ModalOverlay onClick={onOverlay}>
      <ModalWindow>
        <img src={image.largeUrl} alt={image.targetAlt} />
      </ModalWindow>
    </ModalOverlay>,
    document.querySelector('#modalRoot')
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    largeUrl: PropTypes.string.isRequired,
    targetAlt: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;