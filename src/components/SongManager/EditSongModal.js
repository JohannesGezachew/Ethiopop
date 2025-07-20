import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSongRequest } from '@store/slices/songsSlice';
import { closeEditModal } from '@store/slices/uiSlice';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import SongForm from './SongForm';

const EditSongModal = () => {
  const dispatch = useDispatch();
  const { isEditModalOpen } = useSelector(state => state.ui);
  const { loading, selectedSong } = useSelector(state => state.songs);

  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    year: new Date().getFullYear(),
    genre: '',
    duration: 180,
    language: 'Amharic',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedSong) {
      setFormData({
        title: selectedSong.title || '',
        artist: selectedSong.artist || '',
        album: selectedSong.album || '',
        year: selectedSong.year || new Date().getFullYear(),
        genre: selectedSong.genre || '',
        duration: selectedSong.duration || 180,
        language: selectedSong.language || 'Amharic',
        description: selectedSong.description || '',
      });
    }
  }, [selectedSong]);

  const handleClose = () => {
    dispatch(closeEditModal());
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.artist.trim()) {
      newErrors.artist = 'Artist is required';
    }

    if (!formData.album.trim()) {
      newErrors.album = 'Album is required';
    }

    if (!formData.genre.trim()) {
      newErrors.genre = 'Genre is required';
    }

    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Please enter a valid year';
    }

    if (formData.duration < 1 || formData.duration > 3600) {
      newErrors.duration = 'Duration must be between 1 and 3600 seconds';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm() && selectedSong) {
      dispatch(updateSongRequest({
        id: selectedSong.id,
        data: formData
      }));
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
        type="submit"
        form="edit-song-form"
        loading={loading}
        disabled={loading}
      >
        Update Song
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isEditModalOpen}
      onClose={handleClose}
      title="Edit Song"
      footer={footer}
      maxWidth="600px"
    >
      <SongForm
        id="edit-song-form"
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default EditSongModal;