// Funciones utilitarias para operaciones con matrices
export const parseMatrix = (input) => {
  try {
    return input.split(';').map(row => 
      row.split(',').map(num => parseFloat(num))
    );
  } catch (error) {
    throw new Error('Formato de matriz inválido');
  }
};

// Transpuesta de una matriz
export const transpose = (matrix) => {
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
};

// Conjugada transpuesta (para matrices reales es igual a la transpuesta)
export const conjugateTranspose = (matrix) => {
  return transpose(matrix);
};

// Verificar si es matriz nula
export const isNullMatrix = (matrix) => {
  return matrix.every(row => row.every(val => val === 0));
};

// Verificar si es matriz identidad
export const isIdentity = (matrix) => {
  if (matrix.length !== matrix[0].length) return false;
  return matrix.every((row, i) => 
    row.every((val, j) => (i === j ? val === 1 : val === 0))
  );
};

// Verificar si es matriz diagonal
export const isDiagonal = (matrix) => {
  if (matrix.length !== matrix[0].length) return false;
  return matrix.every((row, i) => 
    row.every((val, j) => i !== j ? val === 0 : true)
  );
};

// Verificar si es matriz triangular superior
export const isUpperTriangular = (matrix) => {
  if (matrix.length !== matrix[0].length) return false;
  return matrix.every((row, i) => 
    row.every((val, j) => i > j ? val === 0 : true)
  );
};

// Verificar si es matriz triangular inferior
export const isLowerTriangular = (matrix) => {
  if (matrix.length !== matrix[0].length) return false;
  return matrix.every((row, i) => 
    row.every((val, j) => i < j ? val === 0 : true)
  );
};

// Verificar si es matriz simétrica
export const isSymmetric = (matrix) => {
  if (matrix.length !== matrix[0].length) return false;
  const transposed = transpose(matrix);
  return matrix.every((row, i) => 
    row.every((val, j) => val === transposed[i][j])
  );
};

// Verificar si es matriz hermitiana (para matrices reales es igual a simétrica)
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
  return matrix1.map(row => 
    matrix2[0].map((_, j) => 
      row.reduce((sum, val, k) => sum + val * matrix2[k][j], 0)
    )
  );
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
  
  return matrix.length - 1;
};

// Método de Gauss-Jordan
export const gaussJordan = (matrix) => {
  const m = matrix.length;
  const n = matrix[0].length;
  const augmentedMatrix = matrix.map(row => [...row]);
  
  for (let i = 0; i < m; i++) {
    // Encontrar pivote
    let maxEl = Math.abs(augmentedMatrix[i][i]);
    let maxRow = i;
    for (let k = i + 1; k < m; k++) {
      if (Math.abs(augmentedMatrix[k][i]) > maxEl) {
        maxEl = Math.abs(augmentedMatrix[k][i]);
        maxRow = k;
      }
    }

    // Intercambiar filas si es necesario
    if (maxRow !== i) {
      [augmentedMatrix[i], augmentedMatrix[maxRow]] = 
      [augmentedMatrix[maxRow], augmentedMatrix[i]];
    }

    // Hacer ceros debajo del pivote
    for (let k = i + 1; k < m; k++) {
      const c = -augmentedMatrix[k][i] / augmentedMatrix[i][i];
      for (let j = i; j < n; j++) {
        if (i === j) {
          augmentedMatrix[k][j] = 0;
        } else {
          augmentedMatrix[k][j] += c * augmentedMatrix[i][j];
        }
      }
    }
  }

  // Hacer unos en la diagonal y ceros arriba
  for (let i = m - 1; i >= 0; i--) {
    for (let k = i - 1; k >= 0; k--) {
      const c = -augmentedMatrix[k][i] / augmentedMatrix[i][i];
      for (let j = 0; j < n; j++) {
        augmentedMatrix[k][j] += c * augmentedMatrix[i][j];
      }
    }
  }

  // Normalizar filas
  for (let i = 0; i < m; i++) {
    const c = 1 / augmentedMatrix[i][i];
    for (let j = 0; j < n; j++) {
      augmentedMatrix[i][j] *= c;
    }
  }

  return augmentedMatrix;
};

// Polinomio característico (para matrices 2x2 y 3x3)
export const characteristicPolynomial = (matrix) => {
  if (matrix.length !== matrix[0].length) {
    throw new Error('La matriz debe ser cuadrada');
  }

  if (matrix.length === 2) {
    const a = 1;
    const b = -(matrix[0][0] + matrix[1][1]);
    const c = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    return { a, b, c };
  }

  if (matrix.length === 3) {
    const a = -1;
    const b = matrix[0][0] + matrix[1][1] + matrix[2][2];
    const c = -(matrix[0][0]*matrix[1][1] + matrix[1][1]*matrix[2][2] + matrix[2][2]*matrix[0][0]) + 
              matrix[0][1]*matrix[1][0] + matrix[1][2]*matrix[2][1] + matrix[2][0]*matrix[0][2];
    const d = determinant(matrix);
    return { a, b, c, d };
  }

  throw new Error('Solo se soportan matrices 2x2 y 3x3');
};

// Encontrar valores propios
export const findEigenvalues = (matrix) => {
  const poly = characteristicPolynomial(matrix);
  
  if (matrix.length === 2) {
    const { a, b, c } = poly;
    const discriminant = b*b - 4*a*c;
    if (discriminant < 0) {
      const realPart = -b/(2*a);
      const imagPart = Math.sqrt(-discriminant)/(2*a);
      return [
        { real: realPart, imag: imagPart },
        { real: realPart, imag: -imagPart }
      ];
    }
    return [
      { real: (-b + Math.sqrt(discriminant))/(2*a), imag: 0 },
      { real: (-b - Math.sqrt(discriminant))/(2*a), imag: 0 }
    ];
  }

  throw new Error('Solo se soportan matrices 2x2 para valores propios');
};

// Encontrar vectores propios para un valor propio dado
export const findEigenvector = (matrix, eigenvalue) => {
  const n = matrix.length;
  const matrixMinusLambda = matrix.map((row, i) => 
    row.map((val, j) => i === j ? val - eigenvalue.real : val)
  );

  // Resolver (A - λI)v = 0 usando eliminación Gaussiana
  const augmented = matrixMinusLambda.map(row => [...row, 0]);
  const reduced = gaussJordan(augmented);

  // Encontrar una solución no trivial
  let eigenvector = new Array(n).fill(1);
  for (let i = n-1; i >= 0; i--) {
    let sum = 0;
    for (let j = i+1; j < n; j++) {
      sum += reduced[i][j] * eigenvector[j];
    }
    eigenvector[i] = sum !== 0 ? -sum : 1;
  }

  // Normalizar el vector propio
  const norm = Math.sqrt(eigenvector.reduce((sum, val) => sum + val*val, 0));
  return eigenvector.map(val => val/norm);
};

// Diagonalización
export const diagonalize = (matrix) => {
  const eigenvalues = findEigenvalues(matrix);
  const realEigenvalues = eigenvalues.filter(e => Math.abs(e.imag) < 1e-10);
  
  if (realEigenvalues.length !== matrix.length) {
    throw new Error('La matriz no es diagonalizable sobre los reales');
  }

  const eigenvectors = realEigenvalues.map(e => findEigenvector(matrix, e));
  
  // Matriz P (vectores propios como columnas)
  const P = eigenvectors[0].map((_, i) => 
    eigenvectors.map(v => v[i])
  );

  // Matriz D (diagonal de valores propios)
  const D = realEigenvalues.map((e, i) => 
    new Array(matrix.length).fill(0).map((_, j) => i === j ? e.real : 0)
  );

  return { P, D };
};