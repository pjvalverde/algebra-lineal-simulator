import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Typography, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
  Slider
} from '@mui/material';

// Función para crear una matriz vacía de dimensiones específicas
const crearMatrizVacia = (dimension) => {
  // Asegurarse de que la dimensión sea un entero positivo
  const n = Math.max(1, Math.floor(Number(dimension) || 3));
  
  // Crear matriz con valores numéricos explícitamente
  return Array(n).fill().map(() => Array(n).fill(0));
};

function SistemaEcuaciones() {
  const [dimension, setDimension] = useState(3);
  const [dimensionTexto, setDimensionTexto] = useState("3"); // Nuevo estado para manejar el texto del campo
  const [coeficientes, setCoeficientes] = useState(crearMatrizVacia(3));
  const [constantesB, setConstantesB] = useState(Array(3).fill(0));
  const [solucion, setSolucion] = useState(null);
  const [tipoSolucion, setTipoSolucion] = useState(''); // 'única', 'infinitas', 'ninguna'
  const [error, setError] = useState('');
  const [metodo, setMetodo] = useState('gauss');
  const [pasos, setPasos] = useState([]);
  const [mostrarPasos, setMostrarPasos] = useState(false);

  // Efecto para reiniciar matrices cuando cambia la dimensión
  useEffect(() => {
    if (typeof dimension === 'number' && !isNaN(dimension)) {
      const nuevaMatriz = crearMatrizVacia(dimension);
      const nuevasConstantes = Array(dimension).fill(0);
      setCoeficientes(nuevaMatriz);
      setConstantesB(nuevasConstantes);
      setSolucion(null);
      setTipoSolucion('');
      setError('');
      setPasos([]);
    }
  }, [dimension]);

  // Manejar cambios en la dimensión del sistema
  const handleCambiarDimension = (e) => {
    try {
      const { value } = e.target;
      setDimensionTexto(value); // Guardamos el texto tal como es
      
      // Si el campo está vacío, solo actualizamos el texto pero no la dimensión
      if (value === '') {
        return;
      }
      
      // Validar que sea un número entero
      const val = parseInt(value);
      
      // Validar que el valor sea un número válido
      if (isNaN(val)) return;
      
      // Limitar a sistemas de máximo 8x8 y mínimo 1x1
      if (val < 1) {
        setDimension(1);
        setDimensionTexto('1');
        return;
      }
      
      if (val > 8) {
        setDimension(8);
        setDimensionTexto('8');
        return;
      }
      
      // Caso normal: valor entre 1 y 8
      setDimension(val);
    } catch (error) {
      console.error("Error al cambiar dimensiones:", error);
      // Restaurar valores predeterminados en caso de error
      setDimension(3);
      setDimensionTexto('3');
    }
  };

  // Manejar cuando el campo de dimensión pierde el foco
  const handleDimensionBlur = () => {
    if (dimensionTexto === '' || isNaN(parseInt(dimensionTexto))) {
      setDimension(3);
      setDimensionTexto('3');
    } else {
      // Asegurarse de que dimensionTexto y dimension estén sincronizados
      const val = parseInt(dimensionTexto);
      if (val < 1) {
        setDimension(1);
        setDimensionTexto('1');
      } else if (val > 8) {
        setDimension(8);
        setDimensionTexto('8');
      } else {
        setDimension(val);
        setDimensionTexto(val.toString());
      }
    }
  };

  // Actualizar dimensión cuando cambia el slider
  const handleSliderChange = (_, newValue) => {
    setDimension(newValue);
    setDimensionTexto(newValue.toString());
  };

  // Manejar cambios en los coeficientes
  const handleCambioCoeficiente = (fila, columna, valor) => {
    try {
      const nuevosCoeficientes = [...coeficientes];
      
      console.log(`Procesando cambio en coeficiente[${fila}][${columna}], valor:`, valor, "tipo:", typeof valor);
      
      // Si es un número, asignarlo directamente
      if (typeof valor === 'number') {
        nuevosCoeficientes[fila][columna] = valor;
        console.log(`  -> Asignado número directamente: ${valor}`);
        setCoeficientes(nuevosCoeficientes);
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
        nuevosCoeficientes[fila][columna] = valor;
        console.log(`  -> Mantenido valor básico: "${valor}"`);
        setCoeficientes(nuevosCoeficientes);
        return;
      }
      
      // Si es un número válido, convertirlo y almacenarlo
      if (!isNaN(parseFloat(valor))) {
        // Verificar si es un formato de edición válido para mantenerlo como string
        if (/^-?\d+\.$/.test(valor)) {
          // Números que terminan en punto (mantenemos como string para edición)
          nuevosCoeficientes[fila][columna] = valor;
          console.log(`  -> Mantenido número en edición: "${valor}"`);
          setCoeficientes(nuevosCoeficientes);
          return;
        }
        
        // Es un número completo, lo convertimos
        if (/^-?\d+\.?\d*$/.test(valor)) {
          const num = parseFloat(valor);
          nuevosCoeficientes[fila][columna] = num;
          console.log(`  -> Convertido a número: ${valor} -> ${num}`);
          setCoeficientes(nuevosCoeficientes);
          return;
        }
      }
      
      // Si el valor no cumple con ninguna condición, lo rechazamos
      console.log(`  -> Valor rechazado: "${valor}"`);
      
    } catch (error) {
      console.error("Error al cambiar coeficiente:", error);
    }
  };

  // Manejar cambios en las constantes (lado derecho de las ecuaciones)
  const handleCambioConstante = (indice, valor) => {
    try {
      const nuevasConstantes = [...constantesB];
      
      console.log(`Procesando cambio en constante[${indice}], valor:`, valor, "tipo:", typeof valor);
      
      // Si es un número, asignarlo directamente
      if (typeof valor === 'number') {
        nuevasConstantes[indice] = valor;
        console.log(`  -> Asignado número directamente: ${valor}`);
        setConstantesB(nuevasConstantes);
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
        nuevasConstantes[indice] = valor;
        console.log(`  -> Mantenido valor básico: "${valor}"`);
        setConstantesB(nuevasConstantes);
        return;
      }
      
      // Si es un número válido, convertirlo y almacenarlo
      if (!isNaN(parseFloat(valor))) {
        // Verificar si es un formato de edición válido para mantenerlo como string
        if (/^-?\d+\.$/.test(valor)) {
          // Números que terminan en punto (mantenemos como string para edición)
          nuevasConstantes[indice] = valor;
          console.log(`  -> Mantenido número en edición: "${valor}"`);
          setConstantesB(nuevasConstantes);
          return;
        }
        
        // Es un número completo, lo convertimos
        if (/^-?\d+\.?\d*$/.test(valor)) {
          const num = parseFloat(valor);
          nuevasConstantes[indice] = num;
          console.log(`  -> Convertido a número: ${valor} -> ${num}`);
          setConstantesB(nuevasConstantes);
          return;
        }
      }
      
      // Si el valor no cumple con ninguna condición, lo rechazamos
      console.log(`  -> Valor rechazado: "${valor}"`);
      
    } catch (error) {
      console.error("Error al cambiar constante:", error);
    }
  };

  // Función para limpiar valores temporales antes de resolver
  const limpiarValores = (valor) => {
    // Si es un string o valor especial de edición
    if (typeof valor === 'string') {
      console.log('Limpiando valor string:', valor);
      
      // Lista de patrones que se consideran como 0
      const patronesCero = ['', '-', '.', '-.'];
      if (patronesCero.includes(valor)) {
        console.log('  -> convertido a 0 (patrón especial)');
        return 0;
      }
      
      // Verificar por patrones que terminan en punto decimal
      if (/^-?\d+\.$/.test(valor)) {
        const numFinal = parseFloat(valor + "0");
        console.log(`  -> número con punto al final, convertido a ${numFinal}`);
        return numFinal;
      }
      
      // Asegurarse que todo número con punto decimal se procese correctamente
      if (/^-?\d+\.\d+$/.test(valor)) {
        const numFinal = parseFloat(valor);
        console.log(`  -> número decimal, convertido a ${numFinal}`);
        return numFinal;
      }
      
      // Intentar convertir cualquier otro formato a número
      const num = parseFloat(valor);
      if (!isNaN(num)) {
        console.log(`  -> convertido a número: ${num}`);
        return num;
      }
      
      // Si no es un número válido, devolver 0
      console.log('  -> no es un número válido, convertido a 0');
      return 0;
    }
    
    // Si ya es un número, asegurarse de que sea un número válido
    if (typeof valor === 'number' && !isNaN(valor)) {
      return valor;
    }
    
    // Para cualquier otro caso, devolver 0
    console.log('Valor no reconocido, convertido a 0:', valor, typeof valor);
    return 0;
  };

  // Función para formatear números en la visualización
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

  // Método de Gauss-Jordan para resolver sistemas de ecuaciones
  const gaussJordan = (matrizAux, vectorB) => {
    const n = matrizAux.length; // dimensión del sistema cuadrado
    
    // Crear matriz aumentada [A|b]
    const matrizAumentada = matrizAux.map((fila, i) => [...fila, vectorB[i]]);
    
    // Historial de pasos para mostrar el proceso
    const historialPasos = [
      {
        descripcion: 'Matriz aumentada inicial [A|b]',
        matriz: JSON.parse(JSON.stringify(matrizAumentada))
      }
    ];
    
    // Algoritmo de Gauss-Jordan (eliminación hacia adelante y hacia atrás)
    for (let i = 0; i < n; i++) {
      // Encontrar el pivote máximo en esta columna (debajo de la fila actual)
      let maxRow = i;
      for (let j = i + 1; j < n; j++) {
        if (Math.abs(matrizAumentada[j][i]) > Math.abs(matrizAumentada[maxRow][i])) {
          maxRow = j;
        }
      }
      
      // Si es necesario, intercambiar filas
      if (maxRow !== i) {
        [matrizAumentada[i], matrizAumentada[maxRow]] = [matrizAumentada[maxRow], matrizAumentada[i]];
        
        historialPasos.push({
          descripcion: `Intercambio de filas ${i+1} y ${maxRow+1}`,
          matriz: JSON.parse(JSON.stringify(matrizAumentada))
        });
      }
      
      // Si el pivote es cero (o muy cercano a cero), pasar a la siguiente columna
      if (Math.abs(matrizAumentada[i][i]) < 1e-10) {
        continue;
      }
      
      // Normalizar la fila del pivote
      const pivote = matrizAumentada[i][i];
      for (let j = i; j <= n; j++) {
        matrizAumentada[i][j] /= pivote;
      }
      
      historialPasos.push({
        descripcion: `Normalización de la fila ${i+1} (dividir por ${formatearValor(pivote)})`,
        matriz: JSON.parse(JSON.stringify(matrizAumentada))
      });
      
      // Eliminación hacia adelante y hacia atrás
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = matrizAumentada[k][i];
          for (let j = i; j <= n; j++) {
            matrizAumentada[k][j] -= factor * matrizAumentada[i][j];
          }
          
          historialPasos.push({
            descripcion: `Eliminación en la fila ${k+1} usando la fila ${i+1} (factor: ${formatearValor(factor)})`,
            matriz: JSON.parse(JSON.stringify(matrizAumentada))
          });
        }
      }
    }
    
    // Análisis de soluciones
    let tipoSol = 'única';
    let solucionFinal = Array(n).fill(null);
    let filasNulas = 0;
    
    // Comprobar si hay filas nulas o inconsistentes
    for (let i = 0; i < n; i++) {
      let esFilaNula = true;
      
      // Comprobar si todos los coeficientes son 0
      for (let j = 0; j < n; j++) {
        if (Math.abs(matrizAumentada[i][j]) >= 1e-10) {
          esFilaNula = false;
          break;
        }
      }
      
      // Si es fila nula, comprobar el término independiente
      if (esFilaNula) {
        if (Math.abs(matrizAumentada[i][n]) >= 1e-10) {
          // 0 = b (donde b ≠ 0) -> sistema inconsistente
          tipoSol = 'ninguna';
          break;
        }
        filasNulas++;
      }
    }
    
    // Si hay filas nulas pero el sistema es compatible, hay infinitas soluciones
    if (tipoSol !== 'ninguna' && filasNulas > 0) {
      tipoSol = 'infinitas';
    }
    
    // Extraer la solución
    if (tipoSol === 'única') {
      for (let i = 0; i < n; i++) {
        // Buscar la fila con 1 en la posición i
        for (let k = 0; k < n; k++) {
          if (Math.abs(matrizAumentada[k][i] - 1) < 1e-10) {
            let esFilaSolucion = true;
            
            // Verificar que es una fila de la forma [0,...,0,1,0,...,0,b]
            for (let j = 0; j < n; j++) {
              if (j !== i && Math.abs(matrizAumentada[k][j]) >= 1e-10) {
                esFilaSolucion = false;
                break;
              }
            }
            
            if (esFilaSolucion) {
              solucionFinal[i] = matrizAumentada[k][n];
              break;
            }
          }
        }
      }
      
      // Verificar que todas las variables tienen solución
      for (let i = 0; i < n; i++) {
        if (solucionFinal[i] === null) {
          tipoSol = 'infinitas'; // Alguna variable no tiene valor único
          break;
        }
      }
    }
    
    return {
      matrizFinal: matrizAumentada,
      solucion: solucionFinal,
      tipoSolucion: tipoSol,
      pasos: historialPasos
    };
  };

  // Función para resolver el sistema
  const resolverSistema = () => {
    try {
      setError('');
      setSolucion(null);
      setTipoSolucion('');
      setPasos([]);
      
      // Limpiar la matriz de coeficientes y el vector de constantes
      const matrizLimpia = coeficientes.map(fila => 
        fila.map(valor => limpiarValores(valor))
      );
      
      const constantesLimpias = constantesB.map(valor => 
        limpiarValores(valor)
      );
      
      console.log('Matriz de coeficientes limpia:', matrizLimpia);
      console.log('Vector de constantes limpio:', constantesLimpias);
      
      // Resolver el sistema usando el método seleccionado
      if (metodo === 'gauss') {
        const resultado = gaussJordan(matrizLimpia, constantesLimpias);
        setSolucion(resultado.solucion);
        setTipoSolucion(resultado.tipoSolucion);
        setPasos(resultado.pasos);
      } else {
        // Implementar otros métodos en el futuro
        setError('Método no implementado');
      }
      
    } catch (err) {
      console.error("Error al resolver el sistema:", err);
      setError('Error en el cálculo: ' + err.message);
    }
  };

  // Renderizar el sistema de ecuaciones
  const renderizarSistema = () => {
    const dim = typeof dimension === 'number' && !isNaN(dimension) ? dimension : 3;
    
    return (
      <Grid container spacing={1}>
        {Array(dim).fill().map((_, ecuacion) => (
          <Grid item xs={12} key={ecuacion}>
            <Box display="flex" alignItems="center" mb={1}>
              {Array(dim).fill().map((_, variable) => (
                <Box display="flex" alignItems="center" key={variable}>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="text"
                    value={coeficientes[ecuacion] && coeficientes[ecuacion][variable] === 0 ? '' : 
                           coeficientes[ecuacion] ? coeficientes[ecuacion][variable] : ''}
                    onChange={(e) => {
                      try {
                        const valor = e.target.value;
                        
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
                          handleCambioCoeficiente(ecuacion, variable, valor);
                          return;
                        }
                        
                        // Comprobar si es un número válido o en proceso de edición
                        if (!isNaN(parseFloat(valor))) {
                          if (/^-?\d+\.?\d*$/.test(valor) || /^-?\d+\.$/.test(valor)) {
                            handleCambioCoeficiente(ecuacion, variable, valor);
                            return;
                          }
                        }
                      } catch (error) {
                        console.error("Error en campo de texto:", error);
                      }
                    }}
                    onBlur={(e) => {
                      const valor = e.target.value;
                      
                      // Patrones incompletos que se convierten a 0
                      const patronesIncompletos = ['', '-', '.', '-.'];
                      if (patronesIncompletos.includes(valor)) {
                        handleCambioCoeficiente(ecuacion, variable, 0);
                        return;
                      }
                      
                      // Si termina en punto, añadimos un 0 (ej: "42." -> "42.0")
                      if (/^-?\d+\.$/.test(valor)) {
                        const numFinal = parseFloat(valor + "0");
                        handleCambioCoeficiente(ecuacion, variable, numFinal);
                        return;
                      }
                      
                      // Para cualquier otro valor que se pueda convertir a número
                      if (!isNaN(parseFloat(valor))) {
                        const numFinal = parseFloat(valor);
                        handleCambioCoeficiente(ecuacion, variable, numFinal);
                        return;
                      }
                    }}
                    inputProps={{
                      style: { textAlign: 'center' },
                      inputMode: 'text',
                      autoComplete: 'off'
                    }}
                    onFocus={(e) => e.target.select()}
                    sx={{ width: '60px', mx: 0.5 }}
                    placeholder="0"
                  />
                  <Typography sx={{ mx: 0.5 }}>
                    {variable < dim - 1 ? `x${variable + 1} +` : `x${variable + 1} =`}
                  </Typography>
                </Box>
              ))}
              <TextField
                variant="outlined"
                size="small"
                type="text"
                value={constantesB[ecuacion] === 0 ? '' : constantesB[ecuacion]}
                onChange={(e) => {
                  try {
                    const valor = e.target.value;
                    
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
                      handleCambioConstante(ecuacion, valor);
                      return;
                    }
                    
                    // Comprobar si es un número válido o en proceso de edición
                    if (!isNaN(parseFloat(valor))) {
                      if (/^-?\d+\.?\d*$/.test(valor) || /^-?\d+\.$/.test(valor)) {
                        handleCambioConstante(ecuacion, valor);
                        return;
                      }
                    }
                  } catch (error) {
                    console.error("Error en campo de texto:", error);
                  }
                }}
                onBlur={(e) => {
                  const valor = e.target.value;
                  
                  // Patrones incompletos que se convierten a 0
                  const patronesIncompletos = ['', '-', '.', '-.'];
                  if (patronesIncompletos.includes(valor)) {
                    handleCambioConstante(ecuacion, 0);
                    return;
                  }
                  
                  // Si termina en punto, añadimos un 0 (ej: "42." -> "42.0")
                  if (/^-?\d+\.$/.test(valor)) {
                    const numFinal = parseFloat(valor + "0");
                    handleCambioConstante(ecuacion, numFinal);
                    return;
                  }
                  
                  // Para cualquier otro valor que se pueda convertir a número
                  if (!isNaN(parseFloat(valor))) {
                    const numFinal = parseFloat(valor);
                    handleCambioConstante(ecuacion, numFinal);
                    return;
                  }
                }}
                inputProps={{
                  style: { textAlign: 'center' },
                  inputMode: 'text',
                  autoComplete: 'off'
                }}
                onFocus={(e) => e.target.select()}
                sx={{ width: '60px', mx: 0.5 }}
                placeholder="0"
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  // Renderizar los resultados
  const renderizarResultados = () => {
    if (error) {
      return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
    }
    
    if (!solucion) {
      return <Typography sx={{ mt: 2 }}>Ingrese los coeficientes y presione "Resolver" para obtener la solución.</Typography>;
    }
    
    if (tipoSolucion === 'ninguna') {
      return <Alert severity="info" sx={{ mt: 2 }}>El sistema no tiene solución.</Alert>;
    }
    
    if (tipoSolucion === 'infinitas') {
      return <Alert severity="info" sx={{ mt: 2 }}>El sistema tiene infinitas soluciones.</Alert>;
    }
    
    // Caso de solución única
    return (
      <Paper elevation={2} sx={{ p: 2, mt: 2, width: 'fit-content', mx: 'auto' }}>
        <Typography variant="h6" gutterBottom>Solución:</Typography>
        <Grid container spacing={1}>
          {solucion.map((valor, i) => (
            <Grid item key={i}>
              <Box sx={{ 
                p: 1, 
                border: '1px solid rgba(0,0,0,0.2)', 
                borderRadius: '4px',
                minWidth: '80px',
                textAlign: 'center'
              }}>
                <Typography>
                  x<sub>{i+1}</sub> = {formatearValor(valor)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  };

  // Renderizar pasos de la solución
  const renderizarPasos = () => {
    if (!mostrarPasos || pasos.length === 0) {
      return null;
    }
    
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>Pasos de resolución:</Typography>
        {pasos.map((paso, indice) => (
          <Paper key={indice} elevation={1} sx={{ p: 2, mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Paso {indice + 1}: {paso.descripcion}
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ borderCollapse: 'collapse', margin: '0 auto' }}>
                <tbody>
                  {paso.matriz.map((fila, i) => (
                    <tr key={i}>
                      {fila.map((valor, j) => (
                        <td 
                          key={j} 
                          style={{ 
                            padding: '6px 10px', 
                            textAlign: 'center',
                            border: '1px solid rgba(0,0,0,0.12)',
                            backgroundColor: j === fila.length - 1 ? 'rgba(0,0,0,0.05)' : 'transparent'
                          }}
                        >
                          {j === fila.length - 1 && j > 0 ? '| ' : ''}
                          {formatearValor(valor)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Paper>
        ))}
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Resolución de Sistemas de Ecuaciones Cuadrados (nxn)</Typography>
      <Typography paragraph>
        Resuelve sistemas de ecuaciones lineales cuadrados de la forma Ax = b mediante el método de Gauss-Jordan.
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Dimensión del sistema (n)"
                name="dimension"
                type="text"
                value={dimensionTexto}
                onChange={handleCambiarDimension}
                onBlur={handleDimensionBlur}
                inputProps={{ 
                  inputMode: 'numeric',
                  pattern: '[1-8]',
                  style: { textAlign: 'center' } 
                }}
                helperText="Número de ecuaciones y variables (entre 1 y 8)"
              />
              <Box sx={{ mt: 2, px: 2 }}>
                <Typography gutterBottom>Tamaño del sistema</Typography>
                <Slider
                  value={typeof dimension === 'number' && !isNaN(dimension) ? dimension : 3}
                  onChange={handleSliderChange}
                  min={1}
                  max={8}
                  step={1}
                  marks
                  valueLabelDisplay="auto"
                  aria-labelledby="dimension-slider"
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Método de resolución</InputLabel>
              <Select
                value={metodo}
                onChange={(e) => setMetodo(e.target.value)}
                label="Método de resolución"
              >
                <MenuItem value="gauss">Gauss-Jordan</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Sistema de ecuaciones ({typeof dimension === 'number' && !isNaN(dimension) ? dimension : 3}x{typeof dimension === 'number' && !isNaN(dimension) ? dimension : 3}):
        </Typography>
        {renderizarSistema()}
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            onClick={() => setMostrarPasos(!mostrarPasos)}
          >
            {mostrarPasos ? 'Ocultar pasos' : 'Mostrar pasos'}
          </Button>
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={resolverSistema}
          >
            Resolver
          </Button>
        </Box>
      </Paper>
      
      {renderizarResultados()}
      {renderizarPasos()}
    </Box>
  );
}

export default SistemaEcuaciones; 