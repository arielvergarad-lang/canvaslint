# ADR-0003: Persistencia de estado del usuario — localStorage (autosave) + URL (compartir)

**Fecha:** 2026-09-22
**Estado:** Aceptada
**Decisores:** Ariel

## Contexto

Sin backend ni cuentas. El usuario llena 9 bloques del canvas. La herramienta tiene que ser útil y amigable: no puede perder el trabajo del usuario ni obligarlo a exportar constantemente.

## Opciones consideradas

### Opción A: localStorage
- ✅ Autosave transparente
- ❌ Solo en ese navegador/dispositivo, no compartible

### Opción B: Solo exportar (sin persistencia)
- ❌ Se pierde todo al recargar — mala UX, descartada

### Opción C: Estado en la URL
- ✅ Shareable, sin storage
- ❌ Si no se guarda el link, igual se pierde el trabajo; URLs largas (mitigable con compresión)

## Decisión

**Elegimos:** combinar A + C — localStorage como autosave por defecto, URL como export/compartir bajo demanda (botón "Compartir" con estado comprimido).

**Razón principal:** localStorage resuelve "no perder el trabajo" sin acción del usuario; la URL resuelve "compartir" sin backend. Ninguna opción sola cubre ambos casos de uso.

## Consecuencias

**Positivas:** cero fricción para probar la herramienta; caso de compartir cubierto sin infraestructura.

**Negativas:** dos mecanismos en vez de uno (serializar/deserializar estado a query string).

**Riesgos:** URL demasiado larga → mitigación: comprimir (LZ-string) antes de codificar; fallback a "descargar JSON" si aun así es muy larga.

## Revisión

Revisar si: se decide agregar cuentas/backend (fuera del alcance actual).
