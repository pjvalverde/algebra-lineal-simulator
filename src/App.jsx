import React, { useState } from 'react';
import { Container, Box, ThemeProvider, CssBaseline, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import MatrixInput from './components/MatrixInput';
import MatrixDisplay from './components/MatrixDisplay';
import MatrixProperties from './components/MatrixProperties';
import MatrixOperations from './components/MatrixOperations';
import VectorOperations from './components/VectorOperations';
import MatrixCalculations from './components/MatrixCalculations';
import EigenvalueCalculations from './components/EigenvalueCalculations';
import * as MatrixOps from './utils/matrixOperations';

function App() {
  const [matrix, setMatrix] = useState(null);
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#000000',
        paper: '#121212'
      },
      text: {
        primary: '#ffffff',
        secondary: '#b3b3b3'
      },
      primary: {
        main: '#90caf9'
      },
      secondary: {
        main: '#ce93d8'
      }
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Box sx={{ my: 4 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ 
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 4,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            Simulador de Álgebra Lineal
          </Typography>

          <MatrixInput onMatrixChange={setMatrix} />
          
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
              <EigenvalueCalculations matrix={matrix} />
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;