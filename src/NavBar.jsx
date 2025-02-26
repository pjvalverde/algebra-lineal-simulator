import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Simulador Matemático
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Inicio
        </Button>
        <Button color="inherit" component={Link} to="/algebra-lineal">
          Álgebra Lineal
        </Button>
        <Button color="inherit" component={Link} to="/calculo-multivariante">
          Cálculo Multivariante
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;