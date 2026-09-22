// Motor de reglas de coherencia (ADR-0005). Puro: recibe el estado del
// canvas, devuelve advertencias. No toca el DOM, no tiene side-effects —
// por eso es fácil de probar a mano en la consola del navegador:
// revisarCoherencia(estado)

import canalCaroVsCostos from '../data/rules/canal-caro-vs-costos-cost-driven.json';
import segmentoMasivoVsCostos from '../data/rules/segmento-masivo-vs-costos-value-driven.json';
import vpPrecioVsCostos from '../data/rules/vp-precio-vs-costos-value-driven.json';
import vpPersonalizacionSinActividad from '../data/rules/vp-personalizacion-sin-actividad-resolucion-problemas.json';
import asistenciaDedicadaVsMasivo from '../data/rules/asistencia-dedicada-vs-mercado-masivo.json';
import vpComplejaSinAsistencia from '../data/rules/vp-compleja-sin-asistencia-humana.json';

import type { EstadoCanvas } from './types';

// Forma de cada archivo data/rules/*.json — ver spec-data-json-v1.md.
interface Condicion {
  bloque: string;
  tags_any: string[];
  negado?: boolean;
}

interface Regla {
  id: string;
  bloques: string[];
  condiciones: Condicion[];
  mensaje: string;
  fuente: string;
  confianza: 'alta' | 'media';
}

// Cast explícito: TS infiere el tipo EXACTO de cada JSON importado (hasta los
// strings literales), y no vale la pena pelear con eso acá — la validez de
// estos archivos ya la chequea test.yml (parsea cada JSON en CI). Si algún
// día se valida el JSON contra un schema real, este cast se puede sacar.
const reglas = [
  canalCaroVsCostos,
  segmentoMasivoVsCostos,
  vpPrecioVsCostos,
  vpPersonalizacionSinActividad,
  asistenciaDedicadaVsMasivo,
  vpComplejaSinAsistencia,
] as Regla[];

/**
 * Evalúa UNA condición contra lo que el usuario cargó.
 *
 * - Sin `negado`: se cumple si el bloque tiene AL MENOS UNO de `tags_any`
 *   seleccionado (OR entre los tags de la lista).
 * - Con `negado: true`: se cumple si el bloque NO tiene NINGUNO de
 *   `tags_any` — así se expresa "falta el complemento esperado" (ej. regla
 *   vp-personalizacion-sin-actividad-resolucion-problemas: propuesta-valor
 *   tiene "personalizacion" PERO actividades-clave no tiene
 *   "resolucion-de-problemas").
 */
function cumpleCondicion(condicion: Condicion, estado: EstadoCanvas): boolean {
  const seleccionados = estado[condicion.bloque]?.tagsSeleccionados ?? [];
  const hayInterseccion = condicion.tags_any.some((tag) => seleccionados.includes(tag));
  return condicion.negado ? !hayInterseccion : hayInterseccion;
}

/**
 * Una regla dispara si TODAS sus condiciones se cumplen (AND). Las 6 reglas
 * de v1 tienen 2 condiciones cada una, pero esto queda genérico por si en
 * v1.1 hace falta una regla de 3 bloques.
 */
function disparaRegla(regla: Regla, estado: EstadoCanvas): boolean {
  return regla.condiciones.every((condicion) => cumpleCondicion(condicion, estado));
}

/** Lo que le mostramos al usuario cuando una regla dispara. */
export interface Advertencia {
  id: string;
  mensaje: string;
  fuente: string;
  confianza: 'alta' | 'media';
}

/**
 * Corre las 6 reglas contra el estado actual del canvas y devuelve las que
 * dispararon. Nunca bloquea nada (ADR-0005 lo deja explícito: son
 * advertencias, no errores) — el llamador decide cómo mostrarlas.
 */
export function revisarCoherencia(estado: EstadoCanvas): Advertencia[] {
  return reglas
    .filter((regla) => disparaRegla(regla, estado))
    .map((regla) => ({
      id: regla.id,
      mensaje: regla.mensaje,
      fuente: regla.fuente,
      confianza: regla.confianza,
    }));
}
