import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { setSelectedSong } from '@store/slices/songsSlice';
import { openEditModal, openDeleteModal } from '@store/slices/uiSlice';
import Button from '../UI/Button';
import Card from '../UI/Card';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.space[6]}px;
`;

const SongCard = styled(Card)`
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const SongHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.space[4]}px;
  margin-bottom: ${props => props.theme.space[4]}px;
`;

const SongIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[400]}, ${props => props.theme.colors.secondary[400]});
  border-radius: ${props => props.theme.radii.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes['2xl']};
  flex-shrink: 0;
`;

const SongInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const SongTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[900]};
  margin: 0 0 ${props => props.theme.space[1]}px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SongArtist = styled.p`
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.gray[600]};
  margin: 0 0 ${props => props.theme.space[2]}px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SongAlbum = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[500]};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SongDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.space[3]}px;
  margin-bottom: ${props => props.theme.space[4]}px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space[1]}px;
`;

const DetailLabel = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.gray[500]};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DetailValue = styled.span`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[700]};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.space[2]}px;
  justify-content: flex-end;
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: ${props => props.theme.space[8]}px;
  color: ${props => props.theme.colors.gray[500]};
`;

const LoadingState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: ${props => props.theme.space[8]}px;
  color: ${props => props.theme.colors.gray[500]};
`;

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const SongGrid = () => {
  const dispatch = useDispatch();
  const { songs, loading } = useSelector(state => state.songs);

  const handleEdit = (song) => {
    dispatch(setSelectedSong(song));
    dispatch(openEditModal());
  };

  const handleDelete = (song) => {
    dispatch(setSelectedSong(song));
    dispatch(openDeleteModal());
  };

  if (loading) {
    return (
      <GridContainer>
        <LoadingState>Loading songs...</LoadingState>
      </GridContainer>
    );
  }

  if (songs.length === 0) {
    return (
      <GridContainer>
        <EmptyState>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎵</div>
          <h3>No songs found</h3>
          <p>Add your first song to get started!</p>
        </EmptyState>
      </GridContainer>
    );
  }

  return (
    <GridContainer>
      {songs.map((song) => (
        <SongCard key={song.id}>
          <SongHeader>
            <SongIcon>🎵</SongIcon>
            <SongInfo>
              <SongTitle title={song.title}>{song.title}</SongTitle>
              <SongArtist title={song.artist}>{song.artist}</SongArtist>
              <SongAlbum title={song.album}>{song.album}</SongAlbum>
            </SongInfo>
          </SongHeader>
          
          <SongDetails>
            <DetailItem>
              <DetailLabel>Year</DetailLabel>
              <DetailValue>{song.year}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Genre</DetailLabel>
              <DetailValue>{song.genre}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Duration</DetailLabel>
              <DetailValue>{formatDuration(song.duration)}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Language</DetailLabel>
              <DetailValue>{song.language}</DetailValue>
            </DetailItem>
          </SongDetails>
          
          <ActionButtons>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleEdit(song)}
            >
              ✏️ Edit
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => handleDelete(song)}
            >
              🗑️ Delete
            </Button>
          </ActionButtons>
        </SongCard>
      ))}
    </GridContainer>
  );
};

export default SongGrid;