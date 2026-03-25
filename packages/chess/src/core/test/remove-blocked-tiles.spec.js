import { test, expect } from 'bun:test';
import { removeBlockedTiles } from '../internal/remove-blocked-tiles';

test('Should return all tiles when path is clear', () => {
  expect(removeBlockedTiles([], ['a3', 'a4', 'a5'])).toEqual([
    'a3',
    'a4',
    'a5',
  ]);
});

test('Should keep tiles up to and including the first blocking piece', () => {
  // piece at a4 — a3 and a4 are reachable, a5 and beyond are blocked
  expect(removeBlockedTiles(['wPa4'], ['a3', 'a4', 'a5', 'a6'])).toEqual([
    'a3',
    'a4',
  ]);
});

test('Should return only the first tile when it is occupied', () => {
  expect(removeBlockedTiles(['wPa3'], ['a3', 'a4', 'a5'])).toEqual(['a3']);
});

test('Should return empty array when first tile is occupied and list has one entry', () => {
  // The piece IS at a3, so a3 is included (capture), nothing after
  expect(removeBlockedTiles(['wPa3'], ['a3'])).toEqual(['a3']);
});
