import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { removeNotification } from '@store/slices/uiSlice';

const NotificationsContainer = styled.div`
  position: fixed;
  top: ${props => props.theme.space[4]}px;
  right: ${props => props.theme.space[4]}px;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space[3]}px;
  max-width: 400px;
`;

const getNotificationStyles = (type, theme) => {
  const styles = {
    success: css`
      background-color: ${theme.colors.secondary[50]};
      border-color: ${theme.colors.secondary[200]};
      color: ${theme.colors.secondary[800]};
      
      &::before {
        content: '✓';
        color: ${theme.colors.secondary[600]};
      }
    `,
    error: css`
      background-color: ${theme.colors.red[50]};
      border-color: ${theme.colors.red[200]};
      color: ${theme.colors.red[800]};
      
      &::before {
        content: '✕';
        color: ${theme.colors.red[600]};
      }
    `,
    warning: css`
      background-color: ${theme.colors.primary[50]};
      border-color: ${theme.colors.primary[200]};
      color: ${theme.colors.primary[800]};
      
      &::before {
        content: '⚠';
        color: ${theme.colors.primary[600]};
      }
    `,
    info: css`
      background-color: ${theme.colors.gray[50]};
      border-color: ${theme.colors.gray[200]};
      color: ${theme.colors.gray[800]};
      
      &::before {
        content: 'ℹ';
        color: ${theme.colors.gray[600]};
      }
    `,
  };
  
  return styles[type] || styles.info;
};

const NotificationItem = styled.div`
  padding: ${props => props.theme.space[4]}px;
  border-radius: ${props => props.theme.radii.lg};
  border: 1px solid;
  box-shadow: ${props => props.theme.shadows.lg};
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.space[3]}px;
  animation: slideIn 0.3s ease-out;
  position: relative;
  
  &::before {
    font-weight: ${props => props.theme.fontWeights.bold};
    font-size: ${props => props.theme.fontSizes.lg};
  }
  
  ${props => getNotificationStyles(props.type, props.theme)}
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationMessage = styled.p`
  margin: 0;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.lg};
  padding: 0;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const Notification = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(notification.id);
    }, notification.duration || 5000);

    return () => clearTimeout(timer);
  }, [notification.id, notification.duration, onClose]);

  return (
    <NotificationItem type={notification.type}>
      <NotificationContent>
        <NotificationMessage>{notification.message}</NotificationMessage>
      </NotificationContent>
      <CloseButton onClick={() => onClose(notification.id)}>
        ×
      </CloseButton>
    </NotificationItem>
  );
};

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.ui.notifications);

  const handleClose = (id) => {
    dispatch(removeNotification(id));
  };

  if (notifications.length === 0) return null;

  return (
    <NotificationsContainer>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          notification={notification}
          onClose={handleClose}
        />
      ))}
    </NotificationsContainer>
  );
};

export default Notifications;