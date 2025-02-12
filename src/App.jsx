import React, { useState } from 'react';
import { Container, Box, ThemeProvider, CssBaseline } from '@mui/material';
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
      mode: 'dark'
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
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