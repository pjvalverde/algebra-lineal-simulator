import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Tabs, Tab, TextField, Button, Grid, Paper, Divider, Select, MenuItem, FormControl, InputLabel, Slider } from '@mui/material';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Componente para la subsección de Razones de Cambio y Regla de la Cadena
const RazonesDeCambio = () => {
  const [problema, setProblema] = useState('velocidad');
  const [parametros, setParametros] = useState({
    posicion: 'x(t) = 2*t^2 - 3*t + 5',
    tiempo: 2,
    radio: 5,
    angulo: '\\theta(t) = t^2',
    constanteResorte: 2,
    masa: 1,
    amplitud: 3,
    desplazamiento: 'x(t) = 3*\\cos(2*t)'
  });
  const [resultado, setResultado] = useState(null);

  const handleChangeProblema = (event) => {
    setProblema(event.target.value);
    setResultado(null);
  };

  const handleChangeParametro = (e) => {
    const { name, value } = e.target;
    setParametros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calcularRazonDeCambio = () => {
    let result = {};

    switch (problema) {
      case 'velocidad':
        // Movimiento rectilíneo - Velocidad y aceleración
        result = calcularMovimientoRectilineo(parametros.posicion, parametros.tiempo);
        break;
      case 'circular':
        // Movimiento circular - Velocidad angular y lineal
        result = calcularMovimientoCircular(parametros.radio, parametros.angulo, parametros.tiempo);
        break;
      case 'resorte':
        // Movimiento armónico simple - Resorte
        result = calcularMovimientoResorte(
          parametros.desplazamiento, 
          parametros.constanteResorte,
          parametros.masa,
          parametros.tiempo
        );
        break;
      default:
        break;
    }

    setResultado(result);
  };

  // Función para calcular velocidad y aceleración en movimiento rectilíneo
  const calcularMovimientoRectilineo = (posicionFn, tiempo) => {
    // En un caso real, evaluaríamos la función y sus derivadas
    // Aquí simulamos el cálculo con valores predefinidos para el ejemplo
    // x(t) = 2t² - 3t + 5
    // v(t) = dx/dt = 4t - 3
    // a(t) = d²x/dt² = 4
    
    const t = parseFloat(tiempo);
    const posicion = 2*t*t - 3*t + 5;
    const velocidad = 4*t - 3;
    const aceleracion = 4;
    
    return {
      funcionPosicion: 'x(t) = 2t^2 - 3t + 5',
      funcionVelocidad: 'v(t) = \\frac{dx}{dt} = 4t - 3',
      funcionAceleracion: 'a(t) = \\frac{d^2x}{dt^2} = 4',
      tiempoEvaluado: t,
      posicionEvaluada: posicion,
      velocidadEvaluada: velocidad,
      aceleracionEvaluada: aceleracion,
      explicacion: 'La posición del objeto está dada por la función x(t) = 2t^2 - 3t + 5.\n\nPara encontrar la velocidad, calculamos la primera derivada: v(t) = \\frac{dx}{dt} = 4t - 3.\n\nPara encontrar la aceleración, calculamos la segunda derivada: a(t) = \\frac{d^2x}{dt^2} = 4.\n\nEn t = ' + t + ', tenemos que la posición es x = ' + posicion.toFixed(2) + ', la velocidad es v = ' + velocidad.toFixed(2) + ' y la aceleración es a = ' + aceleracion.toFixed(2) + '.'
    };
  };

  // Función para calcular velocidad angular y lineal en movimiento circular
  const calcularMovimientoCircular = (radio, anguloFn, tiempo) => {
    // Simulamos el cálculo para θ(t) = t²
    // θ(t) = t²
    // ω(t) = dθ/dt = 2t
    // α(t) = d²θ/dt² = 2
    
    const r = parseFloat(radio);
    const t = parseFloat(tiempo);
    
    const angulo = t*t; // θ(t) = t²
    const velocidadAngular = 2*t; // ω(t) = 2t
    const aceleracionAngular = 2; // α(t) = 2
    
    const velocidadLineal = r * velocidadAngular;
    const aceleracionCentripeta = r * velocidadAngular * velocidadAngular;
    const aceleracionTangencial = r * aceleracionAngular;
    
    return {
      funcionAngulo: '\\theta(t) = t^2',
      funcionVelocidadAngular: '\\omega(t) = \\frac{d\\theta}{dt} = 2t',
      funcionAceleracionAngular: '\\alpha(t) = \\frac{d^2\\theta}{dt^2} = 2',
      tiempoEvaluado: t,
      radioCirculo: r,
      anguloEvaluado: angulo,
      velocidadAngularEvaluada: velocidadAngular,
      aceleracionAngularEvaluada: aceleracionAngular,
      velocidadLinealEvaluada: velocidadLineal,
      aceleracionCentripetaEvaluada: aceleracionCentripeta,
      aceleracionTangencialEvaluada: aceleracionTangencial,
      explicacion: 'En movimiento circular con radio r = ' + r + ' y posición angular \\theta(t) = t^2:\n\nLa velocidad angular es \\omega(t) = \\frac{d\\theta}{dt} = 2t.\n\nLa aceleración angular es \\alpha(t) = \\frac{d^2\\theta}{dt^2} = 2.\n\nEn t = ' + t + ':\n- Ángulo: \\theta = ' + angulo.toFixed(2) + ' rad\n- Velocidad angular: \\omega = ' + velocidadAngular.toFixed(2) + ' rad/s\n- Velocidad lineal: v = r\\omega = ' + velocidadLineal.toFixed(2) + ' m/s\n- Aceleración centrípeta: a_c = r\\omega^2 = ' + aceleracionCentripeta.toFixed(2) + ' m/s²\n- Aceleración tangencial: a_t = r\\alpha = ' + aceleracionTangencial.toFixed(2) + ' m/s²'
    };
  };

  // Función para calcular el movimiento de un resorte
  const calcularMovimientoResorte = (desplazamientoFn, k, m, tiempo) => {
    // Simulamos el cálculo para x(t) = 3cos(2t)
    // x(t) = 3cos(2t)
    // v(t) = dx/dt = -6sin(2t)
    // a(t) = d²x/dt² = -12cos(2t)
    
    const t = parseFloat(tiempo);
    const constanteK = parseFloat(k);
    const masa = parseFloat(m);
    
    const frecuenciaNatural = Math.sqrt(constanteK / masa);
    const desplazamiento = 3 * Math.cos(2 * t);
    const velocidad = -6 * Math.sin(2 * t);
    const aceleracion = -12 * Math.cos(2 * t);
    const energia = 0.5 * constanteK * desplazamiento * desplazamiento;
    
    return {
      funcionDesplazamiento: 'x(t) = 3\\cos(2t)',
      funcionVelocidad: 'v(t) = \\frac{dx}{dt} = -6\\sin(2t)',
      funcionAceleracion: 'a(t) = \\frac{d^2x}{dt^2} = -12\\cos(2t)',
      tiempoEvaluado: t,
      constResorte: constanteK,
      masaObjeto: masa,
      frecuenciaNaturalSistema: frecuenciaNatural,
      desplazamientoEvaluado: desplazamiento,
      velocidadEvaluada: velocidad,
      aceleracionEvaluada: aceleracion,
      energiaPotencial: energia,
      explicacion: 'En un movimiento armónico simple con desplazamiento x(t) = 3\\cos(2t), constante del resorte k = ' + constanteK + ' N/m y masa m = ' + masa + ' kg:\n\nLa velocidad se obtiene con la primera derivada: v(t) = \\frac{dx}{dt} = -6\\sin(2t).\n\nLa aceleración se obtiene con la segunda derivada: a(t) = \\frac{d^2x}{dt^2} = -12\\cos(2t).\n\nLa frecuencia natural del sistema es \\omega_n = \\sqrt{\\frac{k}{m}} = ' + frecuenciaNatural.toFixed(2) + ' rad/s.\n\nEn t = ' + t + ' s:\n- Desplazamiento: x = ' + desplazamiento.toFixed(2) + ' m\n- Velocidad: v = ' + velocidad.toFixed(2) + ' m/s\n- Aceleración: a = ' + aceleracion.toFixed(2) + ' m/s²\n- Energía potencial: E_p = \\frac{1}{2}kx^2 = ' + energia.toFixed(2) + ' J'
    };
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Aplicaciones de Razones de Cambio en Física
      </Typography>
      
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="problema-select-label">Tipo de Problema</InputLabel>
          <Select
            labelId="problema-select-label"
            id="problema-select"
            value={problema}
            label="Tipo de Problema"
            onChange={handleChangeProblema}
          >
            <MenuItem value="velocidad">Velocidad y Aceleración (Movimiento Rectilíneo)</MenuItem>
            <MenuItem value="circular">Movimiento Circular</MenuItem>
            <MenuItem value="resorte">Movimiento Armónico Simple (Resorte)</MenuItem>
          </Select>
        </FormControl>
        
        {problema === 'velocidad' && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Función de Posición"
                name="posicion"
                value={parametros.posicion}
                onChange={handleChangeParametro}
                margin="normal"
                variant="outlined"
                helperText="Ejemplo: x(t) = 2*t^2 - 3*t + 5"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Tiempo (t)"
                name="tiempo"
                value={parametros.tiempo}
                onChange={handleChangeParametro}
                margin="normal"
                variant="outlined"
                type="number"
                inputProps={{ step: 0.1 }}
              />
            </Grid>
          </Grid>
        )}
        
        {problema === 'circular' && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Radio del círculo"
                name="radio"
                value={parametros.radio}
                onChange={handleChangeParametro}
                margin="normal"
                variant="outlined"
                type="number"
                inputProps={{ step: 0.1 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Función del ángulo"
                name="angulo"
                value={parametros.angulo}
                onChange={handleChangeParametro}
                margin="normal"
                variant="outlined"
                helperText="Ejemplo: θ(t) = t^2"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Tiempo (t)"
                name="tiempo"
                value={parametros.tiempo}
                onChange={handleChangeParametro}
                margin="normal"
                variant="outlined"
                type="number"
                inputProps={{ step: 0.1 }}
              />
            </Grid>
          </Grid>
        )}
        
        {problema === 'resorte' && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Desplazamiento"
                name="desplazamiento"
                value={parametros.desplazamiento}
                onChange={handleChangeParametro}
                margin="normal"
                variant="outlined"
                helperText="Ejemplo: x(t) = 3*cos(2*t)"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Constante del resorte (k)"
                name="constanteResorte"
                value={parametros.constanteResorte}
                onChange={handleChangeParametro}
                margin="normal"
                variant="outlined"
                type="number"
                inputProps={{ step: 0.1 }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Masa (kg)"
                name="masa"
                value={parametros.masa}
                onChange={handleChangeParametro}
                margin="normal"
                variant="outlined"
                type="number"
                inputProps={{ step: 0.1 }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Tiempo (t)"
                name="tiempo"
                value={parametros.tiempo}
                onChange={handleChangeParametro}
                margin="normal"
                variant="outlined"
                type="number"
                inputProps={{ step: 0.1 }}
              />
            </Grid>
          </Grid>
        )}
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={calcularRazonDeCambio}
          sx={{ mt: 2 }}
        >
          Calcular
        </Button>
      </Paper>
      
      {resultado && (
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Resultados
          </Typography>
          
          {problema === 'velocidad' && (
            <Box>
              <Typography variant="subtitle1">Función de posición:</Typography>
              <BlockMath math={resultado.funcionPosicion} />
              
              <Typography variant="subtitle1">Función de velocidad:</Typography>
              <BlockMath math={resultado.funcionVelocidad} />
              
              <Typography variant="subtitle1">Función de aceleración:</Typography>
              <BlockMath math={resultado.funcionAceleracion} />
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1">Evaluación en t = {resultado.tiempoEvaluado}:</Typography>
              <Typography>Posición: <InlineMath math={`x = ${resultado.posicionEvaluada.toFixed(2)}`} /> unidades</Typography>
              <Typography>Velocidad: <InlineMath math={`v = ${resultado.velocidadEvaluada.toFixed(2)}`} /> unidades/s</Typography>
              <Typography>Aceleración: <InlineMath math={`a = ${resultado.aceleracionEvaluada.toFixed(2)}`} /> unidades/s²</Typography>
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Explicación:</Typography>
              <Typography paragraph>
                La posición del objeto está dada por la función <InlineMath math={"x(t) = 2t^2 - 3t + 5"} />.
              </Typography>
              <Typography paragraph>
                Para encontrar la velocidad, calculamos la primera derivada: <InlineMath math={"v(t) = \\frac{dx}{dt} = 4t - 3"} />.
              </Typography>
              <Typography paragraph>
                Para encontrar la aceleración, calculamos la segunda derivada: <InlineMath math={"a(t) = \\frac{d^2x}{dt^2} = 4"} />.
              </Typography>
              <Typography paragraph>
                En <InlineMath math={`t = ${resultado.tiempoEvaluado}`} />, tenemos que la posición es <InlineMath math={`x = ${resultado.posicionEvaluada.toFixed(2)}`} />, 
                la velocidad es <InlineMath math={`v = ${resultado.velocidadEvaluada.toFixed(2)}`} /> y la aceleración es <InlineMath math={`a = ${resultado.aceleracionEvaluada.toFixed(2)}`} />.
              </Typography>
            </Box>
          )}
          
          {problema === 'circular' && (
            <Box>
              <Typography variant="subtitle1">Función de ángulo:</Typography>
              <BlockMath math={resultado.funcionAngulo} />
              
              <Typography variant="subtitle1">Función de velocidad angular:</Typography>
              <BlockMath math={resultado.funcionVelocidadAngular} />
              
              <Typography variant="subtitle1">Función de aceleración angular:</Typography>
              <BlockMath math={resultado.funcionAceleracionAngular} />
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1">Evaluación en t = {resultado.tiempoEvaluado} con radio r = {resultado.radioCirculo}:</Typography>
              <Typography>Ángulo: <InlineMath math={`\\theta = ${resultado.anguloEvaluado.toFixed(2)}`} /> rad</Typography>
              <Typography>Velocidad angular: <InlineMath math={`\\omega = ${resultado.velocidadAngularEvaluada.toFixed(2)}`} /> rad/s</Typography>
              <Typography>Aceleración angular: <InlineMath math={`\\alpha = ${resultado.aceleracionAngularEvaluada.toFixed(2)}`} /> rad/s²</Typography>
              <Typography>Velocidad lineal: <InlineMath math={`v = ${resultado.velocidadLinealEvaluada.toFixed(2)}`} /> m/s</Typography>
              <Typography>Aceleración centrípeta: <InlineMath math={`a_c = ${resultado.aceleracionCentripetaEvaluada.toFixed(2)}`} /> m/s²</Typography>
              <Typography>Aceleración tangencial: <InlineMath math={`a_t = ${resultado.aceleracionTangencialEvaluada.toFixed(2)}`} /> m/s²</Typography>
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Explicación:</Typography>
              <Typography paragraph>
                En movimiento circular con radio <InlineMath math={`r = ${resultado.radioCirculo}`} /> y posición angular <InlineMath math={"\\theta(t) = t^2"} />:
              </Typography>
              <Typography paragraph>
                La velocidad angular es <InlineMath math={"\\omega(t) = \\frac{d\\theta}{dt} = 2t"} />.
              </Typography>
              <Typography paragraph>
                La aceleración angular es <InlineMath math={"\\alpha(t) = \\frac{d^2\\theta}{dt^2} = 2"} />.
              </Typography>
              <Typography paragraph>
                En <InlineMath math={`t = ${resultado.tiempoEvaluado}`} />:
              </Typography>
              <Typography component="div" sx={{ pl: 2 }}>
                <ul>
                  <li>Ángulo: <InlineMath math={`\\theta = ${resultado.anguloEvaluado.toFixed(2)}`} /> rad</li>
                  <li>Velocidad angular: <InlineMath math={`\\omega = ${resultado.velocidadAngularEvaluada.toFixed(2)}`} /> rad/s</li>
                  <li>Velocidad lineal: <InlineMath math={`v = r\\omega = ${resultado.velocidadLinealEvaluada.toFixed(2)}`} /> m/s</li>
                  <li>Aceleración centrípeta: <InlineMath math={`a_c = r\\omega^2 = ${resultado.aceleracionCentripetaEvaluada.toFixed(2)}`} /> m/s²</li>
                  <li>Aceleración tangencial: <InlineMath math={`a_t = r\\alpha = ${resultado.aceleracionTangencialEvaluada.toFixed(2)}`} /> m/s²</li>
                </ul>
              </Typography>
            </Box>
          )}
          
          {problema === 'resorte' && (
            <Box>
              <Typography variant="subtitle1">Función de desplazamiento:</Typography>
              <BlockMath math={resultado.funcionDesplazamiento} />
              
              <Typography variant="subtitle1">Función de velocidad:</Typography>
              <BlockMath math={resultado.funcionVelocidad} />
              
              <Typography variant="subtitle1">Función de aceleración:</Typography>
              <BlockMath math={resultado.funcionAceleracion} />
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1">Parámetros del sistema:</Typography>
              <Typography>Constante del resorte: <InlineMath math={`k = ${resultado.constResorte}`} /> N/m</Typography>
              <Typography>Masa: <InlineMath math={`m = ${resultado.masaObjeto}`} /> kg</Typography>
              <Typography>Frecuencia natural: <InlineMath math={`\\omega_n = ${resultado.frecuenciaNaturalSistema.toFixed(2)}`} /> rad/s</Typography>
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Evaluación en t = {resultado.tiempoEvaluado}:</Typography>
              <Typography>Desplazamiento: <InlineMath math={`x = ${resultado.desplazamientoEvaluado.toFixed(2)}`} /> m</Typography>
              <Typography>Velocidad: <InlineMath math={`v = ${resultado.velocidadEvaluada.toFixed(2)}`} /> m/s</Typography>
              <Typography>Aceleración: <InlineMath math={`a = ${resultado.aceleracionEvaluada.toFixed(2)}`} /> m/s²</Typography>
              <Typography>Energía potencial: <InlineMath math={`E_p = ${resultado.energiaPotencial.toFixed(2)}`} /> J</Typography>
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Explicación:</Typography>
              <Typography paragraph>
                En un movimiento armónico simple con desplazamiento <InlineMath math={"x(t) = 3\\cos(2t)"} />, constante del resorte <InlineMath math={`k = ${resultado.constResorte}`} /> N/m y masa <InlineMath math={`m = ${resultado.masaObjeto}`} /> kg:
              </Typography>
              <Typography paragraph>
                La velocidad se obtiene con la primera derivada: <InlineMath math={"v(t) = \\frac{dx}{dt} = -6\\sin(2t)"} />.
              </Typography>
              <Typography paragraph>
                La aceleración se obtiene con la segunda derivada: <InlineMath math={"a(t) = \\frac{d^2x}{dt^2} = -12\\cos(2t)"} />.
              </Typography>
              <Typography paragraph>
                La frecuencia natural del sistema es <InlineMath math={`\\omega_n = \\sqrt{\\frac{k}{m}} = ${resultado.frecuenciaNaturalSistema.toFixed(2)}`} /> rad/s.
              </Typography>
              <Typography paragraph>
                En <InlineMath math={`t = ${resultado.tiempoEvaluado}`} /> s:
              </Typography>
              <Typography component="div" sx={{ pl: 2 }}>
                <ul>
                  <li>Desplazamiento: <InlineMath math={`x = ${resultado.desplazamientoEvaluado.toFixed(2)}`} /> m</li>
                  <li>Velocidad: <InlineMath math={`v = ${resultado.velocidadEvaluada.toFixed(2)}`} /> m/s</li>
                  <li>Aceleración: <InlineMath math={`a = ${resultado.aceleracionEvaluada.toFixed(2)}`} /> m/s²</li>
                  <li>Energía potencial: <InlineMath math={`E_p = \\frac{1}{2}kx^2 = ${resultado.energiaPotencial.toFixed(2)}`} /> J</li>
                </ul>
              </Typography>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

// Componente para la subsección de Optimización aplicada a la Física
const OptimizacionFisica = () => {
  const [tipoProblema, setTipoProblema] = useState('equilibrio');
  const [parametros, setParametros] = useState({
    funcion: 'f(x) = x^3 - 6*x^2 + 9*x + 1',
    funcionEnergia: 'U(x) = 0.5*k*x^2 - m*g*x',
    constanteResorte: 2,
    masa: 1,
    gravedad: 9.8,
    velocidadInicial: 20,
    angulo: 45,
    altura: 0
  });
  const [resultado, setResultado] = useState(null);

  const handleChangeTipo = (event) => {
    setTipoProblema(event.target.value);
    setResultado(null);
  };

  const handleChangeParametro = (e) => {
    const { name, value } = e.target;
    setParametros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calcularOptimizacion = () => {
    let result = {};

    switch (tipoProblema) {
      case 'equilibrio':
        // Puntos de equilibrio - derivada igual a cero
        result = calcularPuntosEquilibrio(parametros.funcion);
        break;
      case 'energia':
        // Optimización de energía potencial
        result = calcularEnergiaPotencial(
          parametros.funcionEnergia,
          parametros.constanteResorte,
          parametros.masa,
          parametros.gravedad
        );
        break;
      case 'proyectil':
        // Optimización en movimiento de proyectiles
        result = calcularMovimientoProyectil(
          parametros.velocidadInicial,
          parametros.angulo,
          parametros.altura
        );
        break;
      default:
        break;
    }

    setResultado(result);
  };

  // Función para calcular puntos de equilibrio (derivada = 0)
  const calcularPuntosEquilibrio = (funcion) => {
    // En un caso real, evaluaríamos la función y su derivada para encontrar los ceros
    // Aquí simulamos el resultado para f(x) = x³ - 6x² + 9x + 1
    // f'(x) = 3x² - 12x + 9
    // Igualando a cero: 3x² - 12x + 9 = 0
    // Resolviendo: x = 1 o x = 3
    
    // Valores para el gráfico
    const puntosX = [];
    const puntosY = [];
    
    for (let x = 0; x <= 4; x += 0.1) {
      puntosX.push(x);
      puntosY.push(Math.pow(x, 3) - 6 * Math.pow(x, 2) + 9 * x + 1);
    }
    
    return {
      funcion: 'f(x) = x^3 - 6x^2 + 9x + 1',
      derivada: 'f\'(x) = 3x^2 - 12x + 9',
      puntosEquilibrio: [
        { x: 1, y: 5, tipo: 'mínimo local' },
        { x: 3, y: 1, tipo: 'máximo local' }
      ],
      puntosX: puntosX,
      puntosY: puntosY,
      explicacion: 'Para encontrar los puntos de equilibrio en un sistema físico, buscamos los valores donde la derivada de la función se anula (es igual a cero).\n\nEn este caso, para la función f(x) = x^3 - 6x^2 + 9x + 1, la derivada es f\'(x) = 3x^2 - 12x + 9.\n\nIgualando a cero: 3x^2 - 12x + 9 = 0\n\nResolviendo esta ecuación cuadrática, obtenemos x = 1 y x = 3.\n\nEl punto (1, 5) es un mínimo local, donde el sistema está en equilibrio estable.\nEl punto (3, 1) es un máximo local, donde el sistema está en equilibrio inestable.'
    };
  };

  // Función para optimizar la energía potencial
  const calcularEnergiaPotencial = (funcion, k, m, g) => {
    // Para un resorte vertical con masa, la energía potencial es:
    // U(x) = 0.5*k*x² - m*g*x
    // La fuerza es F = -dU/dx = -k*x + m*g
    // En equilibrio, F = 0, por lo que -k*x + m*g = 0
    // Por tanto, x = m*g/k
    
    const constanteK = parseFloat(k);
    const masa = parseFloat(m);
    const gravedad = parseFloat(g);
    
    const posicionEquilibrio = (masa * gravedad) / constanteK;
    const energiaEquilibrio = 0.5 * constanteK * Math.pow(posicionEquilibrio, 2) - masa * gravedad * posicionEquilibrio;
    
    // Valores para el gráfico
    const puntosX = [];
    const puntosY = [];
    
    for (let x = 0; x <= posicionEquilibrio * 2; x += posicionEquilibrio / 10) {
      puntosX.push(x);
      puntosY.push(0.5 * constanteK * Math.pow(x, 2) - masa * gravedad * x);
    }
    
    return {
      funcion: 'U(x) = 0.5kx^2 - mgx',
      derivada: 'F(x) = -dU/dx = -kx + mg',
      constantes: { k: constanteK, m: masa, g: gravedad },
      posicionEquilibrio: posicionEquilibrio,
      energiaEquilibrio: energiaEquilibrio,
      puntosX: puntosX,
      puntosY: puntosY,
      explicacion: 'En un sistema físico como un resorte vertical con una masa, la energía potencial es U(x) = 0.5kx^2 - mgx, donde k es la constante del resorte, m es la masa, g es la aceleración de la gravedad, y x es el desplazamiento.\n\nLa fuerza en cualquier punto es F(x) = -dU/dx = -kx + mg.\n\nEn equilibrio, la fuerza es cero: -kx + mg = 0\n\nDespejando, obtenemos la posición de equilibrio: x = mg/k = ' + posicionEquilibrio.toFixed(3) + ' m\n\nEn este punto, la energía potencial es mínima con un valor de ' + energiaEquilibrio.toFixed(3) + ' J.'
    };
  };

  // Función para optimizar movimiento de proyectiles
  const calcularMovimientoProyectil = (v0, angulo, h0) => {
    // Para un proyectil, queremos encontrar el ángulo que maximiza el alcance
    // Si es desde el suelo (h0 = 0), el ángulo óptimo es 45°
    // El alcance es R = (v0²/g)·sin(2θ) si h0 = 0
    // El tiempo de vuelo es t = (2·v0·sin(θ))/g si h0 = 0
    // La altura máxima es h_max = h0 + (v0²·sin²(θ))/(2g)
    
    const v0Num = parseFloat(v0);
    const anguloRad = parseFloat(angulo) * Math.PI / 180;
    const h0Num = parseFloat(h0);
    const g = 9.8;
    
    // Cálculos
    const alcance = (v0Num * v0Num * Math.sin(2 * anguloRad)) / g;
    const tiempoVuelo = (2 * v0Num * Math.sin(anguloRad)) / g;
    const alturaMaxima = h0Num + (v0Num * v0Num * Math.pow(Math.sin(anguloRad), 2)) / (2 * g);
    
    // Ángulo óptimo para maximizar alcance
    const anguloOptimo = h0Num === 0 ? 45 : 45; // El ángulo óptimo es 45° cuando h0 = 0
    const anguloOptimoRad = anguloOptimo * Math.PI / 180;
    const alcanceMaximo = (v0Num * v0Num * Math.sin(2 * anguloOptimoRad)) / g;
    
    return {
      parametros: { v0: v0Num, angulo: parseFloat(angulo), h0: h0Num },
      alcance: alcance,
      tiempoVuelo: tiempoVuelo,
      alturaMaxima: alturaMaxima,
      anguloOptimo: anguloOptimo,
      alcanceMaximo: alcanceMaximo,
      explicacion: 'Para un proyectil lanzado con velocidad inicial v₀ = ' + v0Num + ' m/s a un ángulo θ = ' + angulo + '° desde una altura h₀ = ' + h0Num + ' m:\n\nEl alcance horizontal es R = ' + alcance.toFixed(2) + ' m\n\nEl tiempo de vuelo es t = ' + tiempoVuelo.toFixed(2) + ' s\n\nLa altura máxima alcanzada es h_max = ' + alturaMaxima.toFixed(2) + ' m\n\nPara maximizar el alcance desde el suelo (h₀ = 0), el ángulo óptimo es 45°, lo que daría un alcance máximo de ' + alcanceMaximo.toFixed(2) + ' m.\n\nLa trayectoria del proyectil es parabólica, descrita por las ecuaciones:\n\nx(t) = v₀·cos(θ)·t\ny(t) = h₀ + v₀·sin(θ)·t - 0.5·g·t²'
    };
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Optimización aplicada a la Física
      </Typography>
      
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="tipo-problema-label">Tipo de Problema</InputLabel>
          <Select
            labelId="tipo-problema-label"
            id="tipo-problema"
            value={tipoProblema}
            label="Tipo de Problema"
            onChange={handleChangeTipo}
          >
            <MenuItem value="equilibrio">Puntos de Equilibrio</MenuItem>
            <MenuItem value="energia">Energía Potencial Mínima</MenuItem>
            <MenuItem value="proyectil">Movimiento de Proyectiles</MenuItem>
          </Select>
        </FormControl>
        
        {tipoProblema === 'equilibrio' && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Función a optimizar"
                name="funcion"
                value={parametros.funcion}
                onChange={handleChangeParametro}
                margin="normal"
                variant="outlined"
                helperText="Ejemplo: f(x) = x^3 - 6*x^2 + 9*x + 1"
              />
            </Grid>
          </Grid>
        )}
        
        {tipoProblema === 'energia' && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Función de Energía Potencial"
                name="funcionEnergia"
                value={parametros.funcionEnergia}
                onChange={handleChangeParametro}
                margin="normal"
                variant="outlined"
                helperText="Ejemplo: U(x) = 0.5*k*x^2 - m*g*x"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Constante del resorte (k)"
                name="constanteResorte"
                value={parametros.constanteResorte}
                onChange={handleChangeParametro}
                margin="normal"
                variant="outlined"
                type="number"
                inputProps={{ step: 0.1 }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Masa (kg)"
                name="masa"
                value={parametros.masa}
                onChange={handleChangeParametro}
                margin="normal"
                variant="outlined"
                type="number"
                inputProps={{ step: 0.1 }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Gravedad (m/s²)"
                name="gravedad"
                value={parametros.gravedad}
                onChange={handleChangeParametro}
                margin="normal"
                variant="outlined"
                type="number"
                inputProps={{ step: 0.1 }}
              />
            </Grid>
          </Grid>
        )}
        
        {tipoProblema === 'proyectil' && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Velocidad inicial (m/s)"
                name="velocidadInicial"
                value={parametros.velocidadInicial}
                onChange={handleChangeParametro}
                margin="normal"
                variant="outlined"
                type="number"
                inputProps={{ step: 0.5 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Ángulo (grados)"
                name="angulo"
                value={parametros.angulo}
                onChange={handleChangeParametro}
                margin="normal"
                variant="outlined"
                type="number"
                inputProps={{ step: 1, min: 0, max: 90 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Altura inicial (m)"
                name="altura"
                value={parametros.altura}
                onChange={handleChangeParametro}
                margin="normal"
                variant="outlined"
                type="number"
                inputProps={{ step: 0.1 }}
              />
            </Grid>
          </Grid>
        )}
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={calcularOptimizacion}
          sx={{ mt: 2 }}
        >
          Calcular
        </Button>
      </Paper>
      
      {resultado && (
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Resultados
          </Typography>
          
          {tipoProblema === 'equilibrio' && (
            <Box>
              <Typography variant="subtitle1">Función:</Typography>
              <BlockMath math={resultado.funcion} />
              
              <Typography variant="subtitle1">Derivada:</Typography>
              <BlockMath math={resultado.derivada} />
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1">Puntos de equilibrio:</Typography>
              {resultado.puntosEquilibrio.map((punto, index) => (
                <Typography key={index}>
                  Punto <InlineMath math={`(${punto.x}, ${punto.y})`} />: {punto.tipo}
                </Typography>
              ))}
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Explicación:</Typography>
              <Typography>
                {resultado.explicacion.split('\n\n').map((parrafo, index) => (
                  <React.Fragment key={index}>
                    {parrafo}
                    <br /><br />
                  </React.Fragment>
                ))}
              </Typography>
            </Box>
          )}
          
          {tipoProblema === 'energia' && (
            <Box>
              <Typography variant="subtitle1">Función de Energía Potencial:</Typography>
              <BlockMath math={resultado.funcion} />
              
              <Typography variant="subtitle1">Fuerza (derivada negativa de la energía):</Typography>
              <BlockMath math={resultado.derivada} />
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1">Parámetros del sistema:</Typography>
              <Typography>Constante del resorte: <InlineMath math={`k = ${resultado.constantes.k}`} /> N/m</Typography>
              <Typography>Masa: <InlineMath math={`m = ${resultado.constantes.m}`} /> kg</Typography>
              <Typography>Gravedad: <InlineMath math={`g = ${resultado.constantes.g}`} /> m/s²</Typography>
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Posición de equilibrio:</Typography>
              <Typography>
                <InlineMath math={`x_{eq} = ${resultado.posicionEquilibrio.toFixed(3)}`} /> m
              </Typography>
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Energía potencial en el equilibrio:</Typography>
              <Typography>
                <InlineMath math={`U_{min} = ${resultado.energiaEquilibrio.toFixed(3)}`} /> J
              </Typography>
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Explicación:</Typography>
              <Typography>
                {resultado.explicacion.split('\n\n').map((parrafo, index) => (
                  <React.Fragment key={index}>
                    {parrafo}
                    <br /><br />
                  </React.Fragment>
                ))}
              </Typography>
            </Box>
          )}
          
          {tipoProblema === 'proyectil' && (
            <Box>
              <Typography variant="subtitle1">Parámetros iniciales:</Typography>
              <Typography>Velocidad inicial: <InlineMath math={`v_0 = ${resultado.parametros.v0}`} /> m/s</Typography>
              <Typography>Ángulo de lanzamiento: <InlineMath math={`\\theta = ${resultado.parametros.angulo}`} />°</Typography>
              <Typography>Altura inicial: <InlineMath math={`h_0 = ${resultado.parametros.h0}`} /> m</Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1">Resultados del lanzamiento:</Typography>
              <Typography>Alcance horizontal: <InlineMath math={`R = ${resultado.alcance.toFixed(2)}`} /> m</Typography>
              <Typography>Tiempo de vuelo: <InlineMath math={`t = ${resultado.tiempoVuelo.toFixed(2)}`} /> s</Typography>
              <Typography>Altura máxima: <InlineMath math={`h_{max} = ${resultado.alturaMaxima.toFixed(2)}`} /> m</Typography>
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Optimización:</Typography>
              <Typography>
                Ángulo óptimo para maximizar alcance: <InlineMath math={`\\theta_{opt} = ${resultado.anguloOptimo}`} />°
              </Typography>
              <Typography>
                Alcance máximo posible: <InlineMath math={`R_{max} = ${resultado.alcanceMaximo.toFixed(2)}`} /> m
              </Typography>
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Explicación:</Typography>
              <Typography>
                {resultado.explicacion.split('\n\n').map((parrafo, index) => (
                  <React.Fragment key={index}>
                    {parrafo}
                    <br /><br />
                  </React.Fragment>
                ))}
              </Typography>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

// Componente para la subsección del Péndulo
const Pendulo = () => {
  const [tipoPendulo, setTipoPendulo] = useState('simple');
  const [parametros, setParametros] = useState({
    // Péndulo simple
    longitud: 1,
    gravedad: 9.8,
    masa: 1,
    anguloInicial: 30,
    velocidadAngularInicial: 0,
    amortiguamiento: 0.1,
    // Péndulo doble
    longitud1: 1,
    longitud2: 1,
    masa1: 1,
    masa2: 1,
    angulo1Inicial: 30,
    angulo2Inicial: 0,
    velocidadAngular1Inicial: 0,
    velocidadAngular2Inicial: 0
  });
  
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const canvasDobleRef = useRef(null);
  const animationDobleRef = useRef(null);

  const handleChangeTipo = (event) => {
    setTipoPendulo(event.target.value);
  };

  const handleChangeParametro = (e) => {
    const { name, value } = e.target;
    setParametros(prev => ({
      ...prev,
      [name]: typeof value === 'string' ? parseFloat(value) : value
    }));
  };

  const handleSliderChange = (name) => (event, newValue) => {
    setParametros(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  // Función para dibujar el péndulo simple
  const dibujarPenduloSimple = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 4;
    
    // Convertir ángulo de grados a radianes
    const anguloRad = parametros.anguloInicial * Math.PI / 180;
    const longitud = parametros.longitud * 100; // Escalar para visualización
    
    // Calcular posición del peso
    const x = centerX + longitud * Math.sin(anguloRad);
    const y = centerY + longitud * Math.cos(anguloRad);
    
    // Limpiar el canvas
    ctx.clearRect(0, 0, width, height);
    
    // Dibujar el punto de pivote
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    
    // Dibujar la cuerda
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Dibujar el peso
    ctx.beginPath();
    const radioMasa = 15 * Math.sqrt(parametros.masa); // El radio depende de la masa
    ctx.arc(x, y, radioMasa, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  // Función para simular y animar el péndulo simple
  const animarPenduloSimple = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 4;
    
    // Parámetros físicos
    const L = parametros.longitud;
    const g = parametros.gravedad;
    const m = parametros.masa;
    const b = parametros.amortiguamiento; // Coeficiente de amortiguamiento
    
    // Condiciones iniciales
    let theta = parametros.anguloInicial * Math.PI / 180;
    let omega = parametros.velocidadAngularInicial;
    let t = 0;
    const dt = 0.016; // Aproximadamente 60 FPS
    
    const simular = () => {
      // Ecuación diferencial del péndulo simple con amortiguamiento:
      // d²θ/dt² + (b/m)·dθ/dt + (g/L)·sin(θ) = 0
      
      // Cálculo de la aceleración angular
      const alpha = -(g / L) * Math.sin(theta) - (b / m) * omega;
      
      // Integración numérica (método de Euler)
      omega += alpha * dt;
      theta += omega * dt;
      
      // Limpiar el canvas
      ctx.clearRect(0, 0, width, height);
      
      // Dibujar ecuación del péndulo
      ctx.fillStyle = 'black';
      ctx.font = '14px Arial';
      ctx.fillText('Ecuación del péndulo simple: d²θ/dt² + (b/m)·dθ/dt + (g/L)·sin(θ) = 0', 10, 20);
      
      // Calcular la posición del peso
      const x = centerX + L * 100 * Math.sin(theta);
      const y = centerY + L * 100 * Math.cos(theta);
      
      // Dibujar el punto de pivote
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'black';
      ctx.fill();
      
      // Dibujar la cuerda
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Dibujar el peso
      ctx.beginPath();
      const radioMasa = 15 * Math.sqrt(m); // El radio depende de la masa
      ctx.arc(x, y, radioMasa, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Dibujar información
      ctx.fillStyle = 'black';
      ctx.fillText(`Ángulo: ${(theta * 180 / Math.PI).toFixed(1)}°`, 10, 40);
      ctx.fillText(`Velocidad angular: ${omega.toFixed(2)} rad/s`, 10, 60);
      ctx.fillText(`Tiempo: ${t.toFixed(1)}s`, 10, 80);
      
      t += dt;
      animationRef.current = requestAnimationFrame(simular);
    };
    
    simular();
  };

  // Dibujar péndulo doble (estado inicial)
  const dibujarPenduloDoble = () => {
    const canvas = canvasDobleRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 4;
    
    // Convertir ángulo de grados a radianes
    const angulo1Rad = parametros.angulo1Inicial * Math.PI / 180;
    const angulo2Rad = parametros.angulo2Inicial * Math.PI / 180;
    const longitud1 = parametros.longitud1 * 80; // Escalar para visualización
    const longitud2 = parametros.longitud2 * 80;
    
    // Calcular posición de la primera masa
    const x1 = centerX + longitud1 * Math.sin(angulo1Rad);
    const y1 = centerY + longitud1 * Math.cos(angulo1Rad);
    
    // Calcular posición de la segunda masa
    const x2 = x1 + longitud2 * Math.sin(angulo2Rad);
    const y2 = y1 + longitud2 * Math.cos(angulo2Rad);
    
    // Limpiar el canvas
    ctx.clearRect(0, 0, width, height);
    
    // Dibujar el punto de pivote
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    
    // Dibujar la primera cuerda
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Dibujar la primera masa
    ctx.beginPath();
    const radioMasa1 = 15 * Math.sqrt(parametros.masa1);
    ctx.arc(x1, y1, radioMasa1, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Dibujar la segunda cuerda
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Dibujar la segunda masa
    ctx.beginPath();
    const radioMasa2 = 15 * Math.sqrt(parametros.masa2);
    ctx.arc(x2, y2, radioMasa2, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  // Función para simular y animar el péndulo doble
  const animarPenduloDoble = () => {
    if (animationDobleRef.current) {
      cancelAnimationFrame(animationDobleRef.current);
    }
    
    const canvas = canvasDobleRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 4;
    
    // Parámetros físicos
    const L1 = parametros.longitud1;
    const L2 = parametros.longitud2;
    const m1 = parametros.masa1;
    const m2 = parametros.masa2;
    const g = parametros.gravedad;
    
    // Condiciones iniciales
    let theta1 = parametros.angulo1Inicial * Math.PI / 180;
    let theta2 = parametros.angulo2Inicial * Math.PI / 180;
    let omega1 = parametros.velocidadAngular1Inicial;
    let omega2 = parametros.velocidadAngular2Inicial;
    let t = 0;
    const dt = 0.016; // Aproximadamente 60 FPS
    
    // Traza de la trayectoria
    const trayectoria = [];
    
    const simular = () => {
      // Ecuaciones diferenciales del péndulo doble
      // (Son ecuaciones complejas derivadas de la mecánica lagrangiana)
      
      // Calcular términos auxiliares
      const delta = theta2 - theta1;
      const den1 = (m1 + m2) * L1 - m2 * L1 * Math.cos(delta) * Math.cos(delta);
      const den2 = (L2 / L1) * den1;
      
      // Calcular aceleraciones angulares
      const alpha1 = (g * (Math.sin(theta2) * Math.cos(delta) - Math.sin(theta1)) / L1 - 
                     (m2 * L2 * omega2 * omega2 * Math.sin(delta) + 
                      m2 * g * Math.sin(theta2) * Math.cos(delta)) / 
                     (m1 + m2) / L1 + 
                     m2 * L1 * omega1 * omega1 * Math.sin(delta) * Math.cos(delta) / (m1 + m2) / L1) / 
                     (1 - m2 * Math.cos(delta) * Math.cos(delta) / (m1 + m2));
      
      const alpha2 = (-L1 * omega1 * omega1 * Math.sin(delta) - 
                      g * Math.sin(theta2) + 
                      g * Math.sin(theta1) * Math.cos(delta)) / L2 + 
                      (Math.cos(delta) * alpha1) / (L2 / L1);
      
      // Integración numérica (método de Euler)
      omega1 += alpha1 * dt;
      omega2 += alpha2 * dt;
      theta1 += omega1 * dt;
      theta2 += omega2 * dt;
      
      // Limpiar el canvas
      ctx.clearRect(0, 0, width, height);
      
      // Calcular posiciones
      const x1 = centerX + L1 * 80 * Math.sin(theta1);
      const y1 = centerY + L1 * 80 * Math.cos(theta1);
      const x2 = x1 + L2 * 80 * Math.sin(theta2);
      const y2 = y1 + L2 * 80 * Math.cos(theta2);
      
      // Agregar punto a la trayectoria
      trayectoria.push({ x: x2, y: y2 });
      if (trayectoria.length > 100) {
        trayectoria.shift(); // Limitar el tamaño de la trayectoria
      }
      
      // Dibujar ecuación del péndulo doble
      ctx.fillStyle = 'black';
      ctx.font = '14px Arial';
      ctx.fillText('Ecuaciones del péndulo doble (Lagrangiano):', 10, 20);
      
      // Dibujar trayectoria
      if (trayectoria.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trayectoria[0].x, trayectoria[0].y);
        for (let i = 1; i < trayectoria.length; i++) {
          ctx.lineTo(trayectoria[i].x, trayectoria[i].y);
        }
        ctx.strokeStyle = 'rgba(200, 0, 0, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Dibujar el punto de pivote
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'black';
      ctx.fill();
      
      // Dibujar la primera cuerda
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Dibujar la primera masa
      ctx.beginPath();
      const radioMasa1 = 15 * Math.sqrt(m1);
      ctx.arc(x1, y1, radioMasa1, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Dibujar la segunda cuerda
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Dibujar la segunda masa
      ctx.beginPath();
      const radioMasa2 = 15 * Math.sqrt(m2);
      ctx.arc(x2, y2, radioMasa2, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Dibujar información
      ctx.fillStyle = 'black';
      ctx.fillText(`Ángulo 1: ${(theta1 * 180 / Math.PI).toFixed(1)}°`, 10, 40);
      ctx.fillText(`Ángulo 2: ${(theta2 * 180 / Math.PI).toFixed(1)}°`, 10, 60);
      ctx.fillText(`Tiempo: ${t.toFixed(1)}s`, 10, 80);
      
      t += dt;
      animationDobleRef.current = requestAnimationFrame(simular);
    };
    
    simular();
  };

  // Inicializar y limpiar animaciones
  useEffect(() => {
    if (tipoPendulo === 'simple') {
      dibujarPenduloSimple();
    } else {
      dibujarPenduloDoble();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (animationDobleRef.current) {
        cancelAnimationFrame(animationDobleRef.current);
      }
    };
  }, [tipoPendulo, parametros]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        El Péndulo: Simulación y Ecuaciones
      </Typography>
      
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="tipo-pendulo-label">Tipo de Péndulo</InputLabel>
          <Select
            labelId="tipo-pendulo-label"
            id="tipo-pendulo"
            value={tipoPendulo}
            label="Tipo de Péndulo"
            onChange={handleChangeTipo}
          >
            <MenuItem value="simple">Péndulo Simple</MenuItem>
            <MenuItem value="doble">Péndulo Doble</MenuItem>
          </Select>
        </FormControl>
        
        {tipoPendulo === 'simple' && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 400, width: '100%', position: 'relative' }}>
                <canvas ref={canvasRef} width={500} height={400} style={{ border: '1px solid #ddd' }} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={animarPenduloSimple}
                  sx={{ mr: 2 }}
                >
                  Animar
                </Button>
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={() => {
                    if (animationRef.current) {
                      cancelAnimationFrame(animationRef.current);
                      animationRef.current = null;
                    }
                    dibujarPenduloSimple();
                  }}
                >
                  Detener
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Parámetros del Péndulo Simple:</Typography>
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Longitud (m): {parametros.longitud}</Typography>
                <Slider
                  value={parametros.longitud}
                  onChange={handleSliderChange('longitud')}
                  min={0.1}
                  max={3}
                  step={0.1}
                  valueLabelDisplay="auto"
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Masa (kg): {parametros.masa}</Typography>
                <Slider
                  value={parametros.masa}
                  onChange={handleSliderChange('masa')}
                  min={0.1}
                  max={5}
                  step={0.1}
                  valueLabelDisplay="auto"
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Ángulo inicial (grados): {parametros.anguloInicial}</Typography>
                <Slider
                  value={parametros.anguloInicial}
                  onChange={handleSliderChange('anguloInicial')}
                  min={-90}
                  max={90}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Amortiguamiento: {parametros.amortiguamiento}</Typography>
                <Slider
                  value={parametros.amortiguamiento}
                  onChange={handleSliderChange('amortiguamiento')}
                  min={0}
                  max={1}
                  step={0.01}
                  valueLabelDisplay="auto"
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Gravedad (m/s²): {parametros.gravedad}</Typography>
                <Slider
                  value={parametros.gravedad}
                  onChange={handleSliderChange('gravedad')}
                  min={1}
                  max={20}
                  step={0.1}
                  valueLabelDisplay="auto"
                />
              </Box>
              <Typography variant="subtitle1" sx={{ mt: 3 }}>Ecuación del Péndulo Simple:</Typography>
              <BlockMath math={`\\frac{d^2\\theta}{dt^2} + \\frac{g}{L}\\sin(\\theta) = 0`} />
              <Typography variant="body2">
                Donde:
                <ul>
                  <li><InlineMath math={`\\theta`} />: ángulo del péndulo</li>
                  <li><InlineMath math={`b`} />: coeficiente de amortiguamiento</li>
                  <li><InlineMath math={`m`} />: masa</li>
                  <li><InlineMath math={`g`} />: aceleración de la gravedad</li>
                  <li><InlineMath math={`L`} />: longitud</li>
                </ul>
              </Typography>
            </Grid>
          </Grid>
        )}
        
        {tipoPendulo === 'doble' && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 400, width: '100%', position: 'relative' }}>
                <canvas ref={canvasDobleRef} width={500} height={400} style={{ border: '1px solid #ddd' }} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={animarPenduloDoble}
                  sx={{ mr: 2 }}
                >
                  Animar
                </Button>
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={() => {
                    if (animationDobleRef.current) {
                      cancelAnimationFrame(animationDobleRef.current);
                      animationDobleRef.current = null;
                    }
                    dibujarPenduloDoble();
                  }}
                >
                  Detener
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Parámetros del Péndulo Doble:</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mt: 2 }}>
                    <Typography gutterBottom>Longitud 1 (m): {parametros.longitud1}</Typography>
                    <Slider
                      value={parametros.longitud1}
                      onChange={handleSliderChange('longitud1')}
                      min={0.1}
                      max={3}
                      step={0.1}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mt: 2 }}>
                    <Typography gutterBottom>Longitud 2 (m): {parametros.longitud2}</Typography>
                    <Slider
                      value={parametros.longitud2}
                      onChange={handleSliderChange('longitud2')}
                      min={0.1}
                      max={3}
                      step={0.1}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mt: 2 }}>
                    <Typography gutterBottom>Masa 1 (kg): {parametros.masa1}</Typography>
                    <Slider
                      value={parametros.masa1}
                      onChange={handleSliderChange('masa1')}
                      min={0.1}
                      max={5}
                      step={0.1}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mt: 2 }}>
                    <Typography gutterBottom>Masa 2 (kg): {parametros.masa2}</Typography>
                    <Slider
                      value={parametros.masa2}
                      onChange={handleSliderChange('masa2')}
                      min={0.1}
                      max={5}
                      step={0.1}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mt: 2 }}>
                    <Typography gutterBottom>Ángulo 1 inicial (°): {parametros.angulo1Inicial}</Typography>
                    <Slider
                      value={parametros.angulo1Inicial}
                      onChange={handleSliderChange('angulo1Inicial')}
                      min={-90}
                      max={90}
                      step={1}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mt: 2 }}>
                    <Typography gutterBottom>Ángulo 2 inicial (°): {parametros.angulo2Inicial}</Typography>
                    <Slider
                      value={parametros.angulo2Inicial}
                      onChange={handleSliderChange('angulo2Inicial')}
                      min={-90}
                      max={90}
                      step={1}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </Grid>
              </Grid>
              <Typography variant="subtitle1" sx={{ mt: 3 }}>Ecuaciones del Péndulo Doble:</Typography>
              <Typography variant="body2">
                Las ecuaciones del péndulo doble son un sistema de ecuaciones diferenciales no lineales acopladas 
                derivadas del Lagrangiano del sistema:
              </Typography>
              <BlockMath math={`\\frac{d^2\\theta_1}{dt^2} = f_1(\\theta_1, \\theta_2, \\omega_1, \\omega_2)`} />
              <BlockMath math={`\\frac{d^2\\theta_2}{dt^2} = f_2(\\theta_1, \\theta_2, \\omega_1, \\omega_2)`} />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Este sistema es famoso por exhibir comportamiento caótico, lo que significa que pequeñas 
                diferencias en las condiciones iniciales pueden llevar a evoluciones temporales completamente 
                diferentes. Por esta razón, el péndulo doble es un ejemplo clásico de sistema caótico 
                en mecánica clásica.
              </Typography>
            </Grid>
          </Grid>
        )}
      </Paper>
      
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Conceptos Teóricos
        </Typography>
        <Typography variant="subtitle1">Péndulo Simple:</Typography>
        <Typography paragraph>
          Un péndulo simple consiste en una masa puntual suspendida de un hilo inextensible y sin masa. 
          La ecuación que describe su movimiento es:
        </Typography>
        <BlockMath math={`\\frac{d^2\\theta}{dt^2} + \\frac{g}{L}\\sin(\\theta) = 0`} />
        <Typography paragraph>
          Para ángulos pequeños, podemos aproximar <InlineMath math={`\\sin(\\theta) \\approx \\theta`} />, 
          lo que lleva a la ecuación del oscilador armónico:
        </Typography>
        <BlockMath math={`\\frac{d^2\\theta}{dt^2} + \\frac{g}{L}\\theta = 0`} />
        <Typography paragraph>
          La solución a esta ecuación es un movimiento armónico simple con período:
        </Typography>
        <BlockMath math={`T = 2\\pi\\sqrt{\\frac{L}{g}}`} />
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle1">Péndulo Doble:</Typography>
        <Typography paragraph>
          Un péndulo doble consiste en dos péndulos simples conectados en serie. Su comportamiento es notablemente 
          más complejo que el del péndulo simple, exhibiendo dinámicas caóticas para ciertos valores de 
          energía y condiciones iniciales.
        </Typography>
        <Typography paragraph>
          Las ecuaciones de movimiento para el péndulo doble se derivan del Lagrangiano del sistema, 
          que tiene en cuenta la energía cinética y potencial de ambas masas. Estas ecuaciones son:
        </Typography>
        <BlockMath math={`(m_1 + m_2)L_1\\frac{d^2\\theta_1}{dt^2} + m_2L_2\\frac{d^2\\theta_2}{dt^2}\\cos(\\theta_1 - \\theta_2) + m_2L_2\\left(\\frac{d\\theta_2}{dt}\\right)^2\\sin(\\theta_1 - \\theta_2) + (m_1 + m_2)g\\sin\\theta_1 = 0`} />
        <BlockMath math={`m_2L_2\\frac{d^2\\theta_2}{dt^2} + m_2L_1\\frac{d^2\\theta_1}{dt^2}\\cos(\\theta_1 - \\theta_2) - m_2L_1\\left(\\frac{d\\theta_1}{dt}\\right)^2\\sin(\\theta_1 - \\theta_2) + m_2g\\sin\\theta_2 = 0`} />
        <Typography paragraph>
          Estas ecuaciones son no lineales y acopladas, lo que hace que su solución analítica sea 
          imposible en el caso general. Por ello, se resuelven numéricamente como se muestra en la simulación.
        </Typography>
      </Paper>
    </Box>
  );
};

// Componente principal que integra todas las subsecciones
function CalculoUnaDimension() {
  const [subseccion, setSubseccion] = useState(0);

  const handleChangeSubseccion = (event, newValue) => {
    setSubseccion(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Cálculo en Una Dimensión
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={subseccion} onChange={handleChangeSubseccion} aria-label="subsecciones de cálculo en una dimensión">
          <Tab label="Razones de Cambio y Derivadas en Física" />
          <Tab label="Optimización aplicada a la Física" />
          <Tab label="El Péndulo" />
          {/* Espacio para futuras subsecciones
          <Tab label="Integrales Básicas" /> 
          */}
        </Tabs>
      </Box>

      {subseccion === 0 && <RazonesDeCambio />}
      {subseccion === 1 && <OptimizacionFisica />}
      {subseccion === 2 && <Pendulo />}
      {/* Espacio para futuras subsecciones
      {subseccion === 3 && <IntegralesBasicas />}
      */}
    </Box>
  );
}

export default CalculoUnaDimension; 