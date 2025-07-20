# Ethiopop Archive 🎵

A modern, full-stack web application for managing Ethiopian music collections. Built with React, Redux Toolkit, Redux-Saga, and Emotion for a clean, responsive user experience.

## 🚀 Features

- **Complete CRUD Operations**: Create, read, update, and delete song records
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
- **Webpack 5** - Custom configuration
- **Babel** - JavaScript transpilation
- **Custom Loaders** - SVG and image processing

### Backend
- **MirageJS** - Mock API server for development

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <https://github.com/JohannesGezachew/Ethiopop.git>
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

This custom Webpack 5 setup provides a complete build system without Create React App, offering full control over the build process and optimization strategies.

### Core Configuration Features

#### **Module Resolution & Aliases**
```javascript
resolve: {
  extensions: ['.js', '.jsx', '.json'],
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@store': path.resolve(__dirname, 'src/store'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@styles': path.resolve(__dirname, 'src/styles'),
  },
}
```
- **Clean imports**: Use `@components/Button` instead of `../../../components/Button`
- **Maintainable paths**: Easy refactoring and consistent import structure
- **IDE support**: Better autocomplete and navigation

#### **Custom File Processing Rules**

**CSS Module Processing with PostCSS:**
```javascript
{
  test: /\.module\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[name]__[local]--[hash:base64:5]',
        },
        importLoaders: 1,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            ['autoprefixer', {}],
            ['cssnano', { preset: 'default' }],
          ],
        },
      },
    },
  ],
}
```
- **Scoped styling**: CSS modules prevent style conflicts
- **Automatic prefixing**: Cross-browser compatibility with autoprefixer
- **Optimization**: CSS minification and optimization in production
- **Development experience**: Readable class names during development

#### **Environment Variables Integration**
```javascript
new Dotenv({
  path: './.env',
  safe: true,
  systemvars: true,
  silent: true,
})
```
**Configured Variables:**
- `API_BASE_URL`: Backend API endpoint configuration
- `NODE_ENV`: Environment mode (development/production)
- **Safe loading**: Validates required environment variables
- **System integration**: Supports system environment variables

#### **Development Server Configuration**
```javascript
devServer: {
  static: { directory: path.join(__dirname, 'public') },
  compress: true,
  port: 3002,
  hot: true,
  historyApiFallback: true,
  open: true,
}
```
- **Hot Module Replacement**: Instant updates without page refresh
- **History API support**: Proper routing for single-page applications
- **Compression**: Gzip compression for faster development
- **Auto-open**: Automatically opens browser on start

#### **Production Optimizations**
```javascript
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
    },
  },
}
```
- **Code splitting**: Separates vendor and application code
- **Caching strategy**: Optimized for browser caching
- **Bundle analysis**: Clear separation for performance monitoring

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

## 🤖 AI-Generated Components

The following parts of this project were generated with AI assistance:

- **Placeholder data**: Sample Ethiopian songs with descriptions, artists, and metadata
- **UI fixes and styling adjustments**: Button styling improvements, spacing corrections, and visual enhancements
- **Component boilerplate**: Basic structure templates for forms and modals
- **SVG favicon**: Modern musical note favicon with gradient design and scalable vector graphics
- **Mobile responsive improvements**: Mobile-first responsive design implementation, mobile card layouts, and touch-friendly interface optimizations
- **Documentation**: This README file structure and formatting

All core application logic, feature implementations, architectural decisions, and business functionality were developed manually, with occasional use of Curser Tab.

## 🧪 Code Verification & Testing

### Manual Testing Approach
The application functionality was verified through comprehensive manual testing:

**CRUD Operations Testing:**
- ✅ Created multiple songs with various data combinations
- ✅ Verified form validation with invalid inputs (empty fields, invalid URLs)
- ✅ Tested edit functionality with data persistence across form fields
- ✅ Confirmed delete operations with proper confirmation dialogs
- ✅ Validated localStorage persistence across browser sessions and page reloads

**UI/UX Verification:**
- ✅ Tested responsive design across different screen sizes (mobile, tablet, desktop)
- ✅ Verified button interactions and hover states for visual feedback
- ✅ Validated modal functionality (open/close, form submission, escape key handling)
- ✅ Tested pagination controls with different page sizes and navigation
- ✅ Confirmed filter functionality with various search combinations

**Visual Code Review:**
- ✅ Inspected component structure for proper React patterns and hooks usage
- ✅ Verified Redux state management flow and action dispatching
- ✅ Reviewed styling consistency and theme integration across components
- ✅ Validated proper error handling and loading states
- ✅ Confirmed accessibility features (focus states, keyboard navigation)

**Browser Compatibility:**
- ✅ Tested in Chrome,
- ✅ Confirmed responsive design behavior on various devices

### Debugging Process
- **Redux DevTools**: Used for monitoring state changes and action dispatching
- **Browser Developer Tools**: Inspected DOM structure, network requests, and console logs
- **Component Props Debugging**: Verified data flow between parent and child components
- **localStorage Inspection**: Manually verified data persistence and structure

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


---

**Built with ❤️ love**