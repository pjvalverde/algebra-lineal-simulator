import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Paper, Tabs, Tab, TextField, Button, Grid } from '@mui/material';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import * as THREE from 'three';

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
    
    // Crear ejemplo de superficie (esfera)
    const geometrySphere = new THREE.SphereGeometry(1, 32, 32);
    const materialSphere = new THREE.MeshPhongMaterial({ 
      color: 0x0088ff,
      transparent: true,
      opacity: 0.7,
      wireframe: false
    });
    
    const sphere = new THREE.Mesh(geometrySphere, materialSphere);
    scene.add(sphere);
    
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

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Superficies en el Espacio 3D
      </Typography>
      <Typography paragraph>
        Visualización de diferentes tipos de superficies en R³:
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1">Planos:</Typography>
            <BlockMath math="ax + by + cz + d = 0" />
            <Typography>
              Donde (a,b,c) es el vector normal al plano y d es la constante.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1">Esferas:</Typography>
            <BlockMath math="(x-x_0)^2 + (y-y_0)^2 + (z-z_0)^2 = r^2" />
            <Typography>
              Donde (x₀,y₀,z₀) es el centro y r el radio.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1">Cilindros:</Typography>
            <BlockMath math="(x-x_0)^2 + (y-y_0)^2 = r^2" />
            <Typography>
              Cilindro circular con eje paralelo al eje z.
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle1">Paraboloides:</Typography>
            <BlockMath math="z = a(x^2 + y^2)" />
            <Typography>
              Donde a es una constante que determina la apertura.
            </Typography>
          </Box>
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
          </Tabs>
        </Box>
        
        <Box sx={{ p: 1, minHeight: '400px' }}>
          {tabValue === 0 && <EcuacionesParametricas />}
          {tabValue === 1 && <VectoresEn3D />}
          {tabValue === 2 && <SuperficiesEn3D />}
        </Box>
      </Paper>
    </Box>
  );
}

export default EspacioTridimensional;