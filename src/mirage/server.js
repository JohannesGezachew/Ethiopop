import { createServer, Model, Factory, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      song: Model,
    },

    factories: {
      song: Factory.extend({
        title(i) {
          const titles = [
            'Tizita', 'Ambassel', 'Yekermo Sew', 'Shemonmuanaye', 'Yegelle Tezeta',
            'Muziqawi Silt', 'Anchi Hoye', 'Yene Konjo', 'Almaz Yeharerwa',
            'Tew Semagn Hagere', 'Yefikir Woha', 'Sew Manen New', 'Yetim Hager',
            'Anchin Kal', 'Yene Habesha', 'Tilahun Gessesse', 'Aster Aweke',
            'Gigi Shibabaw', 'Teddy Afro', 'Ephrem Tamiru'
          ];
          return titles[i % titles.length];
        },
        artist(i) {
          const artists = [
            'Tilahun Gessesse', 'Aster Aweke', 'Mahmoud Ahmed', 'Alemayehu Eshete',
            'Mulatu Astatke', 'Gigi Shibabaw', 'Teddy Afro', 'Ephrem Tamiru',
            'Kassa Tessema', 'Bezawork Asfaw', 'Neway Debebe', 'Hirut Bekele',
            'Roha Band', 'Walias Band', 'Ibex Band', 'Kaifa Band'
          ];
          return artists[i % artists.length];
        },
        album(i) {
          const albums = [
            'Golden Years', 'Ethiopian Hits', 'Tizita Collection', 'Modern Ethiopia',
            'Classic Sounds', 'Heritage Songs', 'New Generation', 'Traditional Melodies',
            'Contemporary Mix', 'Vintage Collection', 'Best of Ethiopia', 'Cultural Sounds'
          ];
          return albums[i % albums.length];
        },
        year() {
          return Math.floor(Math.random() * (2024 - 1960) + 1960);
        },
        genre(i) {
          const genres = [
            'Traditional', 'Jazz', 'Pop', 'Folk', 'Reggae', 'Hip-Hop', 'R&B', 'Rock'
          ];
          return genres[i % genres.length];
        },
        duration() {
          return Math.floor(Math.random() * 300 + 120); // 2-7 minutes in seconds
        },
        language(i) {
          const languages = ['Amharic', 'Tigrinya', 'Oromo', 'English'];
          return languages[i % languages.length];
        },
        description(i) {
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
          return descriptions[i % descriptions.length];
        },
        youtubeUrl(i) {
          // Some songs have YouTube URLs, others don't (to simulate real data)
          const urls = [
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
          return urls[i % urls.length];
        }
      }),
    },

    seeds(server) {
      server.createList('song', 50);
    },

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

        let songs = schema.songs.all().models;

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
        return schema.songs.create(attrs);
      });

      // Update song
      this.put('/songs/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const song = schema.songs.find(id);
        return song.update(attrs);
      });

      // Delete song
      this.delete('/songs/:id', (schema, request) => {
        const id = request.params.id;
        const song = schema.songs.find(id);
        song.destroy();
        return new Response(204);
      });

      // Get single song
      this.get('/songs/:id', (schema, request) => {
        const id = request.params.id;
        return schema.songs.find(id);
      });
    },
  });
}