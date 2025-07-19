import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/theme';
import { GlobalStyles } from '@styles/GlobalStyles';
import Layout from '@components/Layout/Layout';
import SongManager from '@components/SongManager/SongManager';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <SongManager />
      </Layout>
    </ThemeProvider>
  );
}

export default App;