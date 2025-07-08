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
  stepsY = 100,
  outerVar = 'auto'
) {
  const integrand = compile(integrandExpr);
  // Decide outer variable if auto
  if (outerVar === 'auto') {
    const dependsOnY = /\by\b/.test(xLowerExpr) || /\by\b/.test(xUpperExpr);
    outerVar = dependsOnY ? 'y' : 'x';
  }

  if (outerVar === 'x') {
    const xLowerCompiled = compile(xLowerExpr);
    const xUpperCompiled = compile(xUpperExpr);
    const yLowerCompiled = compile(yLowerExpr);
    const yUpperCompiled = compile(yUpperExpr);

    const xLower = xLowerCompiled.evaluate();
    const xUpper = xUpperCompiled.evaluate();
    const dx = (xUpper - xLower) / stepsX;
    let sum = 0;

    for (let i = 0; i < stepsX; i++) {
      const x = xLower + (i + 0.5) * dx;
      const yLow = yLowerCompiled.evaluate({ x });
      const yUp = yUpperCompiled.evaluate({ x });
      const dy = (yUp - yLow) / stepsY;
      for (let j = 0; j < stepsY; j++) {
        const y = yLow + (j + 0.5) * dy;
        const f = integrand.evaluate({ x, y });
        sum += f * dx * dy;
      }
    }
    return sum;
  } else {
    // outerVar === 'y'
    const yLowerCompiled = compile(yLowerExpr);
    const yUpperCompiled = compile(yUpperExpr);
    const xLowerCompiled = compile(xLowerExpr);
    const xUpperCompiled = compile(xUpperExpr);

    const yLower = yLowerCompiled.evaluate();
    const yUpper = yUpperCompiled.evaluate();
    const dy = (yUpper - yLower) / stepsY;
    let sum = 0;

    for (let j = 0; j < stepsY; j++) {
      const y = yLower + (j + 0.5) * dy;
      const xLow = xLowerCompiled.evaluate({ y });
      const xUp = xUpperCompiled.evaluate({ y });
      const dx = (xUp - xLow) / stepsX;
      for (let i = 0; i < stepsX; i++) {
        const x = xLow + (i + 0.5) * dx;
        const f = integrand.evaluate({ x, y });
        sum += f * dx * dy;
      }
    }
    return sum;
  }
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

export function convertIntegrandRectToPolar(expr) {
  // Reemplaza x->(r*cos(theta)) y y->(r*sin(theta)) de manera sencilla.
  // No es un parser completo, pero funciona para expresiones algebraicas simples.
  return expr
    .replace(/(?<![a-zA-Z0-9_])x(?![a-zA-Z0-9_])/g, '(r*cos(theta))')
    .replace(/(?<![a-zA-Z0-9_])y(?![a-zA-Z0-9_])/g, '(r*sin(theta))');
}

// --- Funciones aún no implementadas (placeholders) ---
export function calcularGradiente(func, punto) {
  console.warn('calcularGradiente no está implementado todavía.');
}

export function calcularDivergencia(campoVectorial, punto) {
  console.warn('calcularDivergencia no está implementado todavía.');
}