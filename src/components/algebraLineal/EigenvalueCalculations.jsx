import React, { useState } from 'react';
import { Box, Button, Grid, Typography, Alert } from '@mui/material';
import * as MatrixOps from "../../utils/matrixOperations.js";
import MatrixDisplay from './MatrixDisplay';

const EigenvalueCalculations = ({ matrix }) => {
  const [result, setResult] = useState(null);
  const [operation, setOperation] = useState('');
  const [error, setError] = useState('');

  const handleOperation = (op) => {
    try {
      setError('');
      let res;
      switch(op) {
        case 'eigenvalues':
          res = MatrixOps.findEigenvalues(matrix);
          setResult([res.map(e => [e.real.toFixed(4) + (e.imag ? ` ${e.imag > 0 ? '+' : '-'} ${Math.abs(e.imag).toFixed(4)}i` : '')])]);
          break;
        case 'diagonalize':
          const { P, D } = MatrixOps.diagonalize(matrix);
          setResult({
            P: P,
            D: D,
            message: 'A = PDP⁻¹ donde:'
          });
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
      <Typography variant="h6">Valores y Vectores Propios</Typography>
      {error && <Alert severity="error" sx={{ my: 1 }}>{error}</Alert>}
      
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item>
          <Button 
            variant="contained" 
            onClick={() => handleOperation('eigenvalues')}
          >
            Valores Propios
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            onClick={() => handleOperation('diagonalize')}
          >
            Diagonalizar
          </Button>
        </Grid>
      </Grid>

      {result && (
        <Box sx={{ mt: 2 }}>
          {operation === 'eigenvalues' && (
            <>
              <Typography variant="subtitle1">Valores propios:</Typography>
              <MatrixDisplay matrix={result} />
            </>
          )}
          {operation === 'diagonalize' && (
            <>
              <Typography variant="subtitle1">{result.message}</Typography>
              <Typography variant="subtitle2">Matriz P (vectores propios):</Typography>
              <MatrixDisplay matrix={result.P} />
              <Typography variant="subtitle2">Matriz D (diagonal):</Typography>
              <MatrixDisplay matrix={result.D} />
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default EigenvalueCalculations;