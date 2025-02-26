import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import * as MatrixOps from "../../utils/matrixOperations.js";

const MatrixInput = ({ onMatrixChange }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleProcess = () => {
    try {
      setError('');
      const matrix = MatrixOps.parseMatrix(input);
      onMatrixChange(matrix);
    } catch (err) {
      setError('Formato inválido. Use números separados por comas y filas separadas por punto y coma.');
    }
  };

  return (
    <Box>
      <TextField
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ingrese la matriz (ejemplo: 1,2; 3,4)"
        sx={{ mb: 2 }}
      />
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Button 
        variant="contained" 
        onClick={handleProcess}
      >
        Procesar Matriz
      </Button>
    </Box>
  );
};

export default MatrixInput;