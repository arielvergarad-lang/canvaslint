# ADR-0002: Stack — Vite + TypeScript

**Fecha:** 2026-09-22
**Estado:** Aceptada
**Decisores:** Ariel

## Contexto

Sitio 100% estático (sin backend, sin auth) que genera un diagrama SVG del Business Model Canvas y una guía de estrategia a partir de input del usuario. Deploy en GitHub Pages vía GitHub Actions, costo $0. Se quiere un pipeline de Actions real, no solo copiar archivos.

## Opciones consideradas

### Opción A: Vanilla JS/TS sin bundler
- ✅ Cero dependencias, cero config de build
- ❌ Sin dev server con HMR
- ❌ TypeScript requiere `tsc --watch` manual
- ❌ Pipeline de Actions se reduce a "copiar archivos"

### Opción B: Vite + TypeScript
- ✅ Dev server con HMR real
- ✅ TS integrado sin configuración adicional
- ✅ `npm run build` da un pipeline de Actions con sentido (test → build → deploy)
- ❌ Una dependencia de build más y su config

### Opción C: Generador de sitio estático (Astro/11ty)
- ❌ El proyecto es una herramienta interactiva, no un sitio de contenido — no encaja
- Descartada sin más análisis

## Decisión

**Elegimos:** Opción B — Vite + TypeScript.

**Razón principal:** da un pipeline de Actions real (test → build → deploy) con costo de configuración bajo.

## Consecuencias

**Positivas:** pipeline de CI con pasos reales; TS atrapa errores de tipos en la lógica de render del SVG y el motor de reglas.

**Negativas:** una dependencia y config de build más que en vanilla.

## Revisión

Revisar si: el proyecto crece a necesitar routing multi-página complejo o SSR.
