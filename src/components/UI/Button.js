import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const getVariantStyles = (variant, theme) => {
  const variants = {
    primary: css`
      background: linear-gradient(135deg, ${theme.colors.primary[500]} 0%, ${theme.colors.primary[600]} 100%);
      color: ${theme.colors.white};
      border: 1px solid ${theme.colors.primary[500]};
      box-shadow: 0 2px 4px 0 rgba(245, 149, 50, 0.2);
      
      &:hover:not(:disabled) {
        background: linear-gradient(135deg, ${theme.colors.primary[600]} 0%, ${theme.colors.primary[700]} 100%);
        border-color: ${theme.colors.primary[600]};
        box-shadow: 0 4px 8px 0 rgba(245, 149, 50, 0.3);
        transform: translateY(-1px);
      }
      
      &:active:not(:disabled) {
        background: linear-gradient(135deg, ${theme.colors.primary[700]} 0%, ${theme.colors.primary[800]} 100%);
        transform: translateY(0);
        box-shadow: 0 2px 4px 0 rgba(245, 149, 50, 0.2);
      }
    `,
    secondary: css`
      background-color: ${theme.colors.white};
      color: ${theme.colors.gray[700]};
      border: 1px solid ${theme.colors.gray[300]};
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      
      &:hover:not(:disabled) {
        background-color: ${theme.colors.gray[50]};
        border-color: ${theme.colors.gray[400]};
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        transform: translateY(-1px);
      }
      
      &:active:not(:disabled) {
        background-color: ${theme.colors.gray[100]};
        transform: translateY(0);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      }
    `,
    danger: css`
      background: linear-gradient(135deg, ${theme.colors.red[500]} 0%, ${theme.colors.red[600]} 100%);
      color: ${theme.colors.white};
      border: 1px solid ${theme.colors.red[500]};
      box-shadow: 0 2px 4px 0 rgba(239, 68, 68, 0.2);
      
      &:hover:not(:disabled) {
        background: linear-gradient(135deg, ${theme.colors.red[600]} 0%, ${theme.colors.red[700]} 100%);
        border-color: ${theme.colors.red[600]};
        box-shadow: 0 4px 8px 0 rgba(239, 68, 68, 0.3);
        transform: translateY(-1px);
      }
      
      &:active:not(:disabled) {
        background: linear-gradient(135deg, ${theme.colors.red[700]} 0%, ${theme.colors.red[800]} 100%);
        transform: translateY(0);
        box-shadow: 0 2px 4px 0 rgba(239, 68, 68, 0.2);
      }
    `,
    ghost: css`
      background-color: transparent;
      color: ${theme.colors.gray[600]};
      border: 1px solid transparent;
      
      &:hover:not(:disabled) {
        background-color: ${theme.colors.gray[100]};
        color: ${theme.colors.gray[700]};
        transform: translateY(-1px);
      }
      
      &:active:not(:disabled) {
        background-color: ${theme.colors.gray[200]};
        transform: translateY(0);
      }
    `,
  };
  
  return variants[variant] || variants.primary;
};

const getSizeStyles = (size, theme) => {
  const sizes = {
    sm: css`
      padding: ${theme.space[2]}px ${theme.space[3]}px;
      font-size: ${theme.fontSizes.sm};
      border-radius: ${theme.radii.md};
    `,
    md: css`
      padding: ${theme.space[3]}px ${theme.space[4]}px;
      font-size: ${theme.fontSizes.base};
      border-radius: ${theme.radii.md};
    `,
    lg: css`
      padding: ${theme.space[4]}px ${theme.space[6]}px;
      font-size: ${theme.fontSizes.lg};
      border-radius: ${theme.radii.lg};
    `,
  };
  
  return sizes[size] || sizes.md;
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.space[2]}px;
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  white-space: nowrap;
  
  ${props => getVariantStyles(props.variant, props.theme)}
  ${props => getSizeStyles(props.size, props.theme)}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary[500]};
    outline-offset: 2px;
  }
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading && <span>⏳</span>}
      {children}
    </StyledButton>
  );
};

export default Button;