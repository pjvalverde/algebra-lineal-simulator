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
} from '@mui/material';

import {
  doubleIntegralRectangular,
  doubleIntegralPolar,
} from '../../utils/multivariateMath';

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

      <TextField
        fullWidth
        label="Integrando"
        helperText={
          system === 'rect'
            ? 'Usa x y y. Ej: x^2 + y^2'
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
    </Box>
  );
}

export default IntegralesMultiples;
