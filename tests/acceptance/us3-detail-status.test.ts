import { describe, expect, it } from 'vitest';
import { addTask, click, rows, start } from './helpers';

describe('US3 detail and status', () => {
  it('opens the detail with title, description and status', () => {
    const { root } = start();
    addTask(root, 'Task', 'Details');
    rows(root)[0].click();
    expect(root.querySelector('h2')?.textContent).toBe('Task');
    expect(root.querySelector('.description')?.textContent).toBe('Details');
    expect(root.querySelector('.status-label')?.textContent).toBe('Pending');
  });
  it('shows a muted "No description" when empty', () => {
    const { root } = start();
    addTask(root, 'Task');
    rows(root)[0].click();
    const d = root.querySelector('.description')!;
    expect(d.textContent).toBe('No description');
    expect(d.classList.contains('muted')).toBe(true);
  });
  it('toggles status and the action label', () => {
    const { root } = start();
    addTask(root, 'Task');
    rows(root)[0].click();
    click(root, 'Mark as done');
    expect(root.querySelector('.status-label')?.textContent).toBe('Done');
    click(root, 'Mark as not done');
    expect(root.querySelector('.status-label')?.textContent).toBe('Pending');
  });
  it('goes back to the list, where done tasks look done', () => {
    const { root } = start();
    addTask(root, 'Task');
    rows(root)[0].click();
    click(root, 'Mark as done');
    click(root, 'Back');
    expect(root.querySelector('h1')?.textContent).toBe('Curso-PSWE-07');
    expect(rows(root)[0].classList.contains('done')).toBe(true);
  });
});
