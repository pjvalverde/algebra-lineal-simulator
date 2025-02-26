import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Typography, 
  Slider,
  FormControlLabel,
  Switch
} from '@mui/material';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Line,
  LineChart
} from 'recharts';

// Funciones auxiliares para operaciones vectoriales
const sumaVectores = (v1, v2) => {
  return [v1[0] + v2[0], v1[1] + v2[1]];
};

const restaVectores = (v1, v2) => {
  return [v1[0] - v2[0], v1[1] - v2[1]];
};

const escalarPorVector = (escalar, vector) => {
  return [escalar * vector[0], escalar * vector[1]];
};

const productoEscalar = (v1, v2) => {
  return v1[0] * v2[0] + v1[1] * v2[1];
};

const magnitudVector = (vector) => {
  return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
};

function VectorVisualizer() {
  const [vector1, setVector1] = useState([3, 2]);
  const [vector2, setVector2] = useState([1, 4]);
  const [escalar, setEscalar] = useState(2);
  const [mostrarSuma, setMostrarSuma] = useState(true);
  const [mostrarResta, setMostrarResta] = useState(false);
  const [mostrarEscalar, setMostrarEscalar] = useState(false);
  const [rangoVisualizacion, setRangoVisualizacion] = useState(10);

  // Resultado de operaciones
  const vectorSuma = sumaVectores(vector1, vector2);
  const vectorResta = restaVectores(vector1, vector2);
  const vectorEscalar = escalarPorVector(escalar, vector1);
  const productoEscalarResult = productoEscalar(vector1, vector2);
  const magnitudV1 = magnitudVector(vector1);
  const magnitudV2 = magnitudVector(vector2);

  // Manejo de cambios
  const handleChangeVector1 = (index, value) => {
    const newVector = [...vector1];
    newVector[index] = Number(value);
    setVector1(newVector);
  };

  const handleChangeVector2 = (index, value) => {
    const newVector = [...vector2];
    newVector[index] = Number(value);
    setVector2(newVector);
  };

  // Preparar datos para el gráfico
  const prepararDatosGrafico = () => {
    const datos = [
      { x: 0, y: 0, name: 'Origen' },
      { x: vector1[0], y: vector1[1], name: 'Vector 1', vector: true, color: '#8884d8' },
      { x: vector2[0], y: vector2[1], name: 'Vector 2', vector: true, color: '#82ca9d' }
    ];

    // Añadir suma si se muestra
    if (mostrarSuma) {
      datos.push({ 
        x: vectorSuma[0], 
        y: vectorSuma[1], 
        name: 'Suma (V1 + V2)', 
        vector: true, 
        color: '#ff7300' 
      });
    }

    // Añadir resta si se muestra
    if (mostrarResta) {
      datos.push({ 
        x: vectorResta[0], 
        y: vectorResta[1], 
        name: 'Resta (V1 - V2)', 
        vector: true, 
        color: '#FF5733' 
      });
    }

    // Añadir escalar si se muestra
    if (mostrarEscalar) {
      datos.push({ 
        x: vectorEscalar[0], 
        y: vectorEscalar[1], 
        name: `Escalar (${escalar} × V1)`, 
        vector: true, 
        color: '#C70039' 
      });
    }

    return datos;
  };

  // Preparar líneas para visualizar vectores
  const prepararLineasVectores = () => {
    const lineas = [
      // Vector 1 desde el origen
      { x: 0, y: 0 },
      { x: vector1[0], y: vector1[1] }
    ];

    // Vector 2 desde el origen
    const lineasVector2 = [
      { x: 0, y: 0 },
      { x: vector2[0], y: vector2[1] }
    ];

    // Líneas para la suma (vector paralelo)
    const lineasSuma = mostrarSuma ? [
      { x: 0, y: 0 },
      { x: vectorSuma[0], y: vectorSuma[1] }
    ] : [];

    // Líneas para la suma (construcción del paralelogramo)
    const construccionSuma1 = mostrarSuma ? [
      { x: vector1[0], y: vector1[1] },
      { x: vectorSuma[0], y: vectorSuma[1] }
    ] : [];

    const construccionSuma2 = mostrarSuma ? [
      { x: vector2[0], y: vector2[1] },
      { x: vectorSuma[0], y: vectorSuma[1] }
    ] : [];

    // Líneas para la resta
    const lineasResta = mostrarResta ? [
      { x: 0, y: 0 },
      { x: vectorResta[0], y: vectorResta[1] }
    ] : [];

    // Líneas para el producto por escalar
    const lineasEscalar = mostrarEscalar ? [
      { x: 0, y: 0 },
      { x: vectorEscalar[0], y: vectorEscalar[1] }
    ] : [];

    return {
      lineasVector1: lineas,
      lineasVector2,
      lineasSuma,
      construccionSuma1,
      construccionSuma2,
      lineasResta,
      lineasEscalar
    };
  };

  const datos = prepararDatosGrafico();
  const lineas = prepararLineasVectores();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Visualizador de Vectores 2D</Typography>
      <Typography paragraph>
        Define vectores y visualiza sus operaciones básicas como suma, resta y multiplicación por escalar.
      </Typography>

      <Grid container spacing={3}>
        {/* Panel de entrada de datos */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Vector 1</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="X"
                  type="number"
                  value={vector1[0]}
                  onChange={(e) => handleChangeVector1(0, e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Y"
                  type="number"
                  value={vector1[1]}
                  onChange={(e) => handleChangeVector1(1, e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Vector 2</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="X"
                  type="number"
                  value={vector2[0]}
                  onChange={(e) => handleChangeVector2(0, e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Y"
                  type="number"
                  value={vector2[1]}
                  onChange={(e) => handleChangeVector2(1, e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Escalar</Typography>
            <Slider
              value={escalar}
              onChange={(e, newValue) => setEscalar(newValue)}
              min={-5}
              max={5}
              step={0.1}
              valueLabelDisplay="auto"
              aria-labelledby="escalar-slider"
            />

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Operaciones</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={mostrarSuma}
                  onChange={(e) => setMostrarSuma(e.target.checked)}
                  color="primary"
                />
              }
              label="Mostrar Suma (V1 + V2)"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={mostrarResta}
                  onChange={(e) => setMostrarResta(e.target.checked)}
                  color="primary"
                />
              }
              label="Mostrar Resta (V1 - V2)"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={mostrarEscalar}
                  onChange={(e) => setMostrarEscalar(e.target.checked)}
                  color="primary"
                />
              }
              label={`Mostrar Escalar (${escalar} × V1)`}
            />

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Rango de Visualización</Typography>
            <Slider
              value={rangoVisualizacion}
              onChange={(e, newValue) => setRangoVisualizacion(newValue)}
              min={5}
              max={20}
              step={1}
              valueLabelDisplay="auto"
              aria-labelledby="rango-visualizacion-slider"
            />
          </Paper>

          <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Información de Vectores</Typography>
            <Typography>
              <strong>Vector 1:</strong> ({vector1[0]}, {vector1[1]})
              <br />
              <strong>Magnitud V1:</strong> {magnitudV1.toFixed(2)}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>Vector 2:</strong> ({vector2[0]}, {vector2[1]})
              <br />
              <strong>Magnitud V2:</strong> {magnitudV2.toFixed(2)}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>Producto Escalar:</strong> {productoEscalarResult.toFixed(2)}
            </Typography>
            {mostrarSuma && (
              <Typography sx={{ mt: 1 }}>
                <strong>Vector Suma:</strong> ({vectorSuma[0]}, {vectorSuma[1]})
                <br />
                <strong>Magnitud Suma:</strong> {magnitudVector(vectorSuma).toFixed(2)}
              </Typography>
            )}
            {mostrarResta && (
              <Typography sx={{ mt: 1 }}>
                <strong>Vector Resta:</strong> ({vectorResta[0]}, {vectorResta[1]})
                <br />
                <strong>Magnitud Resta:</strong> {magnitudVector(vectorResta).toFixed(2)}
              </Typography>
            )}
            {mostrarEscalar && (
              <Typography sx={{ mt: 1 }}>
                <strong>Vector Escalar:</strong> ({vectorEscalar[0]}, {vectorEscalar[1]})
                <br />
                <strong>Magnitud Escalar:</strong> {magnitudVector(vectorEscalar).toFixed(2)}
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Visualización de vectores */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, height: 600 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="X" 
                  domain={[-rangoVisualizacion, rangoVisualizacion]} 
                  label={{ value: "X", position: "bottom" }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Y" 
                  domain={[-rangoVisualizacion, rangoVisualizacion]} 
                  label={{ value: "Y", angle: -90, position: "left" }}
                />
                <ZAxis range={[100, 100]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  formatter={(value, name) => [value, name]}
                  labelFormatter={(label) => ``}
                  itemSorter={(item) => -item.value}
                />
                <Legend />
                
                {/* Vector 1 */}
                <Scatter name="Vector 1" data={[datos[1]]} fill="#8884d8" line shape="circle" />
                <Line
                  data={lineas.lineasVector1}
                  type="linear"
                  dataKey="y"
                  stroke="#8884d8"
                  dot={false}
                  strokeWidth={2}
                  isAnimationActive={false}
                  name="Vector 1 línea"
                  activeDot={false}
                  legendType="none"
                />

                {/* Vector 2 */}
                <Scatter name="Vector 2" data={[datos[2]]} fill="#82ca9d" line shape="circle" />
                <Line
                  data={lineas.lineasVector2}
                  type="linear"
                  dataKey="y"
                  stroke="#82ca9d"
                  dot={false}
                  strokeWidth={2}
                  isAnimationActive={false}
                  name="Vector 2 línea"
                  activeDot={false}
                  legendType="none"
                />

                {/* Suma */}
                {mostrarSuma && (
                  <>
                    <Scatter name="Suma (V1 + V2)" data={[datos.find(d => d.name === 'Suma (V1 + V2)')]} fill="#ff7300" line shape="circle" />
                    <Line
                      data={lineas.lineasSuma}
                      type="linear"
                      dataKey="y"
                      stroke="#ff7300"
                      dot={false}
                      strokeWidth={2}
                      isAnimationActive={false}
                      name="Suma línea"
                      activeDot={false}
                      legendType="none"
                    />
                    <Line
                      data={lineas.construccionSuma1}
                      type="linear"
                      dataKey="y"
                      stroke="#ff7300"
                      dot={false}
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      isAnimationActive={false}
                      name="Construcción Suma 1"
                      activeDot={false}
                      legendType="none"
                    />
                    <Line
                      data={lineas.construccionSuma2}
                      type="linear"
                      dataKey="y"
                      stroke="#ff7300"
                      dot={false}
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      isAnimationActive={false}
                      name="Construcción Suma 2"
                      activeDot={false}
                      legendType="none"
                    />
                  </>
                )}

                {/* Resta */}
                {mostrarResta && (
                  <>
                    <Scatter name="Resta (V1 - V2)" data={[datos.find(d => d.name === 'Resta (V1 - V2)')]} fill="#FF5733" line shape="circle" />
                    <Line
                      data={lineas.lineasResta}
                      type="linear"
                      dataKey="y"
                      stroke="#FF5733"
                      dot={false}
                      strokeWidth={2}
                      isAnimationActive={false}
                      name="Resta línea"
                      activeDot={false}
                      legendType="none"
                    />
                  </>
                )}

                {/* Producto por escalar */}
                {mostrarEscalar && (
                  <>
                    <Scatter name={`Escalar (${escalar} × V1)`} data={[datos.find(d => d.name.includes('Escalar'))]} fill="#C70039" line shape="circle" />
                    <Line
                      data={lineas.lineasEscalar}
                      type="linear"
                      dataKey="y"
                      stroke="#C70039"
                      dot={false}
                      strokeWidth={2}
                      isAnimationActive={false}
                      name="Escalar línea"
                      activeDot={false}
                      legendType="none"
                    />
                  </>
                )}

                {/* Origen */}
                <Scatter name="Origen" data={[datos[0]]} fill="#000000" shape="cross" />
              </ScatterChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default VectorVisualizer; 