import type { Filter, TaskService } from '../logic/task-service';
import { detailView } from './detail-view';
import { listView } from './list-view';
import { taskForm } from './task-form';

type View =
  | { name: 'list' }
  | { name: 'detail'; id: string; confirmingDelete: boolean }
  | { name: 'form'; editingId?: string };

export function createApp(root: HTMLElement, service: TaskService): void {
  let view: View = { name: 'list' };
  let filter: Filter = 'all';

  const show = (next: View) => {
    view = next;
    render();
  };
  const showList = () => show({ name: 'list' });
  const showDetail = (id: string) => show({ name: 'detail', id, confirmingDelete: false });

  function render() {
    root.replaceChildren(currentScreen());
  }

  function currentScreen(): HTMLElement {
    if (view.name === 'form') return formScreen(view.editingId);
    if (view.name === 'detail') {
      const task = service.get(view.id);
      if (task) return detailScreen(view.id, view.confirmingDelete);
    }
    return listScreen();
  }

  function listScreen() {
    return listView({
      tasks: service.list(filter),
      filter,
      onFilter: (f) => {
        filter = f;
        render();
      },
      onOpen: showDetail,
      onAdd: () => show({ name: 'form' }),
    });
  }

  function detailScreen(id: string, confirmingDelete: boolean) {
    return detailView({
      task: service.get(id)!,
      confirmingDelete,
      onBack: showList,
      onEdit: () => show({ name: 'form', editingId: id }),
      onToggle: () => {
        service.toggle(id);
        render();
      },
      onAskDelete: () => show({ name: 'detail', id, confirmingDelete: true }),
      onConfirmDelete: () => {
        service.remove(id);
        showList();
      },
      onCancelDelete: () => showDetail(id),
    });
  }

  function formScreen(editingId?: string) {
    const task = editingId ? service.get(editingId) : undefined;
    return taskForm({
      title: task?.title,
      description: task?.description,
      onSave: (title, description) => {
        if (task) {
          service.update(task.id, title, description);
          showDetail(task.id);
        } else {
          service.add(title, description);
          showList();
        }
      },
      onCancel: () => (task ? showDetail(task.id) : showList()),
    });
  }

  render();
}
