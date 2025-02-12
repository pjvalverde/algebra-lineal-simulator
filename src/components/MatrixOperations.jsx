import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import * as MatrixOps from '../utils/matrixOperations.js';
import MatrixDisplay from './MatrixDisplay';

const MatrixOperations = ({ matrix }) => {
  const [result, setResult] = useState(null);
  const [operation, setOperation] = useState('');

  const handleOperation = (op) => {
    try {
      let res;
      switch(op) {
        case 'det':
          res = MatrixOps.determinant(matrix);
          setResult([[res]]);
          break;
        case 'scalar':
          res = MatrixOps.scalarMultiply(2, matrix); // multiplicar por 2 como ejemplo
          setResult(res);
          break;
        case 'rank':
          res = MatrixOps.rank(matrix);
          setResult([[res]]);
          break;
        default:
          setResult(null);
      }
      setOperation(op);
    } catch (error) {
      console.error(error);
      setResult(null);
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h6">Operaciones con Matrices</Typography>
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
            onClick={() => handleOperation('scalar')}
          >
            Multiplicar por 2
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            onClick={() => handleOperation('rank')}
          >
            Rango
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

export default MatrixOperations;