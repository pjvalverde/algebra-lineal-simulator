import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
// Importar las imágenes locales
import planarImage from './images/planar2.png';
import curvilinearImage from './images/curvilinear2.png';

function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Simulador de Matemáticas Avanzadas
        </Typography>
        
        <Typography variant="h5" sx={{ mb: 6, color: 'text.secondary' }}>
          Explora conceptos de álgebra lineal y cálculo multivariante de forma interactiva
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="240"
                image={planarImage}
                alt="Álgebra Lineal"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Álgebra Lineal
                </Typography>
                <Typography>
                  Trabaja con matrices, vectores, espacios vectoriales, transformaciones lineales y más.
                  Resuelve sistemas de ecuaciones, calcula valores propios y explora aplicaciones prácticas.
                </Typography>
                <Button component={Link} to="/algebra-lineal" variant="contained" sx={{ mt: 2 }}>
                  Explorar Álgebra Lineal
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="240"
                image={curvilinearImage}
                alt="Cálculo Multivariante"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Cálculo Multivariante
                </Typography>
                <Typography>
                  Explora el espacio tridimensional, funciones vectoriales, derivadas parciales,
                  integrales múltiples y cálculo vectorial con visualizaciones interactivas.
                </Typography>
                <Button component={Link} to="/calculo-multivariante" variant="contained" sx={{ mt: 2 }}>
                  Explorar Cálculo Multivariante
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default HomePage;