import React, { useState } from 'react';
import { Box, Button, Grid, Typography, Alert } from '@mui/material';
import * as VectorOps from '../utils/vectorOperations.js';
import MatrixDisplay from './MatrixDisplay';

const VectorOperations = ({ matrix }) => {
  const [result, setResult] = useState(null);
  const [operation, setOperation] = useState('');
  const [error, setError] = useState('');

  const isVector = matrix && (matrix.length === 1 || matrix[0].length === 1);

  const handleOperation = (op) => {
    try {
      setError('');
      if (!isVector) {
        setError('La entrada debe ser un vector (una fila o una columna)');
        return;
      }

      let res;
      switch(op) {
        case 'norm':
          res = VectorOps.vectorNorm(matrix);
          setResult([[res]]);
          break;
        case 'normalize':
          res = [VectorOps.normalizeVector(matrix)];
          setResult(res);
          break;
        case 'dot':
          // Ejemplo de producto punto con el mismo vector
          res = VectorOps.dotProduct(matrix, matrix);
          setResult([[res]]);
          break;
        case 'cross':
          if (matrix.flat().length !== 3) {
            throw new Error('El producto cruz solo está definido para vectores 3D');
          }
          res = [VectorOps.crossProduct(matrix, matrix)];
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
      <Typography variant="h6">Operaciones con Vectores</Typography>
      {error && <Alert severity="error" sx={{ my: 1 }}>{error}</Alert>}
      
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item>
          <Button 
            variant="contained" 
            onClick={() => handleOperation('norm')}
            disabled={!isVector}
          >
            Norma
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            onClick={() => handleOperation('normalize')}
            disabled={!isVector}
          >
            Normalizar
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            onClick={() => handleOperation('dot')}
            disabled={!isVector}
          >
            Producto Punto
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            onClick={() => handleOperation('cross')}
            disabled={!isVector}
          >
            Producto Cruz
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

export default VectorOperations;