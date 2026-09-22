// Tipos compartidos entre data.ts, main.ts, storage.ts y (más adelante) rules.ts/render.ts.
// Centralizarlos acá evita duplicar la forma del dato en cada archivo.

/** Un tag seleccionable dentro de un bloque (ej. "venta-directa" en Canales). */
export interface Tag {
  id: string;
  label: string;
}

/** La definición de un bloque tal cual viene de data/canvas/*.json — es solo lectura, nunca se modifica en runtime. */
export interface BloqueDef {
  id: string;
  titulo: string;
  tooltip: string;
  tags: Tag[];
}

/** Lo que el usuario cargó en UN bloque. Esto sí cambia en runtime. */
export interface EstadoBloque {
  tagsSeleccionados: string[]; // ids de Tag, no los labels
  texto: string;
}

/** El canvas completo del usuario: bloque.id -> lo que cargó ahí. */
export type EstadoCanvas = Record<string, EstadoBloque>;
