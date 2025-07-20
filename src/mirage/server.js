import { createServer, Response } from 'miragejs';

// localStorage key for storing songs
const STORAGE_KEY = 'ethiopop_archive_songs';

// Default songs data
const getDefaultSongs = () => {
  const titles = [
    'Tizita', 'Ambassel', 'Yekermo Sew', 'Shemonmuanaye', 'Yegelle Tezeta',
    'Muziqawi Silt', 'Anchi Hoye', 'Yene Konjo', 'Almaz Yeharerwa',
    'Tew Semagn Hagere', 'Yefikir Woha', 'Sew Manen New', 'Yetim Hager',
    'Anchin Kal', 'Yene Habesha', 'Tilahun Gessesse', 'Aster Aweke',
    'Gigi Shibabaw', 'Teddy Afro', 'Ephrem Tamiru'
  ];

  const artists = [
    'Tilahun Gessesse', 'Aster Aweke', 'Mahmoud Ahmed', 'Alemayehu Eshete',
    'Mulatu Astatke', 'Gigi Shibabaw', 'Teddy Afro', 'Ephrem Tamiru',
    'Kassa Tessema', 'Bezawork Asfaw', 'Neway Debebe', 'Hirut Bekele',
    'Roha Band', 'Walias Band', 'Ibex Band', 'Kaifa Band'
  ];

  const albums = [
    'Golden Years', 'Ethiopian Hits', 'Tizita Collection', 'Modern Ethiopia',
    'Classic Sounds', 'Heritage Songs', 'New Generation', 'Traditional Melodies',
    'Contemporary Mix', 'Vintage Collection', 'Best of Ethiopia', 'Cultural Sounds'
  ];

  const genres = [
    'Traditional', 'Jazz', 'Pop', 'Folk', 'Reggae', 'Hip-Hop', 'R&B', 'Rock'
  ];

  const languages = ['Amharic', 'Tigrinya', 'Oromo', 'English'];

  const descriptions = [
    'A beautiful traditional Ethiopian song that captures the essence of nostalgia and longing, deeply rooted in Ethiopian musical heritage.',
    'An uplifting modern composition blending traditional Ethiopian melodies with contemporary arrangements, celebrating cultural identity.',
    'A soulful ballad expressing love and devotion, featuring traditional Ethiopian instruments and heartfelt vocals.',
    'A rhythmic celebration of Ethiopian culture, combining ancient musical traditions with modern production techniques.',
    'An emotional journey through Ethiopian history, told through powerful lyrics and traditional musical arrangements.',
    'A contemporary interpretation of classic Ethiopian folk music, bridging generations through timeless melodies.',
    'A spiritual composition reflecting Ethiopian Orthodox traditions, featuring traditional chants and modern harmonies.',
    'An energetic fusion of Ethiopian jazz and traditional music, showcasing the rich musical diversity of Ethiopia.',
    'A romantic ballad celebrating Ethiopian love stories, with poetic lyrics and beautiful instrumental arrangements.',
    'A patriotic anthem honoring Ethiopian heritage, combining traditional instruments with powerful vocal performances.',
    'A meditative piece inspired by Ethiopian landscapes, featuring ambient sounds and traditional melodies.',
    'A festive celebration song perfect for Ethiopian holidays and cultural gatherings, full of joy and energy.',
    'A contemplative composition exploring themes of identity and belonging in Ethiopian culture.',
    'A dynamic fusion piece blending Ethiopian traditional music with contemporary world music influences.',
    'A heartfelt tribute to Ethiopian mothers and families, featuring tender vocals and traditional accompaniment.'
  ];

  const youtubeUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    'https://youtu.be/kJQP7kiw5Fk',
    'https://www.youtube.com/watch?v=9bZkp7q19f0',
    '', // Empty for some songs
    'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
    '', // Empty for some songs
    'https://youtu.be/60ItHLz5WEA',
    'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    '', // Empty for some songs
    'https://www.youtube.com/watch?v=ZZ5LpwO-An4',
    'https://youtu.be/HEXWRTEbj1I',
    '', // Empty for some songs
    'https://www.youtube.com/watch?v=L_jWHffIx5E',
    'https://www.youtube.com/watch?v=kffacxfA7G4'
  ];

  return Array.from({ length: 20 }, (_, i) => ({
    id: `default-${i + 1}`,
    title: titles[i % titles.length],
    artist: artists[i % artists.length],
    album: albums[i % albums.length],
    year: Math.floor(Math.random() * (2024 - 1960) + 1960),
    genre: genres[i % genres.length],
    duration: Math.floor(Math.random() * 300 + 120),
    language: languages[i % languages.length],
    description: descriptions[i % descriptions.length],
    youtubeUrl: youtubeUrls[i % youtubeUrls.length],
    createdAt: new Date().toISOString(),
    isDefault: true // Mark as default song
  }));
};

// Storage utilities
const loadSongs = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to load songs from localStorage:', error);
  }

  // If no stored songs or error, return default songs
  const defaultSongs = getDefaultSongs();
  saveSongs(defaultSongs);
  return defaultSongs;
};

const saveSongs = (songs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
  } catch (error) {
    console.warn('Failed to save songs to localStorage:', error);
  }
};

const generateId = () => {
  return `song-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    routes() {
      this.namespace = 'api';

      // Get songs with pagination and filtering
      this.get('/songs', (schema, request) => {
        const { queryParams } = request;
        const page = parseInt(queryParams.page) || 1;
        const limit = parseInt(queryParams.limit) || 10;
        const search = queryParams.search || '';
        const artist = queryParams.artist || '';
        const album = queryParams.album || '';
        const year = queryParams.year || '';

        let songs = loadSongs();

        // Apply filters
        if (search) {
          songs = songs.filter(song =>
            song.title.toLowerCase().includes(search.toLowerCase()) ||
            song.artist.toLowerCase().includes(search.toLowerCase())
          );
        }
        if (artist) {
          songs = songs.filter(song =>
            song.artist.toLowerCase().includes(artist.toLowerCase())
          );
        }
        if (album) {
          songs = songs.filter(song =>
            song.album.toLowerCase().includes(album.toLowerCase())
          );
        }
        if (year) {
          songs = songs.filter(song => song.year.toString() === year);
        }

        const totalSongs = songs.length;
        const totalPages = Math.ceil(totalSongs / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedSongs = songs.slice(startIndex, endIndex);

        return {
          songs: paginatedSongs,
          currentPage: page,
          totalPages,
          totalSongs,
          pageSize: limit,
        };
      });

      // Create song
      this.post('/songs', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const songs = loadSongs();
        
        const newSong = {
          ...attrs,
          id: generateId(),
          createdAt: new Date().toISOString(),
          isDefault: false
        };
        
        songs.unshift(newSong); // Add to beginning of array
        saveSongs(songs);
        
        return newSong;
      });

      // Update song
      this.put('/songs/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const songs = loadSongs();
        
        const songIndex = songs.findIndex(song => song.id === id);
        if (songIndex === -1) {
          return new Response(404, {}, { error: 'Song not found' });
        }
        
        const updatedSong = {
          ...songs[songIndex],
          ...attrs,
          updatedAt: new Date().toISOString()
        };
        
        songs[songIndex] = updatedSong;
        saveSongs(songs);
        
        return updatedSong;
      });

      // Delete song
      this.delete('/songs/:id', (schema, request) => {
        const id = request.params.id;
        const songs = loadSongs();
        
        const songIndex = songs.findIndex(song => song.id === id);
        if (songIndex === -1) {
          return new Response(404, {}, { error: 'Song not found' });
        }
        
        songs.splice(songIndex, 1);
        saveSongs(songs);
        
        return new Response(204);
      });

      // Get single song
      this.get('/songs/:id', (schema, request) => {
        const id = request.params.id;
        const songs = loadSongs();
        
        const song = songs.find(song => song.id === id);
        if (!song) {
          return new Response(404, {}, { error: 'Song not found' });
        }
        
        return song;
      });
    },
  });
}