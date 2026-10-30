import { describe, expect, it } from 'vitest';
import { addTask, button, click, rows, start } from './helpers';

function setup() {
  const s = start();
  addTask(s.root, 'Open');
  addTask(s.root, 'Finished');
  rows(s.root)[1].click();
  click(s.root, 'Mark as done');
  click(s.root, 'Back');
  return s;
}

describe('US4 filter', () => {
  it('defaults to All with the option highlighted', () => {
    const { root } = setup();
    expect(button(root, 'All').getAttribute('aria-pressed')).toBe('true');
    expect(rows(root)).toHaveLength(2);
  });
  it('shows only pending tasks', () => {
    const { root } = setup();
    click(root, 'Pending');
    expect(rows(root).map((r) => r.textContent)).toEqual([expect.stringContaining('Open')]);
    expect(button(root, 'Pending').getAttribute('aria-pressed')).toBe('true');
  });
  it('shows only done tasks', () => {
    const { root } = setup();
    click(root, 'Done');
    expect(rows(root).map((r) => r.textContent)).toEqual([expect.stringContaining('Finished')]);
  });
  it('shows an empty state when nothing matches', () => {
    const { root } = start();
    addTask(root, 'Only pending');
    click(root, 'Done');
    expect(rows(root)).toHaveLength(0);
    expect(root.querySelector('.empty-state')).not.toBeNull();
  });
});
