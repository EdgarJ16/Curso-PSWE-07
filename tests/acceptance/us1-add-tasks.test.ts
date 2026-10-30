import { describe, expect, it } from 'vitest';
import { addTask, click, rows, start } from './helpers';

describe('US1 view and add tasks', () => {
  it('shows the app name and an empty state when there are no tasks', () => {
    const { root } = start();
    expect(root.querySelector('h1')?.textContent).toBe('Curso-PSWE-07');
    expect(root.querySelector('.empty-state')).not.toBeNull();
  });
  it('opens a form with title and description fields', () => {
    const { root } = start();
    click(root, 'Add task');
    expect(root.querySelector('input[name=title]')).not.toBeNull();
    expect(root.querySelector('textarea[name=description]')).not.toBeNull();
  });
  it('adds a task that shows as not done', () => {
    const { root } = start();
    addTask(root, 'Buy milk');
    expect(rows(root)).toHaveLength(1);
    expect(rows(root)[0].textContent).toContain('Buy milk');
    expect(rows(root)[0].classList.contains('done')).toBe(false);
  });
  it('rejects an empty title with a validation message', () => {
    const { root } = start();
    addTask(root, '   ');
    expect(root.querySelector('[role=alert]')?.textContent).toBeTruthy();
    click(root, 'Cancel');
    expect(rows(root)).toHaveLength(0);
  });
  it('creates nothing when the form is cancelled', () => {
    const { root } = start();
    click(root, 'Add task');
    click(root, 'Cancel');
    expect(rows(root)).toHaveLength(0);
  });
});
