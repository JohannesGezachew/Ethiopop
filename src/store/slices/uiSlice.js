import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCreateModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  isSongDetailsModalOpen: false,
  notifications: [],
  selectedSong: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openCreateModal: (state) => {
      state.isCreateModalOpen = true;
    },
    closeCreateModal: (state) => {
      state.isCreateModalOpen = false;
    },
    openEditModal: (state) => {
      state.isEditModalOpen = true;
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
    },
    openDeleteModal: (state) => {
      state.isDeleteModalOpen = true;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
    },
    openSongDetailsModal: (state, action) => {
      state.isSongDetailsModalOpen = true;
      state.selectedSong = action.payload;
    },
    closeSongDetailsModal: (state) => {
      state.isSongDetailsModalOpen = false;
      state.selectedSong = null;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
  },
});

export const {
  openCreateModal,
  closeCreateModal,
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal,
  openSongDetailsModal,
  closeSongDetailsModal,
  addNotification,
  removeNotification,
} = uiSlice.actions;

export default uiSlice.reducer;