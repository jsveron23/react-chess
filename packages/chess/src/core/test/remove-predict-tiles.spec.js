import { test, expect } from 'bun:test';
import { removePredictTiles } from '../internal/remove-predict-tiles';

test('Should keep all tiles when no move exposes king', () => {
  // White king at e1, white pawn at e2, no threats
  const snapshot = ['wKe1', 'wPe2'];
  const timeline = [snapshot];

  expect(removePredictTiles(timeline, 'wPe2', ['e3', 'e4'])).toEqual([
    'e3',
    'e4',
  ]);
});

test('Should remove king move tile that is attacked', () => {
  // White king at e1, black rook at f8 — f1 is on the f-file, attacked
  const snapshot = ['wKe1', 'bRf8'];
  const timeline = [snapshot];

  const result = removePredictTiles(timeline, 'wKe1', ['f1', 'd1']);
  expect(result).not.toContain('f1');
  expect(result).toContain('d1');
});

test('Should remove tile where capturing exposes king', () => {
  // White king at a1, black pawn at b1 blocking black rook at c1
  // Capturing at b1 clears the path — king becomes exposed
  const snapshot = ['wKa1', 'bPb1', 'bRc1'];
  const timeline = [snapshot];

  const result = removePredictTiles(timeline, 'wPd2', ['b1']);
  expect(result).toEqual([]);
});
