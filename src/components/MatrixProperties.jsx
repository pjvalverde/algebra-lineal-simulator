import React from 'react';
import { List, ListItem, ListItemText, Paper } from '@mui/material';
import * as MatrixOps from '../utils/matrixOperations.js';

const MatrixProperties = ({ matrix }) => {
  if (!matrix) return null;

  const properties = [
    { name: 'Matriz Nula', check: MatrixOps.isNullMatrix(matrix) },
    { name: 'Matriz Identidad', check: MatrixOps.isIdentity(matrix) },
    { name: 'Matriz Diagonal', check: MatrixOps.isDiagonal(matrix) },
    { name: 'Matriz Triangular Superior', check: MatrixOps.isUpperTriangular(matrix) },
    { name: 'Matriz Triangular Inferior', check: MatrixOps.isLowerTriangular(matrix) },
    { name: 'Matriz Hermitiana', check: MatrixOps.isHermitian(matrix) }
  ];

  return (
    <Paper sx={{ p: 2, my: 2 }}>
      <h3>Propiedades de la Matriz</h3>
      <List>
        {properties.map((prop, index) => (
          <ListItem key={index}>
            <ListItemText 
              primary={`${prop.name}: ${prop.check ? 'Sí' : 'No'}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default MatrixProperties;