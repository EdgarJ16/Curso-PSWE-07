---
name: auditar-spec
description: Auditoría crítica de la especificación del taller SDD
---

Lee `requirements/spec-inicial.md` y `activities/guia-de-revision.md`.

Realiza una auditoría crítica de la especificación:

1. Identifica al menos TRES hallazgos (ambigüedad, supuesto no confirmado,
   criterio de aceptación no verificable o comportamiento no definido). Para cada
   uno documenta: fragmento citado, problema, posible consecuencia, propuesta de
   mejora y justificación.

2. Analiza explícitamente los cuatro casos de la guía:
   - Caso A: guardado de tareas (¿cuándo se considera "guardada"?)
   - Caso B: eliminación (¿qué pasa antes y después? ¿alternativas?)
   - Caso C: filtros (al marcar completada, ¿desaparece de inmediato?)
   - Caso D: medición del éxito (el 90% — ¿qué datos faltan para verificarlo?)

3. Para UNO de tus hallazgos, propón una mejora concreta y luego auto-evalúala:
   ¿resuelve el problema?, ¿introduce decisiones no solicitadas?, ¿es verificable?,
   ¿qué información adicional necesitarías del usuario?

Responde en español. Separa claramente lo que dice la especificación de lo que
asumes. Si algo requiere confirmación del usuario real, indícalo; no lo inventes.
