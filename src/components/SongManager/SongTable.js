import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { setSelectedSong } from '@store/slices/songsSlice';
import { openEditModal, openDeleteModal } from '@store/slices/uiSlice';
import Button from '../UI/Button';
import Card from '../UI/Card';

const TableContainer = styled(Card)`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: ${props => props.theme.colors.gray[50]};
`;

const TableHeaderCell = styled.th`
  padding: ${props => props.theme.space[4]}px;
  text-align: left;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[700]};
  font-size: ${props => props.theme.fontSizes.sm};
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
  white-space: nowrap;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.gray[50]};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.gray[100]};
  }
`;

const TableCell = styled.td`
  padding: ${props => props.theme.space[4]}px;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[900]};
  vertical-align: middle;
`;

const SongTitle = styled.div`
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray[900]};
`;

const SongArtist = styled.div`
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.xs};
  margin-top: ${props => props.theme.space[1]}px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.space[2]}px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.space[8]}px;
  color: ${props => props.theme.colors.gray[500]};
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${props => props.theme.space[8]}px;
  color: ${props => props.theme.colors.gray[500]};
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
          <div>🎵</div>
          <h3>No songs found</h3>
          <p>Add your first song to get started!</p>
        </EmptyState>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
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
            <TableRow key={song.id}>
              <TableCell>
                <SongTitle>{song.title}</SongTitle>
                <SongArtist>{song.artist}</SongArtist>
              </TableCell>
              <TableCell>{song.album}</TableCell>
              <TableCell>{song.year}</TableCell>
              <TableCell>{song.genre}</TableCell>
              <TableCell>{formatDuration(song.duration)}</TableCell>
              <TableCell>{song.language}</TableCell>
              <TableCell>
                <ActionButtons>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEdit(song)}
                  >
                    ✏️
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(song)}
                  >
                    🗑️
                  </Button>
                </ActionButtons>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SongTable;