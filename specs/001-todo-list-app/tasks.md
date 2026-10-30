# Tasks: Curso-PSWE-07 To-Do List App

Each implementation task is preceded by its failing test (Red-Green-Refactor). `[US#]` = user story, `FR` = spec requirement.

## Phase 1: Setup
- [x] T001 Project setup: package.json, tsconfig.json, vite.config.ts (Vitest + jsdom), index.html with title "Curso-PSWE-07" (FR-001, FR-002)

## Phase 2: Foundation (persistence + logic)
- [x] T002 Test then implement `Task` type and title validation in src/logic/task.ts (FR-004)
- [x] T003 Test then implement `TaskStore` interface and MemoryStore (src/persistence/) (Constitution III)
- [x] T004 Test then implement LocalStorageStore incl. unreadable-data fallback (FR-014, edge case)
- [x] T005 Test then implement TaskService: add, update, toggle, remove, get, list(filter) (FR-003, FR-007, FR-011)

## Phase 3: User stories (UI)
- [x] T006 [US1] Acceptance test then list view, empty state, add form (FR-005, FR-008, FR-009, FR-004)
- [x] T007 [US2] Acceptance test: tasks survive an app restart (FR-014)
- [x] T008 [US3] Acceptance test then detail view and mark done / not done (FR-006, FR-010, FR-011)
- [x] T009 [US4] Acceptance test then filter control (FR-007, FR-008)
- [x] T010 [US5] Acceptance test then edit using the shared form (FR-012)
- [x] T011 [US6] Acceptance test then delete with in-page confirmation dialog (FR-013)

## Phase 4: Polish
- [x] T012 Styles: light theme, single accent, 44 px targets, contrast, responsive (FR-015, FR-016, FR-017)
- [x] T013 Run the full suite and the quickstart manual checks
