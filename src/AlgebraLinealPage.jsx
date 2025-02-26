import React from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MatrizCalculadora from './components/algebraLineal/MatrizCalculadora';
import VectorVisualizer from './components/algebraLineal/VectorVisualizer';
import SistemaEcuaciones from './components/algebraLineal/SistemaEcuaciones';
import EspaciosVectoriales from './components/algebraLineal/EspaciosVectoriales';
import TransformacionesLineales from './components/algebraLineal/TransformacionesLineales';

// Componentes temporales para cada sección
function Matrices() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Matrices</Typography>
      <Typography paragraph>
        En esta sección se realizarán operaciones con matrices: suma, resta, 
        multiplicación, inversión, determinantes y más.
      </Typography>
      <MatrizCalculadora />
    </Box>
  );
}

function Vectores() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Vectores</Typography>
      <Typography paragraph>
        Aquí se implementarán operaciones con vectores, producto escalar,
        producto vectorial, proyecciones y otros conceptos.
      </Typography>
      <VectorVisualizer />
    </Box>
  );
}

function SistemasEcuaciones() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Sistemas de Ecuaciones</Typography>
      <Typography paragraph>
        En esta sección se resolverán sistemas de ecuaciones lineales mediante
        diferentes métodos: eliminación gaussiana, Gauss-Jordan, etc.
      </Typography>
      <SistemaEcuaciones />
    </Box>
  );
}

function EspaciosVectorialesPage() {
  return (
    <Box>
      <EspaciosVectoriales />
    </Box>
  );
}

function TransformacionesLinealesPage() {
  return (
    <Box>
      <TransformacionesLineales />
    </Box>
  );
}

function AlgebraLinealPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  
  const paths = [
    '/algebra-lineal/matrices',
    '/algebra-lineal/vectores',
    '/algebra-lineal/sistemas-ecuaciones',
    '/algebra-lineal/espacios-vectoriales',
    '/algebra-lineal/transformaciones-lineales'
  ];
  
  React.useEffect(() => {
    const index = paths.findIndex(path => location.pathname.startsWith(path));
    if (index !== -1) {
      setValue(index);
    } else if (location.pathname === '/algebra-lineal') {
      navigate(paths[0]);
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(paths[newValue]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Álgebra Lineal
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={value} onChange={handleChange} aria-label="temas de álgebra lineal">
          <Tab label="Matrices" />
          <Tab label="Vectores" />
          <Tab label="Sistemas de Ecuaciones" />
          <Tab label="Espacios Vectoriales" />
          <Tab label="Transformaciones Lineales" />
        </Tabs>
      </Box>

      <Routes>
        <Route path="/matrices" element={<Matrices />} />
        <Route path="/vectores" element={<Vectores />} />
        <Route path="/sistemas-ecuaciones" element={<SistemasEcuaciones />} />
        <Route path="/espacios-vectoriales" element={<EspaciosVectorialesPage />} />
        <Route path="/transformaciones-lineales" element={<TransformacionesLinealesPage />} />
      </Routes>
    </Box>
  );
}

export default AlgebraLinealPage;
