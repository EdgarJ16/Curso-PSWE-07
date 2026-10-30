export interface Task {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

export class ValidationError extends Error {}

export function validateTitle(title: string): string {
  const trimmed = title.trim();
  if (!trimmed) throw new ValidationError('Title is required');
  return trimmed;
}
