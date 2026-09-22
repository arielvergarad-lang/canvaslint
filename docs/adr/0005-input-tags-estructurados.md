# ADR-0005: Input de cada bloque — tags estructurados + texto libre

**Fecha:** 2026-09-22
**Estado:** Aceptada
**Decisores:** Ariel

## Contexto

El motor de reglas de coherencia necesita matchear contra lo que el usuario escribió. Con texto 100% libre, el matching por keywords es frágil: "vendo puerta a puerta" no dispara una regla que busca "venta directa" — las reglas fallan en silencio.

## Opciones consideradas

### Opción A: Solo texto libre + keyword-matching best-effort
- ❌ Reglas fallan en silencio por sinónimos/fraseo

### Opción B: Tags estructurados (select corto por bloque) + texto libre para detalle
- ✅ Reglas matchean contra tags — 100% confiable
- ✅ Texto libre queda para el detalle humano-legible (lo que se dibuja en el diagrama)
- ❌ Más trabajo de diseño (taxonomía por bloque) y más UI (multi-select + textarea)

### Opción C: NLP/embeddings semántico sobre texto libre
- ❌ Necesita modelo (rompe el "sin IA", que es el diferenciador frente a herramientas con IA)
- Descartada

## Decisión

**Elegimos:** Opción B — tags estructurados + texto libre.

**Razón principal:** sin esto, el motor de reglas no funciona de forma confiable.

## Consecuencias

**Positivas:** reglas confiables, coherentes con "sin IA".

**Negativas:** hay que diseñar la taxonomía de tags por bloque antes de escribir reglas.

**Riesgos:** taxonomía corta/genérica al principio → mitigación: siempre permitir "otro" + texto libre; iterar taxonomía con uso real (son datos, no código).

## Revisión

Revisar si: la taxonomía no alcanza para expresar casos reales — replantear reglas más flexibles (regex sobre texto libre como fallback, no reemplazo).
