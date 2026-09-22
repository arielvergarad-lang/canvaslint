import './style.css';
import { bloques } from './data';
import { cargarEstado, guardarEstado } from './storage';
import type { BloqueDef, EstadoCanvas } from './types';

// ESTADO: una sola fuente de verdad para todo el canvas. Patrón "estado +
// render()": algo cambia el estado -> se llama a lo que depende de él para
// que se redibuje. Es el mismo principio que usan React/Vue por debajo,
// hecho a mano acá porque no hay framework (ADR-0002: solo Vite+TS, sin libs
// de UI — no hace falta para 9 bloques fijos).
const estado: EstadoCanvas = cargarEstado();

// Debounce del autosave: si guardáramos en localStorage en cada tecla,
// escribiríamos a disco decenas de veces por segundo mientras el usuario
// tipea — caro y sin sentido. Esperamos 400ms de silencio después de la
// última tecla y ahí guardamos una sola vez.
let timeoutGuardado: ReturnType<typeof setTimeout> | undefined;
function guardarConDebounce(): void {
  clearTimeout(timeoutGuardado);
  timeoutGuardado = setTimeout(() => guardarEstado(estado), 400);
}

// Lo que pasa cada vez que el usuario cambia algo. Por ahora solo guarda.
// Cuando existan src/render.ts (dibuja el SVG) y src/rules.ts (motor de
// coherencia), este es el lugar donde se los llama — el resto del código
// no necesita saber que existen, main.ts es el único que orquesta.
function alCambiarAlgo(): void {
  guardarConDebounce();
  // TODO(render): renderizarSVG(estado) — src/render.ts, no existe todavía
  // TODO(rules): revisarCoherencia(estado) — src/rules.ts, no existe todavía
}

function renderBloque(bloque: BloqueDef, contenedor: HTMLElement): void {
  const seccion = document.createElement('fieldset');
  seccion.className = 'bloque';

  // legend/p con textContent, nunca innerHTML: bloque.titulo y .tooltip son
  // datos nuestros (data/canvas/*.json), no del usuario, pero es el hábito
  // que importa mantener siempre — más abajo, con el texto del usuario, es
  // donde innerHTML sería una vulnerabilidad XSS real.
  const titulo = document.createElement('legend');
  titulo.textContent = bloque.titulo;
  seccion.appendChild(titulo);

  const tooltip = document.createElement('p');
  tooltip.className = 'tooltip';
  tooltip.textContent = bloque.tooltip;
  seccion.appendChild(tooltip);

  // Tags: <select multiple> es el control nativo para "elegí varios de una
  // lista corta" (ADR-0005). Ladder rung 3 (feature nativa de la plataforma)
  // — no hace falta una librería de chips/multiselect para esto en v1.
  const select = document.createElement('select');
  select.multiple = true;
  select.size = Math.min(bloque.tags.length, 6); // hasta 6 tags visibles sin scroll

  const seleccionGuardada = estado[bloque.id]?.tagsSeleccionados ?? [];
  for (const tag of bloque.tags) {
    const opcion = document.createElement('option');
    opcion.value = tag.id;
    opcion.textContent = tag.label;
    opcion.selected = seleccionGuardada.includes(tag.id); // restaura selección al recargar
    select.appendChild(opcion);
  }
  select.addEventListener('change', () => {
    estado[bloque.id] ??= { tagsSeleccionados: [], texto: '' };
    estado[bloque.id].tagsSeleccionados = [...select.selectedOptions].map((o) => o.value);
    alCambiarAlgo();
  });
  seccion.appendChild(select);

  // Texto libre: lo que el motor de reglas NO evalúa (ADR-0005 — eso lo hacen
  // los tags de arriba) pero sí es lo que se termina dibujando en el SVG.
  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Detalle en tus palabras...';
  textarea.value = estado[bloque.id]?.texto ?? '';
  textarea.addEventListener('input', () => {
    estado[bloque.id] ??= { tagsSeleccionados: [], texto: '' };
    estado[bloque.id].texto = textarea.value;
    alCambiarAlgo();
  });
  seccion.appendChild(textarea);

  contenedor.appendChild(seccion);
}

function montarApp(): void {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) throw new Error('Falta <div id="app"> en index.html');

  // Única vez que tocamos innerHTML en todo el archivo, y con un string fijo
  // vacío (no con datos) — solo para limpiar el contenido default de Vite.
  app.innerHTML = '';

  const grilla = document.createElement('div');
  grilla.className = 'grilla-canvas';
  for (const bloque of bloques) {
    renderBloque(bloque, grilla);
  }
  app.appendChild(grilla);
}

montarApp();
