import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSongRequest } from '@store/slices/songsSlice';
import { closeCreateModal } from '@store/slices/uiSlice';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import SongForm from './SongForm';

const CreateSongModal = () => {
  const dispatch = useDispatch();
  const { isCreateModalOpen } = useSelector(state => state.ui);
  const { loading } = useSelector(state => state.songs);

  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    year: new Date().getFullYear(),
    genre: '',
    duration: 180,
    language: 'Amharic',
  });

  const [errors, setErrors] = useState({});

  const handleClose = () => {
    dispatch(closeCreateModal());
    setFormData({
      title: '',
      artist: '',
      album: '',
      year: new Date().getFullYear(),
      genre: '',
      duration: 180,
      language: 'Amharic',
    });
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
    
    if (validateForm()) {
      dispatch(createSongRequest(formData));
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
        form="create-song-form"
        loading={loading}
        disabled={loading}
      >
        Create Song
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isCreateModalOpen}
      onClose={handleClose}
      title="Add New Song"
      footer={footer}
      maxWidth="600px"
    >
      <SongForm
        id="create-song-form"
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default CreateSongModal;