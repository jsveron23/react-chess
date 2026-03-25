import { test, expect } from 'bun:test';
import { convertArrowToTiles } from '../internal/convert-arrow-to-tiles';

test('Should convert a single direction to tiles', () => {
  expect(
    convertArrowToTiles('wRa1', {
      Up: [
        [0, 1],
        [0, 2],
      ],
    })
  ).toEqual({
    Up: ['a2', 'a3'],
  });
});

test('Should return empty array for out-of-board directions', () => {
  expect(convertArrowToTiles('wRa1', { Down: [[0, -1]] })).toEqual({
    Down: [],
  });
});

test('Should convert multiple direction keys', () => {
  expect(
    convertArrowToTiles('wRd4', {
      Right: [
        [1, 0],
        [2, 0],
      ],
      Left: [[-1, 0]],
    })
  ).toEqual({
    Right: ['e4', 'f4'],
    Left: ['c4'],
  });
});

test('Should return empty object for empty arrow', () => {
  expect(convertArrowToTiles('wPe2', {})).toEqual({});
});
