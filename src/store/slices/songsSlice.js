import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs: [],
  currentPage: 1,
  totalPages: 1,
  totalSongs: 0,
  pageSize: 10,
  loading: false,
  error: null,
  selectedSong: null,
  filters: {
    search: '',
    artist: '',
    album: '',
    year: '',
  },
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    // Fetch songs actions
    fetchSongsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.songs = action.payload.songs;
      state.totalPages = action.payload.totalPages;
      state.totalSongs = action.payload.totalSongs;
      state.currentPage = action.payload.currentPage;
    },
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create song actions
    createSongRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createSongSuccess: (state, action) => {
      state.loading = false;
      state.songs.unshift(action.payload);
      state.totalSongs += 1;
    },
    createSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update song actions
    updateSongRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess: (state, action) => {
      state.loading = false;
      const index = state.songs.findIndex(song => song.id === action.payload.id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
    },
    updateSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete song actions
    deleteSongRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess: (state, action) => {
      state.loading = false;
      state.songs = state.songs.filter(song => song.id !== action.payload);
      state.totalSongs -= 1;
    },
    deleteSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // UI actions
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
    setSelectedSong: (state, action) => {
      state.selectedSong = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  setCurrentPage,
  setPageSize,
  setFilters,
  setSelectedSong,
  clearError,
} = songsSlice.actions;

export default songsSlice.reducer;