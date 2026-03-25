import { test, expect } from 'bun:test';
import { filterOpponent } from '../filter-opponent';

// prettier-ignore
const Snapshot = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8', 'bPa7', 'bPb7', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc4', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2', 'wRa1', 'wNb1', 'wBc1', 'wQa4', 'wKe1', 'wBf1', 'wNg1', 'wRh1',
]

test('Should throw Error', () => {
  expect(() => filterOpponent('bRa8', [])).toThrow(TypeError);
});

test('Should return function (curry)', () => {
  expect(typeof filterOpponent()).toBe('function');
  expect(typeof filterOpponent(null)).toBe('function');
});

test('Should return opponent code list', () => {
  expect(filterOpponent('bRa8', Snapshot)).toEqual([
    'wPa2',
    'wPb2',
    'wPc4',
    'wPd2',
    'wPe2',
    'wPf2',
    'wPg2',
    'wPh2',
    'wRa1',
    'wNb1',
    'wBc1',
    'wQa4',
    'wKe1',
    'wBf1',
    'wNg1',
    'wRh1',
  ]);
});
