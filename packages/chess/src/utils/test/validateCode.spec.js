import { test, expect } from 'bun:test';
import validateCode from '../validateCode';

test('Should return false', () => {
  expect(validateCode()).toBe(false);
  expect(validateCode('wPa')).toBe(false);
  expect(validateCode('aPa2')).toBe(false);
  expect(validateCode('bAa2')).toBe(false);
  expect(validateCode('bPj2')).toBe(false);
  expect(validateCode('bPa9')).toBe(false);
});

test('Should return validate result', () => {
  expect(validateCode('wPa2')).toBe(true);
});
