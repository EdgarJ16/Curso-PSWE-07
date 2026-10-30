import type { Task } from '../logic/task';

export interface TaskStore {
  load(): Task[];
  save(tasks: Task[]): void;
}
