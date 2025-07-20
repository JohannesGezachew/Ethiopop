import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import Header from './Header';
import Notifications from '../UI/Notifications';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.white};
`;

const Main = styled.main`
  flex: 1;
  padding: ${props => props.theme.space[8]}px ${props => props.theme.space[6]}px;
  max-width: ${props => props.theme.sizes.container.xl};
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    padding: ${props => props.theme.space[6]}px ${props => props.theme.space[4]}px;
  }
`;

const Layout = ({ children }) => {
  const notifications = useSelector(state => state.ui.notifications);

  return (
    <LayoutContainer>
      <Header />
      <Main>
        {children}
      </Main>
      {notifications.length > 0 && <Notifications />}
    </LayoutContainer>
  );
};

export default Layout;