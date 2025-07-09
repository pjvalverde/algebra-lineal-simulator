import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import NavBar from './NavBar';
import HomePage from './LandingPage';
import AlgebraLinealPage from './AlgebraLinealPage';
import CalculoMultivariante from './CalculoMultivariante';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Box sx={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/algebra-lineal/*" element={<AlgebraLinealPage />} />
            <Route path="/calculo-multivariante/*" element={<CalculoMultivariante />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;