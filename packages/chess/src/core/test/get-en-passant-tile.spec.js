import { test, expect } from 'bun:test';
import { getEnPassantTile } from '../get-en-passant-tile';

test('Returns empty string when pawn is not on the en-passant rank', () => {
  const timeline = [['wKe1', 'wPe3']];

  expect(getEnPassantTile('wPe3', timeline)).toBe('');
});

test('Returns en-passant capture square after opponent pawn double-step', () => {
  // Black pawn moved from d7 to d5 last turn; white pawn is at e5
  const current = ['wKe1', 'wPe5', 'bPd5'];
  const previous = ['wKe1', 'wPe5', 'bPd7'];
  const timeline = [current, previous];

  expect(getEnPassantTile('wPe5', timeline)).toBe('d6');
});

test('Returns empty string when adjacent pawn did not just double-step', () => {
  // bPd5 appears in both snapshots — it has been there for at least 2 turns
  const current = ['wKe1', 'wPe5', 'bPd5'];
  const previous = ['wKe1', 'wPe4', 'bPd5'];
  const timeline = [current, previous];

  expect(getEnPassantTile('wPe5', timeline)).toBe('');
});

test('.after() returns captured pawn tile for an en-passant pawn move', () => {
  // White pawn moved diagonally e5→d6; bPd5 not yet removed from snapshot
  const snapshot = ['wKe1', 'wPe5', 'bPd5'];
  const nextSnapshot = ['wKe1', 'wPd6', 'bPd5'];

  expect(getEnPassantTile.after(nextSnapshot, snapshot)).toBe('d5');
});

test('.after() returns empty string for a regular forward pawn move', () => {
  const snapshot = ['wKe1', 'wPe4'];
  const nextSnapshot = ['wKe1', 'wPe5'];

  expect(getEnPassantTile.after(nextSnapshot, snapshot)).toBe('');
});

// B12
test('En passant not available when the double-step happened two turns ago', () => {
  // White moved last turn (wPe4 → wPe5), not black — so adjacent bPd5 did not
  // just double-step; the previous snapshot shows bPd5 already present
  const current = ['wKe1', 'wPe5', 'bPd5'];
  const prevTurn = ['wKe1', 'wPe4', 'bPd5']; // white moved; bPd5 already at d5
  const twoTurnsAgo = ['wKe1', 'wPe4', 'bPd7'];
  const timeline = [current, prevTurn, twoTurnsAgo];

  expect(getEnPassantTile('wPe5', timeline)).toBe('');
});
