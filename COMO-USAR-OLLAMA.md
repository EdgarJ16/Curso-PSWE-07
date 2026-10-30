# Cómo trabajar este taller con un modelo local (Ollama)

Este repositorio viene configurado para GitHub Copilot, pero puedes hacer todo el
taller con tu **modelo local de Ollama** usando la extensión **Continue** en VS Code.
Todo corre en tu GPU (RTX 4060); no se envía nada a la nube.

## Requisitos (ya instalados en esta máquina)
- Ollama corriendo en `http://localhost:11434`
- Modelos: `qwen3:8b` y `deepseek-coder:6.7b`
- VS Code + extensión **Continue**

## Pasos

1. Abre esta carpeta en VS Code:
   - `File > Open Folder...` y selecciona `SDD Ejemplo`.
2. Abre el panel de **Continue** (ícono en la barra lateral) y, en el selector de
   modelo, elige **Qwen3 8B** (razonamiento) o **DeepSeek Coder 6.7B** (más rápido).
3. Ejecuta la auditoría con el comando configurado para este taller: en el chat de
   Continue escribe:

   ```
   /auditar-spec
   ```

   Esto lee `requirements/spec-inicial.md` y la guía, y produce una auditoría
   crítica en español. (Si el comando no aparece, recarga VS Code.)

4. Revisa **críticamente** la salida del modelo —ese es el objetivo del taller— y
   escribe tus conclusiones en `deliverables/revision-spec.md`.

## Si prefieres no usar el comando

Abre un chat de Continue, adjunta el archivo con `@` (por ejemplo
`@requirements/spec-inicial.md`) y pega este prompt:

> Audita críticamente esta especificación de requisitos de una app de tareas.
> Identifica al menos 3 hallazgos (ambigüedad / supuesto no confirmado / criterio
> no verificable / comportamiento no definido). Para cada uno da: fragmento,
> problema, consecuencia, propuesta y justificación. Analiza también: cuándo se
> considera "guardada" una tarea, qué pasa al eliminar, si una tarea completada
> debe desaparecer del filtro de inmediato, y qué datos faltan para verificar el
> "90% de usuarios". Separa lo que dice la spec de lo que asumes y marca lo que
> requiere confirmar con el usuario. Responde en español.

## Entregables (van en `deliverables/`)
- Especificación revisada
- Al menos 3 decisiones de mejora justificadas
- Reflexión breve sobre los límites de usar IA para definir requisitos

Usa `deliverables/revision-spec.md` como plantilla.
