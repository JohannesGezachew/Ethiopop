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