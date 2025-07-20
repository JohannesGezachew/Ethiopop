import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { setSelectedSong } from '@store/slices/songsSlice';
import { openEditModal, openDeleteModal, openSongDetailsModal } from '@store/slices/uiSlice';
import Button from '../UI/Button';

const TableContainer = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.radii.xl};
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
  
  @media (max-width: 768px) {
    border-radius: ${props => props.theme.radii.lg};
    overflow: visible;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileCardList = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.space[3]}px;
    padding: ${props => props.theme.space[4]}px;
  }
`;

const MobileCard = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.radii.lg};
  padding: ${props => props.theme.space[4]}px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

const MobileCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.space[3]}px;
`;

const MobileCardInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const MobileCardActions = styled.div`
  display: flex;
  gap: ${props => props.theme.space[2]}px;
  flex-shrink: 0;
  margin-left: ${props => props.theme.space[3]}px;
`;

const MobileCardDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.space[2]}px;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[600]};
`;

const MobileDetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space[1]}px;
`;

const MobileDetailLabel = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.gray[500]};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const MobileDetailValue = styled.span`
  color: ${props => props.theme.colors.gray[700]};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, ${props => props.theme.colors.gray[50]} 0%, ${props => props.theme.colors.gray[25]} 100%);
`;

const TableHeaderCell = styled.th`
  padding: ${props => props.theme.space[5]}px ${props => props.theme.space[4]}px;
  text-align: left;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[700]};
  font-size: ${props => props.theme.fontSizes.sm};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  border-bottom: 2px solid ${props => props.theme.colors.gray[200]};
  
  &:first-of-type {
    padding-left: ${props => props.theme.space[6]}px;
  }
  
  &:last-of-type {
    padding-right: ${props => props.theme.space[6]}px;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.colors.gray[25]};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.gray[100]};
  }
`;

const TableCell = styled.td`
  padding: ${props => props.theme.space[5]}px ${props => props.theme.space[4]}px;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[900]};
  vertical-align: middle;
  
  &:first-of-type {
    padding-left: ${props => props.theme.space[6]}px;
  }
  
  &:last-of-type {
    padding-right: ${props => props.theme.space[6]}px;
  }
`;

const SongTitle = styled.div`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[900]};
  font-size: ${props => props.theme.fontSizes.base};
  margin-bottom: ${props => props.theme.space[1]}px;
`;

const SongArtist = styled.div`
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
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

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.space[2]}px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  
  tr:hover & {
    opacity: 1;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.space[12]}px ${props => props.theme.space[6]}px;
  color: ${props => props.theme.colors.gray[500]};
  
  h3 {
    font-size: ${props => props.theme.fontSizes.xl};
    font-weight: ${props => props.theme.fontWeights.semibold};
    color: ${props => props.theme.colors.gray[700]};
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.colors.gray[500]};
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${props => props.theme.space[12]}px ${props => props.theme.space[6]}px;
  color: ${props => props.theme.colors.gray[500]};
  font-size: ${props => props.theme.fontSizes.lg};
`;

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const SongTable = () => {
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

  const handleSongClick = (song, e) => {
    // Don't open details if clicking on action buttons
    if (e.target.closest('button')) {
      return;
    }
    dispatch(openSongDetailsModal(song));
  };

  if (loading) {
    return (
      <TableContainer>
        <LoadingState>Loading songs...</LoadingState>
      </TableContainer>
    );
  }

  if (songs.length === 0) {
    return (
      <TableContainer>
        <EmptyState>
          <h3>No songs found</h3>
          <p>Add your first song to get started!</p>
        </EmptyState>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      {/* Desktop Table View */}
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>Song</TableHeaderCell>
            <TableHeaderCell>Album</TableHeaderCell>
            <TableHeaderCell>Year</TableHeaderCell>
            <TableHeaderCell>Genre</TableHeaderCell>
            <TableHeaderCell>Duration</TableHeaderCell>
            <TableHeaderCell>Language</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </tr>
        </TableHeader>
        <TableBody>
          {songs.map((song) => (
            <TableRow key={song.id} onClick={(e) => handleSongClick(song, e)}>
              <TableCell>
                <SongTitle>{song.title}</SongTitle>
                <SongArtist>{song.artist}</SongArtist>
              </TableCell>
              <TableCell>{song.album}</TableCell>
              <TableCell>{song.year}</TableCell>
              <TableCell>
                <GenreBadge>{song.genre}</GenreBadge>
              </TableCell>
              <TableCell>{formatDuration(song.duration)}</TableCell>
              <TableCell>
                <LanguageBadge>{song.language}</LanguageBadge>
              </TableCell>
              <TableCell>
                <ActionButtons>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEdit(song)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(song)}
                  >
                    Delete
                  </Button>
                </ActionButtons>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Mobile Card View */}
      <MobileCardList>
        {songs.map((song) => (
          <MobileCard key={song.id} onClick={(e) => handleSongClick(song, e)}>
            <MobileCardHeader>
              <MobileCardInfo>
                <SongTitle>{song.title}</SongTitle>
                <SongArtist>{song.artist}</SongArtist>
              </MobileCardInfo>
              <MobileCardActions>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(song)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(song)}
                >
                  Delete
                </Button>
              </MobileCardActions>
            </MobileCardHeader>
            
            <MobileCardDetails>
              <MobileDetailItem>
                <MobileDetailLabel>Album</MobileDetailLabel>
                <MobileDetailValue>{song.album}</MobileDetailValue>
              </MobileDetailItem>
              <MobileDetailItem>
                <MobileDetailLabel>Year</MobileDetailLabel>
                <MobileDetailValue>{song.year}</MobileDetailValue>
              </MobileDetailItem>
              <MobileDetailItem>
                <MobileDetailLabel>Genre</MobileDetailLabel>
                <MobileDetailValue>
                  <GenreBadge>{song.genre}</GenreBadge>
                </MobileDetailValue>
              </MobileDetailItem>
              <MobileDetailItem>
                <MobileDetailLabel>Duration</MobileDetailLabel>
                <MobileDetailValue>{formatDuration(song.duration)}</MobileDetailValue>
              </MobileDetailItem>
              <MobileDetailItem>
                <MobileDetailLabel>Language</MobileDetailLabel>
                <MobileDetailValue>
                  <LanguageBadge>{song.language}</LanguageBadge>
                </MobileDetailValue>
              </MobileDetailItem>
            </MobileCardDetails>
          </MobileCard>
        ))}
      </MobileCardList>
    </TableContainer>
  );
};

export default SongTable;