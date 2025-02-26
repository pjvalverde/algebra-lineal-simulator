import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const MatrixDisplay = ({ matrix, title }) => {
  if (!matrix || !matrix.length) return null;

  return (
    <div style={{ margin: '1rem 0' }}>
      {title && <h3>{title}</h3>}
      <TableContainer component={Paper} style={{ display: 'inline-block' }}>
        <Table size="small">
          <TableBody>
            {matrix.map((row, i) => (
              <TableRow key={i}>
                {row.map((cell, j) => (
                  <TableCell key={j} align="center">{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MatrixDisplay;