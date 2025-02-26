import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Paper, Tabs, Tab, TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import * as THREE from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';

// Componentes para cada pestaña
const EcuacionesParametricas = () => {
  const [parametros, setParametros] = useState({
    x: 't',
    y: '2*t',
    z: 't^2'
  });
  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParametros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calcularPuntos = () => {
    setResultado({
      ecuacion: `r(t) = (${parametros.x})i + (${parametros.y})j + (${parametros.z})k`,
      puntos: [
        { t: 0, x: 0, y: 0, z: 0 },
        { t: 1, x: 1, y: 2, z: 1 },
        { t: 2, x: 2, y: 4, z: 4 }
      ]
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Ecuaciones Paramétricas
      </Typography>
      <Typography paragraph>
        Ingresa las ecuaciones paramétricas de la curva en el espacio:
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="x(t)"
            name="x"
            value={parametros.x}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="y(t)"
            name="y"
            value={parametros.y}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="z(t)"
            name="z"
            value={parametros.z}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
        </Grid>
      </Grid>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={calcularPuntos}
        sx={{ mt: 2 }}
      >
        Calcular
      </Button>
      
      {resultado && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1">Ecuación vectorial:</Typography>
          <BlockMath math={`\\vec{r}(t) = (${parametros.x})\\hat{i} + (${parametros.y})\\hat{j} + (${parametros.z})\\hat{k}`} />
          
          <Typography variant="subtitle1" sx={{ mt: 2 }}>Puntos de la curva:</Typography>
          <Box component="table" sx={{ width: '100%', border: '1px solid #ddd', borderCollapse: 'collapse', mt: 1 }}>
            <Box component="thead">
              <Box component="tr">
                <Box component="th" sx={{ border: '1px solid #ddd', p: 1 }}>t</Box>
                <Box component="th" sx={{ border: '1px solid #ddd', p: 1 }}>x</Box>
                <Box component="th" sx={{ border: '1px solid #ddd', p: 1 }}>y</Box>
                <Box component="th" sx={{ border: '1px solid #ddd', p: 1 }}>z</Box>
              </Box>
            </Box>
            <Box component="tbody">
              {resultado.puntos.map((punto, index) => (
                <Box component="tr" key={index}>
                  <Box component="td" sx={{ border: '1px solid #ddd', p: 1, textAlign: 'center' }}>{punto.t}</Box>
                  <Box component="td" sx={{ border: '1px solid #ddd', p: 1, textAlign: 'center' }}>{punto.x}</Box>
                  <Box component="td" sx={{ border: '1px solid #ddd', p: 1, textAlign: 'center' }}>{punto.y}</Box>
                  <Box component="td" sx={{ border: '1px solid #ddd', p: 1, textAlign: 'center' }}>{punto.z}</Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const VectoresEn3D = () => {
  const [vectorA, setVectorA] = useState({ x: 1, y: 2, z: 3 });
  const [vectorB, setVectorB] = useState({ x: 4, y: 5, z: 6 });
  const [vectorC, setVectorC] = useState({ x: 7, y: 8, z: 9 });
  const [resultado, setResultado] = useState(null);

  const handleChangeVector = (vector, field, value) => {
    if (vector === 'A') {
      setVectorA(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
    } else if (vector === 'B') {
      setVectorB(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
    } else if (vector === 'C') {
      setVectorC(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
    }
  };

  const calcularOperaciones = () => {
    // Magnitudes
    const magnitudA = Math.sqrt(vectorA.x**2 + vectorA.y**2 + vectorA.z**2);
    const magnitudB = Math.sqrt(vectorB.x**2 + vectorB.y**2 + vectorB.z**2);
    
    // Producto escalar
    const productoEscalar = 
      vectorA.x * vectorB.x + 
      vectorA.y * vectorB.y + 
      vectorA.z * vectorB.z;
    
    // Ángulo entre vectores (en radianes y grados)
    const cosTheta = productoEscalar / (magnitudA * magnitudB);
    const anguloRad = Math.acos(Math.min(Math.max(cosTheta, -1), 1)); // Clamp para evitar errores de precisión
    const anguloDeg = anguloRad * (180 / Math.PI);
    
    // Producto vectorial
    const productoVectorial = {
      x: vectorA.y * vectorB.z - vectorA.z * vectorB.y,
      y: vectorA.z * vectorB.x - vectorA.x * vectorB.z,
      z: vectorA.x * vectorB.y - vectorA.y * vectorB.x
    };
    
    // Magnitud del producto vectorial (área del paralelogramo)
    const areaParalelogramo = Math.sqrt(
      productoVectorial.x**2 + 
      productoVectorial.y**2 + 
      productoVectorial.z**2
    );
    
    // Producto mixto (volumen del paralelepípedo)
    const productoMixto = 
      vectorA.x * (vectorB.y * vectorC.z - vectorB.z * vectorC.y) -
      vectorA.y * (vectorB.x * vectorC.z - vectorB.z * vectorC.x) +
      vectorA.z * (vectorB.x * vectorC.y - vectorB.y * vectorC.x);
    
    // Volumen del paralelepípedo
    const volumenParalelepipedo = Math.abs(productoMixto);
    
    setResultado({
      magnitudA,
      magnitudB,
      productoEscalar,
      anguloRad,
      anguloDeg,
      productoVectorial,
      areaParalelogramo,
      productoMixto,
      volumenParalelepipedo
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Operaciones con Vectores en 3D
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Vector A:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="x"
                value={vectorA.x}
                onChange={(e) => handleChangeVector('A', 'x', e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="y"
                value={vectorA.y}
                onChange={(e) => handleChangeVector('A', 'y', e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="z"
                value={vectorA.z}
                onChange={(e) => handleChangeVector('A', 'z', e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Vector B:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="x"
                value={vectorB.x}
                onChange={(e) => handleChangeVector('B', 'x', e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="y"
                value={vectorB.y}
                onChange={(e) => handleChangeVector('B', 'y', e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="z"
                value={vectorB.z}
                onChange={(e) => handleChangeVector('B', 'z', e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Vector C (para paralelepípedo):</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="x"
                value={vectorC.x}
                onChange={(e) => handleChangeVector('C', 'x', e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="y"
                value={vectorC.y}
                onChange={(e) => handleChangeVector('C', 'y', e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="z"
                value={vectorC.z}
                onChange={(e) => handleChangeVector('C', 'z', e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={calcularOperaciones}
        sx={{ mt: 2 }}
      >
        Calcular Operaciones
      </Button>
      
      {resultado && (
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Magnitudes:</Typography>
              <BlockMath math={`|\\vec{A}| = ${resultado.magnitudA.toFixed(4)}`} />
              <BlockMath math={`|\\vec{B}| = ${resultado.magnitudB.toFixed(4)}`} />
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Producto Escalar:</Typography>
              <BlockMath math={`\\vec{A} \\cdot \\vec{B} = ${resultado.productoEscalar}`} />
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Ángulo entre vectores:</Typography>
              <BlockMath math={`\\theta = ${resultado.anguloDeg.toFixed(2)}^{\\circ} \\approx ${resultado.anguloRad.toFixed(4)} \\text{ rad}`} />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Producto Vectorial:</Typography>
              <BlockMath math={`\\vec{A} \\times \\vec{B} = (${resultado.productoVectorial.x})\\hat{i} + (${resultado.productoVectorial.y})\\hat{j} + (${resultado.productoVectorial.z})\\hat{k}`} />
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Área del Paralelogramo:</Typography>
              <BlockMath math={`\\text{Área} = |\\vec{A} \\times \\vec{B}| = ${resultado.areaParalelogramo.toFixed(4)}`} />
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Producto Mixto:</Typography>
              <BlockMath math={`[\\vec{A}, \\vec{B}, \\vec{C}] = ${resultado.productoMixto.toFixed(4)}`} />
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Volumen del Paralelepípedo:</Typography>
              <BlockMath math={`\\text{Volumen} = |[\\vec{A}, \\vec{B}, \\vec{C}]| = ${resultado.volumenParalelepipedo.toFixed(4)}`} />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

const SuperficiesEn3D = () => {
  const canvasRef = useRef(null);
  const [tipoSuperficie, setTipoSuperficie] = useState('elipsoide');
  const [parametros, setParametros] = useState({
    elipsoide: { a: 1, b: 1.5, c: 2 },
    hiperboloide: { a: 1, b: 1, c: 1, tipo: 'una hoja' },
    paraboloide: { a: 0.5, b: 0.5, tipo: 'elíptico' }
  });
  const [sceneObjects, setSceneObjects] = useState({ scene: null, mesh: null });

  const handleChangeTipoSuperficie = (event) => {
    setTipoSuperficie(event.target.value);
  };

  const handleChangeParametro = (superficie, param, value) => {
    const valorNumerico = parseFloat(value) || 0.1; // Evitamos valores 0 o negativos
    setParametros(prev => ({
      ...prev,
      [superficie]: {
        ...prev[superficie],
        [param]: param === 'tipo' ? value : valorNumerico
      }
    }));
  };

  // Función para generar la geometría según el tipo de superficie
  const generarGeometria = (tipo, params) => {
    switch (tipo) {
      case 'elipsoide': {
        // Crear elipsoide (x²/a² + y²/b² + z²/c² = 1)
        const { a, b, c } = params.elipsoide;
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        geometry.scale(a, b, c);
        return geometry;
      }
      case 'hiperboloide': {
        // Crear hiperboloide (x²/a² + y²/b² - z²/c² = 1 o -x²/a² - y²/b² + z²/c² = 1)
        const { a, b, c, tipo } = params.hiperboloide;
        const esUnaHoja = tipo === 'una hoja';
        
        const segmentos = 50;
        const geometry = new ParametricGeometry((u, v, target) => {
          // Mapeo de parámetros u,v a coordenadas 3D
          u = u * Math.PI * 2;
          v = v * 4 - 2; // v en [-2, 2]
          
          let x, y, z;
          if (esUnaHoja) {
            // Hiperboloide de una hoja: x²/a² + y²/b² - z²/c² = 1
            const r = Math.sqrt(1 + v * v);
            x = a * r * Math.cos(u);
            y = b * r * Math.sin(u);
            z = c * v;
          } else {
            // Hiperboloide de dos hojas: -x²/a² - y²/b² + z²/c² = 1
            // Solo mostramos la parte superior (v >= 1)
            const r = Math.sqrt(v * v - 1);
            x = a * r * Math.cos(u);
            y = b * r * Math.sin(u);
            z = c * v;
          }
          
          target.set(x, y, z);
        }, segmentos, segmentos);
        
        return geometry;
      }
      case 'paraboloide': {
        // Crear paraboloide (z = x²/a² + y²/b² o z = x²/a² - y²/b²)
        const { a, b, tipo } = params.paraboloide;
        const esEliptico = tipo === 'elíptico';
        
        const segmentos = 50;
        const geometry = new ParametricGeometry((u, v, target) => {
          // u en [0, 1], v en [0, 1] -> mapear a coordenadas
          const x = (u - 0.5) * 4; // x en [-2, 2]
          const y = (v - 0.5) * 4; // y en [-2, 2]
          let z;
          
          if (esEliptico) {
            // Paraboloide elíptico: z = x²/a² + y²/b²
            z = (x * x) / (a * a) + (y * y) / (b * b);
          } else {
            // Paraboloide hiperbólico: z = x²/a² - y²/b²
            z = (x * x) / (a * a) - (y * y) / (b * b);
          }
          
          target.set(x, y, z);
        }, segmentos, segmentos);
        
        return geometry;
      }
      default:
        return new THREE.SphereGeometry(1, 32, 32);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Configurar escena, cámara y renderizador
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    const aspectRatio = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    
    // Limpiar el contenedor antes de añadir el canvas
    while (canvasRef.current.firstChild) {
      canvasRef.current.removeChild(canvasRef.current.firstChild);
    }
    canvasRef.current.appendChild(renderer.domElement);
    
    // Crear un sistema de coordenadas (ejes X, Y, Z)
    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);
    
    // Crear una cuadrícula para referencia
    const gridHelper = new THREE.GridHelper(10, 10);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);
    
    // Agregar iluminación
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Crear material para la superficie
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x0088ff,
      transparent: true,
      opacity: 0.7,
      wireframe: false,
      side: THREE.DoubleSide
    });
    
    // Generar la geometría según el tipo de superficie
    const geometry = generarGeometria(tipoSuperficie, parametros);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Guardar referencia a los objetos de la escena para actualizar después
    setSceneObjects({ scene, mesh });
    
    // Animación
    let frameId = null;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Rotar la escena para mejor visualización
      scene.rotation.y += 0.005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Limpieza al desmontar el componente
    return () => {
      cancelAnimationFrame(frameId);
      if (canvasRef.current && renderer.domElement) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Efecto para actualizar la geometría cuando cambian los parámetros
  useEffect(() => {
    if (sceneObjects.mesh && sceneObjects.scene) {
      // Eliminar la malla actual
      sceneObjects.scene.remove(sceneObjects.mesh);
      
      // Generar nueva geometría con los parámetros actualizados
      const geometry = generarGeometria(tipoSuperficie, parametros);
      
      // Crear nuevo material
      const material = new THREE.MeshPhongMaterial({ 
        color: tipoSuperficie === 'elipsoide' ? 0x0088ff : 
               tipoSuperficie === 'hiperboloide' ? 0xff4400 : 0x00cc88,
        transparent: true,
        opacity: 0.7,
        wireframe: false,
        side: THREE.DoubleSide
      });
      
      // Crear nueva malla y añadirla a la escena
      const newMesh = new THREE.Mesh(geometry, material);
      sceneObjects.scene.add(newMesh);
      
      // Actualizar la referencia a la malla
      setSceneObjects(prev => ({ ...prev, mesh: newMesh }));
    }
  }, [tipoSuperficie, parametros]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Superficies en el Espacio 3D
      </Typography>
      <Typography paragraph>
        Visualización interactiva de superficies cuádricas en R³:
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>Selecciona el tipo de superficie:</Typography>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <Box 
                component="select" 
                value={tipoSuperficie} 
                onChange={handleChangeTipoSuperficie}
                sx={{ 
                  width: '100%', 
                  p: 1, 
                  border: '1px solid #ddd', 
                  borderRadius: 1,
                  mb: 2
                }}
              >
                <option value="elipsoide">Elipsoide</option>
                <option value="hiperboloide">Hiperboloide</option>
                <option value="paraboloide">Paraboloide</option>
              </Box>
            </Box>
          </Box>
          
          {/* Parámetros según el tipo de superficie */}
          {tipoSuperficie === 'elipsoide' && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>Elipsoide: x²/a² + y²/b² + z²/c² = 1</Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="a"
                    type="number"
                    value={parametros.elipsoide.a}
                    onChange={(e) => handleChangeParametro('elipsoide', 'a', e.target.value)}
                    inputProps={{ min: 0.1, step: 0.1 }}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="b"
                    type="number"
                    value={parametros.elipsoide.b}
                    onChange={(e) => handleChangeParametro('elipsoide', 'b', e.target.value)}
                    inputProps={{ min: 0.1, step: 0.1 }}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="c"
                    type="number"
                    value={parametros.elipsoide.c}
                    onChange={(e) => handleChangeParametro('elipsoide', 'c', e.target.value)}
                    inputProps={{ min: 0.1, step: 0.1 }}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              
              <BlockMath math={`\\frac{x^2}{${parametros.elipsoide.a}^2} + \\frac{y^2}{${parametros.elipsoide.b}^2} + \\frac{z^2}{${parametros.elipsoide.c}^2} = 1`} />
            </Box>
          )}
          
          {tipoSuperficie === 'hiperboloide' && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>Hiperboloide</Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box 
                  component="select" 
                  value={parametros.hiperboloide.tipo} 
                  onChange={(e) => handleChangeParametro('hiperboloide', 'tipo', e.target.value)}
                  sx={{ 
                    width: '100%', 
                    p: 1, 
                    border: '1px solid #ddd', 
                    borderRadius: 1,
                    mb: 2
                  }}
                >
                  <option value="una hoja">De una hoja</option>
                  <option value="dos hojas">De dos hojas</option>
                </Box>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="a"
                    type="number"
                    value={parametros.hiperboloide.a}
                    onChange={(e) => handleChangeParametro('hiperboloide', 'a', e.target.value)}
                    inputProps={{ min: 0.1, step: 0.1 }}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="b"
                    type="number"
                    value={parametros.hiperboloide.b}
                    onChange={(e) => handleChangeParametro('hiperboloide', 'b', e.target.value)}
                    inputProps={{ min: 0.1, step: 0.1 }}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="c"
                    type="number"
                    value={parametros.hiperboloide.c}
                    onChange={(e) => handleChangeParametro('hiperboloide', 'c', e.target.value)}
                    inputProps={{ min: 0.1, step: 0.1 }}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              
              {parametros.hiperboloide.tipo === 'una hoja' ? (
                <BlockMath math={`\\frac{x^2}{${parametros.hiperboloide.a}^2} + \\frac{y^2}{${parametros.hiperboloide.b}^2} - \\frac{z^2}{${parametros.hiperboloide.c}^2} = 1`} />
              ) : (
                <BlockMath math={`-\\frac{x^2}{${parametros.hiperboloide.a}^2} - \\frac{y^2}{${parametros.hiperboloide.b}^2} + \\frac{z^2}{${parametros.hiperboloide.c}^2} = 1`} />
              )}
            </Box>
          )}
          
          {tipoSuperficie === 'paraboloide' && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>Paraboloide</Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box 
                  component="select" 
                  value={parametros.paraboloide.tipo} 
                  onChange={(e) => handleChangeParametro('paraboloide', 'tipo', e.target.value)}
                  sx={{ 
                    width: '100%', 
                    p: 1, 
                    border: '1px solid #ddd', 
                    borderRadius: 1,
                    mb: 2
                  }}
                >
                  <option value="elíptico">Elíptico</option>
                  <option value="hiperbólico">Hiperbólico</option>
                </Box>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="a"
                    type="number"
                    value={parametros.paraboloide.a}
                    onChange={(e) => handleChangeParametro('paraboloide', 'a', e.target.value)}
                    inputProps={{ min: 0.1, step: 0.1 }}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="b"
                    type="number"
                    value={parametros.paraboloide.b}
                    onChange={(e) => handleChangeParametro('paraboloide', 'b', e.target.value)}
                    inputProps={{ min: 0.1, step: 0.1 }}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              
              {parametros.paraboloide.tipo === 'elíptico' ? (
                <BlockMath math={`z = \\frac{x^2}{${parametros.paraboloide.a}^2} + \\frac{y^2}{${parametros.paraboloide.b}^2}`} />
              ) : (
                <BlockMath math={`z = \\frac{x^2}{${parametros.paraboloide.a}^2} - \\frac{y^2}{${parametros.paraboloide.b}^2}`} />
              )}
            </Box>
          )}
          
          <Typography variant="subtitle2" sx={{ mt: 2, fontStyle: 'italic' }}>
            Ajusta los parámetros para modificar la forma de la superficie.
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box 
            ref={canvasRef}
            sx={{ 
              height: '400px', 
              width: '100%', 
              bgcolor: 'background.paper', 
              borderRadius: 1,
              overflow: 'hidden'
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

// Componente para la transformación de coordenadas
const TransformacionCoordenadas = () => {
  const [tipoTransformacion, setTipoTransformacion] = useState('cartesianas-cilindricas');
  const [coordenadas, setCoordenadas] = useState({
    // Cartesianas
    x: 1,
    y: 1,
    z: 1,
    // Cilíndricas
    r: 1,
    theta: Math.PI/4,
    z_cil: 1,
    // Esféricas
    rho: 1,
    phi: Math.PI/4,
    theta_esf: Math.PI/4
  });
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');

  // Helper para convertir grados a radianes
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  
  // Helper para convertir radianes a grados
  const toDegrees = (radians) => radians * (180 / Math.PI);

  const handleChangeTransformacion = (event) => {
    setTipoTransformacion(event.target.value);
    setResultado(null);
    setError('');
  };

  const handleChangeCoordenada = (name, value) => {
    setCoordenadas(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const calcularTransformacion = () => {
    try {
      setError('');
      
      switch (tipoTransformacion) {
        case 'cartesianas-cilindricas': {
          // Cartesianas a Cilíndricas: (x,y,z) -> (r,θ,z)
          const { x, y, z } = coordenadas;
          const r = Math.sqrt(x * x + y * y);
          // Cálculo del ángulo theta teniendo en cuenta los cuadrantes
          let theta = Math.atan2(y, x);
          // Convertir a grados para mostrar
          const thetaGrados = toDegrees(theta);
          
          setResultado({
            tipo: 'Cilíndricas',
            valores: [
              { nombre: 'r', valor: r.toFixed(4) },
              { nombre: 'θ (rad)', valor: theta.toFixed(4) },
              { nombre: 'θ (grados)', valor: thetaGrados.toFixed(2) + '°' },
              { nombre: 'z', valor: z.toFixed(4) }
            ],
            latex: `(r, \\theta, z) = (${r.toFixed(4)}, ${theta.toFixed(4)} \\text{ rad}, ${z.toFixed(4)})`
          });
          break;
        }
        
        case 'cilindricas-cartesianas': {
          // Cilíndricas a Cartesianas: (r,θ,z) -> (x,y,z)
          const { r, theta, z_cil } = coordenadas;
          const thetaRad = parseFloat(theta); // Asumimos que está en radianes
          
          const x = r * Math.cos(thetaRad);
          const y = r * Math.sin(thetaRad);
          
          setResultado({
            tipo: 'Cartesianas',
            valores: [
              { nombre: 'x', valor: x.toFixed(4) },
              { nombre: 'y', valor: y.toFixed(4) },
              { nombre: 'z', valor: z_cil.toFixed(4) }
            ],
            latex: `(x, y, z) = (${x.toFixed(4)}, ${y.toFixed(4)}, ${z_cil.toFixed(4)})`
          });
          break;
        }
        
        case 'cartesianas-esfericas': {
          // Cartesianas a Esféricas: (x,y,z) -> (ρ,θ,φ)
          const { x, y, z } = coordenadas;
          const rho = Math.sqrt(x * x + y * y + z * z);
          let theta = Math.atan2(y, x);
          let phi = Math.acos(z / rho);
          
          // Convertir a grados para mostrar
          const thetaGrados = toDegrees(theta);
          const phiGrados = toDegrees(phi);
          
          setResultado({
            tipo: 'Esféricas',
            valores: [
              { nombre: 'ρ', valor: rho.toFixed(4) },
              { nombre: 'θ (rad)', valor: theta.toFixed(4) },
              { nombre: 'θ (grados)', valor: thetaGrados.toFixed(2) + '°' },
              { nombre: 'φ (rad)', valor: phi.toFixed(4) },
              { nombre: 'φ (grados)', valor: phiGrados.toFixed(2) + '°' }
            ],
            latex: `(\\rho, \\theta, \\phi) = (${rho.toFixed(4)}, ${theta.toFixed(4)} \\text{ rad}, ${phi.toFixed(4)} \\text{ rad})`
          });
          break;
        }
        
        case 'esfericas-cartesianas': {
          // Esféricas a Cartesianas: (ρ,θ,φ) -> (x,y,z)
          const { rho, theta_esf, phi } = coordenadas;
          
          const x = rho * Math.sin(phi) * Math.cos(theta_esf);
          const y = rho * Math.sin(phi) * Math.sin(theta_esf);
          const z = rho * Math.cos(phi);
          
          setResultado({
            tipo: 'Cartesianas',
            valores: [
              { nombre: 'x', valor: x.toFixed(4) },
              { nombre: 'y', valor: y.toFixed(4) },
              { nombre: 'z', valor: z.toFixed(4) }
            ],
            latex: `(x, y, z) = (${x.toFixed(4)}, ${y.toFixed(4)}, ${z.toFixed(4)})`
          });
          break;
        }
        
        case 'cilindricas-esfericas': {
          // Cilíndricas a Esféricas: (r,θ,z) -> (ρ,θ,φ)
          const { r, theta, z_cil } = coordenadas;
          
          const rho = Math.sqrt(r * r + z_cil * z_cil);
          const phi = Math.atan2(r, z_cil);
          
          // Convertir a grados para mostrar
          const phiGrados = toDegrees(phi);
          const thetaGrados = toDegrees(theta);
          
          setResultado({
            tipo: 'Esféricas',
            valores: [
              { nombre: 'ρ', valor: rho.toFixed(4) },
              { nombre: 'θ (rad)', valor: theta.toFixed(4) },
              { nombre: 'θ (grados)', valor: thetaGrados.toFixed(2) + '°' },
              { nombre: 'φ (rad)', valor: phi.toFixed(4) },
              { nombre: 'φ (grados)', valor: phiGrados.toFixed(2) + '°' }
            ],
            latex: `(\\rho, \\theta, \\phi) = (${rho.toFixed(4)}, ${theta.toFixed(4)} \\text{ rad}, ${phi.toFixed(4)} \\text{ rad})`
          });
          break;
        }
        
        case 'esfericas-cilindricas': {
          // Esféricas a Cilíndricas: (ρ,θ,φ) -> (r,θ,z)
          const { rho, theta_esf, phi } = coordenadas;
          
          const r = rho * Math.sin(phi);
          const z = rho * Math.cos(phi);
          
          // Convertir a grados para mostrar
          const thetaGrados = toDegrees(theta_esf);
          
          setResultado({
            tipo: 'Cilíndricas',
            valores: [
              { nombre: 'r', valor: r.toFixed(4) },
              { nombre: 'θ (rad)', valor: theta_esf.toFixed(4) },
              { nombre: 'θ (grados)', valor: thetaGrados.toFixed(2) + '°' },
              { nombre: 'z', valor: z.toFixed(4) }
            ],
            latex: `(r, \\theta, z) = (${r.toFixed(4)}, ${theta_esf.toFixed(4)} \\text{ rad}, ${z.toFixed(4)})`
          });
          break;
        }
        
        default:
          break;
      }
    } catch (err) {
      setError('Error en el cálculo: ' + err.message);
    }
  };

  // Renderizado de los campos de entrada según el tipo de transformación
  const renderInputFields = () => {
    switch (tipoTransformacion) {
      case 'cartesianas-cilindricas':
      case 'cartesianas-esfericas':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="x"
                value={coordenadas.x}
                onChange={(e) => handleChangeCoordenada('x', e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="y"
                value={coordenadas.y}
                onChange={(e) => handleChangeCoordenada('y', e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="z"
                value={coordenadas.z}
                onChange={(e) => handleChangeCoordenada('z', e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
        );
      
      case 'cilindricas-cartesianas':
      case 'cilindricas-esfericas':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="r"
                value={coordenadas.r}
                onChange={(e) => handleChangeCoordenada('r', e.target.value)}
                type="number"
                inputProps={{ min: 0 }}
                margin="normal"
                variant="outlined"
                helperText="Radio en el plano xy (≥ 0)"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="θ (radianes)"
                value={coordenadas.theta}
                onChange={(e) => handleChangeCoordenada('theta', e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
                helperText="Ángulo en el plano xy (radianes)"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="z"
                value={coordenadas.z_cil}
                onChange={(e) => handleChangeCoordenada('z_cil', e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
                helperText="Altura en el eje z"
              />
            </Grid>
          </Grid>
        );
      
      case 'esfericas-cartesianas':
      case 'esfericas-cilindricas':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="ρ (rho)"
                value={coordenadas.rho}
                onChange={(e) => handleChangeCoordenada('rho', e.target.value)}
                type="number"
                inputProps={{ min: 0 }}
                margin="normal"
                variant="outlined"
                helperText="Distancia al origen (≥ 0)"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="θ (theta, radianes)"
                value={coordenadas.theta_esf}
                onChange={(e) => handleChangeCoordenada('theta_esf', e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
                helperText="Ángulo en el plano xy (radianes)"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="φ (phi, radianes)"
                value={coordenadas.phi}
                onChange={(e) => handleChangeCoordenada('phi', e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
                helperText="Ángulo desde el eje z (radianes)"
              />
            </Grid>
          </Grid>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Transformación de Coordenadas
      </Typography>
      <Typography paragraph>
        Convierte entre diferentes sistemas de coordenadas: cartesianas, cilíndricas y esféricas.
      </Typography>
      
      <FormControl fullWidth margin="normal">
        <InputLabel id="tipo-transformacion-label">Tipo de Transformación</InputLabel>
        <Select
          labelId="tipo-transformacion-label"
          value={tipoTransformacion}
          label="Tipo de Transformación"
          onChange={handleChangeTransformacion}
        >
          <MenuItem value="cartesianas-cilindricas">Cartesianas a Cilíndricas</MenuItem>
          <MenuItem value="cilindricas-cartesianas">Cilíndricas a Cartesianas</MenuItem>
          <MenuItem value="cartesianas-esfericas">Cartesianas a Esféricas</MenuItem>
          <MenuItem value="esfericas-cartesianas">Esféricas a Cartesianas</MenuItem>
          <MenuItem value="cilindricas-esfericas">Cilíndricas a Esféricas</MenuItem>
          <MenuItem value="esfericas-cilindricas">Esféricas a Cilíndricas</MenuItem>
        </Select>
      </FormControl>
      
      {renderInputFields()}
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={calcularTransformacion}
        sx={{ mt: 2 }}
      >
        Calcular
      </Button>
      
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      
      {resultado && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1">Resultado en coordenadas {resultado.tipo}:</Typography>
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, mt: 1 }}>
            <BlockMath math={resultado.latex} />
            
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {resultado.valores.map((val, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Typography variant="subtitle2">{val.nombre}:</Typography>
                  <Typography>{val.valor}</Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
          
          {tipoTransformacion === 'cartesianas-cilindricas' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Fórmulas utilizadas:</Typography>
              <BlockMath math={`r = \\sqrt{x^2 + y^2}`} />
              <BlockMath math={`\\theta = \\arctan(\\frac{y}{x})`} />
              <BlockMath math={`z = z`} />
            </Box>
          )}
          
          {tipoTransformacion === 'cilindricas-cartesianas' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Fórmulas utilizadas:</Typography>
              <BlockMath math={`x = r\\cos(\\theta)`} />
              <BlockMath math={`y = r\\sin(\\theta)`} />
              <BlockMath math={`z = z`} />
            </Box>
          )}
          
          {tipoTransformacion === 'cartesianas-esfericas' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Fórmulas utilizadas:</Typography>
              <BlockMath math={`\\rho = \\sqrt{x^2 + y^2 + z^2}`} />
              <BlockMath math={`\\theta = \\arctan(\\frac{y}{x})`} />
              <BlockMath math={`\\phi = \\arccos(\\frac{z}{\\rho})`} />
            </Box>
          )}
          
          {tipoTransformacion === 'esfericas-cartesianas' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Fórmulas utilizadas:</Typography>
              <BlockMath math={`x = \\rho \\sin(\\phi)\\cos(\\theta)`} />
              <BlockMath math={`y = \\rho \\sin(\\phi)\\sin(\\theta)`} />
              <BlockMath math={`z = \\rho \\cos(\\phi)`} />
            </Box>
          )}
          
          {tipoTransformacion === 'cilindricas-esfericas' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Fórmulas utilizadas:</Typography>
              <BlockMath math={`\\rho = \\sqrt{r^2 + z^2}`} />
              <BlockMath math={`\\theta = \\theta`} />
              <BlockMath math={`\\phi = \\arctan(\\frac{r}{z})`} />
            </Box>
          )}
          
          {tipoTransformacion === 'esfericas-cilindricas' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Fórmulas utilizadas:</Typography>
              <BlockMath math={`r = \\rho \\sin(\\phi)`} />
              <BlockMath math={`\\theta = \\theta`} />
              <BlockMath math={`z = \\rho \\cos(\\phi)`} />
            </Box>
          )}
        </Box>
      )}
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle2" gutterBottom>Notas sobre los sistemas de coordenadas:</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom>Coordenadas Cartesianas (x, y, z)</Typography>
            <Typography variant="body2">
              Sistema de coordenadas rectangular donde cada punto en el espacio se identifica por tres números: sus proyecciones sobre los ejes x, y, z.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom>Coordenadas Cilíndricas (r, θ, z)</Typography>
            <Typography variant="body2">
              <strong>r</strong>: distancia desde el origen al punto proyectado en el plano xy<br />
              <strong>θ</strong>: ángulo en el plano xy (medido desde el eje x positivo)<br />
              <strong>z</strong>: altura (igual que en coordenadas cartesianas)
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom>Coordenadas Esféricas (ρ, θ, φ)</Typography>
            <Typography variant="body2">
              <strong>ρ</strong>: distancia desde el origen al punto<br />
              <strong>θ</strong>: ángulo en el plano xy (igual que en cilíndricas)<br />
              <strong>φ</strong>: ángulo desde el eje z positivo
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

function EspacioTridimensional() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Espacio Tridimensional
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography paragraph>
          En esta sección puedes explorar conceptos del espacio tridimensional,
          como sistemas de coordenadas, vectores en R³, y superficies.
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleChange} 
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Ecuaciones Paramétricas" />
            <Tab label="Vectores en 3D" />
            <Tab label="Superficies" />
            <Tab label="Transformación de Coordenadas" />
          </Tabs>
        </Box>
        
        <Box sx={{ p: 1, minHeight: '400px' }}>
          {tabValue === 0 && <EcuacionesParametricas />}
          {tabValue === 1 && <VectoresEn3D />}
          {tabValue === 2 && <SuperficiesEn3D />}
          {tabValue === 3 && <TransformacionCoordenadas />}
        </Box>
      </Paper>
    </Box>
  );
}

export default EspacioTridimensional;