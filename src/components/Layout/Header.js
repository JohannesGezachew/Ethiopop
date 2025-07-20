import React from 'react';
import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.gray[50]};
  padding: ${props => props.theme.space[8]}px ${props => props.theme.space[6]}px;
  text-align: center;
`;

const HeaderContent = styled.div`
  max-width: ${props => props.theme.sizes.container.lg};
  margin: 0 auto;
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[900]};
  margin: 0 0 ${props => props.theme.space[4]}px 0;
  letter-spacing: -0.02em;
  
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    font-size: 2.5rem;
  }
`;

const AmharicTitle = styled.h2`
  font-size: 2rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.primary[600]};
  margin: 0 0 ${props => props.theme.space[6]}px 0;
  font-family: 'Noto Sans Ethiopic', serif;
  
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.gray[600]};
  line-height: ${props => props.theme.lineHeights.relaxed};
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    font-size: ${props => props.theme.fontSizes.base};
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