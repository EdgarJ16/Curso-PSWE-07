import { describe, expect, it } from 'vitest';
import { ValidationError, validateTitle } from '../../src/logic/task';

describe('validateTitle', () => {
  it('returns the trimmed title', () => {
    expect(validateTitle('  Buy milk ')).toBe('Buy milk');
  });
  it('rejects empty and whitespace-only titles', () => {
    expect(() => validateTitle('')).toThrow(ValidationError);
    expect(() => validateTitle('   ')).toThrow(ValidationError);
  });
});
