# Data Model: To-Do List App

## Task

| Field | Type | Rules |
|-------|------|-------|
| id | string | Unique, generated on creation, immutable |
| title | string | Required; trimmed; must be non-empty after trimming (FR-004) |
| description | string | Optional; defaults to empty string; trimmed |
| done | boolean | Defaults to `false` on creation (FR-003) |

## Collection

An ordered array of `Task`, in creation order. The whole array is stored as one JSON value under one local-storage key.

## State transitions

- **Create**: valid title -> new task appended with `done = false`.
- **Update**: valid title -> title and description replaced; `id` and `done` unchanged.
- **Toggle**: `done` flips between `false` and `true`.
- **Delete**: task removed from the array (after UI confirmation).

## Filter (view state, not stored)

`all` | `pending` | `done`; default `all`. `pending` shows `done === false`; `done` shows `done === true`.
