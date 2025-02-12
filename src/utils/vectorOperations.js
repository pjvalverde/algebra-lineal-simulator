export const isVector = (matrix) => {
    return matrix.length === 1 || matrix[0].length === 1;
  };
  
  export const vectorDimension = (vector) => {
    return vector.length === 1 ? vector[0].length : vector.length;
  };
  
  export const dotProduct = (vector1, vector2) => {
    if (!isVector(vector1) || !isVector(vector2)) {
      throw new Error('Los argumentos deben ser vectores');
    }
    
    const v1 = vector1.flat();
    const v2 = vector2.flat();
    
    if (v1.length !== v2.length) {
      throw new Error('Los vectores deben tener la misma dimensión');
    }
    
    return v1.reduce((sum, val, i) => sum + val * v2[i], 0);
  };
  

// Norma de un vector
export const vectorNorm = (vector) => {
    const flatVector = vector.flat();
    return Math.sqrt(flatVector.reduce((sum, val) => sum + val * val, 0));
  };
  
  // Producto cruz (solo para vectores 3D)
  export const crossProduct = (vector1, vector2) => {
    const v1 = vector1.flat();
    const v2 = vector2.flat();
  
    if (v1.length !== 3 || v2.length !== 3) {
      throw new Error('El producto cruz solo está definido para vectores 3D');
    }
  
    return [
      v1[1] * v2[2] - v1[2] * v2[1],
      v1[2] * v2[0] - v1[0] * v2[2],
      v1[0] * v2[1] - v1[1] * v2[0]
    ];
  };
  
  // Normalizar un vector
  export const normalizeVector = (vector) => {
    const norm = vectorNorm(vector);
    const flatVector = vector.flat();
    return flatVector.map(val => val / norm);
  };
  
  // Ángulo entre vectores
  export const angleBetweenVectors = (vector1, vector2) => {
    const dot = dotProduct(vector1, vector2);
    const norm1 = vectorNorm(vector1);
    const norm2 = vectorNorm(vector2);
    return Math.acos(dot / (norm1 * norm2)) * (180 / Math.PI); // en grados
  };
  
  // Proyección de un vector sobre otro
  export const vectorProjection = (vector1, vector2) => {
    const dot = dotProduct(vector1, vector2);
    const norm2Squared = vectorNorm(vector2) ** 2;
    const scalar = dot / norm2Squared;
    return vector2.flat().map(val => val * scalar);
  };