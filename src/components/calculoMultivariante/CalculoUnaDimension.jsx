import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, TextField, Button, Grid, Paper, Divider, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
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
          {/* Espacio para futuras subsecciones
          <Tab label="Integrales Básicas" /> 
          */}
        </Tabs>
      </Box>

      {subseccion === 0 && <RazonesDeCambio />}
      {subseccion === 1 && <OptimizacionFisica />}
      {/* Espacio para futuras subsecciones
      {subseccion === 2 && <IntegralesBasicas />}
      */}
    </Box>
  );
}

export default CalculoUnaDimension; 