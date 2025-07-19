import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { openCreateModal, setViewMode } from '@store/slices/uiSlice';
import Button from '../UI/Button';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.space[4]}px;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space[2]}px;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[900]};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.gray[600]};
  margin: 0;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space[3]}px;
`;

const ViewToggle = styled.div`
  display: flex;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.radii.md};
  overflow: hidden;
`;

const ViewButton = styled.button`
  padding: ${props => props.theme.space[2]}px ${props => props.theme.space[3]}px;
  border: none;
  background-color: ${props => props.active ? props.theme.colors.primary[500] : props.theme.colors.white};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.gray[600]};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.sm};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primary[600] : props.theme.colors.gray[50]};
  }
  
  &:first-of-type {
    border-right: 1px solid ${props => props.theme.colors.gray[300]};
  }
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space[4]}px;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[600]};
`;

const SongHeader = () => {
  const dispatch = useDispatch();
  const { totalSongs, loading, viewMode } = useSelector(state => state.songs);

  const handleCreateSong = () => {
    dispatch(openCreateModal());
  };

  const handleViewModeChange = (mode) => {
    dispatch(setViewMode(mode));
  };

  return (
    <HeaderContainer>
      <HeaderLeft>
        <Title>Song Collection</Title>
        <Subtitle>Manage your Ethiopian music archive</Subtitle>
        <StatsContainer>
          <span>Total Songs: {totalSongs}</span>
          {loading && <span>Loading...</span>}
        </StatsContainer>
      </HeaderLeft>
      <HeaderRight>
        <ViewToggle>
          <ViewButton
            active={viewMode === 'table'}
            onClick={() => handleViewModeChange('table')}
          >
            📋 Table
          </ViewButton>
          <ViewButton
            active={viewMode === 'grid'}
            onClick={() => handleViewModeChange('grid')}
          >
            🎯 Grid
          </ViewButton>
        </ViewToggle>
        <Button onClick={handleCreateSong}>
          ➕ Add Song
        </Button>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default SongHeader;