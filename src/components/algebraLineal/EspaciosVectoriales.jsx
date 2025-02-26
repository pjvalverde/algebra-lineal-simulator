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
  Tabs,
  Tab
} from '@mui/material';

function EspaciosVectoriales() {
  // Estado para el tab actual
  const [tabValue, setTabValue] = useState(0);
  
  // Estados para los vectores
  const [dimension, setDimension] = useState(3);
  const [numVectores, setNumVectores] = useState(2);
  const [vectores, setVectores] = useState([
    Array(3).fill(0),
    Array(3).fill(0),
  ]);
  
  // Estado para los resultados
  const [resultados, setResultados] = useState({
    independientesLinealmente: false,
    esBase: false,
    generaEspacio: false,
    mensaje: '',
    detalles: [],
    error: ''
  });
  
  // Estado para mostrar pasos de Gram-Schmidt
  const [mostrarPasosGramSchmidt, setMostrarPasosGramSchmidt] = useState(true);
  
  // Efecto para reiniciar vectores cuando cambian las dimensiones
  useEffect(() => {
    resetVectores();
  }, [dimension, numVectores]);
  
  // Función para resetear los vectores
  const resetVectores = () => {
    const nuevosVectores = Array(numVectores).fill().map(() => Array(dimension).fill(0));
    setVectores(nuevosVectores);
    setResultados({
      independientesLinealmente: false,
      esBase: false,
      generaEspacio: false,
      mensaje: '',
      detalles: [],
      error: ''
    });
  };
  
  // Manejador de cambio de tab
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Manejador de cambio de dimensión
  const handleDimensionChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 8) {
      setDimension(value);
    }
  };
  
  // Manejador de cambio de número de vectores
  const handleNumVectoresChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 8) {
      setNumVectores(value);
    }
  };
  
  // Manejador de cambio en componentes de vectores
  const handleVectorChange = (vectorIdx, componentIdx, valor) => {
    try {
      // Si es un número, asignarlo directamente
      const num = parseFloat(valor);
      if (!isNaN(num)) {
        const nuevosVectores = [...vectores];
        nuevosVectores[vectorIdx][componentIdx] = num;
        setVectores(nuevosVectores);
      } else if (valor === '' || valor === '-') {
        // Permitir edición temporal
        const nuevosVectores = [...vectores];
        nuevosVectores[vectorIdx][componentIdx] = valor;
        setVectores(nuevosVectores);
      }
    } catch (error) {
      console.error("Error al cambiar componente de vector:", error);
    }
  };
  
  // Función para verificar independencia lineal
  const verificarIndependenciaLineal = () => {
    // Convertir cualquier valor de edición a números
    const vectoresLimpios = vectores.map(vector => 
      vector.map(comp => typeof comp === 'string' ? (comp === '' || comp === '-' ? 0 : parseFloat(comp)) : comp)
    );
    
    try {
      // Para verificar independencia lineal, vamos a crear una matriz con los vectores como columnas
      // y verificar su rango
      const matriz = Array(dimension).fill().map(() => Array(numVectores).fill(0));
      
      // Llenar la matriz con los componentes de los vectores como columnas
      for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < numVectores; j++) {
          matriz[i][j] = vectoresLimpios[j][i];
        }
      }
      
      // Calcular el rango usando eliminación gaussiana
      const rango = calcularRango(matriz);
      console.log("Rango de la matriz:", rango);
      
      // Los vectores son linealmente independientes si el rango es igual al número de vectores
      const sonIndependientes = rango === numVectores;
      
      // En R^n, los vectores forman una base si son n vectores LI
      const esBase = sonIndependientes && numVectores === dimension;
      
      // Los vectores generan el espacio si el rango es igual a la dimensión del espacio
      const generaEspacio = rango === dimension;
      
      // Preparar mensaje y detalles
      let mensaje = '';
      let detalles = [];
      
      if (sonIndependientes) {
        mensaje = "Los vectores son linealmente independientes.";
        if (esBase) {
          mensaje += " Además, forman una base para R^" + dimension + ".";
        } else if (numVectores < dimension) {
          mensaje += " Sin embargo, no forman una base para R^" + dimension + " (se necesitan " + dimension + " vectores LI).";
        } else if (numVectores > dimension) {
          mensaje += " Sin embargo, hay más vectores que la dimensión del espacio, lo cual es imposible en R^" + dimension + ".";
          // Este caso no debería ocurrir si calculamos el rango correctamente
          console.warn("Posible error en cálculo de rango: más vectores LI que dimensiones");
        }
      } else {
        mensaje = "Los vectores son linealmente dependientes.";
        if (numVectores <= dimension) {
          mensaje += " No forman una base para R^" + dimension + ".";
        }
        if (generaEspacio) {
          mensaje += " Sin embargo, generan todo el espacio R^" + dimension + ".";
        } else {
          mensaje += " No generan todo el espacio R^" + dimension + ".";
        }
      }
      
      // Agregar detalles sobre el rango
      detalles.push("Rango de la matriz: " + rango);
      detalles.push("Número de vectores: " + numVectores);
      detalles.push("Dimensión del espacio: " + dimension);
      
      // Actualizar resultados
      setResultados({
        independientesLinealmente: sonIndependientes,
        esBase: esBase,
        generaEspacio: generaEspacio,
        mensaje: mensaje,
        detalles: detalles,
        error: ''
      });
      
    } catch (error) {
      console.error("Error al verificar independencia lineal:", error);
      setResultados({
        ...resultados,
        error: 'Error al realizar los cálculos: ' + error.message
      });
    }
  };
  
  // Función para calcular el rango de una matriz
  const calcularRango = (matriz) => {
    // Crear una copia para no modificar la original
    const m = matriz.map(row => [...row]);
    const filas = m.length;
    const columnas = m[0].length;
    
    let rango = 0;
    let filaPivote = 0;
    
    // Recorrer cada columna para la eliminación gaussiana
    for (let j = 0; j < columnas && filaPivote < filas; j++) {
      // Encontrar el pivote máximo en esta columna
      let maxVal = Math.abs(m[filaPivote][j]);
      let maxRow = filaPivote;
      
      for (let i = filaPivote + 1; i < filas; i++) {
        const absVal = Math.abs(m[i][j]);
        if (absVal > maxVal) {
          maxVal = absVal;
          maxRow = i;
        }
      }
      
      // Si el pivote máximo es casi cero, pasar a la siguiente columna
      if (maxVal < 1e-10) continue;
      
      // Intercambiar filas si es necesario
      if (maxRow !== filaPivote) {
        [m[filaPivote], m[maxRow]] = [m[maxRow], m[filaPivote]];
      }
      
      // Normalizar fila pivote
      const pivote = m[filaPivote][j];
      for (let k = j; k < columnas; k++) {
        m[filaPivote][k] /= pivote;
      }
      
      // Eliminar el pivote de las demás filas
      for (let i = 0; i < filas; i++) {
        if (i !== filaPivote) {
          const factor = m[i][j];
          for (let k = j; k < columnas; k++) {
            m[i][k] -= factor * m[filaPivote][k];
          }
        }
      }
      
      // Incrementar el rango y la fila pivote
      rango++;
      filaPivote++;
    }
    
    return rango;
  };
  
  // Función para calcular una base a partir de vectores dados
  const calcularBase = () => {
    // Convertir cualquier valor de edición a números
    const vectoresLimpios = vectores.map(vector => 
      vector.map(comp => typeof comp === 'string' ? (comp === '' || comp === '-' ? 0 : parseFloat(comp)) : comp)
    );
    
    try {
      // Para calcular una base, vamos a crear una matriz con los vectores como filas
      // y aplicar eliminación gaussiana
      const matriz = [...vectoresLimpios];
      
      // Inicializar variables para seguimiento
      let pasosProceso = [];
      pasosProceso.push({
        descripcion: 'Vectores iniciales',
        vectores: JSON.parse(JSON.stringify(matriz))
      });
      
      // Contador para la posición del pivote (fila, columna)
      let filaPivote = 0;
      let columnaPivote = 0;
      
      // Eliminación gaussiana para encontrar vectores LI
      while (filaPivote < numVectores && columnaPivote < dimension) {
        // Encontrar el pivote máximo en esta columna
        let maxVal = Math.abs(matriz[filaPivote][columnaPivote]);
        let maxRow = filaPivote;
        
        for (let i = filaPivote + 1; i < numVectores; i++) {
          const absVal = Math.abs(matriz[i][columnaPivote]);
          if (absVal > maxVal) {
            maxVal = absVal;
            maxRow = i;
          }
        }
        
        // Si el pivote máximo es casi cero, pasar a la siguiente columna
        if (maxVal < 1e-10) {
          columnaPivote++;
          continue;
        }
        
        // Intercambiar filas si es necesario
        if (maxRow !== filaPivote) {
          [matriz[filaPivote], matriz[maxRow]] = [matriz[maxRow], matriz[filaPivote]];
          
          pasosProceso.push({
            descripcion: `Intercambio de vectores ${filaPivote+1} y ${maxRow+1}`,
            vectores: JSON.parse(JSON.stringify(matriz))
          });
        }
        
        // Normalizar fila pivote
        const pivote = matriz[filaPivote][columnaPivote];
        for (let j = columnaPivote; j < dimension; j++) {
          matriz[filaPivote][j] /= pivote;
        }
        
        pasosProceso.push({
          descripcion: `Normalización del vector ${filaPivote+1} (dividir por ${formatearValor(pivote)})`,
          vectores: JSON.parse(JSON.stringify(matriz))
        });
        
        // Eliminar el pivote de las demás filas
        for (let i = 0; i < numVectores; i++) {
          if (i !== filaPivote) {
            const factor = matriz[i][columnaPivote];
            if (Math.abs(factor) >= 1e-10) {
              for (let j = columnaPivote; j < dimension; j++) {
                matriz[i][j] -= factor * matriz[filaPivote][j];
              }
              
              pasosProceso.push({
                descripcion: `Eliminación en el vector ${i+1} usando el vector ${filaPivote+1} (factor: ${formatearValor(factor)})`,
                vectores: JSON.parse(JSON.stringify(matriz))
              });
            }
          }
        }
        
        // Avanzar a la siguiente fila y columna
        filaPivote++;
        columnaPivote++;
      }
      
      // Identificar los vectores que forman la base
      // Un vector forma parte de la base si tiene al menos un pivote
      let vectoresBase = [];
      let indicesBase = [];
      let rango = 0;
      
      // Buscar filas no nulas (cada fila no nula contribuye a la base)
      for (let i = 0; i < numVectores; i++) {
        let esFilaNula = true;
        
        for (let j = 0; j < dimension; j++) {
          if (Math.abs(matriz[i][j]) >= 1e-10) {
            esFilaNula = false;
            break;
          }
        }
        
        if (!esFilaNula) {
          // Esta fila representa un vector de la base del espacio fila
          // Pero necesitamos el vector original, no el escalonado
          vectoresBase.push([...vectoresLimpios[i]]);
          indicesBase.push(i);
          rango++;
        }
      }
      
      // Preparar mensaje y detalles
      let mensaje = '';
      let detalles = [];
      
      if (rango === 0) {
        mensaje = "Los vectores son todos nulos o linealmente dependientes y reducen a cero. No generan ningún subespacio no trivial.";
      } else {
        mensaje = `La base del subespacio generado consta de ${rango} vector(es).`;
        
        if (rango === dimension) {
          mensaje += ` Estos vectores generan todo R^${dimension}.`;
        } else {
          mensaje += ` Estos vectores generan un subespacio de dimensión ${rango} en R^${dimension}.`;
        }
      }
      
      // Agregar detalles sobre el rango y la base
      detalles.push(`Dimensión del subespacio generado: ${rango}`);
      detalles.push(`Índices de los vectores que forman la base: ${indicesBase.map(idx => idx + 1).join(', ')}`);
      
      // Actualizar resultados
      setResultados({
        independientesLinealmente: rango === numVectores,
        esBase: rango === dimension,
        generaEspacio: rango === dimension,
        rango: rango,
        mensaje: mensaje,
        detalles: detalles,
        pasos: pasosProceso,
        vectoresBase: vectoresBase,
        indicesBase: indicesBase,
        error: ''
      });
      
    } catch (error) {
      console.error("Error al calcular la base:", error);
      setResultados({
        ...resultados,
        error: 'Error al realizar los cálculos: ' + error.message
      });
    }
  };
  
  // Función para formatear valores pequeños
  const formatearValor = (valor) => {
    // Primero asegurarse que estamos trabajando con un número
    const num = Number(valor);
    
    // Si es exactamente cero o muy cercano a cero
    if (Math.abs(num) < 1e-10) return "0";
    
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
  
  // Renderizar input de vectores
  const renderizarInputVectores = () => {
    return (
      <Grid container spacing={2}>
        {vectores.map((vector, vectorIdx) => (
          <Grid item xs={12} key={vectorIdx}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Vector {vectorIdx + 1}:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {vector.map((componente, compIdx) => (
                  <TextField
                    key={compIdx}
                    label={`v${vectorIdx+1}_${compIdx+1}`}
                    variant="outlined"
                    size="small"
                    value={componente === 0 ? '' : componente}
                    onChange={(e) => handleVectorChange(vectorIdx, compIdx, e.target.value)}
                    onBlur={(e) => {
                      // Al perder el foco, convertir valores especiales a números
                      if (e.target.value === '' || e.target.value === '-') {
                        handleVectorChange(vectorIdx, compIdx, 0);
                      } else if (!isNaN(parseFloat(e.target.value))) {
                        handleVectorChange(vectorIdx, compIdx, parseFloat(e.target.value));
                      }
                    }}
                    sx={{ width: '80px' }}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  };
  
  // Renderizar resultados
  const renderizarResultados = () => {
    if (resultados.error) {
      return <Alert severity="error" sx={{ mt: 2 }}>{resultados.error}</Alert>;
    }
    
    if (!resultados.mensaje) {
      return (
        <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
          Ingrese los vectores y presione "Analizar" para ver los resultados.
        </Typography>
      );
    }
    
    return (
      <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>Resultados del análisis</Typography>
        
        <Alert severity={resultados.independientesLinealmente ? "success" : "warning"} sx={{ mb: 2 }}>
          {resultados.mensaje}
        </Alert>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle1" gutterBottom>Detalles:</Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          {resultados.detalles.map((detalle, idx) => (
            <Box component="li" key={idx} sx={{ mb: 1 }}>
              <Typography>{detalle}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    );
  };
  
  // Renderizar resultados de la base
  const renderizarResultadosBase = () => {
    if (resultados.error) {
      return <Alert severity="error" sx={{ mt: 2 }}>{resultados.error}</Alert>;
    }
    
    if (!resultados.vectoresBase) {
      return (
        <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
          Ingrese los vectores y presione "Calcular Base" para ver los resultados.
        </Typography>
      );
    }
    
    return (
      <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>Base calculada</Typography>
        
        <Alert 
          severity={resultados.rango > 0 ? "success" : "warning"} 
          sx={{ mb: 2 }}
        >
          {resultados.mensaje}
        </Alert>
        
        {resultados.vectoresBase.length > 0 && (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Vectores que forman la base:
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              {resultados.vectoresBase.map((vector, idx) => (
                <Paper 
                  key={idx} 
                  elevation={1} 
                  sx={{ 
                    p: 1, 
                    mb: 1, 
                    display: 'flex', 
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 150, 136, 0.08)'
                  }}
                >
                  <Typography sx={{ mr: 2, fontWeight: 'bold' }}>
                    v{resultados.indicesBase[idx] + 1}:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    (
                    {vector.map((comp, compIdx) => (
                      <Typography key={compIdx} sx={{ mx: 0.5 }}>
                        {formatearValor(comp)}{compIdx < vector.length - 1 ? ',' : ''}
                      </Typography>
                    ))}
                    )
                  </Box>
                </Paper>
              ))}
            </Box>
          </>
        )}
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle1" gutterBottom>Detalles:</Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          {resultados.detalles.map((detalle, idx) => (
            <Box component="li" key={idx} sx={{ mb: 1 }}>
              <Typography>{detalle}</Typography>
            </Box>
          ))}
        </Box>
        
        {resultados.pasos && resultados.pasos.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Pasos del cálculo:
            </Typography>
            <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
              {resultados.pasos.map((paso, pasoIdx) => (
                <Paper key={pasoIdx} elevation={1} sx={{ p: 2, mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Paso {pasoIdx + 1}: {paso.descripcion}
                  </Typography>
                  <Box>
                    {paso.vectores.map((vector, vecIdx) => (
                      <Box 
                        key={vecIdx} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 1,
                          p: 1,
                          backgroundColor: resultados.indicesBase?.includes(vecIdx) ? 'rgba(0, 150, 136, 0.08)' : 'transparent',
                          borderRadius: '4px'
                        }}
                      >
                        <Typography sx={{ mr: 2, width: '30px' }}>
                          v{vecIdx + 1}:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                          (
                          {vector.map((comp, compIdx) => (
                            <Typography key={compIdx} sx={{ mx: 0.5 }}>
                              {formatearValor(comp)}{compIdx < vector.length - 1 ? ',' : ''}
                            </Typography>
                          ))}
                          )
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>
        )}
      </Paper>
    );
  };
  
  // Contenido del tab de Independencia Lineal
  const renderizarTabIndependenciaLineal = () => {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>Análisis de Independencia Lineal</Typography>
        <Typography paragraph>
          Ingrese un conjunto de vectores para determinar si son linealmente independientes,
          si forman una base para R^n, o si generan todo el espacio.
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Dimensión del espacio (n)"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 8 } }}
              value={dimension}
              onChange={handleDimensionChange}
              helperText={`Trabajando en R^${dimension}`}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Número de vectores"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 8 } }}
              value={numVectores}
              onChange={handleNumVectoresChange}
              helperText={`${numVectores} vectores a analizar`}
            />
          </Grid>
        </Grid>
        
        {renderizarInputVectores()}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button 
            variant="outlined" 
            onClick={resetVectores}
          >
            Reiniciar
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={verificarIndependenciaLineal}
          >
            Analizar
          </Button>
        </Box>
        
        {renderizarResultados()}
      </Box>
    );
  };
  
  // Contenido del tab de Bases
  const renderizarTabBases = () => {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>Cálculo de Bases</Typography>
        <Typography paragraph>
          Ingrese un conjunto de vectores para calcular una base del subespacio que generan.
          Se mostrará el proceso de eliminación gaussiana para obtener la base.
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Dimensión del espacio (n)"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 8 } }}
              value={dimension}
              onChange={handleDimensionChange}
              helperText={`Trabajando en R^${dimension}`}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Número de vectores"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 8 } }}
              value={numVectores}
              onChange={handleNumVectoresChange}
              helperText={`${numVectores} vectores a analizar`}
            />
          </Grid>
        </Grid>
        
        {renderizarInputVectores()}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button 
            variant="outlined" 
            onClick={resetVectores}
          >
            Reiniciar
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={calcularBase}
          >
            Calcular Base
          </Button>
        </Box>
        
        {renderizarResultadosBase()}
      </Box>
    );
  };

  // Función para calcular el producto punto entre dos vectores
  const productoPunto = (v1, v2) => {
    let resultado = 0;
    for (let i = 0; i < v1.length; i++) {
      resultado += v1[i] * v2[i];
    }
    return resultado;
  };

  // Función para calcular la norma (magnitud) de un vector
  const normaVector = (vector) => {
    return Math.sqrt(productoPunto(vector, vector));
  };

  // Función para multiplicar un vector por un escalar
  const multiplicarVectorPorEscalar = (vector, escalar) => {
    return vector.map(componente => componente * escalar);
  };

  // Función para restar dos vectores
  const restarVectores = (v1, v2) => {
    const resultado = [];
    for (let i = 0; i < v1.length; i++) {
      resultado.push(v1[i] - v2[i]);
    }
    return resultado;
  };

  // Función para calcular la proyección de un vector sobre otro
  const calcularProyeccion = (v, u) => {
    const numerador = productoPunto(v, u);
    const denominador = productoPunto(u, u);
    
    // Evitar división por cero
    if (Math.abs(denominador) < 1e-10) {
      return Array(v.length).fill(0);
    }
    
    const escalar = numerador / denominador;
    return multiplicarVectorPorEscalar(u, escalar);
  };

  // Implementación del proceso de Gram-Schmidt
  const procesarGramSchmidt = () => {
    // Convertir cualquier valor de edición a números
    const vectoresLimpios = vectores.map(vector => 
      vector.map(comp => typeof comp === 'string' ? (comp === '' || comp === '-' ? 0 : parseFloat(comp)) : comp)
    );
    
    try {
      // Verificar primero si los vectores son linealmente independientes
      // Crear una matriz con los vectores como columnas
      const matriz = Array(dimension).fill().map(() => Array(numVectores).fill(0));
      
      // Llenar la matriz
      for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < numVectores; j++) {
          matriz[i][j] = vectoresLimpios[j][i];
        }
      }
      
      // Calcular el rango
      const rango = calcularRango(matriz);
      
      // Si no son LI, no podemos aplicar Gram-Schmidt
      if (rango < numVectores) {
        setResultados({
          ...resultados,
          mensaje: "Los vectores no son linealmente independientes. El proceso de Gram-Schmidt requiere vectores LI.",
          error: "Los vectores deben ser linealmente independientes para aplicar Gram-Schmidt."
        });
        return;
      }
      
      // Inicializar el seguimiento de pasos
      let pasosProceso = [];
      pasosProceso.push({
        descripcion: 'Vectores de entrada',
        vectores: JSON.parse(JSON.stringify(vectoresLimpios))
      });
      
      // Vectores ortogonales
      let vectoresOrtogonales = [];
      
      // Iniciar el proceso de Gram-Schmidt
      for (let i = 0; i < numVectores; i++) {
        // Copiar el vector original
        let vectorActual = [...vectoresLimpios[i]];
        
        // Restar las proyecciones sobre los vectores anteriores
        for (let j = 0; j < vectoresOrtogonales.length; j++) {
          const proyeccion = calcularProyeccion(vectorActual, vectoresOrtogonales[j]);
          vectorActual = restarVectores(vectorActual, proyeccion);
          
          // Registrar el paso
          pasosProceso.push({
            descripcion: `Vector ${i+1}: Restar proyección sobre vector ortogonal ${j+1}`,
            vector: [...vectorActual],
            proyeccion: [...proyeccion],
            vectorOriginal: [...vectoresLimpios[i]],
            vectorOrtogonal: [...vectoresOrtogonales[j]]
          });
        }
        
        // Agregar el nuevo vector ortogonal
        vectoresOrtogonales.push(vectorActual);
        
        pasosProceso.push({
          descripcion: `Vector ortogonal ${i+1} calculado`,
          vectoresOrtogonales: JSON.parse(JSON.stringify(vectoresOrtogonales))
        });
      }
      
      // Normalizar los vectores ortogonales para obtener la base ortonormal
      let baseOrtonormal = [];
      let normas = [];
      
      for (let i = 0; i < vectoresOrtogonales.length; i++) {
        const norma = normaVector(vectoresOrtogonales[i]);
        normas.push(norma);
        
        // Evitar división por cero
        if (norma < 1e-10) {
          pasosProceso.push({
            descripcion: `Error: El vector ortogonal ${i+1} tiene norma casi cero`,
            vector: [...vectoresOrtogonales[i]],
            norma: norma
          });
          
          setResultados({
            ...resultados,
            mensaje: "Error al normalizar: un vector tiene norma casi cero.",
            error: "Error en el proceso de Gram-Schmidt: División por cero al normalizar.",
            pasos: pasosProceso
          });
          return;
        }
        
        const vectorNormalizado = multiplicarVectorPorEscalar(vectoresOrtogonales[i], 1/norma);
        baseOrtonormal.push(vectorNormalizado);
        
        pasosProceso.push({
          descripcion: `Normalización del vector ortogonal ${i+1} (dividir por ${formatearValor(norma)})`,
          vectorOrtogonal: [...vectoresOrtogonales[i]],
          vectorNormalizado: [...vectorNormalizado],
          norma: norma
        });
      }
      
      // Verificar ortogonalidad entre los vectores
      let verificacionOrtogonalidad = [];
      for (let i = 0; i < baseOrtonormal.length; i++) {
        for (let j = i + 1; j < baseOrtonormal.length; j++) {
          const producto = productoPunto(baseOrtonormal[i], baseOrtonormal[j]);
          verificacionOrtogonalidad.push({
            indices: [i, j],
            productoPunto: producto,
            esOrtogonal: Math.abs(producto) < 1e-10
          });
        }
      }
      
      // Preparar mensaje y detalles
      let mensaje = `Base ortonormal de ${baseOrtonormal.length} vectores calculada con éxito usando el proceso de Gram-Schmidt.`;
      let detalles = [];
      
      // Detalles de ortogonalidad
      detalles.push(`Dimensión del espacio: ${dimension}`);
      detalles.push(`Número de vectores en la base ortonormal: ${baseOrtonormal.length}`);
      
      if (baseOrtonormal.length < dimension) {
        detalles.push(`Nota: Esta base ortonormal no genera todo R^${dimension}, solo un subespacio de dimensión ${baseOrtonormal.length}.`);
      } else if (baseOrtonormal.length === dimension) {
        detalles.push(`Esta base ortonormal genera todo el espacio R^${dimension}.`);
      }
      
      // Actualizar resultados
      setResultados({
        independientesLinealmente: true,
        esBase: baseOrtonormal.length === dimension,
        generaEspacio: baseOrtonormal.length === dimension,
        mensaje: mensaje,
        detalles: detalles,
        pasos: pasosProceso,
        vectoresOrtogonales: vectoresOrtogonales,
        baseOrtonormal: baseOrtonormal,
        normas: normas,
        verificacionOrtogonalidad: verificacionOrtogonalidad,
        error: ''
      });
      
    } catch (error) {
      console.error("Error al aplicar Gram-Schmidt:", error);
      setResultados({
        ...resultados,
        error: 'Error en el proceso de Gram-Schmidt: ' + error.message
      });
    }
  };
  
  // Renderizar resultados de Gram-Schmidt
  const renderizarResultadosGramSchmidt = () => {
    if (resultados.error) {
      return <Alert severity="error" sx={{ mt: 2 }}>{resultados.error}</Alert>;
    }
    
    if (!resultados.baseOrtonormal) {
      return (
        <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
          Ingrese los vectores y presione "Aplicar Gram-Schmidt" para ver los resultados.
        </Typography>
      );
    }
    
    return (
      <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>Base Ortonormal</Typography>
        
        <Alert 
          severity={resultados.baseOrtonormal.length > 0 ? "success" : "warning"} 
          sx={{ mb: 2 }}
        >
          {resultados.mensaje}
        </Alert>
        
        {resultados.baseOrtonormal.length > 0 && (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Vectores de la base ortonormal:
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              {resultados.baseOrtonormal.map((vector, idx) => (
                <Paper 
                  key={idx} 
                  elevation={1} 
                  sx={{ 
                    p: 1, 
                    mb: 1, 
                    display: 'flex', 
                    alignItems: 'center',
                    backgroundColor: 'rgba(63, 81, 181, 0.08)'
                  }}
                >
                  <Typography sx={{ mr: 2, fontWeight: 'bold' }}>
                    e{idx + 1}:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    (
                    {vector.map((comp, compIdx) => (
                      <Typography key={compIdx} sx={{ mx: 0.5 }}>
                        {formatearValor(comp)}{compIdx < vector.length - 1 ? ',' : ''}
                      </Typography>
                    ))}
                    )
                  </Box>
                </Paper>
              ))}
            </Box>
            
            <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
              Verificación de ortogonalidad:
            </Typography>
            
            <Grid container spacing={2}>
              {resultados.verificacionOrtogonalidad?.map((verif, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 1, 
                      backgroundColor: verif.esOrtogonal ? 'rgba(76, 175, 80, 0.08)' : 'rgba(244, 67, 54, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography>
                      e{verif.indices[0] + 1} · e{verif.indices[1] + 1} = {formatearValor(verif.productoPunto)}
                    </Typography>
                    <Typography sx={{ ml: 2, fontWeight: 'bold' }}>
                      {verif.esOrtogonal ? '✓' : '✗'}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </>
        )}
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle1" gutterBottom>Detalles:</Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          {resultados.detalles?.map((detalle, idx) => (
            <Box component="li" key={idx} sx={{ mb: 1 }}>
              <Typography>{detalle}</Typography>
            </Box>
          ))}
        </Box>
        
        {mostrarPasosGramSchmidt && resultados.pasos && resultados.pasos.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Pasos del proceso de Gram-Schmidt:
            </Typography>
            <Box sx={{ maxHeight: '500px', overflowY: 'auto' }}>
              {resultados.pasos.map((paso, pasoIdx) => (
                <Paper key={pasoIdx} elevation={1} sx={{ p: 2, mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Paso {pasoIdx + 1}: {paso.descripcion}
                  </Typography>
                  
                  {paso.vectores && (
                    <Box sx={{ mt: 1 }}>
                      {paso.vectores.map((vector, vecIdx) => (
                        <Box 
                          key={vecIdx} 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            mb: 1,
                            p: 1,
                            borderRadius: '4px'
                          }}
                        >
                          <Typography sx={{ mr: 2, width: '30px' }}>
                            v{vecIdx + 1}:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            (
                            {vector.map((comp, compIdx) => (
                              <Typography key={compIdx} sx={{ mx: 0.5 }}>
                                {formatearValor(comp)}{compIdx < vector.length - 1 ? ',' : ''}
                              </Typography>
                            ))}
                            )
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  )}
                  
                  {paso.vectoresOrtogonales && (
                    <Box sx={{ mt: 1 }}>
                      {paso.vectoresOrtogonales.map((vector, vecIdx) => (
                        <Box 
                          key={vecIdx} 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            mb: 1,
                            p: 1,
                            backgroundColor: 'rgba(63, 81, 181, 0.08)',
                            borderRadius: '4px'
                          }}
                        >
                          <Typography sx={{ mr: 2, width: '30px' }}>
                            u{vecIdx + 1}:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            (
                            {vector.map((comp, compIdx) => (
                              <Typography key={compIdx} sx={{ mx: 0.5 }}>
                                {formatearValor(comp)}{compIdx < vector.length - 1 ? ',' : ''}
                              </Typography>
                            ))}
                            )
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  )}
                  
                  {paso.vector && (
                    <Box sx={{ mt: 1, p: 1, backgroundColor: 'rgba(63, 81, 181, 0.08)', borderRadius: '4px' }}>
                      <Typography variant="subtitle2">Vector resultante:</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                          (
                          {paso.vector.map((comp, compIdx) => (
                            <Typography key={compIdx} sx={{ mx: 0.5 }}>
                              {formatearValor(comp)}{compIdx < paso.vector.length - 1 ? ',' : ''}
                            </Typography>
                          ))}
                          )
                        </Box>
                      </Box>
                    </Box>
                  )}
                  
                  {paso.vectorOriginal && paso.proyeccion && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2">Cálculo de proyección:</Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1, ml: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography sx={{ width: '100px' }}>Vector original:</Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            (
                            {paso.vectorOriginal.map((comp, compIdx) => (
                              <Typography key={compIdx} sx={{ mx: 0.5 }}>
                                {formatearValor(comp)}{compIdx < paso.vectorOriginal.length - 1 ? ',' : ''}
                              </Typography>
                            ))}
                            )
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography sx={{ width: '100px' }}>Proyección:</Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            (
                            {paso.proyeccion.map((comp, compIdx) => (
                              <Typography key={compIdx} sx={{ mx: 0.5 }}>
                                {formatearValor(comp)}{compIdx < paso.proyeccion.length - 1 ? ',' : ''}
                              </Typography>
                            ))}
                            )
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography sx={{ width: '100px' }}>Vector u{paso.descripcion.match(/\d+/)[0]}:</Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            (
                            {paso.vectorOrtogonal.map((comp, compIdx) => (
                              <Typography key={compIdx} sx={{ mx: 0.5 }}>
                                {formatearValor(comp)}{compIdx < paso.vectorOrtogonal.length - 1 ? ',' : ''}
                              </Typography>
                            ))}
                            )
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                  
                  {paso.vectorNormalizado && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2">Normalización:</Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1, ml: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography sx={{ width: '100px' }}>Vector ortogonal:</Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            (
                            {paso.vectorOrtogonal.map((comp, compIdx) => (
                              <Typography key={compIdx} sx={{ mx: 0.5 }}>
                                {formatearValor(comp)}{compIdx < paso.vectorOrtogonal.length - 1 ? ',' : ''}
                              </Typography>
                            ))}
                            )
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography sx={{ width: '100px' }}>Norma:</Typography>
                          <Typography>{formatearValor(paso.norma)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography sx={{ width: '100px' }}>Vector normalizado:</Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            (
                            {paso.vectorNormalizado.map((comp, compIdx) => (
                              <Typography key={compIdx} sx={{ mx: 0.5 }}>
                                {formatearValor(comp)}{compIdx < paso.vectorNormalizado.length - 1 ? ',' : ''}
                              </Typography>
                            ))}
                            )
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Paper>
              ))}
            </Box>
          </Box>
        )}
      </Paper>
    );
  };

  // Contenido del tab de Bases Ortonormales
  const renderizarTabBasesOrtonormales = () => {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>Bases Ortonormales - Proceso de Gram-Schmidt</Typography>
        <Typography paragraph>
          Ingrese un conjunto de vectores linealmente independientes para calcular una base ortonormal
          utilizando el proceso de Gram-Schmidt.
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Dimensión del espacio (n)"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 8 } }}
              value={dimension}
              onChange={handleDimensionChange}
              helperText={`Trabajando en R^${dimension}`}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Número de vectores"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 8 } }}
              value={numVectores}
              onChange={handleNumVectoresChange}
              helperText={`${numVectores} vectores a procesar (deben ser LI)`}
            />
          </Grid>
        </Grid>
        
        {renderizarInputVectores()}
        
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2, mb: 3 }}>
          <Typography sx={{ mr: 2 }}>Mostrar pasos del proceso:</Typography>
          <Button 
            variant={mostrarPasosGramSchmidt ? "contained" : "outlined"}
            size="small"
            onClick={() => setMostrarPasosGramSchmidt(true)}
            sx={{ mr: 1 }}
          >
            Sí
          </Button>
          <Button 
            variant={!mostrarPasosGramSchmidt ? "contained" : "outlined"}
            size="small"
            onClick={() => setMostrarPasosGramSchmidt(false)}
          >
            No
          </Button>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button 
            variant="outlined" 
            onClick={resetVectores}
          >
            Reiniciar
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={procesarGramSchmidt}
          >
            Aplicar Gram-Schmidt
          </Button>
        </Box>
        
        {renderizarResultadosGramSchmidt()}
      </Box>
    );
  };

  // Componente principal con tabs
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Espacios Vectoriales</Typography>
      <Typography paragraph>
        Explore conceptos fundamentales de espacios vectoriales como independencia lineal,
        bases, dimensión, y subespacios.
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="espacios vectoriales tabs">
          <Tab label="Independencia Lineal" />
          <Tab label="Bases" />
          <Tab label="Bases Ortonormales" />
        </Tabs>
      </Box>
      
      <Box sx={{ p: 2 }}>
        {tabValue === 0 && renderizarTabIndependenciaLineal()}
        {tabValue === 1 && renderizarTabBases()}
        {tabValue === 2 && renderizarTabBasesOrtonormales()}
      </Box>
    </Box>
  );
}

export default EspaciosVectoriales; 