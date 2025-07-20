import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space[2]}px;
`;

const Label = styled.label`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray[700]};
`;

const StyledInput = styled.input`
  padding: ${props => props.theme.space[3]}px ${props => props.theme.space[4]}px;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.radii.lg};
  font-size: ${props => props.theme.fontSizes.base};
  transition: all 0.2s ease;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary[100]}, 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
  }
  
  &:hover:not(:focus):not(:disabled) {
    border-color: ${props => props.theme.colors.gray[400]};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.gray[50]};
    color: ${props => props.theme.colors.gray[500]};
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.gray[400]};
  }
  
  ${props => props.error && css`
    border-color: ${props.theme.colors.red[500]};
    
    &:focus {
      border-color: ${props.theme.colors.red[500]};
      box-shadow: 0 0 0 3px ${props.theme.colors.red[100]}, 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
  `}
`;

const StyledTextarea = styled.textarea`
  padding: ${props => props.theme.space[3]}px ${props => props.theme.space[4]}px;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.radii.md};
  font-size: ${props => props.theme.fontSizes.base};
  font-family: inherit;
  transition: all 0.2s ease;
  background-color: ${props => props.theme.colors.white};
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary[100]};
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.gray[50]};
    color: ${props => props.theme.colors.gray[500]};
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.gray[400]};
  }
  
  ${props => props.error && css`
    border-color: ${props.theme.colors.red[500]};
    
    &:focus {
      border-color: ${props.theme.colors.red[500]};
      box-shadow: 0 0 0 3px ${props.theme.colors.red[100]};
    }
  `}
`;

const ErrorMessage = styled.span`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.red[600]};
`;

const Input = ({
  label,
  error,
  type = 'text',
  multiline = false,
  rows = 4,
  ...props
}) => {
  const InputComponent = multiline ? StyledTextarea : StyledInput;
  
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <InputComponent
        type={multiline ? undefined : type}
        rows={multiline ? rows : undefined}
        error={error}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;