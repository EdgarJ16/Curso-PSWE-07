import type { TaskStore } from '../persistence/task-store';
import { validateTitle, type Task } from './task';

export type Filter = 'all' | 'pending' | 'done';

export class TaskService {
  private tasks: Task[];

  constructor(
    private store: TaskStore,
    private newId: () => string = () => crypto.randomUUID(),
  ) {
    this.tasks = store.load();
  }

  list(filter: Filter): Task[] {
    return this.tasks.filter(
      (t) => filter === 'all' || (filter === 'done') === t.done,
    );
  }

  get(id: string): Task | undefined {
    return this.tasks.find((t) => t.id === id);
  }

  add(title: string, description = ''): Task {
    const task: Task = {
      id: this.newId(),
      title: validateTitle(title),
      description: description.trim(),
      done: false,
    };
    this.tasks.push(task);
    this.persist();
    return task;
  }

  update(id: string, title: string, description = ''): Task {
    const task = this.require(id);
    task.title = validateTitle(title);
    task.description = description.trim();
    this.persist();
    return task;
  }

  toggle(id: string): Task {
    const task = this.require(id);
    task.done = !task.done;
    this.persist();
    return task;
  }

  remove(id: string): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.persist();
  }

  private require(id: string): Task {
    const task = this.get(id);
    if (!task) throw new Error(`Task not found: ${id}`);
    return task;
  }

  private persist(): void {
    this.store.save(this.tasks);
  }
}
