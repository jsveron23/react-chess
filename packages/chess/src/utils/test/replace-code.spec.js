import { test, expect } from 'bun:test';
import { replaceCode } from '../replace-code';

// prettier-ignore
const Snapshot = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
];

test('Should return function (curry)', () => {
  expect(typeof replaceCode()).toBe('function');
  expect(typeof replaceCode(null)).toBe('function');
  expect(typeof replaceCode(null, null)).toBe('function');
});

test('Should return empty array if given is not valid', () => {
  expect(replaceCode([], 'bPd7', 'Pd5')).toEqual([]);
  expect(replaceCode(null, null, null)).toEqual([]);
  expect(replaceCode([], null, null)).toEqual([]);
  expect(replaceCode([], 'Pd7', 'bPd5')).toEqual([]);
  expect(replaceCode([], 'bPd7', 'Pd5')).toEqual([]);
});

test('Should return snapshot that replace code inside', () => {
  // prettier-ignore
  expect(replaceCode(Snapshot, 'bPd7', 'bPd5')).toEqual([
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb7', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
  ]);
});
