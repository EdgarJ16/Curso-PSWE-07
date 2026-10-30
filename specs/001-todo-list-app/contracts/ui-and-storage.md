# Contracts: To-Do List App

The app has no network API. Its contracts are the storage interface (the layer boundary) and the task operations the UI relies on.

## TaskStore (persistence interface)

```ts
interface TaskStore {
  load(): Task[];          // returns [] if nothing stored or data is unreadable
  save(tasks: Task[]): void;
}
```

Implementations: `LocalStorageStore` (production), `MemoryStore` (tests).

## TaskService (logic API used by the UI)

```ts
type Filter = 'all' | 'pending' | 'done';

list(filter: Filter): Task[]
get(id: string): Task | undefined
add(title: string, description?: string): Task     // throws ValidationError on empty title
update(id: string, title: string, description?: string): Task  // throws ValidationError on empty title
toggle(id: string): Task
remove(id: string): void
```

## UI screens (behavioral contract)

| Screen | Must show | Actions |
|--------|-----------|---------|
| List | App name header, All/Pending/Done filter (active highlighted), rows with status indicator and title, empty state, "Add task" | Select filter, open row, add task |
| Detail | Back control, title, description or muted "No description", status label | Edit, Mark as done / Mark as not done, Delete (with confirmation) |
| Form (add/edit) | Title and description fields, validation message on empty title | Save, Cancel |
