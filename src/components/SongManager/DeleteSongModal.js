import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { deleteSongRequest } from '@store/slices/songsSlice';
import { closeDeleteModal } from '@store/slices/uiSlice';
import Modal from '../UI/Modal';
import Button from '../UI/Button';

const DeleteContent = styled.div`
  text-align: center;
  padding: ${props => props.theme.space[4]}px 0;
`;

const WarningIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${props => props.theme.space[4]}px;
`;

const DeleteMessage = styled.div`
  margin-bottom: ${props => props.theme.space[4]}px;
`;

const DeleteTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[900]};
  margin: 0 0 ${props => props.theme.space[2]}px 0;
`;

const DeleteDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  margin: 0 0 ${props => props.theme.space[4]}px 0;
`;

const SongDetails = styled.div`
  background-color: ${props => props.theme.colors.gray[50]};
  border-radius: ${props => props.theme.radii.md};
  padding: ${props => props.theme.space[4]}px;
  text-align: left;
`;

const SongTitle = styled.div`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.space[1]}px;
`;

const SongArtist = styled.div`
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const DeleteSongModal = () => {
  const dispatch = useDispatch();
  const { isDeleteModalOpen } = useSelector(state => state.ui);
  const { loading, selectedSong } = useSelector(state => state.songs);

  const handleClose = () => {
    dispatch(closeDeleteModal());
  };

  const handleDelete = () => {
    if (selectedSong) {
      dispatch(deleteSongRequest(selectedSong.id));
      handleClose();
    }
  };

  const footer = (
    <>
      <Button
        variant="secondary"
        onClick={handleClose}
        disabled={loading}
      >
        Cancel
      </Button>
      <Button
        variant="danger"
        onClick={handleDelete}
        loading={loading}
        disabled={loading}
      >
        Delete Song
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isDeleteModalOpen}
      onClose={handleClose}
      title="Delete Song"
      footer={footer}
      maxWidth="500px"
    >
      <DeleteContent>
        <WarningIcon>⚠️</WarningIcon>
        <DeleteMessage>
          <DeleteTitle>Are you sure you want to delete this song?</DeleteTitle>
          <DeleteDescription>
            This action cannot be undone. The song will be permanently removed from your collection.
          </DeleteDescription>
        </DeleteMessage>
        
        {selectedSong && (
          <SongDetails>
            <SongTitle>{selectedSong.title}</SongTitle>
            <SongArtist>by {selectedSong.artist}</SongArtist>
          </SongDetails>
        )}
      </DeleteContent>
    </Modal>
  );
};

export default DeleteSongModal;