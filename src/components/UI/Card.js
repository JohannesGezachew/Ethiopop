import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const StyledCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.base};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  overflow: hidden;
  transition: all 0.2s ease;
  
  ${props => props.hover && css`
    &:hover {
      box-shadow: ${props.theme.shadows.md};
      transform: translateY(-1px);
    }
  `}
  
  ${props => props.clickable && css`
    cursor: pointer;
    
    &:hover {
      box-shadow: ${props.theme.shadows.md};
      transform: translateY(-1px);
    }
  `}
`;

const CardHeader = styled.div`
  padding: ${props => props.theme.space[6]}px;
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
  
  ${props => props.noBorder && css`
    border-bottom: none;
  `}
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[900]};
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[600]};
  margin: ${props => props.theme.space[2]}px 0 0 0;
`;

const CardBody = styled.div`
  padding: ${props => props.theme.space[6]}px;
`;

const CardFooter = styled.div`
  padding: ${props => props.theme.space[4]}px ${props => props.theme.space[6]}px;
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
  background-color: ${props => props.theme.colors.gray[50]};
  
  ${props => props.noBorder && css`
    border-top: none;
    background-color: transparent;
  `}
`;

const Card = ({
  children,
  title,
  description,
  footer,
  hover = false,
  clickable = false,
  onClick,
  className,
  ...props
}) => {
  return (
    <StyledCard
      hover={hover}
      clickable={clickable}
      onClick={onClick}
      className={className}
      {...props}
    >
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </StyledCard>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;