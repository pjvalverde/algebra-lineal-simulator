// Funciones utilitarias para operaciones con matrices
export const parseMatrix = (input) => {
  try {
    const rows = input.trim().split(';');
    return rows.map(row => 
      row.trim().split(',').map(num => parseFloat(num.trim()))
    );
  } catch (error) {
    throw new Error('Formato de matriz inválido');
  }
};

export const isValidMatrix = (matrix) => {
  if (!matrix || !matrix.length || !matrix[0].length) return false;
  const width = matrix[0].length;
  return matrix.every(row => row.length === width);
};

export const transpose = (matrix) => {
  return matrix[0].map((_, colIndex) => 
    matrix.map(row => row[colIndex])
  );
};

export const conjugateTranspose = (matrix) => {
  // Para matrices reales es igual a la transpuesta
  return transpose(matrix);
};

export const isNullMatrix = (matrix) => {
  return matrix.every(row => row.every(val => val === 0));
};

export const isIdentity = (matrix) => {
  if (matrix.length !== matrix[0].length) return false;
  return matrix.every((row, i) => 
    row.every((val, j) => (i === j ? val === 1 : val === 0))
  );
};

export const isDiagonal = (matrix) => {
  if (matrix.length !== matrix[0].length) return false;
  return matrix.every((row, i) => 
    row.every((val, j) => i !== j ? val === 0 : true)
  );
};

export const isUpperTriangular = (matrix) => {
  if (matrix.length !== matrix[0].length) return false;
  return matrix.every((row, i) => 
    row.every((val, j) => i > j ? val === 0 : true)
  );
};

export const isLowerTriangular = (matrix) => {
  if (matrix.length !== matrix[0].length) return false;
  return matrix.every((row, i) => 
    row.every((val, j) => i < j ? val === 0 : true)
  );
};

export const isHermitian = (matrix) => {
  if (matrix.length !== matrix[0].length) return false;
  const conjugateTransposed = conjugateTranspose(matrix);
  return matrix.every((row, i) => 
    row.every((val, j) => val === conjugateTransposed[i][j])
  );
};



// Suma de matrices
export const addMatrices = (matrix1, matrix2) => {
  if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
    throw new Error('Las matrices deben tener las mismas dimensiones');
  }
  return matrix1.map((row, i) => 
    row.map((val, j) => val + matrix2[i][j])
  );
};

// Multiplicación de matrices
export const multiplyMatrices = (matrix1, matrix2) => {
  if (matrix1[0].length !== matrix2.length) {
    throw new Error('El número de columnas de la primera matriz debe ser igual al número de filas de la segunda');
  }
  
  return matrix1.map((row) => {
    return matrix2[0].map((_, j) => {
      return row.reduce((sum, val, k) => sum + val * matrix2[k][j], 0);
    });
  });
};

// Determinante (para matrices 2x2 y 3x3)
export const determinant = (matrix) => {
  if (matrix.length !== matrix[0].length) {
    throw new Error('La matriz debe ser cuadrada');
  }

  if (matrix.length === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }

  if (matrix.length === 3) {
    return (
      matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
      matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
      matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
    );
  }

  throw new Error('Solo se soportan matrices 2x2 y 3x3 para el cálculo del determinante');
};

// Escalar por matriz
export const scalarMultiply = (scalar, matrix) => {
  return matrix.map(row => row.map(val => val * scalar));
};

// Rango de una matriz (simplificado para matrices 2x2 y 3x3)
export const rank = (matrix) => {
  if (isNullMatrix(matrix)) return 0;
  if (matrix.length === 1 || matrix[0].length === 1) return 1;
  
  const det = determinant(matrix);
  if (det !== 0) return matrix.length;
  
  // Si el determinante es 0, el rango es menor que la dimensión
  return matrix.length - 1;
};