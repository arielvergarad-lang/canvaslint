# ADR-0004: Dibujo del diagrama — SVG generado a mano (sin librería)

**Fecha:** 2026-09-22
**Estado:** Aceptada
**Decisores:** Ariel

## Contexto

El diagrama es el vehículo del producto, no el producto — el diferenciador real es el motor de reglas de coherencia. No amerita invertir tiempo en pulir el render. Se necesita exportar el resultado como imagen.

## Opciones consideradas

### Opción A: HTML + CSS Grid
- ❌ Exportar a imagen requiere librería adicional (`html-to-image`/`dom-to-image`)
- ❌ No exportable como SVG nativo (vectorial)

### Opción B: SVG generado con JS (manual, sin librería)
- ✅ Export nativo: el propio DOM ya es SVG, se serializa directo
- ✅ Vectorial, escala sin pérdida
- ❌ Hay que manejar manualmente el wrap de texto largo dentro de cada bloque

### Opción C: Librería de diagramas (mermaid, d3, excalidraw-lib)
- ❌ Overkill para un layout fijo de 9 rectángulos
- Descartada

## Decisión

**Elegimos:** Opción B — SVG a mano con JS, sin librería.

**Razón principal:** el diagrama es secundario al motor de reglas; SVG nativo da export gratis y sin dependencias.

## Consecuencias

**Positivas:** cero dependencias nuevas, export SVG/PNG simple.

**Negativas:** hay que escribir a mano el wrap de texto largo (`ponytail: wrap por líneas fijas según ancho de bloque, mejorar si el texto real lo requiere`).

**Riesgos:** texto muy largo desborda el bloque → mitigación: truncar con "…" + tooltip con texto completo, o reducir font-size dinámicamente.

## Revisión

Revisar si: se necesita edición interactiva del layout (mover/redimensionar bloques).
