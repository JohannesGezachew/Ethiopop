import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { openCreateModal } from '@store/slices/uiSlice';
import Button from '../UI/Button';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.space[4]}px;
  margin-bottom: ${props => props.theme.space[6]}px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: ${props => props.theme.space[3]}px;
    margin-bottom: ${props => props.theme.space[4]}px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space[2]}px;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Title = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[900]};
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: ${props => props.theme.fontSizes.xl};
  }
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space[4]}px;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[600]};
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: ${props => props.theme.space[3]}px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SongHeader = () => {
  const dispatch = useDispatch();
  const { totalSongs, loading } = useSelector(state => state.songs);

  const handleCreateSong = () => {
    dispatch(openCreateModal());
  };

  return (
    <HeaderContainer>
      <HeaderLeft>
        <Title>Music Collection</Title>
        <StatsContainer>
          <span>Total Songs: {totalSongs}</span>
          {loading && <span>Loading...</span>}
        </StatsContainer>
      </HeaderLeft>
      <HeaderRight>
        <Button onClick={handleCreateSong}>
          Add New Song
        </Button>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default SongHeader;