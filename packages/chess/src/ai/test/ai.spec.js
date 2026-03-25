import { test, expect } from 'bun:test';
import { AI } from '../ai';

// prettier-ignore
const initialSnapshot = [
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
];

const initialState = {
  timeline: [initialSnapshot],
  node: [],
  side: 'w',
};

// ── AI.createList ────────────────────────────────────────────────────────────

test('createList returns only white pieces for side "w"', () => {
  const result = AI.createList('w', initialSnapshot);

  expect(result.every((code) => code[0] === 'w')).toBe(true);
});

test('createList returns only black pieces for side "b"', () => {
  const result = AI.createList('b', initialSnapshot);

  expect(result.every((code) => code[0] === 'b')).toBe(true);
});

test('createList returns 16 pieces per side from starting position', () => {
  expect(AI.createList('w', initialSnapshot)).toHaveLength(16);
  expect(AI.createList('b', initialSnapshot)).toHaveLength(16);
});

test('createList returns empty array for empty snapshot', () => {
  expect(AI.createList('w', [])).toEqual([]);
});

// ── AI.evaluateBreakdown ─────────────────────────────────────────────────────

test('evaluateBreakdown returns object with expected keys', () => {
  const result = AI.evaluateBreakdown(initialState);

  expect(typeof result.material).toBe('number');
  expect(typeof result.position).toBe('number');
  expect(typeof result.pawnStructure).toBe('number');
  expect(typeof result.kingSafety).toBe('number');
  expect(typeof result.hangingPenalty).toBe('number');
  expect(typeof result.total).toBe('number');
});

test('evaluateBreakdown starting position returns total of 0 (symmetric)', () => {
  const result = AI.evaluateBreakdown(initialState);

  expect(result.total).toBe(0);
});

test('evaluateBreakdown material is 0 for symmetric starting position', () => {
  const result = AI.evaluateBreakdown(initialState);

  expect(result.material).toBe(0);
});

// ── AI.clearSearchState ──────────────────────────────────────────────────────

test('clearSearchState does not throw', () => {
  expect(() => AI.clearSearchState()).not.toThrow();
});

// ── AI.minimax ───────────────────────────────────────────────────────────────

test('minimax returns a number', () => {
  AI.clearSearchState();
  const result = AI.minimax(initialState, 0, -Infinity, Infinity, true);

  expect(typeof result).toBe('number');
});

test('minimax at depth 0 returns same value as evaluateBreakdown total', () => {
  AI.clearSearchState();
  const score = AI.minimax(initialState, 0, -Infinity, Infinity, true);
  const breakdown = AI.evaluateBreakdown(initialState);

  expect(score).toBe(breakdown.total);
});

test('minimax at depth 1 returns a finite number', () => {
  AI.clearSearchState();
  const result = AI.minimax(initialState, 1, -Infinity, Infinity, true);

  expect(Number.isFinite(result)).toBe(true);
});

// I7
test('minimax at depth 2 returns a finite number', () => {
  AI.clearSearchState();
  const result = AI.minimax(initialState, 2, -Infinity, Infinity, true);

  expect(Number.isFinite(result)).toBe(true);
});
