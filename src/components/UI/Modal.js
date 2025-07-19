import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Button from './Button';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${props => props.theme.space[4]}px;
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radii.xl};
  box-shadow: ${props => props.theme.shadows.xl};
  max-width: ${props => props.maxWidth || '500px'};
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const ModalHeader = styled.div`
  padding: ${props => props.theme.space[6]}px ${props => props.theme.space[6]}px ${props => props.theme.space[4]}px;
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[900]};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.gray[400]};
  cursor: pointer;
  padding: ${props => props.theme.space[1]}px;
  border-radius: ${props => props.theme.radii.md};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.gray[600]};
  }
`;

const ModalBody = styled.div`
  padding: ${props => props.theme.space[6]}px;
`;

const ModalFooter = styled.div`
  padding: ${props => props.theme.space[4]}px ${props => props.theme.space[6]}px ${props => props.theme.space[6]}px;
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
  display: flex;
  gap: ${props => props.theme.space[3]}px;
  justify-content: flex-end;
`;

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth,
  closeOnOverlayClick = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer maxWidth={maxWidth}>
        {title && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <CloseButton onClick={onClose}>×</CloseButton>
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContainer>
    </Overlay>,
    document.body
  );
};

export default Modal;