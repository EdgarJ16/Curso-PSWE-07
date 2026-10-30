import type { Task } from '../logic/task';
import type { TaskStore } from './task-store';

const KEY = 'curso-pswe-07.tasks';

function isTask(value: unknown): value is Task {
  const t = value as Task;
  return (
    typeof t === 'object' &&
    t !== null &&
    typeof t.id === 'string' &&
    typeof t.title === 'string' &&
    typeof t.description === 'string' &&
    typeof t.done === 'boolean'
  );
}

export class LocalStorageStore implements TaskStore {
  load(): Task[] {
    try {
      const data: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
      return Array.isArray(data) ? data.filter(isTask) : [];
    } catch {
      return [];
    }
  }

  save(tasks: Task[]): void {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  }
}
