import { MemoryStore } from '../../src/persistence/memory-store';
import { TaskService } from '../../src/logic/task-service';
import { createApp } from '../../src/ui/app';

export function start(store = new MemoryStore()) {
  let n = 0;
  const root = document.createElement('div');
  document.body.replaceChildren(root);
  const service = new TaskService(store, () => `id-${++n}-${Math.random()}`);
  createApp(root, service);
  return { root, store };
}

export function button(root: HTMLElement, text: string): HTMLButtonElement {
  const found = [...root.querySelectorAll('button')].find((b) => b.textContent?.trim() === text);
  if (!found) throw new Error(`No button "${text}" in: ${root.textContent}`);
  return found;
}

export function click(root: HTMLElement, text: string) {
  button(root, text).click();
}

export function addTask(root: HTMLElement, title: string, description = '') {
  click(root, 'Add task');
  (root.querySelector('input[name=title]') as HTMLInputElement).value = title;
  (root.querySelector('textarea[name=description]') as HTMLTextAreaElement).value = description;
  click(root, 'Save');
}

export function rows(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>('.task-row')];
}
