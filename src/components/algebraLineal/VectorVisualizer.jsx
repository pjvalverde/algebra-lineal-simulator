import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Typography, 
  Slider,
  FormControlLabel,
  Switch
} from '@mui/material';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Funciones auxiliares para operaciones vectoriales en 3D
const sumaVectores = (v1, v2) => {
  return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]];
};

const restaVectores = (v1, v2) => {
  return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]];
};

const escalarPorVector = (escalar, vector) => {
  return [escalar * vector[0], escalar * vector[1], escalar * vector[2]];
};

const productoEscalar = (v1, v2) => {
  return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
};

const magnitudVector = (vector) => {
  return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1] + vector[2] * vector[2]);
};

const productoVectorial = (v1, v2) => {
  return [
    v1[1] * v2[2] - v1[2] * v2[1],
    v1[2] * v2[0] - v1[0] * v2[2],
    v1[0] * v2[1] - v1[1] * v2[0]
  ];
};

// Función para crear una flecha en Three.js
const crearFlecha = (origen, destino, color, scene) => {
  // Crear el material para la flecha
  const material = new THREE.MeshBasicMaterial({ color });

  // Crear el cuerpo de la flecha (cilindro)
  const direccion = new THREE.Vector3(
    destino[0] - origen[0],
    destino[1] - origen[1],
    destino[2] - origen[2]
  );
  const longitud = direccion.length();
  direccion.normalize();

  // Crear el cilindro para el cuerpo de la flecha
  const geometriaCuerpo = new THREE.CylinderGeometry(0.05, 0.05, longitud, 12);
  
  // Rotación del cilindro para que apunte en la dirección correcta
  const ejeQ = new THREE.Vector3(0, 1, 0);
  const ejeFlecha = new THREE.Vector3().copy(direccion);
  const cuaternion = new THREE.Quaternion().setFromUnitVectors(ejeQ, ejeFlecha);
  
  geometriaCuerpo.translate(0, longitud / 2, 0);
  geometriaCuerpo.applyQuaternion(cuaternion);
  
  // Mover el cilindro a la posición correcta
  const cuerpo = new THREE.Mesh(geometriaCuerpo, material);
  cuerpo.position.set(origen[0], origen[1], origen[2]);
  
  // Crear la punta de la flecha (cono)
  const geometriaPunta = new THREE.ConeGeometry(0.15, 0.3, 12);
  
  // Rotación y posición del cono
  geometriaPunta.translate(0, longitud + 0.15, 0);
  geometriaPunta.applyQuaternion(cuaternion);
  
  const punta = new THREE.Mesh(geometriaPunta, material);
  punta.position.set(origen[0], origen[1], origen[2]);
  
  // Crear un grupo para la flecha
  const flecha = new THREE.Group();
  flecha.add(cuerpo);
  flecha.add(punta);
  
  // Añadir la flecha a la escena
  scene.add(flecha);
  
  return flecha;
};

function VectorVisualizer() {
  const [vector1, setVector1] = useState([3, 2, 1]);
  const [vector2, setVector2] = useState([1, 4, 2]);
  const [escalar, setEscalar] = useState(2);
  const [mostrarSuma, setMostrarSuma] = useState(true);
  const [mostrarResta, setMostrarResta] = useState(false);
  const [mostrarEscalar, setMostrarEscalar] = useState(false);
  const [mostrarProductoVectorial, setMostrarProductoVectorial] = useState(false);
  const [rangoVisualizacion, setRangoVisualizacion] = useState(10);
  
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const controlsRef = useRef(null);
  const flechasRef = useRef([]);
  
  // Resultado de operaciones
  const vectorSuma = sumaVectores(vector1, vector2);
  const vectorResta = restaVectores(vector1, vector2);
  const vectorEscalar = escalarPorVector(escalar, vector1);
  const vectorProducto = productoVectorial(vector1, vector2);
  const productoEscalarResult = productoEscalar(vector1, vector2);
  const magnitudV1 = magnitudVector(vector1);
  const magnitudV2 = magnitudVector(vector2);
  
  // Ángulo entre vectores
  const cosAngulo = productoEscalarResult / (magnitudV1 * magnitudV2);
  const angulo = Math.acos(Math.min(Math.max(cosAngulo, -1), 1)) * (180 / Math.PI);

  // Manejo de cambios
  const handleChangeVector1 = (index, value) => {
    const newVector = [...vector1];
    newVector[index] = Number(value);
    setVector1(newVector);
  };

  const handleChangeVector2 = (index, value) => {
    const newVector = [...vector2];
    newVector[index] = Number(value);
    setVector2(newVector);
  };
  
  // Inicialización y actualización del gráfico 3D
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Inicializar escena
    const escena = new THREE.Scene();
    escena.background = new THREE.Color(0x222222);
    sceneRef.current = escena;
    
    // Configurar cámara
    const aspectRatio = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    
    // Renderizador
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    
    // Limpiar el contenedor antes de añadir el canvas
    while (canvasRef.current.firstChild) {
      canvasRef.current.removeChild(canvasRef.current.firstChild);
    }
    canvasRef.current.appendChild(renderer.domElement);
    
    // Controles de órbita para rotar la cámara
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controlsRef.current = controls;
    
    // Ejes de coordenadas
    const ejesHelper = new THREE.AxesHelper(rangoVisualizacion);
    escena.add(ejesHelper);
    
    // Cuadrícula para referencia
    const gridHelper = new THREE.GridHelper(rangoVisualizacion * 2, 20);
    escena.add(gridHelper);
    
    // Añadir etiquetas a los ejes
    const createAxisLabel = (text, position) => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 32, 16);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      sprite.position.copy(position);
      sprite.scale.set(1, 0.5, 1);
      escena.add(sprite);
    };
    
    createAxisLabel('X', new THREE.Vector3(rangoVisualizacion + 1, 0, 0));
    createAxisLabel('Y', new THREE.Vector3(0, rangoVisualizacion + 1, 0));
    createAxisLabel('Z', new THREE.Vector3(0, 0, rangoVisualizacion + 1));
    
    // Función para renderizar
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(escena, camera);
    };
    
    animate();
    
    // Limpieza al desmontar
    return () => {
      renderer.dispose();
      if (canvasRef.current && renderer.domElement) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, [rangoVisualizacion]);
  
  // Actualizar los vectores cuando cambien
  useEffect(() => {
    if (!sceneRef.current) return;
    
    // Eliminar flechas anteriores
    flechasRef.current.forEach(flecha => {
      sceneRef.current.remove(flecha);
      flecha.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    });
    flechasRef.current = [];
    
    // Origen
    const origen = [0, 0, 0];
    
    // Crear las flechas para visualizar los vectores
    const flecha1 = crearFlecha(origen, vector1, 0x8884d8, sceneRef.current); // Violeta
    const flecha2 = crearFlecha(origen, vector2, 0x82ca9d, sceneRef.current); // Verde
    
    flechasRef.current.push(flecha1, flecha2);
    
    // Mostrar suma
    if (mostrarSuma) {
      const flechaSuma = crearFlecha(origen, vectorSuma, 0xff7300, sceneRef.current); // Naranja
      flechasRef.current.push(flechaSuma);
      
      // Visualizar el paralelogramo (opcional)
      const v1End = new THREE.Vector3(vector1[0], vector1[1], vector1[2]);
      const v2End = new THREE.Vector3(vector2[0], vector2[1], vector2[2]);
      const sumEnd = new THREE.Vector3(vectorSuma[0], vectorSuma[1], vectorSuma[2]);
      
      // Línea desde final de vector1 al final de la suma
      const geometriaLinea1 = new THREE.BufferGeometry().setFromPoints([v1End, sumEnd]);
      const materialLinea1 = new THREE.LineBasicMaterial({ color: 0xff7300, opacity: 0.5, transparent: true });
      const linea1 = new THREE.Line(geometriaLinea1, materialLinea1);
      sceneRef.current.add(linea1);
      flechasRef.current.push(linea1);
      
      // Línea desde final de vector2 al final de la suma
      const geometriaLinea2 = new THREE.BufferGeometry().setFromPoints([v2End, sumEnd]);
      const materialLinea2 = new THREE.LineBasicMaterial({ color: 0xff7300, opacity: 0.5, transparent: true });
      const linea2 = new THREE.Line(geometriaLinea2, materialLinea2);
      sceneRef.current.add(linea2);
      flechasRef.current.push(linea2);
    }
    
    // Mostrar resta
    if (mostrarResta) {
      const flechaResta = crearFlecha(origen, vectorResta, 0xFF5733, sceneRef.current); // Rojo
      flechasRef.current.push(flechaResta);
    }
    
    // Mostrar escalar
    if (mostrarEscalar) {
      const flechaEscalar = crearFlecha(origen, vectorEscalar, 0xC70039, sceneRef.current); // Rojo oscuro
      flechasRef.current.push(flechaEscalar);
    }
    
    // Mostrar producto vectorial
    if (mostrarProductoVectorial) {
      const flechaProducto = crearFlecha(origen, vectorProducto, 0x44BBCC, sceneRef.current); // Azul claro
      flechasRef.current.push(flechaProducto);
    }
    
  }, [vector1, vector2, escalar, mostrarSuma, mostrarResta, mostrarEscalar, mostrarProductoVectorial]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Visualizador de Vectores 3D</Typography>
      <Typography paragraph>
        Define vectores y visualiza sus operaciones básicas como suma, resta y multiplicación por escalar en el espacio tridimensional.
      </Typography>

      <Grid container spacing={3}>
        {/* Panel de entrada de datos */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Vector 1</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="X"
                  type="number"
                  value={vector1[0]}
                  onChange={(e) => handleChangeVector1(0, e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Y"
                  type="number"
                  value={vector1[1]}
                  onChange={(e) => handleChangeVector1(1, e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Z"
                  type="number"
                  value={vector1[2]}
                  onChange={(e) => handleChangeVector1(2, e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Vector 2</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="X"
                  type="number"
                  value={vector2[0]}
                  onChange={(e) => handleChangeVector2(0, e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Y"
                  type="number"
                  value={vector2[1]}
                  onChange={(e) => handleChangeVector2(1, e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Z"
                  type="number"
                  value={vector2[2]}
                  onChange={(e) => handleChangeVector2(2, e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Escalar</Typography>
            <Slider
              value={escalar}
              onChange={(e, newValue) => setEscalar(newValue)}
              min={-5}
              max={5}
              step={0.1}
              valueLabelDisplay="auto"
              aria-labelledby="escalar-slider"
            />

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Operaciones</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={mostrarSuma}
                  onChange={(e) => setMostrarSuma(e.target.checked)}
                  color="primary"
                />
              }
              label="Mostrar Suma (V1 + V2)"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={mostrarResta}
                  onChange={(e) => setMostrarResta(e.target.checked)}
                  color="primary"
                />
              }
              label="Mostrar Resta (V1 - V2)"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={mostrarEscalar}
                  onChange={(e) => setMostrarEscalar(e.target.checked)}
                  color="primary"
                />
              }
              label={`Mostrar Escalar (${escalar} × V1)`}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={mostrarProductoVectorial}
                  onChange={(e) => setMostrarProductoVectorial(e.target.checked)}
                  color="primary"
                />
              }
              label="Mostrar Producto Vectorial (V1 × V2)"
            />

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Rango de Visualización</Typography>
            <Slider
              value={rangoVisualizacion}
              onChange={(e, newValue) => setRangoVisualizacion(newValue)}
              min={5}
              max={20}
              step={1}
              valueLabelDisplay="auto"
              aria-labelledby="rango-slider"
            />
          </Paper>
          
          {/* Resultados numéricos */}
          <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Resultados</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">|V1| =</Typography>
                <Typography>{magnitudV1.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">|V2| =</Typography>
                <Typography>{magnitudV2.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">V1 · V2 =</Typography>
                <Typography>{productoEscalarResult.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Ángulo entre V1 y V2:</Typography>
                <Typography>{angulo.toFixed(2)}°</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">V1 × V2 =</Typography>
                <Typography>({vectorProducto[0].toFixed(2)}, {vectorProducto[1].toFixed(2)}, {vectorProducto[2].toFixed(2)})</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Visualización 3D */}
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 0, 
              height: '600px', 
              bgcolor: '#111',
              position: 'relative'
            }}
          >
            <Box 
              ref={canvasRef} 
              sx={{ 
                width: '100%', 
                height: '100%'
              }}
            />
            
            {/* Leyenda */}
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: 16, 
                right: 16, 
                bgcolor: 'rgba(0,0,0,0.7)',
                padding: 1,
                borderRadius: 1,
                color: 'white'
              }}
            >
              <Typography variant="caption" display="block">
                <Box component="span" sx={{ color: '#8884d8', display: 'inline-block', width: '1em', height: '1em', bgcolor: '#8884d8', mr: 1 }}></Box>
                Vector 1: ({vector1[0]}, {vector1[1]}, {vector1[2]})
              </Typography>
              <Typography variant="caption" display="block">
                <Box component="span" sx={{ color: '#82ca9d', display: 'inline-block', width: '1em', height: '1em', bgcolor: '#82ca9d', mr: 1 }}></Box>
                Vector 2: ({vector2[0]}, {vector2[1]}, {vector2[2]})
              </Typography>
              {mostrarSuma && (
                <Typography variant="caption" display="block">
                  <Box component="span" sx={{ color: '#ff7300', display: 'inline-block', width: '1em', height: '1em', bgcolor: '#ff7300', mr: 1 }}></Box>
                  Suma: ({vectorSuma[0]}, {vectorSuma[1]}, {vectorSuma[2]})
                </Typography>
              )}
              {mostrarResta && (
                <Typography variant="caption" display="block">
                  <Box component="span" sx={{ color: '#FF5733', display: 'inline-block', width: '1em', height: '1em', bgcolor: '#FF5733', mr: 1 }}></Box>
                  Resta: ({vectorResta[0]}, {vectorResta[1]}, {vectorResta[2]})
                </Typography>
              )}
              {mostrarEscalar && (
                <Typography variant="caption" display="block">
                  <Box component="span" sx={{ color: '#C70039', display: 'inline-block', width: '1em', height: '1em', bgcolor: '#C70039', mr: 1 }}></Box>
                  Escalar × V1: ({vectorEscalar[0]}, {vectorEscalar[1]}, {vectorEscalar[2]})
                </Typography>
              )}
              {mostrarProductoVectorial && (
                <Typography variant="caption" display="block">
                  <Box component="span" sx={{ color: '#44BBCC', display: 'inline-block', width: '1em', height: '1em', bgcolor: '#44BBCC', mr: 1 }}></Box>
                  V1 × V2: ({vectorProducto[0].toFixed(1)}, {vectorProducto[1].toFixed(1)}, {vectorProducto[2].toFixed(1)})
                </Typography>
              )}
            </Box>
            
            {/* Instrucciones */}
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 16, 
                left: 16, 
                bgcolor: 'rgba(0,0,0,0.7)',
                padding: 1,
                borderRadius: 1,
                color: 'white',
                maxWidth: '250px'
              }}
            >
              <Typography variant="caption">
                Arrastra para rotar la vista. Usa la rueda del ratón para hacer zoom. Click derecho para mover.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default VectorVisualizer; 