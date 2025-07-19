import React from 'react';
import CreateSongModal from './CreateSongModal';
import EditSongModal from './EditSongModal';
import DeleteSongModal from './DeleteSongModal';

const SongModals = () => {
  return (
    <>
      <CreateSongModal />
      <EditSongModal />
      <DeleteSongModal />
    </>
  );
};

export default SongModals;