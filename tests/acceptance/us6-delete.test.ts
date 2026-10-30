import { describe, expect, it } from 'vitest';
import { addTask, click, rows, start } from './helpers';

function openDetail() {
  const s = start();
  addTask(s.root, 'Doomed');
  rows(s.root)[0].click();
  return s.root;
}

describe('US6 delete', () => {
  it('asks for confirmation before deleting', () => {
    const root = openDetail();
    click(root, 'Delete');
    expect(root.querySelector('[role=dialog]')).not.toBeNull();
    expect(root.querySelector('h2')?.textContent).toBe('Doomed');
  });
  it('removes the task and shows the list when confirmed', () => {
    const root = openDetail();
    click(root, 'Delete');
    click(root, 'Yes, delete');
    expect(root.querySelector('h1')?.textContent).toBe('Curso-PSWE-07');
    expect(rows(root)).toHaveLength(0);
  });
  it('keeps the task when the confirmation is cancelled', () => {
    const root = openDetail();
    click(root, 'Delete');
    click(root, 'Keep task');
    expect(root.querySelector('[role=dialog]')).toBeNull();
    expect(root.querySelector('h2')?.textContent).toBe('Doomed');
  });
});
