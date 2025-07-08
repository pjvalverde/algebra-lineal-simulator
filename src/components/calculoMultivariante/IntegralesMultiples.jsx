import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  doubleIntegralRectangular,
  doubleIntegralPolar,
  convertIntegrandRectToPolar,
} from '../../utils/multivariateMath';

// --- Lista de ejercicios de práctica ---
const EJERCICIOS = [
  {
    id: 1,
    titulo: 'Parabólica vertical',
    descripcion: 'R: 0<=x<=1, 0<=y<=x^2, integrando x+2y',
    data: {
      system: 'rect',
      integrand: 'x+2*y',
      xLower: '0',
      xUpper: '1',
      yLower: '0',
      yUpper: 'x^2',
    },
  },
  {
    id: 2,
    titulo: 'Triángulo recto',
    descripcion: 'R: triángulo (0,0)-(1,0)-(0,1), integrando 4-x-y',
    data: {
      system: 'rect',
      integrand: '4 - x - y',
      xLower: '0',
      xUpper: '1',
      yLower: '0',
      yUpper: '1 - x',
    },
  },
  {
    id: 3,
    titulo: 'Frijol parabólico',
    descripcion: 'R: 0<=y<=2, x=y^2-6y..2y-y^2, integrando 3x-y',
    data: {
      system: 'rect',
      integrand: '3*x - y',
      yLower: '0',
      yUpper: '2',
      xLower: 'y^2 - 6*y',
      xUpper: '2*y - y^2',
    },
  },
  {
    id: 4,
    titulo: 'Sector circular (polares)',
    descripcion: 'r 0..1, theta pi/6..pi/2, integrando r^2',
    data: {
      system: 'polar',
      integrand: 'r^2',
      rLower: '0',
      rUpper: '1',
      thetaLower: 'pi/6',
      thetaUpper: 'pi/2',
    },
  },
  {
    id: 5,
    titulo: 'Corona circular (polares)',
    descripcion: 'r 1..2, theta 0..2pi, integrando r*sin(theta)',
    data: {
      system: 'polar',
      integrand: 'r*sin(theta)',
      rLower: '1',
      rUpper: '2',
      thetaLower: '0',
      thetaUpper: '2*pi',
    },
  },
  {
    id: 6,
    titulo: 'Rosa polar (área)',
    descripcion: 'r 0..cos(2theta), theta -pi/4..pi/4, integrando 1',
    data: {
      system: 'polar',
      integrand: '1',
      rLower: '0',
      rUpper: 'cos(2*theta)',
      thetaLower: '-pi/4',
      thetaUpper: 'pi/4',
    },
  },
  {
    id: 7,
    titulo: 'Gauss recortado',
    descripcion: 'x 0..x^2, integrando e^y',
    data: {
      system: 'rect',
      integrand: 'exp(y)',
      xLower: '0',
      xUpper: '1',
      yLower: '0',
      yUpper: 'x^2',
    },
  },
  {
    id: 8,
    titulo: 'Exponencial de y^2',
    descripcion: 'x y^2..1, y -1..1',
    data: {
      system: 'rect',
      integrand: 'exp(y^2)',
      yLower: '-1',
      yUpper: '1',
      xLower: 'y^2',
      xUpper: '1',
    },
  },
  {
    id: 9,
    titulo: 'Elipse sesgada',
    descripcion: 'x y^2/4..4-y^2, y -2..2, integrando exp(x+y)',
    data: {
      system: 'rect',
      integrand: 'exp(x + y)',
      yLower: '-2',
      yUpper: '2',
      xLower: 'y^2/4',
      xUpper: '4 - y^2',
    },
  },
  {
    id: 10,
    titulo: 'Triángulo oblicuo',
    descripcion: 'vértices (0,0),(2,1),(0,3), integrando x',
    data: {
      system: 'rect',
      integrand: 'x',
      xLower: '0',
      xUpper: '2',
      yLower: '1.5*x',
      yUpper: '3 - 1.5*x',
    },
  },
];

function IntegralesMultiples() {
  const [system, setSystem] = useState('rect');
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState(null);

  // Límites rectangulares
  const [xLower, setXLower] = useState('0');
  const [xUpper, setXUpper] = useState('1');
  const [yLower, setYLower] = useState('0');
  const [yUpper, setYUpper] = useState('1');

  // Límites polares
  const [rLower, setRLower] = useState('0');
  const [rUpper, setRUpper] = useState('1');
  const [thetaLower, setThetaLower] = useState('0');
  const [thetaUpper, setThetaUpper] = useState('2*pi');

  const handleCompute = () => {
    try {
      let res;
      if (system === 'rect') {
        res = doubleIntegralRectangular(
          expr,
          xLower,
          xUpper,
          yLower,
          yUpper,
        );
      } else {
        res = doubleIntegralPolar(
          expr,
          rLower,
          rUpper,
          thetaLower,
          thetaUpper,
        );
      }
      setResult(res);
    } catch (err) {
      setResult('Error: ' + err.message);
    }
  };

  const loadExercise = (data) => {
    if (data.system === 'rect') {
      setSystem('rect');
      setExpr(data.integrand);
      setXLower(data.xLower || xLower);
      setXUpper(data.xUpper || xUpper);
      setYLower(data.yLower || yLower);
      setYUpper(data.yUpper || yUpper);
    } else {
      setSystem('polar');
      setExpr(data.integrand);
      setRLower(data.rLower || rLower);
      setRUpper(data.rUpper || rUpper);
      setThetaLower(data.thetaLower || thetaLower);
      setThetaUpper(data.thetaUpper || thetaUpper);
    }
    setResult(null);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Integrales Múltiples
      </Typography>

      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">Sistema de coordenadas</FormLabel>
        <RadioGroup
          row
          value={system}
          onChange={(e) => setSystem(e.target.value)}
        >
          <FormControlLabel
            value="rect"
            control={<Radio />}
            label="Rectangulares (x, y)"
          />
          <FormControlLabel
            value="polar"
            control={<Radio />}
            label="Polares (r, θ)"
          />
        </RadioGroup>
      </FormControl>

      {system === 'rect' && (
        <Button
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
          onClick={() => {
            const polarExpr = convertIntegrandRectToPolar(expr || '');
            setExpr(polarExpr);
            setSystem('polar');
          }}
          disabled={!expr}
        >
          Transformar integrando a polares
        </Button>
      )}

      <TextField
        fullWidth
        label="Integrando"
        helperText={
          system === 'rect'
            ? 'Usa x y y. Ej: x^2 + y^2. Los límites pueden depender de x (ej: y inferior = 0, y superior = x)'
            : 'Usa r y theta. Ej: r^2 * sin(theta)'
        }
        value={expr}
        onChange={(e) => setExpr(e.target.value)}
        sx={{ mb: 2 }}
      />

      {system === 'rect' ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="x inferior"
            value={xLower}
            onChange={(e) => setXLower(e.target.value)}
          />
          <TextField
            label="x superior"
            value={xUpper}
            onChange={(e) => setXUpper(e.target.value)}
          />
          <TextField
            label="y inferior"
            value={yLower}
            onChange={(e) => setYLower(e.target.value)}
          />
          <TextField
            label="y superior"
            value={yUpper}
            onChange={(e) => setYUpper(e.target.value)}
          />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="r inferior"
            value={rLower}
            onChange={(e) => setRLower(e.target.value)}
          />
          <TextField
            label="r superior"
            value={rUpper}
            onChange={(e) => setRUpper(e.target.value)}
          />
          <TextField
            label="θ inferior"
            value={thetaLower}
            onChange={(e) => setThetaLower(e.target.value)}
          />
          <TextField
            label="θ superior"
            value={thetaUpper}
            onChange={(e) => setThetaUpper(e.target.value)}
          />
        </Box>
      )}

      <Button variant="contained" sx={{ mt: 3 }} onClick={handleCompute}>
        Calcular
      </Button>

      {result !== null && (
        <Box sx={{ mt: 3 }}>
          {typeof result === 'string' ? (
            <Alert severity="error">{result}</Alert>
          ) : (
            <Typography variant="h6">
              Resultado ≈ {Number(result).toPrecision(6)}
            </Typography>
          )}
        </Box>
      )}

      {/* ----- Ejercicios de práctica ----- */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Ejercicios de práctica
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Lista de 10 ejercicios propuestos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {EJERCICIOS.map((ex) => (
                <ListItem
                  key={ex.id}
                  secondaryAction={
                    <Button size="small" onClick={() => loadExercise(ex.data)}>
                      Cargar
                    </Button>
                  }
                >
                  <ListItemText
                    primary={`${ex.id}. ${ex.titulo}`}
                    secondary={ex.descripcion}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}

export default IntegralesMultiples;
