// Autosave a localStorage (ADR-0003). Deliberadamente simple: una sola clave,
// todo el canvas serializado como un JSON. No hace falta más para v1 — no hay
// multi-canvas, no hay versionado de esquema todavía.

import type { EstadoCanvas } from './types';

const CLAVE = 'canvaslint:estado';

export function cargarEstado(): EstadoCanvas {
  try {
    const guardado = localStorage.getItem(CLAVE);
    return guardado ? (JSON.parse(guardado) as EstadoCanvas) : {};
  } catch {
    // localStorage puede tirar excepción: modo privado de Safari, cuota llena,
    // cookies/site-data bloqueadas. Nunca dejamos que esto rompa el arranque
    // de la app — si falla, arrancamos con canvas vacío.
    return {};
  }
}

export function guardarEstado(estado: EstadoCanvas): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
  } catch {
    // Mismo motivo que arriba: fallo silencioso a propósito. Si no se puede
    // guardar, la app sigue andando en memoria — perder el autosave no debería
    // tirar un error visible al usuario por algo que no puede controlar.
  }
}
