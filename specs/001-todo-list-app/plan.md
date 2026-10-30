# Implementation Plan: Curso-PSWE-07 To-Do List App

**Branch**: `001-todo-list-app` | **Date**: 2026-10-29 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-todo-list-app/spec.md`

## Summary

A small web app with two screens (list, detail) plus a shared add/edit form view. Tasks live in browser local storage. The code is split into three layers per the constitution: UI (DOM views), logic (task operations), persistence (a small storage interface with a local-storage implementation and an in-memory fake for tests). No framework: plain TypeScript with Vite and Vitest.

## Technical Context

**Language/Version**: TypeScript 5.x on Node 22+ (dev), ES2022 in the browser

**Primary Dependencies**: Vite (dev server/build) only; no UI framework

**Storage**: Browser `localStorage`, behind a `TaskStore` interface

**Testing**: Vitest with jsdom (unit tests for logic, acceptance tests per user story driving the UI)

**Target Platform**: Modern evergreen browsers, mobile and desktop

**Project Type**: web-app (single project, no backend)

**Performance Goals**: Filter change and list render under 1 s (SC-006); trivially met at this scale

**Constraints**: Offline-capable (no network calls); 44x44 px targets; 4.5:1 contrast

**Scale/Scope**: One user, up to a few hundred tasks, 2 screens plus one form

## Constitution Check

*GATE: passed before Phase 0 and re-checked after Phase 1.*

| Principle | Status | How the plan complies |
|-----------|--------|-----------------------|
| I. Simplicity First | PASS | No framework, router, state library, or backend; only Vite and Vitest as dev tools. |
| II. Simple, Clear Design | PASS | Small single-purpose modules; no abstraction beyond the `TaskStore` interface. |
| III. Structured Architecture | PASS | `ui/` -> `logic/` -> `persistence/`; UI never touches storage; storage behind `TaskStore`. |
| IV. TDD | PASS | Tests are written first per task; logic unit tests plus one acceptance test per user story. |
| V. Spec Is Source of Truth | PASS | Every artifact traces to FR-001..FR-017; nothing outside the spec is planned. |

## Project Structure

### Documentation (this feature)

```text
specs/001-todo-list-app/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-and-storage.md
└── tasks.md             # created later by /speckit-tasks
```

### Source Code (repository root)

```text
index.html
src/
├── main.ts                 # wires store -> logic -> UI, starts the app
├── persistence/
│   ├── task-store.ts       # TaskStore interface
│   ├── local-storage-store.ts
│   └── memory-store.ts     # fake used by tests
├── logic/
│   ├── task.ts             # Task type, title validation
│   └── task-service.ts     # add, update, toggle, delete, list(filter)
└── ui/
    ├── app.ts              # screen switching (list, detail, form)
    ├── list-view.ts
    ├── detail-view.ts
    ├── task-form.ts
    └── styles.css
tests/
├── unit/                   # task, task-service, local-storage-store
└── acceptance/             # one file per user story
```

**Structure Decision**: Single web project. Screen switching is done by `app.ts` holding the current view in memory; no URL router, since the spec does not require deep links.

## Complexity Tracking

No constitution violations; nothing to justify.
