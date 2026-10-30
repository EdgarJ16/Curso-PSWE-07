import { describe, expect, it } from 'vitest';
import { MemoryStore } from '../../src/persistence/memory-store';
import { addTask, click, rows, start } from './helpers';

describe('US2 persistence', () => {
  it('shows the same tasks and status after a restart', () => {
    const store = new MemoryStore();
    const first = start(store);
    addTask(first.root, 'Keep me');
    rows(first.root)[0].click();
    click(first.root, 'Mark as done');
    const second = start(store);
    expect(rows(second.root)).toHaveLength(1);
    expect(rows(second.root)[0].textContent).toContain('Keep me');
    expect(rows(second.root)[0].classList.contains('done')).toBe(true);
  });
  it('remembers a deletion after a restart', () => {
    const store = new MemoryStore();
    const first = start(store);
    addTask(first.root, 'Temp');
    rows(first.root)[0].click();
    click(first.root, 'Delete');
    click(first.root, 'Yes, delete');
    expect(rows(start(store).root)).toHaveLength(0);
  });
});
