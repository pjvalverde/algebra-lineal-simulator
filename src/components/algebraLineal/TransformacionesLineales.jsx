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
  Tab,
  Slider
} from '@mui/material';

function TransformacionesLineales() {
  // Estado para el tab actual
  const [tabValue, setTabValue] = useState(0);
  
  // Estados para dimensiones de espacios
  const [dimensionDominio, setDimensionDominio] = useState(2);
  const [dimensionCodominio, setDimensionCodominio] = useState(2);
  
  // Estado para mostrar advertencias
  const [advertencia, setAdvertencia] = useState('');
  
  // Estado para la matriz de la transformación
  const [matrizTransformacion, setMatrizTransformacion] = useState(
    Array(2).fill().map(() => Array(2).fill(0))
  );
  
  // Estado para vector de prueba
  const [vectorPrueba, setVectorPrueba] = useState(Array(2).fill(0));
  const [vectorResultado, setVectorResultado] = useState(Array(2).fill(0));
  
  // Estado para resultados
  const [resultados, setResultados] = useState({
    rango: 0,
    dimension_nucleo: 0,
    dimension_imagen: 0,
    es_inyectiva: false,
    es_sobreyectiva: false,
    es_biyectiva: false,
    nucleo_base: [],
    imagen_base: [],
    mensaje: '',
    error: ''
  });
  
  // Efecto para reiniciar la matriz cuando cambian las dimensiones
  useEffect(() => {
    try {
      // Primero crear la nueva matriz con las dimensiones actualizadas
      const nuevaMatriz = Array(dimensionCodominio)
        .fill()
        .map(() => Array(dimensionDominio).fill(0));
      
      // Luego actualizar los vectores
      const nuevoVectorPrueba = Array(dimensionDominio).fill(0);
      const nuevoVectorResultado = Array(dimensionCodominio).fill(0);
      
      // Actualizar todos los estados de manera segura
      setMatrizTransformacion(nuevaMatriz);
      setVectorPrueba(nuevoVectorPrueba);
      setVectorResultado(nuevoVectorResultado);
      setResultados({
        rango: 0,
        dimension_nucleo: 0,
        dimension_imagen: 0,
        es_inyectiva: false,
        es_sobreyectiva: false,
        es_biyectiva: false,
        nucleo_base: [],
        imagen_base: [],
        mensaje: '',
        error: ''
      });
    } catch (error) {
      console.error("Error al reiniciar matriz:", error);
    }
  }, [dimensionDominio, dimensionCodominio]);
  
  // Manejador de cambio de tab
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Función para resetear la matriz (usada por el botón Reiniciar)
  const resetMatriz = () => {
    try {
      const nuevaMatriz = Array(dimensionCodominio)
        .fill()
        .map(() => Array(dimensionDominio).fill(0));
      
      setMatrizTransformacion(nuevaMatriz);
      setVectorPrueba(Array(dimensionDominio).fill(0));
      setVectorResultado(Array(dimensionCodominio).fill(0));
      setResultados({
        rango: 0,
        dimension_nucleo: 0,
        dimension_imagen: 0,
        es_inyectiva: false,
        es_sobreyectiva: false,
        es_biyectiva: false,
        nucleo_base: [],
        imagen_base: [],
        mensaje: '',
        error: ''
      });
    } catch (error) {
      console.error("Error al resetear matriz:", error);
    }
  };
  
  // Manejador de cambio de dimensión del dominio
  const handleDimensionDominioChange = (event, value) => {
    if (value >= 1 && value <= 8) {
      const nuevaDimensionDominio = value;
      
      // Si la nueva dimensión dominio es menor que el codominio actual, ajustar el codominio
      if (nuevaDimensionDominio < dimensionCodominio) {
        setDimensionCodominio(nuevaDimensionDominio);
        setAdvertencia('La dimensión de llegada (m) se ha ajustado para que sea igual a la dimensión de partida (n).');
        setTimeout(() => setAdvertencia(''), 5000);
      }
      
      setDimensionDominio(nuevaDimensionDominio);
    }
  };
  
  // Manejador de cambio de dimensión del codominio
  const handleDimensionCodominioChange = (event, value) => {
    if (value >= 1 && value <= 8) {
      const nuevaDimensionCodominio = value;
      
      // Comprobar si el valor es mayor que la dimensión del dominio
      if (nuevaDimensionCodominio > dimensionDominio) {
        setAdvertencia('La dimensión de llegada (m) no puede ser mayor que la dimensión de partida (n). Se ha limitado a ' + dimensionDominio + '.');
        setTimeout(() => setAdvertencia(''), 5000); // La advertencia desaparece después de 5 segundos
        setDimensionCodominio(dimensionDominio);
      } else {
        setDimensionCodominio(nuevaDimensionCodominio);
        setAdvertencia('');
      }
    }
  };
  
  // Manejador de cambio de dimensión del codominio por input de texto
  const handleDimensionCodominioInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 8) {
      // Comprobar si el valor es mayor que la dimensión del dominio
      if (value > dimensionDominio) {
        setAdvertencia('La dimensión de llegada (m) no puede ser mayor que la dimensión de partida (n). Se ha limitado a ' + dimensionDominio + '.');
        setTimeout(() => setAdvertencia(''), 5000); // La advertencia desaparece después de 5 segundos
        setDimensionCodominio(dimensionDominio);
      } else {
        setDimensionCodominio(value);
        setAdvertencia('');
      }
    }
  };
  
  // Manejador de cambio de dimensión del dominio por input de texto
  const handleDimensionDominioInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 8) {
      const nuevaDimensionDominio = value;
      
      // Si la nueva dimensión dominio es menor que el codominio actual, ajustar el codominio
      if (nuevaDimensionDominio < dimensionCodominio) {
        // Primero actualizar el dominio y luego el codominio para evitar estados incompletos
        setDimensionDominio(nuevaDimensionDominio);
        setTimeout(() => {
          setDimensionCodominio(nuevaDimensionDominio);
          setAdvertencia('La dimensión de llegada (m) se ha ajustado para que no sea mayor a la dimensión de partida (n).');
          setTimeout(() => setAdvertencia(''), 5000);
        }, 10);
      } else {
        setDimensionDominio(nuevaDimensionDominio);
      }
    }
  };
  
  // Manejador de cambio en componentes de la matriz
  const handleMatrizChange = (fila, columna, valor) => {
    try {
      // Verificar que los índices estén dentro de los límites
      if (fila < 0 || fila >= dimensionCodominio || columna < 0 || columna >= dimensionDominio) {
        console.error("Índices fuera de rango:", fila, columna);
        return;
      }
      
      const nuevaMatriz = [...matrizTransformacion];
      
      // Permitir entradas parciales para números negativos y decimales
      if (valor === '' || valor === '-' || valor === '.' || valor === '-.' || 
          valor === '0.' || valor === '-0.' || 
          (!isNaN(parseFloat(valor)) && !isNaN(valor[valor.length-1])) ||
          (valor.includes('.') && !isNaN(parseFloat(valor))) ||
          (valor.charAt(0) === '-' && !isNaN(parseFloat(valor.substring(1)))) ||
          (valor.charAt(valor.length-1) === '.' && !isNaN(parseFloat(valor.substring(0, valor.length-1))))) {
        nuevaMatriz[fila][columna] = valor;
      }
      // Si es un número válido, convertirlo
      else if (!isNaN(parseFloat(valor)) && isFinite(valor)) {
        nuevaMatriz[fila][columna] = parseFloat(valor);
      }
      
      setMatrizTransformacion(nuevaMatriz);
    } catch (error) {
      console.error("Error al cambiar componente de la matriz:", error);
    }
  };
  
  // Manejador de cambio en componentes del vector de prueba
  const handleVectorPruebaChange = (indice, valor) => {
    try {
      const nuevoVector = [...vectorPrueba];
      
      // Permitir entradas parciales para números negativos y decimales
      if (valor === '' || valor === '-' || valor === '.' || valor === '-.' || 
          valor === '0.' || valor === '-0.' || 
          (!isNaN(parseFloat(valor)) && !isNaN(valor[valor.length-1])) ||
          (valor.includes('.') && !isNaN(parseFloat(valor))) ||
          (valor.charAt(0) === '-' && !isNaN(parseFloat(valor.substring(1)))) ||
          (valor.charAt(valor.length-1) === '.' && !isNaN(parseFloat(valor.substring(0, valor.length-1))))) {
        nuevoVector[indice] = valor;
      }
      // Si es un número válido, convertirlo
      else if (!isNaN(parseFloat(valor)) && isFinite(valor)) {
        nuevoVector[indice] = parseFloat(valor);
      }
      
      setVectorPrueba(nuevoVector);
    } catch (error) {
      console.error("Error al cambiar componente del vector:", error);
    }
  };
  
  // Formatear valor para visualización
  const formatearValor = (valor) => {
    // Si es una cadena (estado intermedio de edición), devolverla tal cual
    if (typeof valor === 'string') return valor;
    
    // Evitar -0
    if (Math.abs(valor) < 1e-10) return "0";
    
    // Formatear a 2 decimales si es necesario
    if (Number.isInteger(valor)) return valor.toString();
    
    // Redondear a 4 decimales para evitar imprecisiones
    const valorRedondeado = Math.round(valor * 10000) / 10000;
    return valorRedondeado.toString();
  };
  
  // Función para aplicar la transformación lineal a un vector
  const aplicarTransformacion = () => {
    try {
      // Limpiar valores de edición y convertir a números
      const matrizLimpia = matrizTransformacion.map(fila => 
        fila.map(valor => {
          if (typeof valor === 'string') {
            if (valor === '' || valor === '-' || valor === '.' || valor === '-.') {
              return 0;
            }
            return parseFloat(valor) || 0;
          }
          return valor;
        })
      );
      
      const vectorLimpio = vectorPrueba.map(valor => {
        if (typeof valor === 'string') {
          if (valor === '' || valor === '-' || valor === '.' || valor === '-.') {
            return 0;
          }
          return parseFloat(valor) || 0;
        }
        return valor;
      });
      
      // Aplicar la transformación T(v) = Av
      const resultado = Array(dimensionCodominio).fill(0);
      
      for (let i = 0; i < dimensionCodominio; i++) {
        for (let j = 0; j < dimensionDominio; j++) {
          resultado[i] += matrizLimpia[i][j] * vectorLimpio[j];
        }
      }
      
      setVectorResultado(resultado);
    } catch (error) {
      console.error("Error al aplicar la transformación:", error);
      setResultados({
        ...resultados,
        error: "Error al aplicar la transformación: " + error.message
      });
    }
  };
  
  // Función para analizar las propiedades de la transformación lineal
  const analizarTransformacion = () => {
    try {
      // Limpiar valores de edición y convertir a números
      const matrizLimpia = matrizTransformacion.map(fila => 
        fila.map(valor => {
          if (typeof valor === 'string') {
            if (valor === '' || valor === '-' || valor === '.' || valor === '-.') {
              return 0;
            }
            return parseFloat(valor) || 0;
          }
          return valor;
        })
      );
      
      // Calcular el rango de la matriz
      const rango = calcularRango(matrizLimpia);
      
      // Calcular las dimensiones del núcleo e imagen
      const dim_nucleo = dimensionDominio - rango;
      const dim_imagen = rango;
      
      // Determinar inyectividad, sobreyectividad y biyectividad
      const es_inyectiva = dim_nucleo === 0;
      const es_sobreyectiva = dim_imagen === dimensionCodominio;
      const es_biyectiva = es_inyectiva && es_sobreyectiva;
      
      // Calcular base del núcleo
      const nucleo_base = calcularBaseNucleo(matrizLimpia);
      
      // Calcular base de la imagen
      const imagen_base = calcularBaseImagen(matrizLimpia);
      
      // Preparar mensaje
      let mensaje = "";
      
      if (es_biyectiva) {
        mensaje = "La transformación es biyectiva (es inyectiva y sobreyectiva).";
      } else if (es_inyectiva) {
        mensaje = "La transformación es inyectiva pero no sobreyectiva.";
      } else if (es_sobreyectiva) {
        mensaje = "La transformación es sobreyectiva pero no inyectiva.";
      } else {
        mensaje = "La transformación no es inyectiva ni sobreyectiva.";
      }
      
      // Actualizar resultados
      setResultados({
        rango,
        dimension_nucleo: dim_nucleo,
        dimension_imagen: dim_imagen,
        es_inyectiva,
        es_sobreyectiva,
        es_biyectiva,
        nucleo_base,
        imagen_base,
        mensaje,
        error: ''
      });
      
    } catch (error) {
      console.error("Error al analizar la transformación:", error);
      setResultados({
        ...resultados,
        error: "Error al analizar la transformación: " + error.message
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
  
  // Función para calcular una base del núcleo
  const calcularBaseNucleo = (matriz) => {
    const filas = matriz.length;
    const columnas = matriz[0].length;
    
    // Aplicar eliminación Gaussiana y forma escalonada reducida
    const matrizEscalonada = obtenerFormaEscalonadaReducida(matriz);
    
    // Encontrar variables libres y dependientes
    const variablesLibres = [];
    const variablesDependientes = [];
    
    let indicePivote = 0;
    for (let j = 0; j < columnas && indicePivote < filas; j++) {
      // Si el elemento es un pivote
      if (Math.abs(matrizEscalonada[indicePivote][j]) > 1e-10) {
        variablesDependientes.push(j);
        indicePivote++;
      } else {
        variablesLibres.push(j);
      }
    }
    
    // Si no hay variables libres, el núcleo es trivial
    if (variablesLibres.length === 0) {
      return [];
    }
    
    // Calculamos los vectores del núcleo (uno por cada variable libre)
    const baseNucleo = [];
    
    for (let i = 0; i < variablesLibres.length; i++) {
      const varLibre = variablesLibres[i];
      const vector = Array(columnas).fill(0);
      
      // Asignamos 1 a la variable libre correspondiente
      vector[varLibre] = 1;
      
      // Calculamos los valores de las variables dependientes
      for (let j = 0; j < variablesDependientes.length; j++) {
        const varDep = variablesDependientes[j];
        let suma = 0;
        
        // Buscamos la fila con pivote en esta variable dependiente
        for (let k = 0; k < filas; k++) {
          if (Math.abs(matrizEscalonada[k][varDep]) > 1e-10) {
            for (let l = 0; l < columnas; l++) {
              if (l === varLibre) {
                suma += matrizEscalonada[k][l];
              }
            }
            vector[varDep] = -suma;
            break;
          }
        }
      }
      
      baseNucleo.push(vector);
    }
    
    return baseNucleo;
  };
  
  // Función para calcular una base de la imagen
  const calcularBaseImagen = (matriz) => {
    const filas = matriz.length;
    const columnas = matriz[0].length;
    
    // Aplicar eliminación Gaussiana para encontrar columnas linealmente independientes
    const matrizEscalonada = obtenerFormaEscalonadaReducida(matriz);
    
    // Encontrar columnas pivote (son las de la base de la imagen)
    const columnasPivote = [];
    let indicePivote = 0;
    
    for (let j = 0; j < columnas && indicePivote < filas; j++) {
      if (Math.abs(matrizEscalonada[indicePivote][j]) > 1e-10) {
        columnasPivote.push(j);
        indicePivote++;
      }
    }
    
    // Extraer las columnas correspondientes de la matriz original
    const baseImagen = [];
    for (let j of columnasPivote) {
      const columna = [];
      for (let i = 0; i < filas; i++) {
        columna.push(matriz[i][j]);
      }
      baseImagen.push(columna);
    }
    
    return baseImagen;
  };
  
  // Función para obtener la forma escalonada reducida de una matriz
  const obtenerFormaEscalonadaReducida = (matriz) => {
    // Crear una copia para no modificar la original
    const m = matriz.map(row => [...row]);
    const filas = m.length;
    const columnas = m[0].length;
    
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
      
      // Eliminar el pivote de las demás filas (hacia arriba y abajo)
      for (let i = 0; i < filas; i++) {
        if (i !== filaPivote) {
          const factor = m[i][j];
          for (let k = j; k < columnas; k++) {
            m[i][k] -= factor * m[filaPivote][k];
          }
        }
      }
      
      filaPivote++;
    }
    
    return m;
  };
  
  // Renderizar los inputs de la matriz
  const renderMatrizInputs = () => {
    // Verificar que las dimensiones sean válidas
    if (dimensionCodominio <= 0 || dimensionDominio <= 0) {
      return (
        <Alert severity="error" sx={{ mt: 2, mb: 3 }}>
          Error: Dimensiones inválidas (n={dimensionDominio}, m={dimensionCodominio})
        </Alert>
      );
    }
    
    // Verificar que la matriz tenga el tamaño correcto
    if (!matrizTransformacion || 
        matrizTransformacion.length !== dimensionCodominio || 
        matrizTransformacion[0].length !== dimensionDominio) {
      return (
        <Alert severity="warning" sx={{ mt: 2, mb: 3 }}>
          Actualizando dimensiones de la matriz...
        </Alert>
      );
    }
    
    return (
      <Box sx={{ mt: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Matriz de la transformación T: R{dimensionDominio} → R{dimensionCodominio}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '4px',
          p: 2,
          backgroundColor: '#282c34',
          maxWidth: '100%',
          overflowX: 'auto'
        }}>
          {Array(dimensionCodominio).fill().map((_, filaIdx) => (
            <Box key={filaIdx} sx={{ display: 'flex', mb: filaIdx === dimensionCodominio - 1 ? 0 : 1 }}>
              {Array(dimensionDominio).fill().map((_, colIdx) => {
                // Verificar que el índice exista en la matriz
                const value = (matrizTransformacion[filaIdx] && 
                               matrizTransformacion[filaIdx][colIdx] !== undefined) ? 
                              matrizTransformacion[filaIdx][colIdx] : 0;
                
                return (
                  <TextField
                    key={colIdx}
                    size="small"
                    variant="outlined"
                    value={value === 0 ? "0" : value}
                    onChange={(e) => handleMatrizChange(filaIdx, colIdx, e.target.value)}
                    sx={{ 
                      m: 0.5,
                      width: '60px',
                      backgroundColor: '#4dabf5',
                      input: { 
                        color: '#000', 
                        fontWeight: 'bold',
                        textAlign: 'center' 
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#1976d2',
                          borderWidth: 2,
                        },
                        '&:hover fieldset': {
                          borderColor: '#1565c0',
                          borderWidth: 2,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#0d47a1',
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>
    );
  };
  
  // Renderizar los inputs del vector de prueba
  const renderVectorPruebaInputs = () => {
    // Verificar que las dimensiones sean válidas
    if (dimensionDominio <= 0) {
      return null;
    }
    
    // Verificar que el vector tenga el tamaño correcto
    if (!vectorPrueba || vectorPrueba.length !== dimensionDominio) {
      return (
        <Alert severity="warning" sx={{ mt: 2, mb: 3 }}>
          Actualizando dimensiones del vector...
        </Alert>
      );
    }
    
    return (
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Vector de prueba v ∈ R{dimensionDominio}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '4px',
          p: 2,
          backgroundColor: '#282c34',
          maxWidth: '100%',
          overflowX: 'auto'
        }}>
          {Array(dimensionDominio).fill().map((_, idx) => {
            // Verificar que el índice exista en el vector
            const value = vectorPrueba[idx] !== undefined ? vectorPrueba[idx] : 0;
            
            return (
              <TextField
                key={idx}
                size="small"
                variant="outlined"
                value={value === 0 ? "0" : value}
                onChange={(e) => handleVectorPruebaChange(idx, e.target.value)}
                sx={{ 
                  m: 0.5,
                  width: '60px',
                  backgroundColor: '#4dabf5',
                  input: { 
                    color: '#000', 
                    fontWeight: 'bold',
                    textAlign: 'center' 
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#1976d2',
                      borderWidth: 2,
                    },
                    '&:hover fieldset': {
                      borderColor: '#1565c0',
                      borderWidth: 2,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#0d47a1',
                      borderWidth: 2,
                    },
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>
    );
  };
  
  // Renderizar el vector resultado
  const renderVectorResultado = () => {
    // Verificar que las dimensiones sean válidas
    if (dimensionCodominio <= 0) {
      return null;
    }
    
    // Verificar que el vector tenga el tamaño correcto
    if (!vectorResultado || vectorResultado.length !== dimensionCodominio) {
      return (
        <Alert severity="warning" sx={{ mt: 2, mb: 3 }}>
          Actualizando dimensiones del vector resultado...
        </Alert>
      );
    }
    
    return (
      <Box sx={{ mt: 3, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Vector resultado T(v) ∈ R{dimensionCodominio}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '4px',
          p: 2,
          backgroundColor: '#282c34',
          maxWidth: '100%',
          overflowX: 'auto'
        }}>
          {Array(dimensionCodominio).fill().map((_, idx) => {
            // Verificar que el índice exista en el vector
            const value = vectorResultado[idx] !== undefined ? vectorResultado[idx] : 0;
            
            return (
              <Box
                key={idx}
                sx={{
                  m: 0.5,
                  p: 1,
                  width: '60px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #1976d2',
                  borderRadius: '4px',
                  backgroundColor: '#e3f2fd',
                  color: '#000',
                  fontWeight: 'bold'
                }}
              >
                <Typography sx={{ fontWeight: 'bold' }}>
                  {formatearValor(value)}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };
  
  // Renderizar los resultados del análisis
  const renderResultadosAnalisis = () => {
    return (
      <Box sx={{ mt: 3 }}>
        {resultados.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {resultados.error}
          </Alert>
        )}
        
        {resultados.mensaje && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {resultados.mensaje}
          </Alert>
        )}
        
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Propiedades de la transformación
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Rango: {resultados.rango}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Dimensión del núcleo: {resultados.dimension_nucleo}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Dimensión de la imagen: {resultados.dimension_imagen}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">
                Tipo: {
                  resultados.es_biyectiva ? "Biyectiva" : 
                  resultados.es_inyectiva ? "Inyectiva" : 
                  resultados.es_sobreyectiva ? "Sobreyectiva" : 
                  "Ni inyectiva ni sobreyectiva"
                }
              </Typography>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle1" gutterBottom>
            Base del núcleo:
          </Typography>
          
          {resultados.nucleo_base.length === 0 ? (
            <Typography sx={{ ml: 2, fontStyle: 'italic' }}>
              Solo el vector cero (núcleo trivial)
            </Typography>
          ) : (
            <Box sx={{ ml: 2 }}>
              {resultados.nucleo_base.map((vector, idx) => (
                <Box key={idx} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 1 }}>v{idx + 1} = </Typography>
                  <Typography>
                    ({vector.map((comp, i) => formatearValor(comp) + (i < vector.length - 1 ? ', ' : ''))})
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
          
          <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
            Base de la imagen:
          </Typography>
          
          {resultados.imagen_base.length === 0 ? (
            <Typography sx={{ ml: 2, fontStyle: 'italic' }}>
              Solo el vector cero (imagen trivial)
            </Typography>
          ) : (
            <Box sx={{ ml: 2 }}>
              {resultados.imagen_base.map((vector, idx) => (
                <Box key={idx} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 1 }}>w{idx + 1} = </Typography>
                  <Typography>
                    ({vector.map((comp, i) => formatearValor(comp) + (i < vector.length - 1 ? ', ' : ''))})
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    );
  };
  
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h5" gutterBottom>Transformaciones Lineales</Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="pestañas de transformaciones lineales">
          <Tab label="Aplicar Transformación" />
          <Tab label="Propiedades" />
        </Tabs>
      </Box>
      
      {advertencia && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {advertencia}
        </Alert>
      )}
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Dimensión del espacio de partida (n):
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8} sm={4}>
            <Slider
              value={dimensionDominio}
              onChange={handleDimensionDominioChange}
              step={1}
              marks
              min={1}
              max={8}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <TextField
              value={dimensionDominio}
              onChange={handleDimensionDominioInputChange}
              inputProps={{ min: 1, max: 8 }}
              type="number"
              size="small"
            />
          </Grid>
        </Grid>
        
        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
          Dimensión del espacio de llegada (m):
          <Typography component="span" variant="caption" sx={{ color: 'warning.main', ml: 1 }}>
            (debe ser m ≤ n)
          </Typography>
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8} sm={4}>
            <Slider
              value={dimensionCodominio}
              onChange={handleDimensionCodominioChange}
              step={1}
              marks
              min={1}
              max={dimensionDominio}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <TextField
              value={dimensionCodominio}
              onChange={handleDimensionCodominioInputChange}
              inputProps={{ min: 1, max: dimensionDominio }}
              type="number"
              size="small"
            />
          </Grid>
        </Grid>
      </Box>
      
      {/* Contenido del tab de Aplicar Transformación */}
      {tabValue === 0 && (
        <div>
          {renderMatrizInputs()}
          
          {renderVectorPruebaInputs()}
          
          <Box sx={{ mt: 2, mb: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={aplicarTransformacion}
              sx={{ mr: 2 }}
            >
              Aplicar Transformación
            </Button>
            <Button 
              variant="outlined"
              onClick={resetMatriz}
            >
              Reiniciar
            </Button>
          </Box>
          
          {renderVectorResultado()}
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1">
              <strong>Transformación lineal T: R{dimensionDominio} → R{dimensionCodominio}</strong> definida por
              la matriz:
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
              T(v) = A·v, donde A es la matriz de la transformación
            </Typography>
          </Box>
        </div>
      )}
      
      {/* Contenido del tab de Propiedades */}
      {tabValue === 1 && (
        <div>
          {renderMatrizInputs()}
          
          <Box sx={{ mt: 2, mb: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={analizarTransformacion}
              sx={{ mr: 2 }}
            >
              Analizar Propiedades
            </Button>
            <Button 
              variant="outlined"
              onClick={resetMatriz}
            >
              Reiniciar
            </Button>
          </Box>
          
          {renderResultadosAnalisis()}
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" gutterBottom>
              <strong>Propiedades de una transformación lineal:</strong>
            </Typography>
            <ul>
              <li>
                <Typography variant="body2">
                  <strong>Inyectiva:</strong> Si dos vectores distintos se transforman en vectores distintos (Ker(T) = {0})
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Sobreyectiva:</strong> Si todo vector del codominio es imagen de algún vector del dominio (Im(T) = R{dimensionCodominio})
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Biyectiva:</strong> Si la transformación es inyectiva y sobreyectiva
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Teorema de la dimensión:</strong> dim(Ker(T)) + dim(Im(T)) = dim(dominio)
                </Typography>
              </li>
            </ul>
          </Box>
        </div>
      )}
    </Box>
  );
}

export default TransformacionesLineales; 