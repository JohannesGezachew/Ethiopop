import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export const fetchSongs = async ({ page = 1, pageSize = 10, filters = {} } = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: pageSize.toString(),
    ...Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value && value.trim() !== '')
    ),
  });
  
  const url = `/songs?${params}`;
  console.log('Fetching songs from:', API_BASE_URL + url);
  
  try {
    const result = await api.get(url);
    console.log('Songs fetched successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to fetch songs:', error);
    throw error;
  }
};

export const createSong = async (songData) => {
  return api.post('/songs', songData);
};

export const updateSong = async (id, songData) => {
  return api.put(`/songs/${id}`, songData);
};

export const deleteSong = async (id) => {
  return api.delete(`/songs/${id}`);
};

export const getSong = async (id) => {
  return api.get(`/songs/${id}`);
};