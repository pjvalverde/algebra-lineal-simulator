import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import * as MatrixOps from '../utils/matrixOperations';

const MatrixInput = ({ onMatrixChange }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleProcess = () => {
    try {
      setError('');
      // Limpia la entrada de espacios extras
      const cleanInput = input.trim();
      
      // Verifica si el formato es correcto
      if (!cleanInput.includes(';') && !cleanInput.includes(',')) {
        throw new Error('Formato inválido. Use números separados por comas y filas separadas por punto y coma. Ejemplo: 1,2; 3,4');
      }

      // Procesa la matriz
      const matrix = MatrixOps.parseMatrix(cleanInput);
      
      // Verifica que la matriz sea válida
      if (!matrix || matrix.length === 0 || matrix.some(row => row.length !== matrix[0].length)) {
        throw new Error('Matriz inválida. Todas las filas deben tener el mismo número de columnas.');
      }

      // Verifica que todos los elementos sean números
      if (matrix.some(row => row.some(val => isNaN(val)))) {
        throw new Error('La matriz solo debe contener números.');
      }

      onMatrixChange(matrix);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ingrese la matriz (ejemplo: 1,2; 3,4)"
        sx={{ mb: 2, bgcolor: 'background.paper' }}
      />
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Button 
        variant="contained" 
        onClick={handleProcess}
        sx={{ bgcolor: 'primary.main' }}
      >
        Procesar Matriz
      </Button>
    </Box>
  );
};

export default MatrixInput;