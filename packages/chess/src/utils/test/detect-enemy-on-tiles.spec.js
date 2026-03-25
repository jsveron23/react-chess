import { test, expect } from 'bun:test';
import { detectEnemyOnTiles } from '../detect-enemy-on-tiles';

test('Should return function (curry)', () => {
  expect(typeof detectEnemyOnTiles()).toBe('function');
  expect(typeof detectEnemyOnTiles(null)).toBe('function');
  expect(typeof detectEnemyOnTiles(null, null)).toBe('function');
});

test('Should return boolean value', () => {
  expect(
    detectEnemyOnTiles(
      [
        'a5',
        'a6',
        'a7',
        'a3',
        'a2',
        'b4',
        'c4',
        'b5',
        'c6',
        'd7',
        'b3',
        'c2',
        'd1',
      ],
      'wQa4',
      'bPa7',
      'a7'
    )
  ).toBe(true);

  expect(detectEnemyOnTiles(['a3', 'a4', 'b4'], 'wPa2', 'bPa4', 'b4')).toBe(
    true
  );
});
