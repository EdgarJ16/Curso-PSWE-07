import { describe, expect, it } from 'vitest';
import { addTask, click, rows, start } from './helpers';

function openEdit() {
  const s = start();
  addTask(s.root, 'Old', 'Desc');
  rows(s.root)[0].click();
  click(s.root, 'Edit');
  return s.root;
}

describe('US5 edit', () => {
  it('opens the form prefilled', () => {
    const root = openEdit();
    expect((root.querySelector('input[name=title]') as HTMLInputElement).value).toBe('Old');
    expect((root.querySelector('textarea[name=description]') as HTMLTextAreaElement).value).toBe('Desc');
  });
  it('saves changes and returns to the detail', () => {
    const root = openEdit();
    (root.querySelector('input[name=title]') as HTMLInputElement).value = 'New';
    click(root, 'Save');
    expect(root.querySelector('h2')?.textContent).toBe('New');
  });
  it('rejects an empty title', () => {
    const root = openEdit();
    (root.querySelector('input[name=title]') as HTMLInputElement).value = '';
    click(root, 'Save');
    expect(root.querySelector('[role=alert]')?.textContent).toBeTruthy();
    click(root, 'Cancel');
    expect(root.querySelector('h2')?.textContent).toBe('Old');
  });
});
