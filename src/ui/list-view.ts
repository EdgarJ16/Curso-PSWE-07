import type { Filter } from '../logic/task-service';
import type { Task } from '../logic/task';
import { button, el } from './dom';

export const APP_NAME = 'Curso-PSWE-07';

const FILTERS: { filter: Filter; label: string }[] = [
  { filter: 'all', label: 'All' },
  { filter: 'pending', label: 'Pending' },
  { filter: 'done', label: 'Done' },
];

export interface ListViewProps {
  tasks: Task[];
  filter: Filter;
  onFilter: (filter: Filter) => void;
  onOpen: (id: string) => void;
  onAdd: () => void;
}

export function listView(p: ListViewProps): HTMLElement {
  const screen = el('section', 'screen');
  screen.append(el('h1', 'app-name', APP_NAME));

  const filters = el('div', 'filters');
  for (const { filter, label } of FILTERS) {
    const b = button(label, 'filter', () => p.onFilter(filter));
    b.setAttribute('aria-pressed', String(filter === p.filter));
    filters.append(b);
  }
  screen.append(filters);

  if (p.tasks.length === 0) {
    const message =
      p.filter === 'all'
        ? 'No tasks yet. Add your first one!'
        : 'No tasks match this filter.';
    screen.append(el('p', 'empty-state', message));
  } else {
    const list = el('ul', 'task-list');
    for (const task of p.tasks) {
      const row = button('', `task-row${task.done ? ' done' : ''}`, () => p.onOpen(task.id));
      row.append(el('span', 'status-indicator', task.done ? '✓' : '○'), el('span', 'title', task.title));
      const item = el('li');
      item.append(row);
      list.append(item);
    }
    screen.append(list);
  }

  screen.append(button('Add task', 'primary add-task', p.onAdd));
  return screen;
}
