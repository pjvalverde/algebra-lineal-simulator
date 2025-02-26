import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Divider
} from '@mui/material';

// Función para crear una matriz vacía de dimensiones específicas
const crearMatrizVacia = (filas, columnas) => {
  // Asegurarse de que filas y columnas sean enteros positivos
  const f = Math.max(1, Math.floor(Number(filas)));
  const c = Math.max(1, Math.floor(Number(columnas)));
  
  // Crear matriz con valores numéricos explícitamente
  return Array(f).fill().map(() => Array(c).fill(0));
};

// Función para validar si una matriz es cuadrada
const esMatrizCuadrada = (matriz) => {
  return matriz.length === matriz[0].length;
};

// Función para calcular el determinante de una matriz 2x2
const determinante2x2 = (matriz) => {
  const a = Number(matriz[0][0]);
  const b = Number(matriz[0][1]);
  const c = Number(matriz[1][0]);
  const d = Number(matriz[1][1]);
  return a * d - b * c;
};

// Función para calcular el determinante de una matriz 3x3 usando la regla de Sarrus
const determinante3x3 = (matriz) => {
  const a = Number(matriz[0][0]);
  const b = Number(matriz[0][1]);
  const c = Number(matriz[0][2]);
  const d = Number(matriz[1][0]);
  const e = Number(matriz[1][1]);
  const f = Number(matriz[1][2]);
  const g = Number(matriz[2][0]);
  const h = Number(matriz[2][1]);
  const i = Number(matriz[2][2]);

  return (
    a * (e * i - f * h) -
    b * (d * i - f * g) +
    c * (d * h - e * g)
  );
};

function MatrizCalculadora() {
  const [filasA, setFilasA] = useState(2);
  const [columnasA, setColumnasA] = useState(2);
  const [filasB, setFilasB] = useState(2);
  const [columnasB, setColumnasB] = useState(2);
  const [matrizA, setMatrizA] = useState(crearMatrizVacia(2, 2));
  const [matrizB, setMatrizB] = useState(crearMatrizVacia(2, 2));
  const [resultado, setResultado] = useState(null);
  const [operacion, setOperacion] = useState('suma');
  const [error, setError] = useState('');

  // Manejar cambios en las dimensiones de la matriz A
  const handleCambiarDimensionesA = (e) => {
    try {
      const { name, value } = e.target;
      
      // Si el campo está vacío, permitir la edición sin cambiar la matriz
      if (value === '') {
        if (name === 'filasA') {
          setFilasA('');
        } else {
          setColumnasA('');
        }
        return;
      }
      
      // Validar que sea un número entero
      const val = parseInt(value);
      
      // Validar que el valor sea un número válido
      if (isNaN(val)) return;
      
      // Limitar a matrices de máximo 5x5 y mínimo 1x1
      if (val < 1) {
        if (name === 'filasA') {
          setFilasA(1);
          setMatrizA(crearMatrizVacia(1, columnasA));
        } else {
          setColumnasA(1);
          setMatrizA(crearMatrizVacia(filasA, 1));
        }
        return;
      }
      
      if (val > 5) {
        if (name === 'filasA') {
          setFilasA(5);
          setMatrizA(crearMatrizVacia(5, columnasA));
        } else {
          setColumnasA(5);
          setMatrizA(crearMatrizVacia(filasA, 5));
        }
        return;
      }
      
      // Caso normal: valor entre 1 y 5
      if (name === 'filasA') {
        setFilasA(val);
        setMatrizA(crearMatrizVacia(val, columnasA));
      } else {
        setColumnasA(val);
        setMatrizA(crearMatrizVacia(filasA, val));
      }
    } catch (error) {
      console.error("Error al cambiar dimensiones de matriz A:", error);
      // Restaurar valores predeterminados en caso de error
      setFilasA(2);
      setColumnasA(2);
      setMatrizA(crearMatrizVacia(2, 2));
    }
  };

  // Manejar cambios en las dimensiones de la matriz B
  const handleCambiarDimensionesB = (e) => {
    try {
      const { name, value } = e.target;
      
      // Si el campo está vacío, permitir la edición sin cambiar la matriz
      if (value === '') {
        if (name === 'filasB') {
          setFilasB('');
        } else {
          setColumnasB('');
        }
        return;
      }
      
      // Validar que sea un número entero
      const val = parseInt(value);
      
      // Validar que el valor sea un número válido
      if (isNaN(val)) return;
      
      // Limitar a matrices de máximo 5x5 y mínimo 1x1
      if (val < 1) {
        if (name === 'filasB') {
          setFilasB(1);
          setMatrizB(crearMatrizVacia(1, columnasB));
        } else {
          setColumnasB(1);
          setMatrizB(crearMatrizVacia(filasB, 1));
        }
        return;
      }
      
      if (val > 5) {
        if (name === 'filasB') {
          setFilasB(5);
          setMatrizB(crearMatrizVacia(5, columnasB));
        } else {
          setColumnasB(5);
          setMatrizB(crearMatrizVacia(filasB, 5));
        }
        return;
      }
      
      // Caso normal: valor entre 1 y 5
      if (name === 'filasB') {
        setFilasB(val);
        setMatrizB(crearMatrizVacia(val, columnasB));
      } else {
        setColumnasB(val);
        setMatrizB(crearMatrizVacia(filasB, val));
      }
    } catch (error) {
      console.error("Error al cambiar dimensiones de matriz B:", error);
      // Restaurar valores predeterminados en caso de error
      setFilasB(2);
      setColumnasB(2);
      setMatrizB(crearMatrizVacia(2, 2));
    }
  };

  // Manejar cambios en Matriz A
  const handleCambioMatrizA = (fila, columna, valor) => {
    try {
      const nuevaMatrizA = [...matrizA];
      
      console.log(`Procesando cambio en A[${fila}][${columna}], valor:`, valor, "tipo:", typeof valor);
      
      // Si es un número, asignarlo directamente
      if (typeof valor === 'number') {
        nuevaMatrizA[fila][columna] = valor;
        console.log(`  -> Asignado número directamente: ${valor}`);
        setMatrizA(nuevaMatrizA);
        return;
      }
      
      // A partir de aquí tratamos el valor como string
      if (typeof valor !== 'string') {
        console.log(`  -> Valor no es string ni número, ignorando`);
        return;
      }
      
      // Lista de patrones básicos que mantenemos durante la edición
      const patronesBasicos = ['', '-', '.', '-.', '-0.', '0.', '-0', '0'];
      
      if (patronesBasicos.includes(valor)) {
        nuevaMatrizA[fila][columna] = valor;
        console.log(`  -> Mantenido valor básico: "${valor}"`);
        setMatrizA(nuevaMatrizA);
        return;
      }
      
      // Si es un número válido, convertirlo y almacenarlo
      if (!isNaN(parseFloat(valor))) {
        // Verificar si es un formato de edición válido para mantenerlo como string
        if (/^-?\d+\.$/.test(valor)) {
          // Números que terminan en punto (mantenemos como string para edición)
          nuevaMatrizA[fila][columna] = valor;
          console.log(`  -> Mantenido número en edición: "${valor}"`);
          setMatrizA(nuevaMatrizA);
          return;
        }
        
        // Es un número completo, lo convertimos
        if (/^-?\d+\.?\d*$/.test(valor)) {
          const num = parseFloat(valor);
          nuevaMatrizA[fila][columna] = num;
          console.log(`  -> Convertido a número: ${valor} -> ${num}`);
          setMatrizA(nuevaMatrizA);
          return;
        }
      }
      
      // Si el valor no cumple con ninguna condición, lo rechazamos
      console.log(`  -> Valor rechazado: "${valor}"`);
      
    } catch (error) {
      console.error("Error al cambiar matriz A:", error);
    }
  };

  // Manejar cambios en Matriz B
  const handleCambioMatrizB = (fila, columna, valor) => {
    try {
      const nuevaMatrizB = [...matrizB];
      
      console.log(`Procesando cambio en B[${fila}][${columna}], valor:`, valor, "tipo:", typeof valor);
      
      // Si es un número, asignarlo directamente
      if (typeof valor === 'number') {
        nuevaMatrizB[fila][columna] = valor;
        console.log(`  -> Asignado número directamente: ${valor}`);
        setMatrizB(nuevaMatrizB);
        return;
      }
      
      // A partir de aquí tratamos el valor como string
      if (typeof valor !== 'string') {
        console.log(`  -> Valor no es string ni número, ignorando`);
        return;
      }
      
      // Lista de patrones básicos que mantenemos durante la edición
      const patronesBasicos = ['', '-', '.', '-.', '-0.', '0.', '-0', '0'];
      
      if (patronesBasicos.includes(valor)) {
        nuevaMatrizB[fila][columna] = valor;
        console.log(`  -> Mantenido valor básico: "${valor}"`);
        setMatrizB(nuevaMatrizB);
        return;
      }
      
      // Si es un número válido, convertirlo y almacenarlo
      if (!isNaN(parseFloat(valor))) {
        // Verificar si es un formato de edición válido para mantenerlo como string
        if (/^-?\d+\.$/.test(valor)) {
          // Números que terminan en punto (mantenemos como string para edición)
          nuevaMatrizB[fila][columna] = valor;
          console.log(`  -> Mantenido número en edición: "${valor}"`);
          setMatrizB(nuevaMatrizB);
          return;
        }
        
        // Es un número completo, lo convertimos
        if (/^-?\d+\.?\d*$/.test(valor)) {
          const num = parseFloat(valor);
          nuevaMatrizB[fila][columna] = num;
          console.log(`  -> Convertido a número: ${valor} -> ${num}`);
          setMatrizB(nuevaMatrizB);
          return;
        }
      }
      
      // Si el valor no cumple con ninguna condición, lo rechazamos
      console.log(`  -> Valor rechazado: "${valor}"`);
      
    } catch (error) {
      console.error("Error al cambiar matriz B:", error);
    }
  };

  // Realizar operaciones entre matrices
  const calcular = () => {
    try {
      setError('');
      
      // Limpiar matrices de valores temporales de edición
      const limpiarMatriz = (matriz) => {
        return matriz.map(fila => fila.map(val => {
          // Si es un string o valor especial de edición
          if (typeof val === 'string') {
            console.log('Limpiando valor string:', val);
            
            // Lista de patrones que se consideran como 0
            const patronesCero = ['', '-', '.', '-.'];
            if (patronesCero.includes(val)) {
              console.log('  -> convertido a 0 (patrón especial)');
              return 0;
            }
            
            // Verificar por patrones que terminan en punto decimal
            // Números que terminan en punto (ej: "42.", "-5.")
            if (/^-?\d+\.$/.test(val)) {
              const numFinal = parseFloat(val + "0");
              console.log(`  -> número con punto al final, convertido a ${numFinal}`);
              return numFinal;
            }
            
            // Asegurarse que todo número con punto decimal se procese correctamente
            if (/^-?\d+\.\d+$/.test(val)) {
              const numFinal = parseFloat(val);
              console.log(`  -> número decimal, convertido a ${numFinal}`);
              return numFinal;
            }
            
            // Intentar convertir cualquier otro formato a número
            const num = parseFloat(val);
            if (!isNaN(num)) {
              console.log(`  -> convertido a número: ${num}`);
              return num;
            }
            
            // Si no es un número válido, devolver 0
            console.log('  -> no es un número válido, convertido a 0');
            return 0;
          }
          
          // Si ya es un número, asegurarse de que sea un número válido
          if (typeof val === 'number' && !isNaN(val)) {
            // Simplemente devolver el número, ya está en formato correcto
            return val;
          }
          
          // Para cualquier otro caso, devolver 0
          console.log('Valor no reconocido, convertido a 0:', val, typeof val);
          return 0;
        }));
      };
      
      // Crear copias limpias de las matrices
      const matrizALimpia = limpiarMatriz(matrizA);
      const matrizBLimpia = limpiarMatriz(matrizB);
      
      // Validar que las dimensiones sean números válidos
      if (typeof filasA !== 'number' || typeof columnasA !== 'number' || 
          typeof filasB !== 'number' || typeof columnasB !== 'number' ||
          isNaN(filasA) || isNaN(columnasA) || isNaN(filasB) || isNaN(columnasB)) {
        setError('Las dimensiones de las matrices deben ser números válidos');
        return;
      }
      
      let nuevaMatrizResultado;

      switch (operacion) {
        case 'suma':
          if (filasA !== filasB || columnasA !== columnasB) {
            setError('Para sumar matrices, ambas deben tener las mismas dimensiones');
            return;
          }
          
          // Log para depuración
          console.log('Matriz A limpia antes de suma:', matrizALimpia);
          console.log('Matriz B limpia antes de suma:', matrizBLimpia);
          
          // Asegurar que todos los valores son tratados como números antes de la suma
          nuevaMatrizResultado = matrizALimpia.map((fila, i) => 
            fila.map((valA, j) => {
              const valB = matrizBLimpia[i][j];
              const resultado = valA + valB;
              // Log para depuración
              console.log(`Suma: ${valA} + ${valB} = ${resultado}`);
              return resultado;
            })
          );
          
          // Log del resultado final
          console.log('Matriz resultado de suma:', nuevaMatrizResultado);
          break;
        
        case 'resta':
          if (filasA !== filasB || columnasA !== columnasB) {
            setError('Para restar matrices, ambas deben tener las mismas dimensiones');
            return;
          }
          
          // Asegurar que todos los valores son tratados como números antes de la resta
          nuevaMatrizResultado = matrizALimpia.map((fila, i) => 
            fila.map((valA, j) => {
              const valB = matrizBLimpia[i][j];
              return valA - valB;
            })
          );
          break;
        
        case 'multiplicacion':
          if (columnasA !== filasB) {
            setError('Para multiplicar matrices, el número de columnas de A debe ser igual al número de filas de B');
            return;
          }
          
          nuevaMatrizResultado = Array(filasA).fill().map(() => Array(columnasB).fill(0));
          
          for (let i = 0; i < filasA; i++) {
            for (let j = 0; j < columnasB; j++) {
              let suma = 0;
              for (let k = 0; k < columnasA; k++) {
                // Ya no necesitamos convertir explícitamente ya que las matrices están limpias
                const valA = matrizALimpia[i][k];
                const valB = matrizBLimpia[k][j];
                suma += valA * valB;
              }
              nuevaMatrizResultado[i][j] = suma;
            }
          }
          break;
        
        case 'determinanteA':
          if (!esMatrizCuadrada(matrizALimpia)) {
            setError('Solo se puede calcular el determinante de matrices cuadradas');
            return;
          }
          
          // Ya no necesitamos una conversión adicional
          if (filasA === 1) {
            nuevaMatrizResultado = matrizALimpia[0][0];
          } else if (filasA === 2) {
            nuevaMatrizResultado = determinante2x2(matrizALimpia);
          } else if (filasA === 3) {
            nuevaMatrizResultado = determinante3x3(matrizALimpia);
          } else {
            setError('El cálculo de determinantes está implementado para matrices de hasta 3x3');
            return;
          }
          break;
        
        case 'determinanteB':
          if (!esMatrizCuadrada(matrizBLimpia)) {
            setError('Solo se puede calcular el determinante de matrices cuadradas');
            return;
          }
          
          // Ya no necesitamos una conversión adicional
          if (filasB === 1) {
            nuevaMatrizResultado = matrizBLimpia[0][0];
          } else if (filasB === 2) {
            nuevaMatrizResultado = determinante2x2(matrizBLimpia);
          } else if (filasB === 3) {
            nuevaMatrizResultado = determinante3x3(matrizBLimpia);
          } else {
            setError('El cálculo de determinantes está implementado para matrices de hasta 3x3');
            return;
          }
          break;
        
        default:
          setError('Operación no válida');
          return;
      }

      setResultado(nuevaMatrizResultado);
    } catch (err) {
      console.error("Error al realizar el cálculo:", err);
      setError('Error en el cálculo: ' + err.message);
    }
  };

  // Renderizar matriz para entrada de datos
  const renderizarMatrizInput = (matriz, handleCambio, filas, columnas) => {
    return (
      <Grid container spacing={1}>
        {Array(filas).fill().map((_, fila) => (
          <Grid item xs={12} key={fila}>
            <Box display="flex" justifyContent="center">
              {Array(columnas).fill().map((_, col) => (
                <TextField
                  key={col}
                  variant="outlined"
                  size="small"
                  type="text"
                  // Mostrar campo vacío si el valor es 0 para facilitar edición
                  value={matriz[fila][col] === 0 ? '' : matriz[fila][col]}
                  onChange={(e) => {
                    try {
                      const valor = e.target.value;
                      console.log("Entrada intento:", valor);
                      
                      // Casos especiales que siempre permitimos durante la edición
                      const patronesBasicos = [
                        '', // Vacío
                        '-', // Solo signo negativo
                        '.', // Solo punto decimal
                        '-.', // Signo negativo y punto
                        '-0.', // Para -0.x
                        '0.', // Para 0.x
                        '-0', // Negativo cero
                        '0'  // Solo cero
                      ];
                      
                      // Si es uno de los patrones básicos, aceptarlo inmediatamente
                      if (patronesBasicos.includes(valor)) {
                        console.log("Entrada aceptada (patrón básico):", valor);
                        handleCambio(fila, col, valor);
                        return;
                      }
                      
                      // Comprobar si es un número válido o en proceso de edición
                      // Primero verificamos si es un número válido usando parseFloat
                      if (!isNaN(parseFloat(valor))) {
                        // Ahora verificamos si la cadena original es un formato válido para edición
                        // Esta expresión regular permite cualquier número de dígitos antes y después del punto
                        // También maneja el caso específico del número en proceso de edición (terminando en punto)
                        if (/^-?\d+\.?\d*$/.test(valor) || /^-?\d+\.$/.test(valor)) {
                          console.log("Entrada aceptada (número válido):", valor);
                          handleCambio(fila, col, valor);
                          return;
                        }
                      }
                      
                      // Si no cumple ninguna condición anterior, rechazar
                      console.log("Entrada rechazada:", valor);
                    } catch (error) {
                      console.error("Error en campo de texto:", error);
                    }
                  }}
                  onBlur={(e) => {
                    // Al perder el foco, convertir cualquier valor temporal a número si es posible
                    const valor = e.target.value;
                    const fila = parseInt(e.target.getAttribute('data-fila'));
                    const col = parseInt(e.target.getAttribute('data-col'));
                    
                    // Patrones incompletos que se convierten a 0
                    const patronesIncompletos = ['', '-', '.', '-.'];
                    if (patronesIncompletos.includes(valor)) {
                      console.log("Convirtiendo valor incompleto a 0:", valor);
                      handleCambio(fila, col, 0);
                      return;
                    }
                    
                    // Si termina en punto, añadimos un 0 (ej: "42." -> "42.0")
                    if (/^-?\d+\.$/.test(valor)) {
                      const numFinal = parseFloat(valor + "0");
                      console.log(`Convirtiendo "${valor}" a número ${numFinal}`);
                      handleCambio(fila, col, numFinal);
                      return;
                    }
                    
                    // Para cualquier otro valor que se pueda convertir a número
                    if (!isNaN(parseFloat(valor))) {
                      const numFinal = parseFloat(valor);
                      console.log(`Convirtiendo "${valor}" a número ${numFinal}`);
                      handleCambio(fila, col, numFinal);
                      return;
                    }
                  }}
                  inputProps={{ 
                    'data-fila': fila,
                    'data-col': col,
                    style: { textAlign: 'center' },
                    // Eliminar restricciones de entrada
                    inputMode: 'text',
                    autoComplete: 'off'
                  }}
                  onFocus={(e) => e.target.select()}
                  sx={{ width: '60px', m: 0.5 }}
                  placeholder="0"
                />
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  // Renderizar matriz de resultado
  const renderizarMatrizResultado = (resultado) => {
    // Función para formatear valores numéricos
    const formatearValor = (valor) => {
      // Primero asegurarse que estamos trabajando con un número
      const num = Number(valor);
      
      // Si es exactamente cero o muy cercano a cero
      if (num === 0 || Math.abs(num) < 1e-10) return "0";
      
      // Para números enteros
      if (Number.isInteger(num)) {
        return num.toString();
      } 
      
      // Para números muy pequeños usar notación científica
      if (Math.abs(num) < 0.001) {
        return num.toExponential(2);
      }
      
      // Para valores decimales normales
      const valorRedondeado = parseFloat(num.toFixed(3));
      return valorRedondeado.toString();
    };
  
    if (resultado === null) {
      return <Typography>Realiza una operación para ver el resultado</Typography>;
    }
    
    if (typeof resultado === 'string') {
      return <Typography color="error">{resultado}</Typography>;
    }
    
    if (typeof resultado === 'number') {
      return (
        <Paper elevation={2} sx={{ p: 2, mt: 2, width: 'fit-content', mx: 'auto' }}>
          <Typography variant="h6" align="center">
            {formatearValor(resultado)}
          </Typography>
        </Paper>
      );
    }
    
    return (
      <Paper elevation={2} sx={{ p: 2, mt: 2, width: 'fit-content', mx: 'auto' }}>
        <Grid container spacing={1}>
          {resultado.map((fila, i) => (
            <Grid item xs={12} key={i}>
              <Box display="flex" justifyContent="center">
                {fila.map((valor, j) => (
                  <Box 
                    key={j} 
                    sx={{ 
                      width: '60px', 
                      height: '40px', 
                      m: 0.5, 
                      border: '1px solid rgba(0,0,0,0.2)', 
                      borderRadius: '4px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: valor === 0 ? 'rgba(0,0,0,0.03)' : 'transparent'
                    }}
                  >
                    {formatearValor(valor)}
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Calculadora de Matrices</Typography>
      <Typography paragraph>
        Crea matrices y realiza operaciones básicas como suma, resta, multiplicación y cálculo de determinantes.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Matriz A</Typography>
            <Box mb={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Filas"
                    name="filasA"
                    type="text"
                    value={filasA}
                    onChange={handleCambiarDimensionesA}
                    onBlur={(e) => {
                      if (e.target.value === '' || isNaN(parseInt(e.target.value))) {
                        setFilasA(2);
                        setMatrizA(crearMatrizVacia(2, columnasA));
                      }
                    }}
                    inputProps={{ 
                      inputMode: 'numeric',
                      pattern: '[1-5]',
                      style: { textAlign: 'center' } 
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Columnas"
                    name="columnasA"
                    type="text"
                    value={columnasA}
                    onChange={handleCambiarDimensionesA}
                    onBlur={(e) => {
                      if (e.target.value === '' || isNaN(parseInt(e.target.value))) {
                        setColumnasA(2);
                        setMatrizA(crearMatrizVacia(filasA, 2));
                      }
                    }}
                    inputProps={{ 
                      inputMode: 'numeric',
                      pattern: '[1-5]',
                      style: { textAlign: 'center' } 
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            {renderizarMatrizInput(matrizA, handleCambioMatrizA, filasA, columnasA)}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={2} display="flex" alignItems="center" justifyContent="center">
          <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
            <FormControl fullWidth>
              <InputLabel>Operación</InputLabel>
              <Select
                value={operacion}
                onChange={(e) => setOperacion(e.target.value)}
                label="Operación"
              >
                <MenuItem value="suma">Suma (A + B)</MenuItem>
                <MenuItem value="resta">Resta (A - B)</MenuItem>
                <MenuItem value="multiplicacion">Multiplicación (A × B)</MenuItem>
                <MenuItem value="determinanteA">Determinante de A</MenuItem>
                <MenuItem value="determinanteB">Determinante de B</MenuItem>
              </Select>
            </FormControl>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              onClick={calcular}
              sx={{ mt: 2 }}
            >
              Calcular
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Matriz B</Typography>
            <Box mb={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Filas"
                    name="filasB"
                    type="text"
                    value={filasB}
                    onChange={handleCambiarDimensionesB}
                    onBlur={(e) => {
                      if (e.target.value === '' || isNaN(parseInt(e.target.value))) {
                        setFilasB(2);
                        setMatrizB(crearMatrizVacia(2, columnasB));
                      }
                    }}
                    inputProps={{ 
                      inputMode: 'numeric',
                      pattern: '[1-5]',
                      style: { textAlign: 'center' } 
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Columnas"
                    name="columnasB"
                    type="text"
                    value={columnasB}
                    onChange={handleCambiarDimensionesB}
                    onBlur={(e) => {
                      if (e.target.value === '' || isNaN(parseInt(e.target.value))) {
                        setColumnasB(2);
                        setMatrizB(crearMatrizVacia(filasB, 2));
                      }
                    }}
                    inputProps={{ 
                      inputMode: 'numeric',
                      pattern: '[1-5]',
                      style: { textAlign: 'center' } 
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            {renderizarMatrizInput(matrizB, handleCambioMatrizB, filasB, columnasB)}
          </Paper>
        </Grid>
      </Grid>
      
      {error && (
        <Box mt={3} textAlign="center">
          <Typography color="error">{error}</Typography>
        </Box>
      )}
      
      <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
        {renderizarMatrizResultado(resultado)}
      </Paper>
    </Box>
  );
}

export default MatrizCalculadora;