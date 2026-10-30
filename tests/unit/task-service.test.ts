import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryStore } from '../../src/persistence/memory-store';
import { TaskService } from '../../src/logic/task-service';
import { ValidationError } from '../../src/logic/task';

let n = 0;
let service: TaskService;
beforeEach(() => {
  n = 0;
  service = new TaskService(new MemoryStore(), () => `id-${++n}`);
});

describe('TaskService', () => {
  it('adds a task as not done with a trimmed title', () => {
    const t = service.add(' A ', ' desc ');
    expect(t).toEqual({ id: 'id-1', title: 'A', description: 'desc', done: false });
  });
  it('rejects an empty title on add and update', () => {
    expect(() => service.add('  ')).toThrow(ValidationError);
    const t = service.add('A');
    expect(() => service.update(t.id, '')).toThrow(ValidationError);
    expect(service.get(t.id)?.title).toBe('A');
  });
  it('updates title and description but keeps done', () => {
    const t = service.add('A');
    service.toggle(t.id);
    service.update(t.id, 'B', 'x');
    expect(service.get(t.id)).toMatchObject({ title: 'B', description: 'x', done: true });
  });
  it('toggles done back and forth', () => {
    const t = service.add('A');
    expect(service.toggle(t.id).done).toBe(true);
    expect(service.toggle(t.id).done).toBe(false);
  });
  it('removes a task', () => {
    const t = service.add('A');
    service.remove(t.id);
    expect(service.get(t.id)).toBeUndefined();
  });
  it('lists in creation order and filters by status', () => {
    const a = service.add('A');
    service.add('B');
    service.toggle(a.id);
    expect(service.list('all').map((t) => t.title)).toEqual(['A', 'B']);
    expect(service.list('pending').map((t) => t.title)).toEqual(['B']);
    expect(service.list('done').map((t) => t.title)).toEqual(['A']);
  });
  it('persists through the store', () => {
    const store = new MemoryStore();
    new TaskService(store, () => 'x').add('A');
    expect(new TaskService(store).list('all')).toHaveLength(1);
  });
});
