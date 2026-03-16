import { test, expect } from 'bun:test';
import getSymmetryTile from '../getSymmetryTile';

test('Should return function (curry)', () => {
  expect(typeof getSymmetryTile()).toBe('function');
  expect(typeof getSymmetryTile(null)).toBe('function');
  expect(typeof getSymmetryTile(null, null)).toBe('function');
});

test('Should return falsy if given arguments is not correct', () => {
  expect(getSymmetryTile('Vertical', 'wKe5', 'f4')).toBeFalsy();
});

test('Should return tile as string', () => {
  expect(getSymmetryTile('Vertical', 'wKe2', 'e3')).toBe('e1');
  expect(getSymmetryTile('Horizontal', 'wKe1', 'd1')).toBe('f1');
  expect(getSymmetryTile('Diagonal', 'wKe5', 'f4')).toBe('d6');
});
