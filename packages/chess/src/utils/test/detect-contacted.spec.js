import { test, expect } from 'bun:test';
import { detectContacted } from '../detect-contacted';

test('Should be returned function', () => {
  expect(typeof detectContacted()).toBe('function');
  expect(typeof detectContacted(null)).toBe('function');
});

test('Should be returned whether contacted or not', () => {
  expect(detectContacted(1, 1)).toBe(true);
  expect(detectContacted(1, 0)).toBe(true);
  expect(detectContacted(0, 1)).toBe(true);
  expect(detectContacted(3, 1)).toBe(false);
  expect(detectContacted(3, 3)).toBe(false);
});
