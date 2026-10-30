import type { Task } from '../logic/task';
import type { TaskStore } from './task-store';

export class MemoryStore implements TaskStore {
  private tasks: Task[] = [];

  load(): Task[] {
    return this.tasks.map((t) => ({ ...t }));
  }

  save(tasks: Task[]): void {
    this.tasks = tasks.map((t) => ({ ...t }));
  }
}
