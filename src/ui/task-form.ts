import { ValidationError } from '../logic/task';
import { button, el } from './dom';

export interface TaskFormProps {
  title?: string;
  description?: string;
  onSave: (title: string, description: string) => void;
  onCancel: () => void;
}

export function taskForm(p: TaskFormProps): HTMLElement {
  const screen = el('section', 'screen');
  screen.append(el('h2', '', p.title === undefined ? 'Add task' : 'Edit task'));

  const titleLabel = el('label', 'field', 'Title');
  const title = el('input');
  title.name = 'title';
  title.value = p.title ?? '';
  titleLabel.append(title);

  const descLabel = el('label', 'field', 'Description');
  const description = el('textarea');
  description.name = 'description';
  description.value = p.description ?? '';
  descLabel.append(description);

  const error = el('p', 'error');
  error.setAttribute('role', 'alert');

  const save = () => {
    try {
      p.onSave(title.value, description.value);
    } catch (e) {
      if (!(e instanceof ValidationError)) throw e;
      error.textContent = 'Please enter a title.';
    }
  };

  const actions = el('div', 'actions');
  actions.append(button('Save', 'primary', save), button('Cancel', 'secondary', p.onCancel));
  screen.append(titleLabel, descLabel, error, actions);
  return screen;
}
