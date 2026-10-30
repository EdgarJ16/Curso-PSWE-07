import type { Task } from '../logic/task';
import { button, el } from './dom';

export interface DetailViewProps {
  task: Task;
  confirmingDelete: boolean;
  onBack: () => void;
  onEdit: () => void;
  onToggle: () => void;
  onAskDelete: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}

export function detailView(p: DetailViewProps): HTMLElement {
  const screen = el('section', 'screen');
  screen.append(button('Back', 'back', p.onBack));
  screen.append(el('h2', 'task-title', p.task.title));

  const description = p.task.description
    ? el('p', 'description', p.task.description)
    : el('p', 'description muted', 'No description');
  screen.append(description);

  screen.append(el('span', `status-label${p.task.done ? ' done' : ''}`, p.task.done ? 'Done' : 'Pending'));

  const actions = el('div', 'actions');
  actions.append(
    button('Edit', 'secondary', p.onEdit),
    button(p.task.done ? 'Mark as not done' : 'Mark as done', 'primary', p.onToggle),
    button('Delete', 'danger', p.onAskDelete),
  );
  screen.append(actions);

  if (p.confirmingDelete) screen.append(confirmDialog(p));
  return screen;
}

function confirmDialog(p: DetailViewProps): HTMLElement {
  const dialog = el('div', 'dialog');
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-label', 'Confirm delete');
  const actions = el('div', 'actions');
  actions.append(
    button('Yes, delete', 'danger', p.onConfirmDelete),
    button('Keep task', 'secondary', p.onCancelDelete),
  );
  dialog.append(el('p', '', 'Delete this task? This cannot be undone.'), actions);
  return dialog;
}
