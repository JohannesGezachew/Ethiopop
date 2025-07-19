# Ethiopop Archive 🎵

A modern, full-stack web application for managing Ethiopian music collections. Built with React, Redux Toolkit, Redux-Saga, and Emotion for a clean, responsive user experience.

## 🚀 Features

- **Complete CRUD Operations**: Create, read, update, and delete song records
- **Dual View Modes**: Switch between table and grid layouts
- **Advanced Filtering**: Search by title, artist, album, and year
- **Pagination**: Efficient data loading with customizable page sizes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Notifications**: User feedback for all operations
- **Modern UI**: Clean design with shadcn/ui inspired components

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern functional components with hooks
- **Redux Toolkit** - Predictable state management
- **Redux-Saga** - Side effect management for API calls
- **Emotion** - CSS-in-JS styling with theme support
- **Styled System** - Consistent design system

### Build Tools
- **Webpack 5** - Custom configuration (no Create React App)
- **Babel** - JavaScript transpilation
- **Custom Loaders** - SVG and image processing

### Backend
- **MirageJS** - Mock API server for development

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ethiopop-archive
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Webpack Configuration

Our custom Webpack setup includes:

### Key Features
- **Module Resolution**: Path aliases for clean imports (`@components`, `@store`, `@utils`)
- **Asset Processing**: Custom loaders for images and SVGs
- **Environment Variables**: `dotenv-webpack` for configuration management
- **Development Server**: Hot reload with history API fallback
- **Production Optimization**: Code splitting and minification

### Custom Loaders
```javascript
// SVG Processing
{
  test: /\.svg$/,
  use: ['@svgr/webpack', 'file-loader']
}

// Image Optimization
{
  test: /\.(png|jpe?g|gif|webp)$/i,
  type: 'asset/resource'
}
```

### Environment Variables
- `API_BASE_URL`: Backend API endpoint
- `NODE_ENV`: Environment mode

## 🎯 API Endpoints

### Songs API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/songs` | Fetch songs with pagination and filters |
| POST | `/api/songs` | Create a new song |
| PUT | `/api/songs/:id` | Update an existing song |
| DELETE | `/api/songs/:id` | Delete a song |

### Query Parameters
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search in title and artist
- `artist`: Filter by artist name
- `album`: Filter by album name
- `year`: Filter by release year

### Response Format
```json
{
  "songs": [...],
  "currentPage": 1,
  "totalPages": 5,
  "totalSongs": 50,
  "pageSize": 10
}
```

## 🏗 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.js
│   │   └── Layout.js
│   ├── SongManager/
│   │   ├── SongManager.js
│   │   ├── SongHeader.js
│   │   ├── SongFilters.js
│   │   ├── SongTable.js
│   │   ├── SongGrid.js
│   │   ├── Pagination.js
│   │   ├── SongModals.js
│   │   ├── CreateSongModal.js
│   │   ├── EditSongModal.js
│   │   ├── DeleteSongModal.js
│   │   └── SongForm.js
│   └── UI/
│       ├── Button.js
│       ├── Card.js
│       ├── Input.js
│       ├── Modal.js
│       └── Notifications.js
├── store/
│   ├── store.js
│   ├── slices/
│   │   ├── songsSlice.js
│   │   └── uiSlice.js
│   └── sagas/
│       ├── rootSaga.js
│       └── songsSaga.js
├── styles/
│   ├── theme.js
│   └── GlobalStyles.js
├── utils/
│   └── api.js
├── mirage/
│   └── server.js
├── App.js
└── index.js
```

## 🎨 Design System

### Theme Configuration
- **Colors**: Primary (orange), secondary (green), gray scale
- **Typography**: System fonts with consistent sizing
- **Spacing**: 8px base unit system
- **Breakpoints**: Mobile-first responsive design
- **Shadows**: Layered elevation system

### Component Architecture
- **Atomic Design**: Reusable UI components
- **Consistent Props**: Standardized component APIs
- **Theme Integration**: All components use theme values
- **Accessibility**: Focus states and keyboard navigation

## 🔄 State Management

### Redux Store Structure
```javascript
{
  songs: {
    songs: [],
    currentPage: 1,
    totalPages: 1,
    totalSongs: 0,
    pageSize: 10,
    loading: false,
    error: null,
    selectedSong: null,
    filters: { search: '', artist: '', album: '', year: '' }
  },
  ui: {
    isCreateModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    viewMode: 'table',
    theme: 'light',
    notifications: []
  }
}
```

### Redux-Saga Flow
1. **Action Dispatch**: Component dispatches action
2. **Saga Intercept**: Saga catches action and handles side effects
3. **API Call**: Saga makes HTTP request
4. **State Update**: Success/failure actions update store
5. **UI Update**: Components re-render with new state

## 📱 Responsive Design

- **Mobile First**: Optimized for small screens
- **Flexible Layouts**: CSS Grid and Flexbox
- **Touch Friendly**: Appropriate button sizes
- **Adaptive Content**: Table converts to cards on mobile

## 🧪 Development Workflow

### Git Commit Strategy
- **Atomic Commits**: Single feature per commit
- **Descriptive Messages**: Clear commit descriptions
- **Chronological Development**: Realistic development timeline
- **Feature Branches**: Organized development flow

### Code Quality
- **ESLint**: Code linting and formatting
- **Component Patterns**: Consistent React patterns
- **Error Handling**: Comprehensive error management
- **Performance**: Optimized rendering and state updates

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Setup
1. Set production environment variables
2. Configure API endpoints
3. Optimize assets and bundles
4. Deploy to hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Ethiopian music community for inspiration
- React and Redux teams for excellent tools
- Open source contributors

---

**Built with ❤️ for Ethiopian music lovers**