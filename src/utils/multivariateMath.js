import { compile } from 'mathjs';

/**
 * Aproxima integrales dobles en coordenadas rectangulares.
 * Las expresiones de los límites pueden depender de x (p.ej. "x", "sin(x)").
 * Se usa la regla del punto medio para conseguir una precisión razonable.
 */
export function doubleIntegralRectangular(
  integrandExpr,
  xLowerExpr,
  xUpperExpr,
  yLowerExpr,
  yUpperExpr,
  stepsX = 100,
  stepsY = 100
) {
  const integrand = compile(integrandExpr);
  const xLowerCompiled = compile(xLowerExpr);
  const xUpperCompiled = compile(xUpperExpr);
  const yLowerCompiled = compile(yLowerExpr);
  const yUpperCompiled = compile(yUpperExpr);

  const xLower = xLowerCompiled.evaluate();
  const xUpper = xUpperCompiled.evaluate();

  const dx = (xUpper - xLower) / stepsX;
  let sum = 0;

  for (let i = 0; i < stepsX; i++) {
    const xi = xLower + (i + 0.5) * dx; // punto medio

    const yLower = yLowerCompiled.evaluate({ x: xi });
    const yUpper = yUpperCompiled.evaluate({ x: xi });
    const dy = (yUpper - yLower) / stepsY;

    for (let j = 0; j < stepsY; j++) {
      const yj = yLower + (j + 0.5) * dy; // punto medio
      const f = integrand.evaluate({ x: xi, y: yj });
      sum += f * dx * dy;
    }
  }

  return sum;
}

/**
 * Conversión de coordenadas rectangulares (x, y) a polares (r, θ).
 */
export function rectangularToPolar(x, y) {
  return { r: Math.hypot(x, y), theta: Math.atan2(y, x) };
}

/**
 * Aproxima integrales dobles en coordenadas polares.
 * La expresión del integrando debe estar en función de r y theta.
 * Se añade automáticamente el jacobiano (r) en la integración.
 */
export function doubleIntegralPolar(
  integrandExpr,
  rLowerExpr,
  rUpperExpr,
  thetaLowerExpr,
  thetaUpperExpr,
  stepsR = 100,
  stepsTheta = 100
) {
  const integrand = compile(integrandExpr);
  const rLower = compile(rLowerExpr).evaluate();
  const rUpper = compile(rUpperExpr).evaluate();
  const thetaLower = compile(thetaLowerExpr).evaluate();
  const thetaUpper = compile(thetaUpperExpr).evaluate();

  const dr = (rUpper - rLower) / stepsR;
  const dTheta = (thetaUpper - thetaLower) / stepsTheta;
  let sum = 0;

  for (let i = 0; i < stepsR; i++) {
    const r = rLower + (i + 0.5) * dr;
    for (let j = 0; j < stepsTheta; j++) {
      const theta = thetaLower + (j + 0.5) * dTheta;
      const f = integrand.evaluate({ r, theta });
      sum += f * r * dr * dTheta; // Jacobiano r
    }
  }

  return sum;
}

// --- Funciones aún no implementadas (placeholders) ---
export function calcularGradiente(func, punto) {
  console.warn('calcularGradiente no está implementado todavía.');
}

export function calcularDivergencia(campoVectorial, punto) {
  console.warn('calcularDivergencia no está implementado todavía.');
}