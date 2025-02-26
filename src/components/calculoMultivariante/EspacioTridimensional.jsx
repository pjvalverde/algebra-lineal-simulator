import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  TextField, 
  Button, 
  Grid, 
  Divider,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Componente principal para Espacio Tridimensional
function EspacioTridimensional() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Espacio Tridimensional
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="opciones espacio tridimensional">
          <Tab label="Producto Vectorial y Escalar" />
          <Tab label="Ecuaciones Paramétricas" />
          <Tab label="Planos en R³" />
          <Tab label="Superficies Cuádricas" />
          <Tab label="Coordenadas Cilíndricas y Esféricas" />
        </Tabs>
      </Box>

      {/* Contenido para la pestaña seleccionada */}
      {tabValue === 0 && <ProductosVectoriales />}
      {tabValue === 1 && <EcuacionesParametricas />}
      {tabValue === 2 && <PlanosEspacio />}
      {tabValue === 3 && <SuperficiesCuadricas />}
      {tabValue === 4 && <CoordenadasEspeciales />}
    </Box>
  );
}

// Componente para inputs de vectores con mejor diseño
const VectorInput = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  margin: theme.spacing(1, 0),
}));

// Componente para Producto Vectorial y Escalar
function ProductosVectoriales() {
  // Estados para los dos vectores con valores iniciales demostrativos
  const [vector1, setVector1] = useState({ x: 3, y: 2, z: 1 });
  const [vector2, setVector2] = useState({ x: 1, y: -2, z: 4 });
  
  // Estados para los resultados
  const [productoCruz, setProductoCruz] = useState({ x: 0, y: 0, z: 0 });
  const [productoEscalar, setProductoEscalar] = useState(0);
  const [angulo, setAngulo] = useState(0);
  const [areaParalelogramo, setAreaParalelogramo] = useState(0);
  
  // Estado para mensajes
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // Función para calcular todos los productos a la vez
  const calcularTodo = () => {
    calcularProductoEscalar();
    calcularProductoCruz();
  };

  // Calcular los resultados iniciales cuando el componente se monte
  useEffect(() => {
    // Pequeña pausa para asegurar que el componente esté completamente montado
    const timer = setTimeout(() => {
      calcularProductoEscalar();
      calcularProductoCruz();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Función mejorada para manejar cambios en los componentes del vector 1
  const handleVector1Change = (componente, valor) => {
    try {
      // Aceptar cualquier entrada que podría ser parte de un número válido
      const esValorValido = 
        valor === '' || 
        valor === '-' || 
        valor === '.' || 
        valor === '-.' || 
        /^-?\d*\.?\d*$/.test(valor);
      
      if (esValorValido) {
        setVector1({
          ...vector1,
          [componente]: valor
        });
        
        // Limpiar mensajes previos
        setMensaje('');
        setError('');
      }
    } catch (e) {
      console.error("Error al actualizar vector1:", e);
    }
  };

  // Función mejorada para manejar cambios en los componentes del vector 2
  const handleVector2Change = (componente, valor) => {
    try {
      // Aceptar cualquier entrada que podría ser parte de un número válido
      const esValorValido = 
        valor === '' || 
        valor === '-' || 
        valor === '.' || 
        valor === '-.' || 
        /^-?\d*\.?\d*$/.test(valor);
      
      if (esValorValido) {
        setVector2({
          ...vector2,
          [componente]: valor
        });
        
        // Limpiar mensajes previos
        setMensaje('');
        setError('');
      }
    } catch (e) {
      console.error("Error al actualizar vector2:", e);
    }
  };

  // Función para calcular el producto vectorial (cruz)
  const calcularProductoCruz = () => {
    try {
      // Convertir cualquier entrada de texto a número
      const v1 = {
        x: parseFloat(vector1.x) || 0,
        y: parseFloat(vector1.y) || 0,
        z: parseFloat(vector1.z) || 0
      };
      
      const v2 = {
        x: parseFloat(vector2.x) || 0,
        y: parseFloat(vector2.y) || 0,
        z: parseFloat(vector2.z) || 0
      };
      
      // Cálculo del producto cruz: v1 × v2
      const resultado = {
        x: v1.y * v2.z - v1.z * v2.y,
        y: v1.z * v2.x - v1.x * v2.z,
        z: v1.x * v2.y - v1.y * v2.x
      };
      
      setProductoCruz(resultado);
      
      // Calcular el área del paralelogramo (magnitud del producto cruz)
      const area = Math.sqrt(
        resultado.x * resultado.x + 
        resultado.y * resultado.y + 
        resultado.z * resultado.z
      );
      
      setAreaParalelogramo(area);
      
      setMensaje('Producto vectorial calculado correctamente.');
    } catch (e) {
      setError('Error al calcular el producto vectorial: ' + e.message);
      console.error("Error en calcularProductoCruz:", e);
    }
  };

  // Función para calcular el producto escalar (punto)
  const calcularProductoEscalar = () => {
    try {
      // Convertir cualquier entrada de texto a número
      const v1 = {
        x: parseFloat(vector1.x) || 0,
        y: parseFloat(vector1.y) || 0,
        z: parseFloat(vector1.z) || 0
      };
      
      const v2 = {
        x: parseFloat(vector2.x) || 0,
        y: parseFloat(vector2.y) || 0,
        z: parseFloat(vector2.z) || 0
      };
      
      // Cálculo del producto escalar: v1 · v2
      const dotProduct = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
      
      setProductoEscalar(dotProduct);
      
      // Calcular magnitudes
      const magV1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
      const magV2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y + v2.z * v2.z);
      
      // Verificar si alguno de los vectores es cero
      if (magV1 === 0 || magV2 === 0) {
        setAngulo(0);
        setMensaje('Al menos uno de los vectores es el vector cero. El ángulo no está definido, pero se muestra como 0.');
      } else {
        // Calcular el ángulo entre los vectores (en radianes)
        const cosAngulo = dotProduct / (magV1 * magV2);
        
        // Ajustar para errores de redondeo (coseno debe estar entre -1 y 1)
        const cosAjustado = Math.max(-1, Math.min(1, cosAngulo));
        
        // Convertir a grados
        const anguloGrados = Math.acos(cosAjustado) * (180 / Math.PI);
        
        setAngulo(anguloGrados);
        setMensaje('Producto escalar y ángulo calculados correctamente.');
      }
    } catch (e) {
      setError('Error al calcular el producto escalar: ' + e.message);
      console.error("Error en calcularProductoEscalar:", e);
    }
  };

  // Función para formatear un valor numérico con mejor manejo de decimales
  const formatearValor = (valor) => {
    // Si el valor es un string, devolverlo tal cual (estados intermedios de edición)
    if (typeof valor === 'string') return valor;
    
    // Si no hay valor o es NaN, mostrar 0
    if (valor === undefined || valor === null || isNaN(valor)) return "0";
    
    // Redondear a 4 decimales para evitar problemas de precisión
    const valorRedondeado = Math.round(valor * 10000) / 10000;
    
    // Evitar -0
    if (valorRedondeado === 0) return "0";
    
    // Si es un entero, no mostrar decimales
    if (valorRedondeado % 1 === 0) return valorRedondeado.toString();
    
    // Para números decimales, mostrar siempre 2 decimales
    return valorRedondeado.toFixed(2);
  };

  return (
      <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Producto Vectorial y Escalar entre Vectores 3D
      </Typography>
      
        <Typography paragraph>
        Ingresa las componentes de dos vectores en el espacio tridimensional para calcular
        su producto vectorial (cruz), producto escalar (punto), el ángulo entre ellos,
        y el área del paralelogramo que forman.
        </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {mensaje && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {mensaje}
        </Alert>
      )}
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Vector 1
              </Typography>
              <VectorInput>
                <Typography sx={{ minWidth: 20 }}>x:</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  value={vector1.x}
                  onChange={(e) => handleVector1Change('x', e.target.value)}
                  sx={{ 
                    mx: 1, 
                    width: '80px',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#ffffff',
                      '& fieldset': {
                        borderColor: '#1976d2',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: '#1565c0',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#0d47a1',
                      },
                      '& input': {
                        color: '#000000',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }
                    }
                  }}
                  inputProps={{ 
                    inputMode: 'decimal',
                    style: { textAlign: 'center' },
                    onKeyDown: (e) => {
                      // Permitir: números, teclas de navegación, Delete, Backspace, Tab, Enter
                      if (
                        // Permitir números y puntos
                        /[0-9\.-]/.test(e.key) || 
                        // Permitir teclas de navegación y edición
                        ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key) ||
                        // Permitir combinaciones Ctrl+X/C/V para cortar/copiar/pegar
                        (e.ctrlKey && ['x', 'c', 'v'].includes(e.key))
                      ) {
                        return true;
                      }
                      e.preventDefault();
                      return false;
                    }
                  }}
                />
                <Typography sx={{ minWidth: 20 }}>y:</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  value={vector1.y}
                  onChange={(e) => handleVector1Change('y', e.target.value)}
                  sx={{ 
                    mx: 1, 
                    width: '80px',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#ffffff',
                      '& fieldset': {
                        borderColor: '#1976d2',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: '#1565c0',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#0d47a1',
                      },
                      '& input': {
                        color: '#000000',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }
                    }
                  }}
                  inputProps={{ 
                    inputMode: 'decimal',
                    style: { textAlign: 'center' },
                    onKeyDown: (e) => {
                      // Permitir: números, teclas de navegación, Delete, Backspace, Tab, Enter
                      if (
                        // Permitir números y puntos
                        /[0-9\.-]/.test(e.key) || 
                        // Permitir teclas de navegación y edición
                        ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key) ||
                        // Permitir combinaciones Ctrl+X/C/V para cortar/copiar/pegar
                        (e.ctrlKey && ['x', 'c', 'v'].includes(e.key))
                      ) {
                        return true;
                      }
                      e.preventDefault();
                      return false;
                    }
                  }}
                />
                <Typography sx={{ minWidth: 20 }}>z:</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  value={vector1.z}
                  onChange={(e) => handleVector1Change('z', e.target.value)}
                  sx={{ 
                    mx: 1, 
                    width: '80px',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#ffffff',
                      '& fieldset': {
                        borderColor: '#1976d2',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: '#1565c0',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#0d47a1',
                      },
                      '& input': {
                        color: '#000000',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }
                    }
                  }}
                  inputProps={{ 
                    inputMode: 'decimal',
                    style: { textAlign: 'center' },
                    onKeyDown: (e) => {
                      // Permitir: números, teclas de navegación, Delete, Backspace, Tab, Enter
                      if (
                        // Permitir números y puntos
                        /[0-9\.-]/.test(e.key) || 
                        // Permitir teclas de navegación y edición
                        ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key) ||
                        // Permitir combinaciones Ctrl+X/C/V para cortar/copiar/pegar
                        (e.ctrlKey && ['x', 'c', 'v'].includes(e.key))
                      ) {
                        return true;
                      }
                      e.preventDefault();
                      return false;
                    }
                  }}
                />
              </VectorInput>
            </CardContent>
          </Card>
          
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Vector 2
              </Typography>
              <VectorInput>
                <Typography sx={{ minWidth: 20 }}>x:</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  value={vector2.x}
                  onChange={(e) => handleVector2Change('x', e.target.value)}
                  sx={{ 
                    mx: 1, 
                    width: '80px',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#ffffff',
                      '& fieldset': {
                        borderColor: '#1976d2',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: '#1565c0',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#0d47a1',
                      },
                      '& input': {
                        color: '#000000',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }
                    }
                  }}
                  inputProps={{ 
                    inputMode: 'decimal',
                    style: { textAlign: 'center' },
                    onKeyDown: (e) => {
                      // Permitir: números, teclas de navegación, Delete, Backspace, Tab, Enter
                      if (
                        // Permitir números y puntos
                        /[0-9\.-]/.test(e.key) || 
                        // Permitir teclas de navegación y edición
                        ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key) ||
                        // Permitir combinaciones Ctrl+X/C/V para cortar/copiar/pegar
                        (e.ctrlKey && ['x', 'c', 'v'].includes(e.key))
                      ) {
                        return true;
                      }
                      e.preventDefault();
                      return false;
                    }
                  }}
                />
                <Typography sx={{ minWidth: 20 }}>y:</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  value={vector2.y}
                  onChange={(e) => handleVector2Change('y', e.target.value)}
                  sx={{ 
                    mx: 1, 
                    width: '80px',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#ffffff',
                      '& fieldset': {
                        borderColor: '#1976d2',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: '#1565c0',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#0d47a1',
                      },
                      '& input': {
                        color: '#000000',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }
                    }
                  }}
                  inputProps={{ 
                    inputMode: 'decimal',
                    style: { textAlign: 'center' },
                    onKeyDown: (e) => {
                      // Permitir: números, teclas de navegación, Delete, Backspace, Tab, Enter
                      if (
                        // Permitir números y puntos
                        /[0-9\.-]/.test(e.key) || 
                        // Permitir teclas de navegación y edición
                        ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key) ||
                        // Permitir combinaciones Ctrl+X/C/V para cortar/copiar/pegar
                        (e.ctrlKey && ['x', 'c', 'v'].includes(e.key))
                      ) {
                        return true;
                      }
                      e.preventDefault();
                      return false;
                    }
                  }}
                />
                <Typography sx={{ minWidth: 20 }}>z:</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  value={vector2.z}
                  onChange={(e) => handleVector2Change('z', e.target.value)}
                  sx={{ 
                    mx: 1, 
                    width: '80px',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#ffffff',
                      '& fieldset': {
                        borderColor: '#1976d2',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: '#1565c0',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#0d47a1',
                      },
                      '& input': {
                        color: '#000000',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }
                    }
                  }}
                  inputProps={{ 
                    inputMode: 'decimal',
                    style: { textAlign: 'center' },
                    onKeyDown: (e) => {
                      // Permitir: números, teclas de navegación, Delete, Backspace, Tab, Enter
                      if (
                        // Permitir números y puntos
                        /[0-9\.-]/.test(e.key) || 
                        // Permitir teclas de navegación y edición
                        ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key) ||
                        // Permitir combinaciones Ctrl+X/C/V para cortar/copiar/pegar
                        (e.ctrlKey && ['x', 'c', 'v'].includes(e.key))
                      ) {
                        return true;
                      }
                      e.preventDefault();
                      return false;
                    }
                  }}
                />
              </VectorInput>
            </CardContent>
          </Card>
          
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={calcularTodo}
              sx={{ mr: 2 }}
            >
              Calcular Todo
            </Button>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={() => {
                setVector1({ x: 0, y: 0, z: 0 });
                setVector2({ x: 0, y: 0, z: 0 });
                setProductoCruz({ x: 0, y: 0, z: 0 });
                setProductoEscalar(0);
                setAngulo(0);
                setAreaParalelogramo(0);
                setMensaje('');
                setError('');
              }}
            >
              Reiniciar
            </Button>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ mb: 2, backgroundColor: '#2c3e50' }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom sx={{ color: 'white' }}>
                Producto Escalar (Punto): v₁·v₂
              </Typography>
              <Box sx={{ p: 1, bgcolor: '#3498db', borderRadius: 1, border: '2px solid #1976d2' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  v₁·v₂ = {formatearValor(productoEscalar)}
                </Typography>
              </Box>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, color: 'white' }}>
                Ángulo entre los vectores
              </Typography>
              <Box sx={{ p: 1, bgcolor: '#3498db', borderRadius: 1, border: '2px solid #1976d2' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  θ = {formatearValor(angulo)}° ({formatearValor(angulo * Math.PI / 180)} radianes)
                </Typography>
              </Box>
            </CardContent>
          </Card>
          
          <Card variant="outlined" sx={{ backgroundColor: '#2c3e50' }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom sx={{ color: 'white' }}>
                Producto Vectorial (Cruz): v₁×v₂
              </Typography>
              <Box sx={{ p: 1, bgcolor: '#3498db', borderRadius: 1, border: '2px solid #1976d2' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  v₁×v₂ = ({formatearValor(productoCruz.x)}, {formatearValor(productoCruz.y)}, {formatearValor(productoCruz.z)})
                </Typography>
              </Box>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, color: 'white' }}>
                Área del Paralelogramo
              </Typography>
              <Box sx={{ p: 1, bgcolor: '#3498db', borderRadius: 1, border: '2px solid #1976d2' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  Área = |v₁×v₂| = {formatearValor(areaParalelogramo)} unidades²
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Fórmulas Utilizadas:
        </Typography>
        
        <Typography variant="body2" paragraph>
          <strong>Producto Escalar:</strong> v₁·v₂ = x₁x₂ + y₁y₂ + z₁z₂
        </Typography>
        
        <Typography variant="body2" paragraph>
          <strong>Ángulo entre vectores:</strong> cos(θ) = (v₁·v₂) / (|v₁|·|v₂|)
        </Typography>
        
        <Typography variant="body2" paragraph>
          <strong>Producto Vectorial:</strong> v₁×v₂ = (y₁z₂ - z₁y₂, z₁x₂ - x₁z₂, x₁y₂ - y₁x₂)
        </Typography>
        
        <Typography variant="body2">
          <strong>Área del Paralelogramo:</strong> A = |v₁×v₂|
        </Typography>
        </Box>
      </Paper>
  );
}

// Componentes para las otras pestañas (por implementar)
function EcuacionesParametricas() {
  // Estados para el punto y el vector director
  const [punto, setPunto] = useState({ x: 1, y: 2, z: 3 });
  const [vector, setVector] = useState({ x: 2, y: -1, z: 4 });
  const [parametro, setParametro] = useState(0);
  const [puntoResultante, setPuntoResultante] = useState({ x: 0, y: 0, z: 0 });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  
  // Modo de entrada: 'punto-vector' o 'dos-puntos'
  const [modoEntrada, setModoEntrada] = useState('punto-vector');
  const [segundoPunto, setSegundoPunto] = useState({ x: 3, y: 1, z: 7 });
  
  // Calcular ecuación paramétrica inicial
  useEffect(() => {
    if (modoEntrada === 'punto-vector') {
      calcularPuntoEnRecta();
    } else {
      calcularVectorDirector();
      calcularPuntoEnRecta();
    }
  }, []);
  
  // Función para manejar cambios en el primer punto
  const handlePuntoChange = (componente, valor) => {
    const esValorValido = valor === '' || valor === '-' || valor === '.' || 
                          valor === '-.' || /^-?\d*\.?\d*$/.test(valor);
    
    if (esValorValido) {
      setPunto({
        ...punto,
        [componente]: valor
      });
      setMensaje('');
      setError('');
    }
  };
  
  // Función para manejar cambios en el segundo punto (modo dos-puntos)
  const handleSegundoPuntoChange = (componente, valor) => {
    const esValorValido = valor === '' || valor === '-' || valor === '.' || 
                          valor === '-.' || /^-?\d*\.?\d*$/.test(valor);
    
    if (esValorValido) {
      setSegundoPunto({
        ...segundoPunto,
        [componente]: valor
      });
      setMensaje('');
      setError('');
    }
  };
  
  // Función para manejar cambios en el vector director
  const handleVectorChange = (componente, valor) => {
    const esValorValido = valor === '' || valor === '-' || valor === '.' || 
                          valor === '-.' || /^-?\d*\.?\d*$/.test(valor);
    
    if (esValorValido) {
      setVector({
        ...vector,
        [componente]: valor
      });
      setMensaje('');
      setError('');
    }
  };
  
  // Función para manejar cambios en el parámetro t
  const handleParametroChange = (valor) => {
    const esValorValido = valor === '' || valor === '-' || valor === '.' || 
                          valor === '-.' || /^-?\d*\.?\d*$/.test(valor);
    
    if (esValorValido) {
      setParametro(valor);
      setMensaje('');
      setError('');
    }
  };
  
  // Función para calcular el vector director a partir de dos puntos
  const calcularVectorDirector = () => {
    try {
      // Convertir valores a números
      const p1 = {
        x: parseFloat(punto.x) || 0,
        y: parseFloat(punto.y) || 0,
        z: parseFloat(punto.z) || 0
      };
      
      const p2 = {
        x: parseFloat(segundoPunto.x) || 0,
        y: parseFloat(segundoPunto.y) || 0,
        z: parseFloat(segundoPunto.z) || 0
      };
      
      // Calcular vector director: p2 - p1
      const v = {
        x: p2.x - p1.x,
        y: p2.y - p1.y,
        z: p2.z - p1.z
      };
      
      // Verificar si el vector es nulo (los puntos son iguales)
      if (v.x === 0 && v.y === 0 && v.z === 0) {
        setError('Los dos puntos son iguales. El vector director es nulo.');
        return false;
      }
      
      setVector(v);
      return true;
    } catch (e) {
      setError('Error al calcular el vector director: ' + e.message);
      console.error("Error en calcularVectorDirector:", e);
      return false;
    }
  };
  
  // Función para calcular un punto en la recta para un valor de t
  const calcularPuntoEnRecta = () => {
    try {
      // Convertir valores a números
      const p = {
        x: parseFloat(punto.x) || 0,
        y: parseFloat(punto.y) || 0,
        z: parseFloat(punto.z) || 0
      };
      
      const v = {
        x: parseFloat(vector.x) || 0,
        y: parseFloat(vector.y) || 0,
        z: parseFloat(vector.z) || 0
      };
      
      const t = parseFloat(parametro) || 0;
      
      // Verificar que el vector no sea nulo
      if (v.x === 0 && v.y === 0 && v.z === 0) {
        setError('El vector director no puede ser nulo.');
        return;
      }
      
      // Calcular punto en la recta: P + tV
      const resultado = {
        x: p.x + t * v.x,
        y: p.y + t * v.y,
        z: p.z + t * v.z
      };
      
      setPuntoResultante(resultado);
      setMensaje('Punto calculado correctamente para t = ' + t);
    } catch (e) {
      setError('Error al calcular el punto en la recta: ' + e.message);
      console.error("Error en calcularPuntoEnRecta:", e);
    }
  };
  
  // Función para cambiar el modo de entrada
  const cambiarModoEntrada = (nuevoModo) => {
    if (nuevoModo === modoEntrada) return;
    
    setModoEntrada(nuevoModo);
    setMensaje('');
    setError('');
    
    if (nuevoModo === 'dos-puntos') {
      // Al cambiar a modo dos-puntos, calcular el vector director
      setTimeout(() => calcularVectorDirector(), 100);
    }
  };
  
  // Función para formatear un valor numérico
  const formatearValor = (valor) => {
    if (typeof valor === 'string') return valor;
    if (valor === undefined || valor === null || isNaN(valor)) return "0";
    
    const valorRedondeado = Math.round(valor * 10000) / 10000;
    if (valorRedondeado === 0) return "0";
    if (valorRedondeado % 1 === 0) return valorRedondeado.toString();
    
    return valorRedondeado.toFixed(2);
  };
  
  // Estilos comunes para los campos de texto
  const textFieldStyles = {
    mx: 1, 
    width: '80px',
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#ffffff',
      '& fieldset': {
        borderColor: '#1976d2',
        borderWidth: 2,
      },
      '&:hover fieldset': {
        borderColor: '#1565c0',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0d47a1',
      },
      '& input': {
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
      }
    }
  };
  
  // Props comunes para los campos de texto
  const inputProps = {
    inputMode: 'decimal',
    style: { textAlign: 'center' },
    onKeyDown: (e) => {
      if (
        /[0-9\.-]/.test(e.key) || 
        ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key) ||
        (e.ctrlKey && ['x', 'c', 'v'].includes(e.key))
      ) {
        return true;
      }
      e.preventDefault();
      return false;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Ecuaciones Paramétricas de Rectas en R³
      </Typography>
      
      <Typography paragraph>
        Trabaja con ecuaciones paramétricas de la forma P(t) = P₀ + t·v, donde P₀ es un punto en la recta
        y v es el vector director. Puedes definir la recta mediante un punto y un vector director o
        mediante dos puntos de la recta.
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {mensaje && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {mensaje}
        </Alert>
      )}
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Modo de entrada:
                </Typography>
                <Button 
                  variant={modoEntrada === 'punto-vector' ? 'contained' : 'outlined'}
                  onClick={() => cambiarModoEntrada('punto-vector')}
                  sx={{ mr: 1 }}
                >
                  Punto y Vector
                </Button>
                <Button 
                  variant={modoEntrada === 'dos-puntos' ? 'contained' : 'outlined'}
                  onClick={() => cambiarModoEntrada('dos-puntos')}
                >
                  Dos Puntos
                </Button>
    </Box>
              
              <Typography variant="subtitle1" gutterBottom>
                {modoEntrada === 'punto-vector' ? 'Punto inicial (P₀):' : 'Primer punto (P₁):'}
              </Typography>
              <VectorInput>
                <Typography sx={{ minWidth: 20 }}>x:</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  value={punto.x}
                  onChange={(e) => handlePuntoChange('x', e.target.value)}
                  sx={textFieldStyles}
                  inputProps={inputProps}
                />
                <Typography sx={{ minWidth: 20 }}>y:</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  value={punto.y}
                  onChange={(e) => handlePuntoChange('y', e.target.value)}
                  sx={textFieldStyles}
                  inputProps={inputProps}
                />
                <Typography sx={{ minWidth: 20 }}>z:</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  value={punto.z}
                  onChange={(e) => handlePuntoChange('z', e.target.value)}
                  sx={textFieldStyles}
                  inputProps={inputProps}
                />
              </VectorInput>
              
              {modoEntrada === 'dos-puntos' ? (
                <>
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    Segundo punto (P₂):
                  </Typography>
                  <VectorInput>
                    <Typography sx={{ minWidth: 20 }}>x:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={segundoPunto.x}
                      onChange={(e) => handleSegundoPuntoChange('x', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                    <Typography sx={{ minWidth: 20 }}>y:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={segundoPunto.y}
                      onChange={(e) => handleSegundoPuntoChange('y', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                    <Typography sx={{ minWidth: 20 }}>z:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={segundoPunto.z}
                      onChange={(e) => handleSegundoPuntoChange('z', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                  </VectorInput>
                  <Box sx={{ mt: 1 }}>
                    <Button 
                      variant="contained" 
                      size="small"
                      onClick={calcularVectorDirector}
                      sx={{ mr: 1 }}
                    >
                      Calcular Vector Director
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    Vector director (v):
                  </Typography>
                  <VectorInput>
                    <Typography sx={{ minWidth: 20 }}>x:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={vector.x}
                      onChange={(e) => handleVectorChange('x', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                    <Typography sx={{ minWidth: 20 }}>y:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={vector.y}
                      onChange={(e) => handleVectorChange('y', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                    <Typography sx={{ minWidth: 20 }}>z:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={vector.z}
                      onChange={(e) => handleVectorChange('z', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                  </VectorInput>
                </>
              )}
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Parámetro t:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TextField
                  variant="outlined"
                  size="small"
                  value={parametro}
                  onChange={(e) => handleParametroChange(e.target.value)}
                  sx={{ width: '120px', mx: 1 }}
                  inputProps={inputProps}
                />
                <Button 
                  variant="contained" 
                  size="small"
                  onClick={calcularPuntoEnRecta}
                >
                  Calcular Punto
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{ mb: 2, backgroundColor: '#2c3e50' }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom sx={{ color: 'white' }}>
                Ecuación Paramétrica de la Recta
              </Typography>
              <Box sx={{ p: 1, bgcolor: '#3498db', borderRadius: 1, border: '2px solid #1976d2' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  r(t) = P₀ + t·v
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white', mt: 1 }}>
                  x(t) = {formatearValor(punto.x)} + t·{formatearValor(vector.x)}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  y(t) = {formatearValor(punto.y)} + t·{formatearValor(vector.y)}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  z(t) = {formatearValor(punto.z)} + t·{formatearValor(vector.z)}
                </Typography>
              </Box>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, color: 'white' }}>
                Punto para t = {formatearValor(parametro)}
              </Typography>
              <Box sx={{ p: 1, bgcolor: '#3498db', borderRadius: 1, border: '2px solid #1976d2' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  P({formatearValor(parametro)}) = ({formatearValor(puntoResultante.x)}, {formatearValor(puntoResultante.y)}, {formatearValor(puntoResultante.z)})
                </Typography>
              </Box>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, color: 'white' }}>
                Verificación de Colinealidad
              </Typography>
              <Box sx={{ p: 1, bgcolor: '#3498db', borderRadius: 1, border: '2px solid #1976d2' }}>
                {modoEntrada === 'dos-puntos' ? (
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                    Vector P₁P₂ = ({formatearValor(vector.x)}, {formatearValor(vector.y)}, {formatearValor(vector.z)})
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                    Todo punto P(t) en la recta es colineal con P₀ y la dirección v
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
          
          <Card variant="outlined" sx={{ backgroundColor: '#2c3e50' }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom sx={{ color: 'white' }}>
                Puntos Notables
              </Typography>
              
              <Box sx={{ p: 1, bgcolor: '#3498db', borderRadius: 1, border: '2px solid #1976d2', mb: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  Para t = 0: P(0) = ({formatearValor(punto.x)}, {formatearValor(punto.y)}, {formatearValor(punto.z)})
                </Typography>
              </Box>
              
              <Box sx={{ p: 1, bgcolor: '#3498db', borderRadius: 1, border: '2px solid #1976d2', mb: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  Para t = 1: P(1) = ({formatearValor(parseFloat(punto.x) + parseFloat(vector.x))}, 
                  {formatearValor(parseFloat(punto.y) + parseFloat(vector.y))}, 
                  {formatearValor(parseFloat(punto.z) + parseFloat(vector.z))})
                </Typography>
              </Box>
              
              <Box sx={{ p: 1, bgcolor: '#3498db', borderRadius: 1, border: '2px solid #1976d2' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  Para t = -1: P(-1) = ({formatearValor(parseFloat(punto.x) - parseFloat(vector.x))}, 
                  {formatearValor(parseFloat(punto.y) - parseFloat(vector.y))}, 
                  {formatearValor(parseFloat(punto.z) - parseFloat(vector.z))})
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Información Adicional:
        </Typography>
        
        <Typography variant="body2" paragraph>
          <strong>Ecuación Paramétrica:</strong> Define una recta en el espacio 3D como P(t) = P₀ + t·v,
          donde P₀ es un punto fijo en la recta, v es el vector director (no nulo) y t es un parámetro real.
        </Typography>
        
        <Typography variant="body2" paragraph>
          <strong>Ecuaciones Cartesianas:</strong> Si el vector director es v = (a, b, c), y ninguna componente es cero,
          las ecuaciones cartesianas equivalentes son:
          (x - x₀)/a = (y - y₀)/b = (z - z₀)/c
        </Typography>
        
        <Typography variant="body2">
          <strong>Propiedades:</strong> Una recta en el espacio queda determinada por un punto y una dirección, 
          o por dos puntos distintos. Dos rectas pueden ser paralelas, secantes o cruzadas (no coplanarias).
        </Typography>
      </Box>
    </Paper>
  );
}

function PlanosEspacio() {
  // Estados para los diferentes modos de definición de un plano
  const [modoEntrada, setModoEntrada] = useState('punto-normal');
  const [punto, setPunto] = useState({ x: 1, y: 1, z: 1 });
  const [vectorNormal, setVectorNormal] = useState({ x: 2, y: 3, z: 4 });
  const [punto2, setPunto2] = useState({ x: 2, y: 0, z: 0 });
  const [punto3, setPunto3] = useState({ x: 0, y: 3, z: 0 });
  const [coeficientes, setCoeficientes] = useState({ A: 2, B: 3, C: 4, D: -16 });
  
  // Estados para resultados y mensajes
  const [ecuacionGeneral, setEcuacionGeneral] = useState('');
  const [ecuacionCartesiana, setEcuacionCartesiana] = useState('');
  const [distanciaOrigen, setDistanciaOrigen] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  
  // Calcular ecuación del plano inicial
  useEffect(() => {
    calcularEcuacionPlano();
  }, []);
  
  // Función para manejar cambios en los puntos
  const handlePuntoChange = (punto, componente, valor) => {
    const esValorValido = valor === '' || valor === '-' || valor === '.' || 
                        valor === '-.' || /^-?\d*\.?\d*$/.test(valor);
    
    if (esValorValido) {
      if (punto === 'punto1') {
        setPunto({
          ...punto,
          [componente]: valor
        });
      } else if (punto === 'punto2') {
        setPunto2({
          ...punto2,
          [componente]: valor
        });
      } else if (punto === 'punto3') {
        setPunto3({
          ...punto3,
          [componente]: valor
        });
      }
      
      setMensaje('');
      setError('');
    }
  };
  
  // Función para manejar cambios en el vector normal
  const handleVectorNormalChange = (componente, valor) => {
    const esValorValido = valor === '' || valor === '-' || valor === '.' || 
                        valor === '-.' || /^-?\d*\.?\d*$/.test(valor);
    
    if (esValorValido) {
      setVectorNormal({
        ...vectorNormal,
        [componente]: valor
      });
      
      setMensaje('');
      setError('');
    }
  };
  
  // Función para manejar cambios en los coeficientes de la ecuación general
  const handleCoeficienteChange = (coef, valor) => {
    const esValorValido = valor === '' || valor === '-' || valor === '.' || 
                        valor === '-.' || /^-?\d*\.?\d*$/.test(valor);
    
    if (esValorValido) {
      setCoeficientes({
        ...coeficientes,
        [coef]: valor
      });
      
      setMensaje('');
      setError('');
    }
  };
  
  // Función para cambiar el modo de entrada
  const cambiarModoEntrada = (nuevoModo) => {
    if (nuevoModo === modoEntrada) return;
    
    setModoEntrada(nuevoModo);
    setMensaje('');
    setError('');
    
    // Actualizar cálculos si es necesario después de cambiar el modo
    if (nuevoModo === 'tres-puntos') {
      setTimeout(() => calcularVectorNormalTresPuntos(), 100);
    } else if (nuevoModo === 'ecuacion-general') {
      setTimeout(() => calcularDesdeEcuacionGeneral(), 100);
    }
  };
  
  // Calcular vector normal a partir de tres puntos
  const calcularVectorNormalTresPuntos = () => {
    try {
      // Convertir a números
      const p1 = {
        x: parseFloat(punto.x) || 0,
        y: parseFloat(punto.y) || 0,
        z: parseFloat(punto.z) || 0
      };
      
      const p2 = {
        x: parseFloat(punto2.x) || 0,
        y: parseFloat(punto2.y) || 0,
        z: parseFloat(punto2.z) || 0
      };
      
      const p3 = {
        x: parseFloat(punto3.x) || 0,
        y: parseFloat(punto3.y) || 0,
        z: parseFloat(punto3.z) || 0
      };
      
      // Calcular vectores p1p2 y p1p3
      const v1 = {
        x: p2.x - p1.x,
        y: p2.y - p1.y,
        z: p2.z - p1.z
      };
      
      const v2 = {
        x: p3.x - p1.x,
        y: p3.y - p1.y,
        z: p3.z - p1.z
      };
      
      // Verificar si los puntos son colineales (producto cruz es cero)
      if (
        (v1.x === 0 && v1.y === 0 && v1.z === 0) || 
        (v2.x === 0 && v2.y === 0 && v2.z === 0)
      ) {
        setError('Al menos dos puntos son iguales. No se puede definir un plano.');
        return false;
      }
      
      // Calcular producto cruz para obtener vector normal
      const normal = {
        x: v1.y * v2.z - v1.z * v2.y,
        y: v1.z * v2.x - v1.x * v2.z,
        z: v1.x * v2.y - v1.y * v2.x
      };
      
      // Verificar si el vector normal es nulo (puntos colineales)
      if (normal.x === 0 && normal.y === 0 && normal.z === 0) {
        setError('Los tres puntos son colineales. No definen un plano único.');
        return false;
      }
      
      setVectorNormal(normal);
      return true;
    } catch (e) {
      setError('Error al calcular el vector normal: ' + e.message);
      console.error("Error en calcularVectorNormalTresPuntos:", e);
      return false;
    }
  };
  
  // Calcular desde ecuación general
  const calcularDesdeEcuacionGeneral = () => {
    try {
      // Convertir a números
      const A = parseFloat(coeficientes.A) || 0;
      const B = parseFloat(coeficientes.B) || 0;
      const C = parseFloat(coeficientes.C) || 0;
      const D = parseFloat(coeficientes.D) || 0;
      
      // Verificar si A, B y C son todos cero
      if (A === 0 && B === 0 && C === 0) {
        setError('Los coeficientes A, B y C no pueden ser todos cero. No define un plano.');
        return false;
      }
      
      // Establecer vector normal
      setVectorNormal({
        x: A,
        y: B,
        z: C
      });
      
      // Encontrar un punto en el plano
      let puntoEnPlano = { x: 0, y: 0, z: 0 };
      
      if (C !== 0) {
        // Si C no es cero, podemos encontrar un punto con z = -D/C
        puntoEnPlano = { x: 0, y: 0, z: -D / C };
      } else if (B !== 0) {
        // Si B no es cero, podemos encontrar un punto con y = -D/B
        puntoEnPlano = { x: 0, y: -D / B, z: 0 };
      } else if (A !== 0) {
        // Si A no es cero, podemos encontrar un punto con x = -D/A
        puntoEnPlano = { x: -D / A, y: 0, z: 0 };
      }
      
      setPunto(puntoEnPlano);
      return true;
    } catch (e) {
      setError('Error al calcular desde la ecuación general: ' + e.message);
      console.error("Error en calcularDesdeEcuacionGeneral:", e);
      return false;
    }
  };
  
  // Calcular ecuación del plano
  const calcularEcuacionPlano = () => {
    try {
      // En el modo tres-puntos, primero calcular el vector normal
      if (modoEntrada === 'tres-puntos') {
        if (!calcularVectorNormalTresPuntos()) {
          return;
        }
      } else if (modoEntrada === 'ecuacion-general') {
        if (!calcularDesdeEcuacionGeneral()) {
          return;
        }
      }
      
      // Convertir valores a números
      const p = {
        x: parseFloat(punto.x) || 0,
        y: parseFloat(punto.y) || 0,
        z: parseFloat(punto.z) || 0
      };
      
      const n = {
        x: parseFloat(vectorNormal.x) || 0,
        y: parseFloat(vectorNormal.y) || 0,
        z: parseFloat(vectorNormal.z) || 0
      };
      
      // Verificar si el vector normal es nulo
      if (n.x === 0 && n.y === 0 && n.z === 0) {
        setError('El vector normal no puede ser nulo.');
        return;
      }
      
      // Calcular el término D para la ecuación general del plano
      const D = -(n.x * p.x + n.y * p.y + n.z * p.z);
      
      // Formar la ecuación general: Ax + By + Cz + D = 0
      let ecuacion = '';
      
      if (n.x !== 0) {
        ecuacion += formatearTermino(n.x, 'x', true);
      }
      
      if (n.y !== 0) {
        ecuacion += formatearTermino(n.y, 'y', ecuacion !== '');
      }
      
      if (n.z !== 0) {
        ecuacion += formatearTermino(n.z, 'z', ecuacion !== '');
      }
      
      if (D !== 0 || ecuacion === '') {
        const signo = D > 0 ? ' + ' : ' - ';
        ecuacion += signo + Math.abs(formatearValor(D));
      }
      
      ecuacion += ' = 0';
      setEcuacionGeneral(ecuacion);
      
      // Calcular la ecuación en forma cartesiana (despejada) si es posible
      let ecuacionDesp = '';
      if (n.z !== 0) {
        // Despejar z: z = -(Ax + By + D)/C
        const a = -n.x / n.z;
        const b = -n.y / n.z;
        const c = -D / n.z;
        
        ecuacionDesp = 'z = ';
        
        if (a !== 0) {
          ecuacionDesp += formatearValor(a) + 'x';
        }
        
        if (b !== 0) {
          const signo = b > 0 ? ' + ' : ' - ';
          ecuacionDesp += signo + Math.abs(formatearValor(b)) + 'y';
        }
        
        if (c !== 0 || (a === 0 && b === 0)) {
          const signo = c > 0 ? ' + ' : ' - ';
          ecuacionDesp += signo + Math.abs(formatearValor(c));
        }
      } else if (n.y !== 0) {
        // Despejar y si z = 0
        const a = -n.x / n.y;
        const c = -D / n.y;
        
        ecuacionDesp = 'y = ';
        
        if (a !== 0) {
          ecuacionDesp += formatearValor(a) + 'x';
        }
        
        if (c !== 0 || a === 0) {
          const signo = c > 0 ? ' + ' : ' - ';
          ecuacionDesp += signo + Math.abs(formatearValor(c));
        }
      } else if (n.x !== 0) {
        // Despejar x si y = z = 0
        const c = -D / n.x;
        ecuacionDesp = 'x = ' + formatearValor(c);
      }
      
      setEcuacionCartesiana(ecuacionDesp);
      
      // Calcular la distancia al origen
      const magnitudNormal = Math.sqrt(n.x * n.x + n.y * n.y + n.z * n.z);
      const distancia = Math.abs(D) / magnitudNormal;
      setDistanciaOrigen(distancia);
      
      setMensaje('Ecuación del plano calculada correctamente.');
      
      // Actualizar coeficientes de la ecuación general (para el modo ecuación general)
      if (modoEntrada !== 'ecuacion-general') {
        setCoeficientes({
          A: n.x,
          B: n.y,
          C: n.z,
          D: D
        });
      }
    } catch (e) {
      setError('Error al calcular la ecuación del plano: ' + e.message);
      console.error("Error en calcularEcuacionPlano:", e);
    }
  };
  
  // Función auxiliar para formatear términos de la ecuación
  const formatearTermino = (coef, variable, mostrarSigno) => {
    const coefAbs = Math.abs(coef);
    let termino = '';
    
    if (mostrarSigno) {
      termino += coef >= 0 ? ' + ' : ' - ';
    } else {
      termino += coef >= 0 ? '' : '-';
    }
    
    if (coefAbs !== 1) {
      termino += formatearValor(coefAbs);
    }
    
    termino += variable;
    return termino;
  };
  
  // Función para formatear un valor numérico
  const formatearValor = (valor) => {
    if (typeof valor === 'string') return valor;
    if (valor === undefined || valor === null || isNaN(valor)) return "0";
    
    const valorRedondeado = Math.round(valor * 10000) / 10000;
    if (valorRedondeado === 0) return "0";
    if (valorRedondeado % 1 === 0) return valorRedondeado.toString();
    
    return valorRedondeado.toFixed(2);
  };
  
  // Estilos comunes para los campos de texto
  const textFieldStyles = {
    mx: 1, 
    width: '80px',
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#ffffff',
      '& fieldset': {
        borderColor: '#1976d2',
        borderWidth: 2,
      },
      '&:hover fieldset': {
        borderColor: '#1565c0',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0d47a1',
      },
      '& input': {
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
      }
    }
  };
  
  // Props comunes para los campos de texto
  const inputProps = {
    inputMode: 'decimal',
    style: { textAlign: 'center' },
    onKeyDown: (e) => {
      if (
        /[0-9\.-]/.test(e.key) || 
        ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key) ||
        (e.ctrlKey && ['x', 'c', 'v'].includes(e.key))
      ) {
        return true;
      }
      e.preventDefault();
      return false;
    }
  };
  
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Planos en el Espacio Tridimensional
      </Typography>
      
      <Typography paragraph>
        Determina las ecuaciones de planos en R³ utilizando diferentes métodos: punto y vector normal,
        tres puntos no colineales, o introduciendo directamente la ecuación general.
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {mensaje && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {mensaje}
        </Alert>
      )}
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Modo de definición:
                </Typography>
                <Grid container spacing={1}>
                  <Grid item>
                    <Button 
                      variant={modoEntrada === 'punto-normal' ? 'contained' : 'outlined'}
                      onClick={() => cambiarModoEntrada('punto-normal')}
                      size="small"
                    >
                      Punto y Normal
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button 
                      variant={modoEntrada === 'tres-puntos' ? 'contained' : 'outlined'}
                      onClick={() => cambiarModoEntrada('tres-puntos')}
                      size="small"
                    >
                      Tres Puntos
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button 
                      variant={modoEntrada === 'ecuacion-general' ? 'contained' : 'outlined'}
                      onClick={() => cambiarModoEntrada('ecuacion-general')}
                      size="small"
                    >
                      Ecuación General
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              
              {modoEntrada === 'punto-normal' && (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    Punto en el plano:
                  </Typography>
                  <VectorInput>
                    <Typography sx={{ minWidth: 20 }}>x:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={punto.x}
                      onChange={(e) => handlePuntoChange('punto1', 'x', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                    <Typography sx={{ minWidth: 20 }}>y:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={punto.y}
                      onChange={(e) => handlePuntoChange('punto1', 'y', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                    <Typography sx={{ minWidth: 20 }}>z:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={punto.z}
                      onChange={(e) => handlePuntoChange('punto1', 'z', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                  </VectorInput>
                  
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    Vector normal:
                  </Typography>
                  <VectorInput>
                    <Typography sx={{ minWidth: 20 }}>A:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={vectorNormal.x}
                      onChange={(e) => handleVectorNormalChange('x', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                    <Typography sx={{ minWidth: 20 }}>B:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={vectorNormal.y}
                      onChange={(e) => handleVectorNormalChange('y', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                    <Typography sx={{ minWidth: 20 }}>C:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={vectorNormal.z}
                      onChange={(e) => handleVectorNormalChange('z', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                  </VectorInput>
                </>
              )}
              
              {modoEntrada === 'tres-puntos' && (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    Punto 1:
                  </Typography>
                  <VectorInput>
                    <Typography sx={{ minWidth: 20 }}>x:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={punto.x}
                      onChange={(e) => handlePuntoChange('punto1', 'x', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                    <Typography sx={{ minWidth: 20 }}>y:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={punto.y}
                      onChange={(e) => handlePuntoChange('punto1', 'y', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                    <Typography sx={{ minWidth: 20 }}>z:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={punto.z}
                      onChange={(e) => handlePuntoChange('punto1', 'z', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                  </VectorInput>
                  
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    Punto 2:
                  </Typography>
                  <VectorInput>
                    <Typography sx={{ minWidth: 20 }}>x:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={punto2.x}
                      onChange={(e) => handlePuntoChange('punto2', 'x', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                    <Typography sx={{ minWidth: 20 }}>y:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={punto2.y}
                      onChange={(e) => handlePuntoChange('punto2', 'y', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                    <Typography sx={{ minWidth: 20 }}>z:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={punto2.z}
                      onChange={(e) => handlePuntoChange('punto2', 'z', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                  </VectorInput>
                  
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    Punto 3:
                  </Typography>
                  <VectorInput>
                    <Typography sx={{ minWidth: 20 }}>x:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={punto3.x}
                      onChange={(e) => handlePuntoChange('punto3', 'x', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                    <Typography sx={{ minWidth: 20 }}>y:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={punto3.y}
                      onChange={(e) => handlePuntoChange('punto3', 'y', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                    <Typography sx={{ minWidth: 20 }}>z:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={punto3.z}
                      onChange={(e) => handlePuntoChange('punto3', 'z', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                  </VectorInput>
                </>
              )}
              
              {modoEntrada === 'ecuacion-general' && (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    Ecuación general: Ax + By + Cz + D = 0
                  </Typography>
                  <VectorInput>
                    <Typography sx={{ minWidth: 20 }}>A:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={coeficientes.A}
                      onChange={(e) => handleCoeficienteChange('A', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                    <Typography sx={{ minWidth: 20 }}>B:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={coeficientes.B}
                      onChange={(e) => handleCoeficienteChange('B', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                    <Typography sx={{ minWidth: 20 }}>C:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={coeficientes.C}
                      onChange={(e) => handleCoeficienteChange('C', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                    <Typography sx={{ minWidth: 20 }}>D:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={coeficientes.D}
                      onChange={(e) => handleCoeficienteChange('D', e.target.value)}
                      sx={textFieldStyles}
                      inputProps={inputProps}
                    />
                  </VectorInput>
                </>
              )}
              
              <Box sx={{ mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={calcularEcuacionPlano}
                  sx={{ mr: 2 }}
                >
                  Calcular Ecuación
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => {
                    if (modoEntrada === 'punto-normal') {
                      setPunto({ x: 0, y: 0, z: 0 });
                      setVectorNormal({ x: 0, y: 0, z: 1 });
                    } else if (modoEntrada === 'tres-puntos') {
                      setPunto({ x: 0, y: 0, z: 0 });
                      setPunto2({ x: 1, y: 0, z: 0 });
                      setPunto3({ x: 0, y: 1, z: 0 });
                    } else if (modoEntrada === 'ecuacion-general') {
                      setCoeficientes({ A: 0, B: 0, C: 1, D: 0 });
                    }
                    setMensaje('');
                    setError('');
                  }}
                >
                  Reiniciar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{ mb: 2, backgroundColor: '#2c3e50' }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom sx={{ color: 'white' }}>
                Ecuación General del Plano
              </Typography>
              <Box sx={{ p: 1, bgcolor: '#3498db', borderRadius: 1, border: '2px solid #1976d2' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  {ecuacionGeneral || 'Ax + By + Cz + D = 0'}
                </Typography>
              </Box>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, color: 'white' }}>
                Ecuación Cartesiana (despejada)
              </Typography>
              <Box sx={{ p: 1, bgcolor: '#3498db', borderRadius: 1, border: '2px solid #1976d2' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  {ecuacionCartesiana || 'Esperando cálculos...'}
                </Typography>
              </Box>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, color: 'white' }}>
                Vector Normal al Plano
              </Typography>
              <Box sx={{ p: 1, bgcolor: '#3498db', borderRadius: 1, border: '2px solid #1976d2' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  n = ({formatearValor(vectorNormal.x)}, {formatearValor(vectorNormal.y)}, {formatearValor(vectorNormal.z)})
                </Typography>
              </Box>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, color: 'white' }}>
                Distancia al Origen
              </Typography>
              <Box sx={{ p: 1, bgcolor: '#3498db', borderRadius: 1, border: '2px solid #1976d2' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  d = {formatearValor(distanciaOrigen)} unidades
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Información Adicional:
        </Typography>
        
        <Typography variant="body2" paragraph>
          <strong>Ecuación General:</strong> Ax + By + Cz + D = 0, donde (A,B,C) es el vector normal al plano.
        </Typography>
        
        <Typography variant="body2" paragraph>
          <strong>Formulación Punto-Normal:</strong> Un plano queda definido por un punto P₀ = (x₀,y₀,z₀) 
          y un vector normal n = (A,B,C), con la ecuación A(x-x₀) + B(y-y₀) + C(z-z₀) = 0.
        </Typography>
        
        <Typography variant="body2" paragraph>
          <strong>Formulación con Tres Puntos:</strong> Tres puntos no colineales P₁, P₂ y P₃ definen un plano único. 
          El vector normal se calcula como el producto vectorial de los vectores P₁P₂ y P₁P₃.
        </Typography>
        
        <Typography variant="body2">
          <strong>Distancia al Origen:</strong> Para un plano con ecuación Ax + By + Cz + D = 0, 
          la distancia del plano al origen es d = |D|/√(A² + B² + C²).
        </Typography>
      </Box>
    </Paper>
  );
}

function SuperficiesCuadricas() {
  const [superficieSeleccionada, setSuperficieSeleccionada] = useState('elipsoide');

  // Función para cambiar la superficie seleccionada
  const handleCambioSuperficie = (event, nuevaSuperficie) => {
    if (nuevaSuperficie !== null) {
      setSuperficieSeleccionada(nuevaSuperficie);
    }
  };

  // Renderizar la información de la superficie seleccionada
  const renderizarSuperficie = () => {
    switch (superficieSeleccionada) {
      case 'elipsoide':
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mt: 2, color: '#64b5f6' }}>
              Elipsoide
            </Typography>
            
            <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#1e2a38', border: '1px solid #3f51b5' }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#bbdefb' }}>
                  Ecuación canónica:
                </Typography>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: '#102a43', 
                  borderRadius: 1, 
                  border: '1px solid #2196f3',
                  textAlign: 'center'
                }}>
                  <BlockMath math={"\\frac{x^2}{a^2} + \\frac{y^2}{b^2} + \\frac{z^2}{c^2} = 1"} />
                </Box>
                
                <Typography variant="body1" sx={{ mt: 2, color: '#e0e0e0' }}>
                  En un elipsoide, los tres semiejes a, b y c pueden ser diferentes. Si a = b = c, entonces la superficie 
                  es una esfera.
                </Typography>
              </CardContent>
            </Card>
            
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#bbdefb' }}>
              Propiedades:
            </Typography>
            <ul style={{ color: '#e0e0e0' }}>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Es una superficie cerrada.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Sus secciones con los planos coordenados son elipses.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Volumen = <InlineMath math={"\\frac{4}{3}\\pi abc"} />
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Si a = b, el elipsoide es de revolución alrededor del eje z.
                </Typography>
              </li>
            </ul>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, fontWeight: 'bold', color: '#bbdefb' }}>
              Ejemplo:
            </Typography>
            <Typography variant="body1" sx={{ color: '#4fc3f7' }}>
              <InlineMath math={"\\frac{x^2}{9} + \\frac{y^2}{4} + \\frac{z^2}{16} = 1"} /> es un elipsoide con semiejes a = 3, b = 2, c = 4.
            </Typography>
          </Box>
        );
      
      case 'hiperboloide-una-hoja':
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mt: 2, color: '#64b5f6' }}>
              Hiperboloide de Una Hoja
            </Typography>
            
            <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#1e2a38', border: '1px solid #3f51b5' }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#bbdefb' }}>
                  Ecuación canónica:
                </Typography>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: '#102a43', 
                  borderRadius: 1, 
                  border: '1px solid #2196f3',
                  textAlign: 'center'
                }}>
                  <BlockMath math={"\\frac{x^2}{a^2} + \\frac{y^2}{b^2} - \\frac{z^2}{c^2} = 1"} />
                </Box>
                
                <Typography variant="body1" sx={{ mt: 2, color: '#e0e0e0' }}>
                  La ecuación también puede tener cualquiera de los tres términos con signo negativo. La superficie
                  está centrada en el origen.
                </Typography>
              </CardContent>
            </Card>
            
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#bbdefb' }}>
              Propiedades:
            </Typography>
            <ul style={{ color: '#e0e0e0' }}>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Es una superficie de una sola pieza (una hoja).
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Sus secciones con planos paralelos a los planos coordenados son elipses o hipérbolas.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Contiene infinitas rectas (es una superficie reglada).
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Si a = b, el hiperboloide es de revolución alrededor del eje z.
                </Typography>
              </li>
            </ul>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, fontWeight: 'bold', color: '#bbdefb' }}>
              Ejemplo:
            </Typography>
            <Typography variant="body1" sx={{ color: '#4fc3f7' }}>
              <InlineMath math={"\\frac{x^2}{4} + \\frac{y^2}{9} - \\frac{z^2}{1} = 1"} /> es un hiperboloide de una hoja con valores a = 2, b = 3, c = 1.
            </Typography>
          </Box>
        );
      
      case 'hiperboloide-dos-hojas':
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mt: 2, color: '#64b5f6' }}>
              Hiperboloide de Dos Hojas
            </Typography>
            
            <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#1e2a38', border: '1px solid #3f51b5' }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#bbdefb' }}>
                  Ecuación canónica:
                </Typography>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: '#102a43', 
                  borderRadius: 1, 
                  border: '1px solid #2196f3',
                  textAlign: 'center'
                }}>
                  <BlockMath math={"-\\frac{x^2}{a^2} - \\frac{y^2}{b^2} + \\frac{z^2}{c^2} = 1"} />
                </Box>
                
                <Typography variant="body1" sx={{ mt: 2, color: '#e0e0e0' }}>
                  En este caso, solo un término tiene signo positivo, y ese eje es el que determina la dirección
                  en la que se extienden las dos hojas.
                </Typography>
              </CardContent>
            </Card>
            
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#bbdefb' }}>
              Propiedades:
            </Typography>
            <ul style={{ color: '#e0e0e0' }}>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Consta de dos partes separadas (hojas) que no se intersectan.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Para la ecuación dada, no hay puntos con z entre -c y c.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Las secciones transversales perpendiculares al eje z (para |z| > c) son elipses.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Si a = b, el hiperboloide es de revolución alrededor del eje z.
                </Typography>
              </li>
            </ul>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, fontWeight: 'bold', color: '#bbdefb' }}>
              Ejemplo:
            </Typography>
            <Typography variant="body1" sx={{ color: '#4fc3f7' }}>
              <InlineMath math={"-\\frac{x^2}{4} - \\frac{y^2}{9} + \\frac{z^2}{1} = 1"} /> es un hiperboloide de dos hojas con hojas a lo largo del eje z.
            </Typography>
          </Box>
        );
      
      case 'cono-eliptico':
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mt: 2, color: '#64b5f6' }}>
              Cono Elíptico
            </Typography>
            
            <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#1e2a38', border: '1px solid #3f51b5' }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#bbdefb' }}>
                  Ecuación canónica:
                </Typography>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: '#102a43', 
                  borderRadius: 1, 
                  border: '1px solid #2196f3',
                  textAlign: 'center'
                }}>
                  <BlockMath math={"\\frac{x^2}{a^2} + \\frac{y^2}{b^2} - \\frac{z^2}{c^2} = 0"} />
                </Box>
                
                <Typography variant="body1" sx={{ mt: 2, color: '#e0e0e0' }}>
                  A diferencia del hiperboloide, el lado derecho de la ecuación es 0 en lugar de 1.
                  El vértice del cono está en el origen.
                </Typography>
              </CardContent>
            </Card>
            
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#bbdefb' }}>
              Propiedades:
            </Typography>
            <ul style={{ color: '#e0e0e0' }}>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Tiene un punto singular en el origen (vértice).
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Es una superficie reglada (contiene infinitas líneas rectas).
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Las secciones con planos z = k (k ≠ 0) son elipses.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Si a = b, el cono es de revolución alrededor del eje z.
                </Typography>
              </li>
            </ul>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, fontWeight: 'bold', color: '#bbdefb' }}>
              Ejemplo:
            </Typography>
            <Typography variant="body1" sx={{ color: '#4fc3f7' }}>
              <InlineMath math={"\\frac{x^2}{4} + \\frac{y^2}{9} - \\frac{z^2}{1} = 0"} /> es un cono elíptico con vértice en el origen.
            </Typography>
          </Box>
        );
      
      case 'paraboloide-eliptico':
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mt: 2, color: '#64b5f6' }}>
              Paraboloide Elíptico
            </Typography>
            
            <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#1e2a38', border: '1px solid #3f51b5' }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#bbdefb' }}>
                  Ecuación canónica:
                </Typography>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: '#102a43', 
                  borderRadius: 1, 
                  border: '1px solid #2196f3',
                  textAlign: 'center'
                }}>
                  <BlockMath math={"\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = \\frac{z}{c}"} />
                </Box>
                
                <Typography variant="body1" sx={{ mt: 2, color: '#e0e0e0' }}>
                  Esta superficie tiene forma de copa o plato, con el vértice en el origen.
                  Se extiende indefinidamente en la dirección positiva del eje z.
                </Typography>
              </CardContent>
            </Card>
            
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#bbdefb' }}>
              Propiedades:
            </Typography>
            <ul style={{ color: '#e0e0e0' }}>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Las secciones horizontales (z = k, k > 0) son elipses.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Las secciones verticales son parábolas.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Tiene un punto extremo en el origen.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Si a = b, el paraboloide es de revolución alrededor del eje z.
                </Typography>
              </li>
            </ul>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, fontWeight: 'bold', color: '#bbdefb' }}>
              Ejemplo:
            </Typography>
            <Typography variant="body1" sx={{ color: '#4fc3f7' }}>
              <InlineMath math={"\\frac{x^2}{4} + \\frac{y^2}{9} = z"} /> es un paraboloide elíptico con a = 2, b = 3, c = 1.
            </Typography>
          </Box>
        );
      
      case 'paraboloide-hiperbolico':
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mt: 2, color: '#64b5f6' }}>
              Paraboloide Hiperbólico
            </Typography>
            
            <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#1e2a38', border: '1px solid #3f51b5' }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#bbdefb' }}>
                  Ecuación canónica:
                </Typography>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: '#102a43', 
                  borderRadius: 1, 
                  border: '1px solid #2196f3',
                  textAlign: 'center'
                }}>
                  <BlockMath math={"\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = \\frac{z}{c}"} />
                </Box>
                
                <Typography variant="body1" sx={{ mt: 2, color: '#e0e0e0' }}>
                  También conocida como "silla de montar" debido a su forma característica.
                  El origen es un punto de ensilladura.
                </Typography>
              </CardContent>
            </Card>
            
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#bbdefb' }}>
              Propiedades:
            </Typography>
            <ul style={{ color: '#e0e0e0' }}>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Las secciones horizontales (z = k) son hipérbolas para cualquier k ≠ 0.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  El plano z = 0 intersecta a la superficie en dos rectas que se cruzan.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Tiene puntos con curvatura negativa (puntos de ensilladura).
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Es una superficie reglada (contiene dos familias de rectas).
                </Typography>
              </li>
            </ul>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, fontWeight: 'bold', color: '#bbdefb' }}>
              Ejemplo:
            </Typography>
            <Typography variant="body1" sx={{ color: '#4fc3f7' }}>
              <InlineMath math={"\\frac{x^2}{4} - \\frac{y^2}{9} = z"} /> es un paraboloide hiperbólico con a = 2, b = 3, c = 1.
            </Typography>
          </Box>
        );
      
      default:
        return (
          <Typography variant="body1" color="error">
            Selecciona una superficie cuádrica para visualizar su información.
          </Typography>
        );
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, bgcolor: '#263238' }}>
      <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#64b5f6', mb: 2 }}>
        Superficies Cuádricas
      </Typography>
      
      <Typography paragraph sx={{ color: '#e0e0e0' }}>
        Las superficies cuádricas son superficies tridimensionales definidas por ecuaciones de segundo grado.
        Son el análogo en 3D de las cónicas en 2D. A continuación, se presentan los principales tipos:
      </Typography>
      
      <Box sx={{ width: '100%', bgcolor: '#1e2a38', mb: 3, borderRadius: 1 }}>
        <Tabs
          value={superficieSeleccionada}
          onChange={handleCambioSuperficie}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            borderBottom: 1, 
            borderColor: '#455a64',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '0.9rem',
              fontWeight: 'medium',
              minWidth: 120,
              color: '#90caf9',
            },
            '& .Mui-selected': {
              color: '#4fc3f7',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#2196f3',
            }
          }}
        >
          <Tab label="Elipsoide" value="elipsoide" />
          <Tab label="Hiperboloide de Una Hoja" value="hiperboloide-una-hoja" />
          <Tab label="Hiperboloide de Dos Hojas" value="hiperboloide-dos-hojas" />
          <Tab label="Cono Elíptico" value="cono-eliptico" />
          <Tab label="Paraboloide Elíptico" value="paraboloide-eliptico" />
          <Tab label="Paraboloide Hiperbólico" value="paraboloide-hiperbolico" />
        </Tabs>
      </Box>
      
      {renderizarSuperficie()}
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#bbdefb' }}>
          Ecuación general para superficies cuádricas:
        </Typography>
        <Card variant="outlined" sx={{ mb: 2, backgroundColor: '#102a43', border: '1px solid #3f51b5' }}>
          <CardContent>
            <Typography variant="body1" sx={{ fontFamily: 'math', textAlign: 'center', color: '#e3f2fd' }}>
              Ax² + By² + Cz² + 2Dxy + 2Exz + 2Fyz + 2Gx + 2Hy + 2Iz + J = 0
            </Typography>
          </CardContent>
        </Card>
        <Typography variant="body2" sx={{ color: '#b0bec5' }}>
          Donde A, B, C, D, E, F, G, H, I y J son constantes. Mediante una adecuada rotación y traslación
          de los ejes coordenados, esta ecuación puede transformarse en una de las formas canónicas
          presentadas en cada una de las superficies anteriores.
        </Typography>
      </Box>
    </Paper>
  );
}

function CoordenadasEspeciales() {
  const [tipoConversion, setTipoConversion] = useState('cilindricas');
  const [coordenadasEntrada, setCoordenadasEntrada] = useState({
    // Cartesianas
    x: 2,
    y: 2,
    z: 3,
    // Cilíndricas
    r: 2.83,
    theta: 0.79,
    h: 3,
    // Esféricas
    rho: 4.12,
    phi: 0.59,
    thetaEsf: 0.79
  });
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  // Maneja el cambio de pestaña
  const handleCambioTipo = (event, nuevoTipo) => {
    if (nuevoTipo !== null) {
      setTipoConversion(nuevoTipo);
      setError('');
      setExito('');
    }
  };

  // Maneja cambios en los inputs de coordenadas
  const handleCoordenadaChange = (tipo, coordenada, valor) => {
    // Validar que sea un número válido o entrada parcial
    const esValorValido = 
      valor === '' || 
      valor === '-' || 
      valor === '.' || 
      valor === '-.' || 
      /^-?\d*\.?\d*$/.test(valor);
    
    if (esValorValido) {
      setCoordenadasEntrada({
        ...coordenadasEntrada,
        [coordenada]: valor
      });
      
      setError('');
      setExito('');
    }
  };

  // Convertir de cartesianas a cilíndricas
  const convertirCartesianasACilindricas = () => {
    try {
      const x = parseFloat(coordenadasEntrada.x);
      const y = parseFloat(coordenadasEntrada.y);
      const z = parseFloat(coordenadasEntrada.z);
      
      if (isNaN(x) || isNaN(y) || isNaN(z)) {
        setError('Por favor, ingresa valores numéricos válidos para todas las coordenadas cartesianas.');
        return;
      }
      
      // Cálculo de coordenadas cilíndricas
      const r = Math.sqrt(x * x + y * y);
      let theta = Math.atan2(y, x);
      const h = z;
      
      // Ajustar theta para que esté en el rango [0, 2π)
      if (theta < 0) {
        theta += 2 * Math.PI;
      }
      
      setResultado({
        r: r.toFixed(4),
        theta: theta.toFixed(4),
        h: h.toFixed(4),
        thetaGrados: (theta * 180 / Math.PI).toFixed(2)
      });
      
      setExito('Conversión realizada con éxito.');
    } catch (error) {
      setError('Error al convertir: ' + error.message);
    }
  };

  // Convertir de cilíndricas a cartesianas
  const convertirCilindricasACartesianas = () => {
    try {
      const r = parseFloat(coordenadasEntrada.r);
      const theta = parseFloat(coordenadasEntrada.theta);
      const h = parseFloat(coordenadasEntrada.h);
      
      if (isNaN(r) || isNaN(theta) || isNaN(h)) {
        setError('Por favor, ingresa valores numéricos válidos para todas las coordenadas cilíndricas.');
        return;
      }
      
      if (r < 0) {
        setError('El radio r debe ser mayor o igual que cero.');
        return;
      }
      
      // Cálculo de coordenadas cartesianas
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      const z = h;
      
      setResultado({
        x: x.toFixed(4),
        y: y.toFixed(4),
        z: z.toFixed(4)
      });
      
      setExito('Conversión realizada con éxito.');
    } catch (error) {
      setError('Error al convertir: ' + error.message);
    }
  };

  // Convertir de cartesianas a esféricas
  const convertirCartesianasAEsfericas = () => {
    try {
      const x = parseFloat(coordenadasEntrada.x);
      const y = parseFloat(coordenadasEntrada.y);
      const z = parseFloat(coordenadasEntrada.z);
      
      if (isNaN(x) || isNaN(y) || isNaN(z)) {
        setError('Por favor, ingresa valores numéricos válidos para todas las coordenadas cartesianas.');
        return;
      }
      
      // Cálculo de coordenadas esféricas
      const rho = Math.sqrt(x * x + y * y + z * z);
      let phi = Math.acos(z / rho);
      let theta = Math.atan2(y, x);
      
      // Ajustar theta para que esté en el rango [0, 2π)
      if (theta < 0) {
        theta += 2 * Math.PI;
      }
      
      setResultado({
        rho: rho.toFixed(4),
        phi: phi.toFixed(4),
        theta: theta.toFixed(4),
        phiGrados: (phi * 180 / Math.PI).toFixed(2),
        thetaGrados: (theta * 180 / Math.PI).toFixed(2)
      });
      
      setExito('Conversión realizada con éxito.');
    } catch (error) {
      setError('Error al convertir: ' + error.message);
    }
  };

  // Convertir de esféricas a cartesianas
  const convertirEsfericasACartesianas = () => {
    try {
      const rho = parseFloat(coordenadasEntrada.rho);
      const phi = parseFloat(coordenadasEntrada.phi);
      const theta = parseFloat(coordenadasEntrada.thetaEsf);
      
      if (isNaN(rho) || isNaN(phi) || isNaN(theta)) {
        setError('Por favor, ingresa valores numéricos válidos para todas las coordenadas esféricas.');
        return;
      }
      
      if (rho < 0) {
        setError('El radio ρ debe ser mayor o igual que cero.');
        return;
      }
      
      // Cálculo de coordenadas cartesianas
      const x = rho * Math.sin(phi) * Math.cos(theta);
      const y = rho * Math.sin(phi) * Math.sin(theta);
      const z = rho * Math.cos(phi);
      
      setResultado({
        x: x.toFixed(4),
        y: y.toFixed(4),
        z: z.toFixed(4)
      });
      
      setExito('Conversión realizada con éxito.');
    } catch (error) {
      setError('Error al convertir: ' + error.message);
    }
  };

  // Convertir de cilíndricas a esféricas
  const convertirCilindricasAEsfericas = () => {
    try {
      const r = parseFloat(coordenadasEntrada.r);
      const theta = parseFloat(coordenadasEntrada.theta);
      const h = parseFloat(coordenadasEntrada.h);
      
      if (isNaN(r) || isNaN(theta) || isNaN(h)) {
        setError('Por favor, ingresa valores numéricos válidos para todas las coordenadas cilíndricas.');
        return;
      }
      
      if (r < 0) {
        setError('El radio r debe ser mayor o igual que cero.');
        return;
      }
      
      // Cálculo de coordenadas esféricas
      const rho = Math.sqrt(r * r + h * h);
      const phi = Math.atan2(r, h);
      
      setResultado({
        rho: rho.toFixed(4),
        phi: phi.toFixed(4),
        theta: theta.toFixed(4),
        phiGrados: (phi * 180 / Math.PI).toFixed(2),
        thetaGrados: (theta * 180 / Math.PI).toFixed(2)
      });
      
      setExito('Conversión realizada con éxito.');
    } catch (error) {
      setError('Error al convertir: ' + error.message);
    }
  };

  // Convertir de esféricas a cilíndricas
  const convertirEsfericasACilindricas = () => {
    try {
      const rho = parseFloat(coordenadasEntrada.rho);
      const phi = parseFloat(coordenadasEntrada.phi);
      const theta = parseFloat(coordenadasEntrada.thetaEsf);
      
      if (isNaN(rho) || isNaN(phi) || isNaN(theta)) {
        setError('Por favor, ingresa valores numéricos válidos para todas las coordenadas esféricas.');
        return;
      }
      
      if (rho < 0) {
        setError('El radio ρ debe ser mayor o igual que cero.');
        return;
      }
      
      // Cálculo de coordenadas cilíndricas
      const r = rho * Math.sin(phi);
      const h = rho * Math.cos(phi);
      
      setResultado({
        r: r.toFixed(4),
        theta: theta.toFixed(4),
        h: h.toFixed(4),
        thetaGrados: (theta * 180 / Math.PI).toFixed(2)
      });
      
      setExito('Conversión realizada con éxito.');
    } catch (error) {
      setError('Error al convertir: ' + error.message);
    }
  };

  // Ejecutar la conversión apropiada
  const realizarConversion = () => {
    switch (tipoConversion) {
      case 'cartesianas-cilindricas':
        convertirCartesianasACilindricas();
        break;
      case 'cilindricas-cartesianas':
        convertirCilindricasACartesianas();
        break;
      case 'cartesianas-esfericas':
        convertirCartesianasAEsfericas();
        break;
      case 'esfericas-cartesianas':
        convertirEsfericasACartesianas();
        break;
      case 'cilindricas-esfericas':
        convertirCilindricasAEsfericas();
        break;
      case 'esfericas-cilindricas':
        convertirEsfericasACilindricas();
        break;
      default:
        setError('Selecciona un tipo de conversión válido.');
    }
  };

  // Renderizar el formulario correcto según el tipo de conversión
  const renderizarFormularioEntrada = () => {
    switch (tipoConversion) {
      case 'cartesianas-cilindricas':
      case 'cartesianas-esfericas':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#bbdefb', mb: 1 }}>
                Coordenadas Cartesianas (x, y, z)
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="x"
                fullWidth
                value={coordenadasEntrada.x}
                onChange={(e) => handleCoordenadaChange('cartesianas', 'x', e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  sx: { bgcolor: '#102a43', color: '#e0e0e0' }
                }}
                InputLabelProps={{
                  sx: { color: '#90caf9' }
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="y"
                fullWidth
                value={coordenadasEntrada.y}
                onChange={(e) => handleCoordenadaChange('cartesianas', 'y', e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  sx: { bgcolor: '#102a43', color: '#e0e0e0' }
                }}
                InputLabelProps={{
                  sx: { color: '#90caf9' }
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="z"
                fullWidth
                value={coordenadasEntrada.z}
                onChange={(e) => handleCoordenadaChange('cartesianas', 'z', e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  sx: { bgcolor: '#102a43', color: '#e0e0e0' }
                }}
                InputLabelProps={{
                  sx: { color: '#90caf9' }
                }}
              />
            </Grid>
          </Grid>
        );

      case 'cilindricas-cartesianas':
      case 'cilindricas-esfericas':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#bbdefb', mb: 1 }}>
                Coordenadas Cilíndricas (r, θ, h)
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="r"
                fullWidth
                value={coordenadasEntrada.r}
                onChange={(e) => handleCoordenadaChange('cilindricas', 'r', e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  sx: { bgcolor: '#102a43', color: '#e0e0e0' }
                }}
                InputLabelProps={{
                  sx: { color: '#90caf9' }
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="θ (rad)"
                fullWidth
                value={coordenadasEntrada.theta}
                onChange={(e) => handleCoordenadaChange('cilindricas', 'theta', e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  sx: { bgcolor: '#102a43', color: '#e0e0e0' }
                }}
                InputLabelProps={{
                  sx: { color: '#90caf9' }
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="h"
                fullWidth
                value={coordenadasEntrada.h}
                onChange={(e) => handleCoordenadaChange('cilindricas', 'h', e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  sx: { bgcolor: '#102a43', color: '#e0e0e0' }
                }}
                InputLabelProps={{
                  sx: { color: '#90caf9' }
                }}
              />
            </Grid>
          </Grid>
        );

      case 'esfericas-cartesianas':
      case 'esfericas-cilindricas':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#bbdefb', mb: 1 }}>
                Coordenadas Esféricas (ρ, φ, θ)
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="ρ (rho)"
                fullWidth
                value={coordenadasEntrada.rho}
                onChange={(e) => handleCoordenadaChange('esfericas', 'rho', e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  sx: { bgcolor: '#102a43', color: '#e0e0e0' }
                }}
                InputLabelProps={{
                  sx: { color: '#90caf9' }
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="φ (phi) (rad)"
                fullWidth
                value={coordenadasEntrada.phi}
                onChange={(e) => handleCoordenadaChange('esfericas', 'phi', e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  sx: { bgcolor: '#102a43', color: '#e0e0e0' }
                }}
                InputLabelProps={{
                  sx: { color: '#90caf9' }
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="θ (theta) (rad)"
                fullWidth
                value={coordenadasEntrada.thetaEsf}
                onChange={(e) => handleCoordenadaChange('esfericas', 'thetaEsf', e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  sx: { bgcolor: '#102a43', color: '#e0e0e0' }
                }}
                InputLabelProps={{
                  sx: { color: '#90caf9' }
                }}
              />
            </Grid>
          </Grid>
        );

      default:
        return (
          <Box sx={{ p: 2, bgcolor: '#1e2a38', borderRadius: 1, mb: 2 }}>
            <Typography sx={{ color: '#e0e0e0' }}>
              Selecciona un tipo de conversión en las pestañas superiores para comenzar.
            </Typography>
          </Box>
        );
    }
  };

  // Renderizar el resultado según el tipo de conversión
  const renderizarResultado = () => {
    if (Object.keys(resultado).length === 0) return null;

    switch (tipoConversion) {
      case 'cartesianas-cilindricas':
        return (
          <Box sx={{ p: 2, bgcolor: '#102a43', borderRadius: 1, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#bbdefb', mb: 1 }}>
              Resultado: Coordenadas Cilíndricas
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              r = {resultado.r}
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              θ = {resultado.theta} rad = {resultado.thetaGrados}°
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              h = {resultado.h}
            </Typography>
          </Box>
        );

      case 'cilindricas-cartesianas':
        return (
          <Box sx={{ p: 2, bgcolor: '#102a43', borderRadius: 1, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#bbdefb', mb: 1 }}>
              Resultado: Coordenadas Cartesianas
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              x = {resultado.x}
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              y = {resultado.y}
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              z = {resultado.z}
            </Typography>
          </Box>
        );

      case 'cartesianas-esfericas':
        return (
          <Box sx={{ p: 2, bgcolor: '#102a43', borderRadius: 1, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#bbdefb', mb: 1 }}>
              Resultado: Coordenadas Esféricas
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              ρ (rho) = {resultado.rho}
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              φ (phi) = {resultado.phi} rad = {resultado.phiGrados}°
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              θ (theta) = {resultado.theta} rad = {resultado.thetaGrados}°
            </Typography>
          </Box>
        );

      case 'esfericas-cartesianas':
        return (
          <Box sx={{ p: 2, bgcolor: '#102a43', borderRadius: 1, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#bbdefb', mb: 1 }}>
              Resultado: Coordenadas Cartesianas
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              x = {resultado.x}
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              y = {resultado.y}
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              z = {resultado.z}
            </Typography>
          </Box>
        );

      case 'cilindricas-esfericas':
        return (
          <Box sx={{ p: 2, bgcolor: '#102a43', borderRadius: 1, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#bbdefb', mb: 1 }}>
              Resultado: Coordenadas Esféricas
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              ρ (rho) = {resultado.rho}
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              φ (phi) = {resultado.phi} rad = {resultado.phiGrados}°
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              θ (theta) = {resultado.theta} rad = {resultado.thetaGrados}°
            </Typography>
          </Box>
        );

      case 'esfericas-cilindricas':
        return (
          <Box sx={{ p: 2, bgcolor: '#102a43', borderRadius: 1, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#bbdefb', mb: 1 }}>
              Resultado: Coordenadas Cilíndricas
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              r = {resultado.r}
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              θ = {resultado.theta} rad = {resultado.thetaGrados}°
            </Typography>
            <Typography sx={{ color: '#4fc3f7' }}>
              h = {resultado.h}
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  // Renderizar la información de las ecuaciones
  const renderizarEcuaciones = () => {
    switch (tipoConversion) {
      case 'cartesianas-cilindricas':
        return (
          <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#1e2a38', border: '1px solid #3f51b5' }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#bbdefb', mb: 1 }}>
                Ecuaciones de conversión:
              </Typography>
              <Box sx={{ p: 2, bgcolor: '#102a43', borderRadius: 1, mb: 2 }}>
                <BlockMath math={"r = \\sqrt{x^2 + y^2}"} />
                <BlockMath math={"\\theta = \\tan^{-1}\\left(\\frac{y}{x}\\right)"} />
                <BlockMath math={"h = z"} />
              </Box>
              <Typography sx={{ color: '#e0e0e0', mt: 2 }}>
                Donde:
              </Typography>
              <ul style={{ color: '#e0e0e0' }}>
                <li>r: distancia desde el eje z al punto (siempre positiva)</li>
                <li>θ: ángulo en el plano xy (en radianes, 0 ≤ θ &lt; 2π)</li>
                <li>h: altura (igual a la coordenada z)</li>
              </ul>
            </CardContent>
          </Card>
        );

      case 'cilindricas-cartesianas':
        return (
          <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#1e2a38', border: '1px solid #3f51b5' }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#bbdefb', mb: 1 }}>
                Ecuaciones de conversión:
              </Typography>
              <Box sx={{ p: 2, bgcolor: '#102a43', borderRadius: 1, mb: 2 }}>
                <BlockMath math={"x = r \\cos\\theta"} />
                <BlockMath math={"y = r \\sin\\theta"} />
                <BlockMath math={"z = h"} />
              </Box>
              <Typography sx={{ color: '#e0e0e0', mt: 2 }}>
                Donde:
              </Typography>
              <ul style={{ color: '#e0e0e0' }}>
                <li>r: distancia desde el eje z al punto</li>
                <li>θ: ángulo en el plano xy (en radianes)</li>
                <li>h: altura (equivale a la coordenada z en cartesianas)</li>
              </ul>
            </CardContent>
          </Card>
        );

      case 'cartesianas-esfericas':
        return (
          <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#1e2a38', border: '1px solid #3f51b5' }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#bbdefb', mb: 1 }}>
                Ecuaciones de conversión:
              </Typography>
              <Box sx={{ p: 2, bgcolor: '#102a43', borderRadius: 1, mb: 2 }}>
                <BlockMath math={"\\rho = \\sqrt{x^2 + y^2 + z^2}"} />
                <BlockMath math={"\\phi = \\cos^{-1}\\left(\\frac{z}{\\rho}\\right)"} />
                <BlockMath math={"\\theta = \\tan^{-1}\\left(\\frac{y}{x}\\right)"} />
              </Box>
              <Typography sx={{ color: '#e0e0e0', mt: 2 }}>
                Donde:
              </Typography>
              <ul style={{ color: '#e0e0e0' }}>
                <li>ρ (rho): distancia desde el origen al punto (siempre positiva)</li>
                <li>φ (phi): ángulo desde el eje z (colatitud, 0 ≤ φ ≤ π)</li>
                <li>θ (theta): ángulo en el plano xy (longitud, 0 ≤ θ &lt; 2π)</li>
              </ul>
            </CardContent>
          </Card>
        );

      case 'esfericas-cartesianas':
        return (
          <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#1e2a38', border: '1px solid #3f51b5' }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#bbdefb', mb: 1 }}>
                Ecuaciones de conversión:
              </Typography>
              <Box sx={{ p: 2, bgcolor: '#102a43', borderRadius: 1, mb: 2 }}>
                <BlockMath math={"x = \\rho \\sin\\phi \\cos\\theta"} />
                <BlockMath math={"y = \\rho \\sin\\phi \\sin\\theta"} />
                <BlockMath math={"z = \\rho \\cos\\phi"} />
              </Box>
              <Typography sx={{ color: '#e0e0e0', mt: 2 }}>
                Donde:
              </Typography>
              <ul style={{ color: '#e0e0e0' }}>
                <li>ρ (rho): distancia desde el origen al punto</li>
                <li>φ (phi): ángulo desde el eje z (colatitud)</li>
                <li>θ (theta): ángulo en el plano xy (longitud)</li>
              </ul>
            </CardContent>
          </Card>
        );

      case 'cilindricas-esfericas':
        return (
          <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#1e2a38', border: '1px solid #3f51b5' }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#bbdefb', mb: 1 }}>
                Ecuaciones de conversión:
              </Typography>
              <Box sx={{ p: 2, bgcolor: '#102a43', borderRadius: 1, mb: 2 }}>
                <BlockMath math={"\\rho = \\sqrt{r^2 + h^2}"} />
                <BlockMath math={"\\phi = \\tan^{-1}\\left(\\frac{r}{h}\\right)"} />
                <BlockMath math={"\\theta = \\theta"} />
              </Box>
              <Typography sx={{ color: '#e0e0e0', mt: 2 }}>
                Donde:
              </Typography>
              <ul style={{ color: '#e0e0e0' }}>
                <li>r y h son las coordenadas cilíndricas</li>
                <li>ρ, φ y θ son las coordenadas esféricas</li>
                <li>El ángulo θ es el mismo en ambos sistemas</li>
              </ul>
            </CardContent>
          </Card>
        );

      case 'esfericas-cilindricas':
        return (
          <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#1e2a38', border: '1px solid #3f51b5' }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#bbdefb', mb: 1 }}>
                Ecuaciones de conversión:
              </Typography>
              <Box sx={{ p: 2, bgcolor: '#102a43', borderRadius: 1, mb: 2 }}>
                <BlockMath math={"r = \\rho \\sin\\phi"} />
                <BlockMath math={"h = \\rho \\cos\\phi"} />
                <BlockMath math={"\\theta = \\theta"} />
              </Box>
              <Typography sx={{ color: '#e0e0e0', mt: 2 }}>
                Donde:
              </Typography>
              <ul style={{ color: '#e0e0e0' }}>
                <li>ρ y φ son coordenadas esféricas</li>
                <li>r y h son las coordenadas cilíndricas resultantes</li>
                <li>El ángulo θ es el mismo en ambos sistemas</li>
              </ul>
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#1e2a38', border: '1px solid #3f51b5' }}>
            <CardContent>
              <Typography sx={{ color: '#e0e0e0' }}>
                Selecciona un tipo de conversión para ver las ecuaciones correspondientes.
              </Typography>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, bgcolor: '#263238' }}>
      <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#64b5f6', mb: 2 }}>
        Coordenadas Cilíndricas y Esféricas
      </Typography>
      
      <Typography paragraph sx={{ color: '#e0e0e0', mb: 3 }}>
        Las coordenadas cilíndricas y esféricas son sistemas alternativos para representar puntos en el espacio tridimensional.
        Selecciona la conversión que deseas realizar:
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tipoConversion} 
          onChange={handleCambioTipo} 
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          aria-label="tipos de conversión de coordenadas"
        >
          <Tab label="Cartesianas → Cilíndricas" value="cartesianas-cilindricas" />
          <Tab label="Cilíndricas → Cartesianas" value="cilindricas-cartesianas" />
          <Tab label="Cartesianas → Esféricas" value="cartesianas-esfericas" />
          <Tab label="Esféricas → Cartesianas" value="esfericas-cartesianas" />
          <Tab label="Cilíndricas → Esféricas" value="cilindricas-esfericas" />
          <Tab label="Esféricas → Cilíndricas" value="esfericas-cilindricas" />
        </Tabs>
      </Box>
      
      {/* Formularios de entrada */}
      <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#1e2a38', border: '1px solid #3f51b5' }}>
        <CardContent>
          {renderizarFormularioEntrada()}
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={realizarConversion}
              sx={{ mt: 2 }}
            >
              Convertir
            </Button>
          </Box>
        </CardContent>
      </Card>
      
      {/* Mensajes de éxito o error */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {exito && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {exito}
        </Alert>
      )}
      
      {/* Resultados */}
      {Object.keys(resultado).length > 0 && renderizarResultado()}
      
      {/* Ecuaciones */}
      <Typography variant="h6" sx={{ color: '#64b5f6', mt: 3, mb: 2 }}>
        Información de la conversión
      </Typography>
      
      {renderizarEcuaciones()}
      
      <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#1e2a38', border: '1px solid #3f51b5' }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#bbdefb', mb: 1 }}>
            Notas importantes:
          </Typography>
          <Typography sx={{ color: '#e0e0e0' }}>
            • Los ángulos se manejan en radianes para los cálculos. En los resultados se muestran tanto en radianes como en grados.
          </Typography>
          <Typography sx={{ color: '#e0e0e0' }}>
            • En coordenadas cilíndricas, r representa la distancia desde el eje z hasta el punto.
          </Typography>
          <Typography sx={{ color: '#e0e0e0' }}>
            • En coordenadas esféricas, ρ (rho) representa la distancia desde el origen hasta el punto.
          </Typography>
          <Typography sx={{ color: '#e0e0e0' }}>
            • En coordenadas esféricas, φ (phi) es el ángulo desde el eje z positivo (colatitud).
          </Typography>
          <Typography sx={{ color: '#e0e0e0' }}>
            • El ángulo θ (theta) se mide en el plano xy, desde el eje x positivo en sentido antihorario.
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}

export default EspacioTridimensional;