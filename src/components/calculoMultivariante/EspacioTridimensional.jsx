import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

function EspacioTridimensional() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Espacio Tridimensional
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography paragraph>
          En esta sección puedes explorar conceptos del espacio tridimensional,
          como sistemas de coordenadas, vectores en R³, y superficies.
        </Typography>
        {/* Aquí irá el contenido interactivo del espacio 3D */}
        <Box sx={{ height: '400px', bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
          [Visualización 3D se mostrará aquí]
        </Box>
      </Paper>
    </Box>
  );
}

export default EspacioTridimensional;