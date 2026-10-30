# Research: To-Do List App

No `NEEDS CLARIFICATION` items remain in the Technical Context. Decisions made:

## Platform and framework
- **Decision**: Web app in plain TypeScript, no UI framework.
- **Rationale**: Two screens and one form do not justify a framework (Constitution I). The DOM API is enough.
- **Alternatives**: React/Vue (extra dependency and build complexity); desktop or mobile native (clarified out: web chosen).

## Build and test tooling
- **Decision**: Vite for dev/build; Vitest with jsdom for all tests.
- **Rationale**: Vitest runs TypeScript with no extra config and is fast (Constitution IV). jsdom is enough for UI acceptance tests of this size.
- **Alternatives**: Playwright end-to-end (heavier, slower; not required by the spec).

## Persistence
- **Decision**: `localStorage` under a single key holding a JSON array of tasks, behind a `TaskStore` interface with `load()` and `save(tasks)`.
- **Rationale**: Meets FR-014 with no dependency; the interface lets tests use an in-memory fake (Constitution III).
- **Alternatives**: IndexedDB (more code, no benefit at this scale).
- **Failure handling**: Invalid or missing JSON loads as an empty list (spec edge case).

## Navigation
- **Decision**: In-memory view switching, no router.
- **Rationale**: The spec asks for no deep links. Back control and form flows follow the clarified navigation.

## IDs and ordering
- **Decision**: Tasks get an id from `crypto.randomUUID()`; list order is array order (creation order, oldest first).
- **Rationale**: Matches the clarification; no sorting code needed.

## Accessibility and design
- **Decision**: One CSS file with variables for the single accent color; buttons `min-height/width: 44px`; text colors chosen for at least 4.5:1 on a light background.
- **Rationale**: Directly satisfies FR-015..FR-017 and SC-004/005.
