import React from 'react';
import CreateSongModal from './CreateSongModal';
import EditSongModal from './EditSongModal';
import DeleteSongModal from './DeleteSongModal';
import SongDetailsModal from './SongDetailsModal';

const SongModals = () => {
  return (
    <>
      <CreateSongModal />
      <EditSongModal />
      <DeleteSongModal />
      <SongDetailsModal />
    </>
  );
};

export default SongModals;