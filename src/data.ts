// Carga los 9 bloques del canvas. Vite soporta `import x from './archivo.json'`
// nativo (sin plugin extra) — en build time los incrusta en el bundle de JS,
// no hay fetch en runtime. Por eso no hace falta async/await acá.

import segmentosClientes from '../data/canvas/segmentos-clientes.json';
import propuestaValor from '../data/canvas/propuesta-valor.json';
import canales from '../data/canvas/canales.json';
import relacionClientes from '../data/canvas/relacion-clientes.json';
import fuentesIngresos from '../data/canvas/fuentes-ingresos.json';
import recursosClave from '../data/canvas/recursos-clave.json';
import actividadesClave from '../data/canvas/actividades-clave.json';
import sociosClave from '../data/canvas/socios-clave.json';
import estructuraCostos from '../data/canvas/estructura-costos.json';

import type { BloqueDef } from './types';

// El orden del array es el orden en que se van a mostrar/recorrer.
// Uso el orden clásico del BMC (lado demanda -> lado oferta -> economía),
// no alfabético — importa para cómo lo va a leer el usuario.
export const bloques: BloqueDef[] = [
  segmentosClientes,
  propuestaValor,
  canales,
  relacionClientes,
  fuentesIngresos,
  recursosClave,
  actividadesClave,
  sociosClave,
  estructuraCostos,
];
