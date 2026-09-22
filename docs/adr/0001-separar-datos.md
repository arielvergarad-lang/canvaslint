# ADR-0001: Separar `data/` del código

**Fecha:** 2026-09-21
**Estado:** Aceptada
**Decisores:** Ariel

## Contexto

canvaslint necesita contenido versionable (bloques del canvas, reglas de coherencia) separado de la lógica de la aplicación, para que se pueda auditar, extender y contribuir sin tocar código.

## Decisión

Separar todo el contenido en `data/` (`data/canvas/*.json`, `data/rules/*.json`), fuera de `src/`.

**Evidencia:** `github/choosealicense.com`, `mitre-attack/attack-navigator`, `OWASP/CheatSheetSeries` — los tres separan contenido de aplicación de la misma forma.

## Consecuencias

**Positivas:** contribuciones de contenido (nuevas reglas, nuevos tags) no requieren tocar `src/`; los datos son auditables y versionables independientes del código.

**Negativas:** una capa más de indirección (cargar JSON en runtime) en vez de constantes hardcodeadas.
