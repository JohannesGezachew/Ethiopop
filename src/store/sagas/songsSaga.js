import { call, put, takeEvery, select } from 'redux-saga/effects';
import {
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
} from '../slices/songsSlice';
import { addNotification } from '../slices/uiSlice';
import * as songsApi from '@utils/api';

function* fetchSongsSaga(action) {
  try {
    const { page, pageSize, filters } = action.payload || {};
    const response = yield call(songsApi.fetchSongs, { page, pageSize, filters });
    yield put(fetchSongsSuccess(response));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
    yield put(addNotification({
      type: 'error',
      message: 'Failed to fetch songs',
    }));
  }
}

function* createSongSaga(action) {
  try {
    const newSong = yield call(songsApi.createSong, action.payload);
    yield put(createSongSuccess(newSong));
    yield put(addNotification({
      type: 'success',
      message: 'Song created successfully',
    }));
    
    // Refresh the songs list after creating a new song
    const currentState = yield select();
    const { currentPage, pageSize, filters } = currentState.songs;
    yield put(fetchSongsRequest({ page: currentPage, pageSize, filters }));
  } catch (error) {
    yield put(createSongFailure(error.message));
    yield put(addNotification({
      type: 'error',
      message: 'Failed to create song',
    }));
  }
}

function* updateSongSaga(action) {
  try {
    const updatedSong = yield call(songsApi.updateSong, action.payload.id, action.payload.data);
    yield put(updateSongSuccess(updatedSong));
    yield put(addNotification({
      type: 'success',
      message: 'Song updated successfully',
    }));
    
    // Refresh the songs list after updating a song
    const currentState = yield select();
    const { currentPage, pageSize, filters } = currentState.songs;
    yield put(fetchSongsRequest({ page: currentPage, pageSize, filters }));
  } catch (error) {
    yield put(updateSongFailure(error.message));
    yield put(addNotification({
      type: 'error',
      message: 'Failed to update song',
    }));
  }
}

function* deleteSongSaga(action) {
  try {
    yield call(songsApi.deleteSong, action.payload);
    yield put(deleteSongSuccess(action.payload));
    yield put(addNotification({
      type: 'success',
      message: 'Song deleted successfully',
    }));
    
    // Refresh the songs list after deleting a song
    const currentState = yield select();
    const { currentPage, pageSize, filters } = currentState.songs;
    yield put(fetchSongsRequest({ page: currentPage, pageSize, filters }));
  } catch (error) {
    yield put(deleteSongFailure(error.message));
    yield put(addNotification({
      type: 'error',
      message: 'Failed to delete song',
    }));
  }
}

export default function* songsSaga() {
  yield takeEvery(fetchSongsRequest.type, fetchSongsSaga);
  yield takeEvery(createSongRequest.type, createSongSaga);
  yield takeEvery(updateSongRequest.type, updateSongSaga);
  yield takeEvery(deleteSongRequest.type, deleteSongSaga);
}