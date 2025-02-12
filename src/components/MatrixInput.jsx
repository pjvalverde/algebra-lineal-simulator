import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';

const MatrixInput = ({ onMatrixSubmit }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    try {
      const rows = input.trim().split(';');
      const matrix = rows.map(row => 
        row.trim().split(',').map(num => {
          const parsed = parseFloat(num.trim());
          if (isNaN(parsed)) throw new Error('Entrada inválida');
          return parsed;
        })
      );
      
      const width = matrix[0].length;
      if (!matrix.every(row => row.length === width)) {
        throw new Error('Todas las filas deben tener la misma longitud');
      }
      
      setError('');
      onMatrixSubmit(matrix);
    } catch (err) {
      setError('Formato inválido. Use números separados por comas y filas separadas por punto y coma.');
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ejemplo: 1,2,3; 4,5,6; 7,8,9"
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
          '& .MuiInputBase-input': {
            color: 'white',
          },
        }}
      />
      {error && <Alert severity="error" sx={{ my: 1 }}>{error}</Alert>}
      <Button 
        variant="contained" 
        onClick={handleSubmit}
        sx={{ mt: 1 }}
      >
        Procesar Matriz
      </Button>
    </Box>
  );
};

export default MatrixInput;