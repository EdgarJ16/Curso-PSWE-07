import { beforeEach, describe, expect, it } from 'vitest';
import { LocalStorageStore } from '../../src/persistence/local-storage-store';

const task = { id: '1', title: 'A', description: '', done: false };
beforeEach(() => localStorage.clear());

describe('LocalStorageStore', () => {
  it('returns an empty list when nothing is stored', () => {
    expect(new LocalStorageStore().load()).toEqual([]);
  });
  it('round-trips tasks', () => {
    new LocalStorageStore().save([task]);
    expect(new LocalStorageStore().load()).toEqual([task]);
  });
  it('returns an empty list when stored data is unreadable', () => {
    localStorage.setItem('curso-pswe-07.tasks', '{not json');
    expect(new LocalStorageStore().load()).toEqual([]);
    localStorage.setItem('curso-pswe-07.tasks', '{"a":1}');
    expect(new LocalStorageStore().load()).toEqual([]);
  });
});
