import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { closeSongDetailsModal } from '@store/slices/uiSlice';
import Modal from '../UI/Modal';
import Button from '../UI/Button';

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space[6]}px;
`;

const SongHeader = styled.div`
  text-align: center;
  padding-bottom: ${props => props.theme.space[4]}px;
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
`;

const SongTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[900]};
  margin: 0 0 ${props => props.theme.space[2]}px 0;
`;

const SongArtist = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.primary[600]};
  margin: 0 0 ${props => props.theme.space[3]}px 0;
`;

const SongAlbum = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.gray[600]};
  margin: 0;
`;

const SongInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${props => props.theme.space[4]}px;
  padding: ${props => props.theme.space[4]}px 0;
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
`;

const InfoItem = styled.div`
  text-align: center;
`;

const InfoLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[500]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${props => props.theme.space[1]}px;
`;

const InfoValue = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray[900]};
`;

const GenreBadge = styled.span`
  display: inline-block;
  padding: ${props => props.theme.space[1]}px ${props => props.theme.space[3]}px;
  background-color: ${props => props.theme.colors.primary[100]};
  color: ${props => props.theme.colors.primary[700]};
  border-radius: ${props => props.theme.radii.full};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const LanguageBadge = styled.span`
  display: inline-block;
  padding: ${props => props.theme.space[1]}px ${props => props.theme.space[3]}px;
  background-color: ${props => props.theme.colors.secondary[100]};
  color: ${props => props.theme.colors.secondary[700]};
  border-radius: ${props => props.theme.radii.full};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const DescriptionSection = styled.div`
  padding: ${props => props.theme.space[4]}px 0;
`;

const DescriptionTitle = styled.h4`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[900]};
  margin: 0 0 ${props => props.theme.space[3]}px 0;
`;

const DescriptionText = styled.p`
  font-size: ${props => props.theme.fontSizes.base};
  line-height: ${props => props.theme.lineHeights.relaxed};
  color: ${props => props.theme.colors.gray[700]};
  margin: 0;
`;

const YouTubeSection = styled.div`
  padding: ${props => props.theme.space[4]}px 0;
  text-align: center;
`;

const YouTubeButton = styled(Button)`
  background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
  color: white;
  border: none;
  font-weight: ${props => props.theme.fontWeights.semibold};
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #cc0000 0%, #990000 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px 0 rgba(255, 0, 0, 0.3);
  }
  
  &::before {
    content: '▶';
    margin-right: ${props => props.theme.space[2]}px;
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const SongDetailsModal = () => {
  const dispatch = useDispatch();
  const { isSongDetailsModalOpen, selectedSong } = useSelector(state => state.ui);

  const handleClose = () => {
    dispatch(closeSongDetailsModal());
  };

  const handleYouTubeAction = () => {
    if (selectedSong) {
      if (selectedSong.youtubeUrl && selectedSong.youtubeUrl.trim()) {
        // If there's a direct YouTube URL, open it
        window.open(selectedSong.youtubeUrl, '_blank');
      } else {
        // Otherwise, search for the song
        const searchQuery = `${selectedSong.title} ${selectedSong.artist} Ethiopian music`;
        const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
        window.open(youtubeUrl, '_blank');
      }
    }
  };

  if (!selectedSong) return null;

  const footer = (
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
  );

  return (
    <Modal
      isOpen={isSongDetailsModalOpen}
      onClose={handleClose}
      title="Song Details"
      footer={footer}
      maxWidth="700px"
    >
      <DetailsContainer>
        <SongHeader>
          <SongTitle>{selectedSong.title}</SongTitle>
          <SongArtist>{selectedSong.artist}</SongArtist>
          <SongAlbum>{selectedSong.album}</SongAlbum>
        </SongHeader>

        <SongInfo>
          <InfoItem>
            <InfoLabel>Year</InfoLabel>
            <InfoValue>{selectedSong.year}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Genre</InfoLabel>
            <InfoValue>
              <GenreBadge>{selectedSong.genre}</GenreBadge>
            </InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Duration</InfoLabel>
            <InfoValue>{formatDuration(selectedSong.duration)}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Language</InfoLabel>
            <InfoValue>
              <LanguageBadge>{selectedSong.language}</LanguageBadge>
            </InfoValue>
          </InfoItem>
        </SongInfo>

        {selectedSong.description && (
          <DescriptionSection>
            <DescriptionTitle>About This Song</DescriptionTitle>
            <DescriptionText>{selectedSong.description}</DescriptionText>
          </DescriptionSection>
        )}

        <YouTubeSection>
          <YouTubeButton onClick={handleYouTubeAction}>
            {selectedSong.youtubeUrl && selectedSong.youtubeUrl.trim() 
              ? 'Watch on YouTube' 
              : 'Search on YouTube'
            }
          </YouTubeButton>
        </YouTubeSection>
      </DetailsContainer>
    </Modal>
  );
};

export default SongDetailsModal;