import { test, expect } from 'bun:test';
import { groupDirectionTilesByCode } from '../internal/group-direction-tiles-by-code';
import { Vertical, Horizontal, Diagonal, Jumpover } from '../../presets';

test('Knight — groups tiles under Jumpover direction', () => {
  const result = groupDirectionTilesByCode('wNg1');
  expect(result).toHaveProperty(Jumpover);
  expect(result[Jumpover].TopRight1).toEqual(['h3']);
  expect(result[Jumpover].TopLeft1).toEqual(['f3']);
  expect(result[Jumpover].TopLeft2).toEqual(['e2']);
  // off-board axes produce empty arrays
  expect(result[Jumpover].TopRight2).toEqual([]);
  expect(result[Jumpover].BottomRight1).toEqual([]);
});

test('Pawn — groups tiles under Vertical direction only', () => {
  const result = groupDirectionTilesByCode('wPe2');
  expect(Object.keys(result)).toEqual([Vertical]);
  expect(result[Vertical].Up).toContain('e3');
  expect(result[Vertical].Up).toContain('e8');
  expect(result[Vertical].Down).toEqual(['e1']);
});

test('Rook — groups tiles under Vertical and Horizontal directions', () => {
  const result = groupDirectionTilesByCode('wRa1');
  expect(result).toHaveProperty(Vertical);
  expect(result).toHaveProperty(Horizontal);
  expect(result[Vertical].Up).toEqual([
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
    'a8',
  ]);
  expect(result[Vertical].Down).toEqual([]);
  expect(result[Horizontal].Right).toEqual([
    'b1',
    'c1',
    'd1',
    'e1',
    'f1',
    'g1',
    'h1',
  ]);
  expect(result[Horizontal].Left).toEqual([]);
});

test('Bishop — groups tiles under Diagonal direction only', () => {
  const result = groupDirectionTilesByCode('wBc1');
  expect(Object.keys(result)).toEqual([Diagonal]);
  expect(result[Diagonal].TopRight).toContain('d2');
  expect(result[Diagonal].TopRight).toContain('h6');
});
