import React, { useState } from 'react';
import { Container, Typography, Box, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import MatrixInput from './components/MatrixInput';
import MatrixDisplay from './components/MatrixDisplay';
import MatrixProperties from './components/MatrixProperties';
import MatrixOperations from './components/MatrixOperations';
import VectorOperations from './components/VectorOperations';
import * as MatrixOps from './utils/matrixOperations.js';
import MatrixCalculations from './components/MatrixCalculations';
import EigenvalueCalculations from './components/EigenvalueCalculations';

// Crear tema oscuro
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
});

function App() {
  const [matrix, setMatrix] = useState(null);

  const handleMatrixSubmit = (newMatrix) => {
    setMatrix(newMatrix);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ 
          my: 4,
          minHeight: '100vh',
          color: 'white'
        }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Simulador de Álgebra Lineal
          </Typography>
          
          <Typography variant="body1" gutterBottom>
            Ingrese una matriz o vector usando números separados por comas para las columnas
            y punto y coma para las filas.
          </Typography>

          <MatrixInput onMatrixSubmit={handleMatrixSubmit} />

          {matrix && (
            <>
              <MatrixDisplay matrix={matrix} title="Matriz Original" />
              <MatrixDisplay 
                matrix={MatrixOps.transpose(matrix)} 
                title="Matriz Transpuesta" 
              />
              <MatrixProperties matrix={matrix} />
              <MatrixOperations matrix={matrix} />
              <VectorOperations matrix={matrix} />
              <MatrixCalculations matrix={matrix} />
              <EigenvalueCalculations matrix={matrix} />  {/* Nuevo componente */}
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;