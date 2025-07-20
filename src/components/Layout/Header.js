import React from 'react';
import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #fefefe 0%, #f8fafc 100%);
  padding: ${props => props.theme.space[12]}px ${props => props.theme.space[6]}px ${props => props.theme.space[10]}px;
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.colors.gray[100]};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      ${props => props.theme.colors.primary[500]} 0%, 
      ${props => props.theme.colors.secondary[500]} 50%, 
      ${props => props.theme.colors.primary[500]} 100%
    );
  }
`;

const HeaderContent = styled.div`
  max-width: ${props => props.theme.sizes.container.lg};
  margin: 0 auto;
`;

const MainTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, ${props => props.theme.colors.gray[900]} 0%, ${props => props.theme.colors.gray[700]} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 ${props => props.theme.space[3]}px 0;
  letter-spacing: -0.03em;
  line-height: 1.1;
  
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    font-size: 3.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    font-size: 2.5rem;
  }
`;

const AmharicTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 500;
  color: ${props => props.theme.colors.primary[600]};
  margin: 0 0 ${props => props.theme.space[8]}px 0;
  font-family: 'Noto Sans Ethiopic', serif;
  opacity: 0.9;
  
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    font-size: 2rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto;
  font-weight: 400;
  
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    font-size: ${props => props.theme.fontSizes.lg};
    line-height: 1.6;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <MainTitle>Ethiopop Archive</MainTitle>
        <AmharicTitle>የኢትዮጵያ ሙዚቃ ማህደር</AmharicTitle>
        <Description>
          Discover the rich musical heritage of Ethiopia. From traditional
          folk songs to modern Ethio-Jazz fusion, explore the stories,
          artists, and cultural significance behind each piece.
        </Description>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;