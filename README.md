# canvaslint

Herramienta web estática y open source que valida la **coherencia** entre los 9 bloques de tu Business Model Canvas — sin IA, sin backend, sin cuentas.

El canvas en sí es un commodity (Canvanizer, Visual Paradigm y otros ya lo resuelven gratis). Lo que no existe es un motor de reglas **determinístico, gratis y abierto** que te avise cuando dos bloques se contradicen (ej. un canal de venta caro sobre un segmento sensible al precio). Eso es lo que hace canvaslint — el diagrama es el vehículo, el motor de reglas es el producto.

## Cómo funciona

1. Llenás los 9 bloques: elegís tags estructurados (para que las reglas puedan evaluarlos de forma confiable) + un texto libre de detalle (lo que se dibuja en el diagrama).
2. El diagrama SVG se renderiza en vivo.
3. Botón **"Revisar coherencia"** corre las reglas de `data/rules/` contra tus tags y te muestra advertencias — no bloquea nada, son sugerencias.
4. Autosave en `localStorage`. Botón **"Compartir"** genera una URL con tu canvas comprimido, sin backend.
5. Export a SVG/PNG.

Todo corre en tu navegador. Deploy en GitHub Pages, build con GitHub Actions.

## Stack

Vite + TypeScript. Ver decisiones de arquitectura en [`docs/adr/`](docs/adr/).

## Desarrollo

```bash
npm install
npm run dev
npm run build
```

## Estructura

```
data/canvas/   # los 9 bloques del BMC: tags seleccionables + tooltip
data/rules/    # reglas de coherencia entre bloques
docs/adr/      # Architecture Decision Records
src/           # aplicación
```

## Licencia

- **Código** (`src/`, `.github/`, configuración): [MIT](LICENSE).
- **Diseño de los 9 bloques del BMC**: Creative Commons Attribution-Share Alike 3.0 Unported, © Strategyzer AG — [strategyzer.com/library/the-business-model-canvas](https://www.strategyzer.com/library/the-business-model-canvas), [licencia](https://creativecommons.org/licenses/by-sa/3.0/).
- Las reglas de coherencia y tooltips en `data/` son contenido original de este proyecto, bajo MIT.
