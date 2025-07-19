import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@store/slices/uiSlice';
import Button from '../UI/Button';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
  padding: ${props => props.theme.space[4]}px ${props => props.theme.space[6]}px;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const HeaderContent = styled.div`
  max-width: ${props => props.theme.sizes.container.xl};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space[3]}px;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[500]}, ${props => props.theme.colors.secondary[500]});
  border-radius: ${props => props.theme.radii.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.lg};
`;

const LogoText = styled.h1`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[900]};
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space[3]}px;
`;

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.ui.theme);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <LogoIcon>🎵</LogoIcon>
          <LogoText>Ethiopop Archive</LogoText>
        </Logo>
        <HeaderActions>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleThemeToggle}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;