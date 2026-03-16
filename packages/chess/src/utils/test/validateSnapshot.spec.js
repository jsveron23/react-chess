import { test, expect } from 'bun:test';
import validateSnapshot from '../validateSnapshot';

// prettier-ignore
const Snapshot = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8', 'bPa7', 'bPb7', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc4', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2', 'wRa1', 'wNb1', 'wBc1', 'wQa4', 'wKe1', 'wBf1', 'wNg1', 'wRh1',
]

test('Should return false', () => {
  expect(validateSnapshot([])).toBe(false);
});

test('Should return validate result', () => {
  expect(validateSnapshot(Snapshot)).toBe(true);
});
