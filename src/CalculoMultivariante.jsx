import React from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Importar el componente EspacioTridimensional desde su ubicación correcta
import EspacioTridimensional from './components/calculoMultivariante/EspacioTridimensional';
// Importar el nuevo componente para Cálculo en una dimensión
import CalculoUnaDimension from './components/calculoMultivariante/CalculoUnaDimension';
import IntegralesMultiples from './components/calculoMultivariante/IntegralesMultiples';

// Componentes temporales para cada sección
function FuncionesVectoriales() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Funciones Vectoriales</Typography>
      <Typography paragraph>
        En esta sección se representarán funciones vectoriales, curvas paramétricas,
        y conceptos relacionados con el cálculo vectorial.
      </Typography>
    </Box>
  );
}

function DerivadasParciales() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Derivadas Parciales</Typography>
      <Typography paragraph>
        Aquí se visualizarán derivadas parciales, gradientes, y aplicaciones
        como planos tangentes y aproximaciones lineales.
      </Typography>
    </Box>
  );
}

function CalculoVectorial() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Cálculo Vectorial</Typography>
      <Typography paragraph>
        Aquí se implementarán visualizaciones de campos vectoriales,
        integrales de línea, teorema de Green, teorema de Stokes y más.
      </Typography>
    </Box>
  );
}

function CalculoMultivariante() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  
  const paths = [
    '/calculo-multivariante/calculo-1d',
    '/calculo-multivariante/espacio-3d',
    '/calculo-multivariante/funciones-vectoriales',
    '/calculo-multivariante/derivadas-parciales',
    '/calculo-multivariante/integrales-multiples',
    '/calculo-multivariante/calculo-vectorial'
  ];
  
  React.useEffect(() => {
    const index = paths.findIndex(path => location.pathname.startsWith(path));
    if (index !== -1) {
      setValue(index);
    } else if (location.pathname === '/calculo-multivariante') {
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
        Cálculo Multivariante
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={value} onChange={handleChange} aria-label="temas de cálculo multivariante">
          <Tab label="Cálculo en 1D" />
          <Tab label="Espacio 3D" />
          <Tab label="Funciones Vectoriales" />
          <Tab label="Derivadas Parciales" />
          <Tab label="Integrales Múltiples" />
          <Tab label="Cálculo Vectorial" />
        </Tabs>
      </Box>

      <Routes>
        <Route path="/calculo-1d" element={<CalculoUnaDimension />} />
        <Route path="/espacio-3d" element={<EspacioTridimensional />} />
        <Route path="/funciones-vectoriales" element={<FuncionesVectoriales />} />
        <Route path="/derivadas-parciales" element={<DerivadasParciales />} />
        <Route path="/integrales-multiples" element={<IntegralesMultiples />} />
        <Route path="/calculo-vectorial" element={<CalculoVectorial />} />
      </Routes>
    </Box>
  );
}

export default CalculoMultivariante;