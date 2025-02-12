import React, { useState } from 'react';
import { Box, Button, Grid, Typography, Alert } from '@mui/material';
import * as MatrixOps from '../utils/matrixOperations.js';
import MatrixDisplay from './MatrixDisplay';

const MatrixCalculations = ({ matrix }) => {
  const [result, setResult] = useState(null);
  const [operation, setOperation] = useState('');
  const [error, setError] = useState('');

  const handleOperation = (op) => {
    try {
      setError('');
      let res;
      switch(op) {
        case 'det':
          res = MatrixOps.determinant(matrix);
          setResult([[res]]);
          break;
        case 'gauss':
          res = MatrixOps.gaussJordan(matrix);
          setResult(res);
          break;
        case 'add':
          // Ejemplo: sumar la matriz consigo misma
          res = MatrixOps.addMatrices(matrix, matrix);
          setResult(res);
          break;
        case 'multiply':
          // Ejemplo: multiplicar la matriz consigo misma
          res = MatrixOps.multiplyMatrices(matrix, matrix);
          setResult(res);
          break;
        default:
          setResult(null);
      }
      setOperation(op);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setResult(null);
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h6">Cálculos con Matrices</Typography>
      {error && <Alert severity="error" sx={{ my: 1 }}>{error}</Alert>}
      
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item>
          <Button 
            variant="contained" 
            onClick={() => handleOperation('det')}
          >
            Determinante
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            onClick={() => handleOperation('gauss')}
          >
            Gauss-Jordan
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            onClick={() => handleOperation('add')}
          >
            A + A
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            onClick={() => handleOperation('multiply')}
          >
            A × A
          </Button>
        </Grid>
      </Grid>

      {result && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">
            Resultado de {operation}:
          </Typography>
          <MatrixDisplay matrix={result} />
        </Box>
      )}
    </Box>
  );
};

export default MatrixCalculations;