import { test, expect } from 'bun:test';
import { predictPossibleCheck } from '../predict-possible-check';

// prettier-ignore
const snapshot1 = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
];

// prettier-ignore
const snapshot2 = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc4', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQa4', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
];

test('Should be returned function', () => {
  expect(typeof predictPossibleCheck()).toBe('function');
  expect(typeof predictPossibleCheck([])).toBe('function');
});

test('Should be returned falsy value (no attacker)', () => {
  expect(predictPossibleCheck([snapshot1], 'wPb2')).toBeFalsy();
  expect(predictPossibleCheck([snapshot1], 'wQd1')).toBeFalsy();
});

test('Should be returned an attacker code', () => {
  expect(predictPossibleCheck([snapshot2], 'bKe8')).toBe('wQa4');
});
