import { test, expect } from 'bun:test';
import { StateBuilder } from '../state-builder';

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

// ── StateBuilder.createInitialV ──────────────────────────────────────────────

test('createInitialV returns object with timeline, snapshot, tileMap, enemySide', () => {
  const iV = StateBuilder.createInitialV(initialState);

  expect(iV.timeline).toBeDefined();
  expect(iV.snapshot).toBeDefined();
  expect(iV.tileMap).toBeDefined();
  expect(iV.enemySide).toBeDefined();
});

test('createInitialV snapshot equals timeline[0]', () => {
  const iV = StateBuilder.createInitialV(initialState);

  expect(iV.snapshot).toEqual(initialState.timeline[0]);
});

test('createInitialV enemySide is opponent of state.side', () => {
  const iV = StateBuilder.createInitialV(initialState);

  expect(iV.enemySide).toBe('b');
});

test('createInitialV tileMap maps tile keys to piece codes', () => {
  const iV = StateBuilder.createInitialV(initialState);

  expect(iV.tileMap.get('e1')).toBe('wKe1');
  expect(iV.tileMap.get('e8')).toBe('bKe8');
});

// ── StateBuilder.of(iV).build ────────────────────────────────────────────────

test('build returns an array', () => {
  const iV = StateBuilder.createInitialV(initialState);
  const result = StateBuilder.of(iV).build('wPe2');

  expect(Array.isArray(result)).toBe(true);
});

test('build pawn on starting square generates 2 states (single and double push)', () => {
  const state = { timeline: [['wKe1', 'wPe2']], node: [], side: 'w' };
  const iV = StateBuilder.createInitialV(state);
  const result = StateBuilder.of(iV).build('wPe2');

  expect(result).toHaveLength(2);
});

test('build each state has timeline, node, and side', () => {
  const iV = StateBuilder.createInitialV(initialState);
  const result = StateBuilder.of(iV).build('wPe2');

  for (const s of result) {
    expect(s.timeline).toBeDefined();
    expect(s.node).toBeDefined();
    expect(s.side).toBeDefined();
  }
});

test('build resulting states have opponent side', () => {
  const iV = StateBuilder.createInitialV(initialState);
  const result = StateBuilder.of(iV).build('wPe2');

  for (const s of result) {
    expect(s.side).toBe('b');
  }
});

// ── StateBuilder.of(iV).buildCaptures ────────────────────────────────────────

test('buildCaptures returns an array', () => {
  const iV = StateBuilder.createInitialV(initialState);
  const result = StateBuilder.of(iV).buildCaptures('wPe2');

  expect(Array.isArray(result)).toBe(true);
});

test('buildCaptures returns empty array when piece has no captures', () => {
  // Pawn at e2 with no enemy pieces on diagonal squares
  const state = { timeline: [['wKe1', 'wPe2']], node: [], side: 'w' };
  const iV = StateBuilder.createInitialV(state);
  const result = StateBuilder.of(iV).buildCaptures('wPe2');

  expect(result).toEqual([]);
});

test('buildCaptures returns states when capture is available', () => {
  // White pawn at e4 can capture black pawn at d5
  const state = {
    timeline: [['wKe1', 'wPe4', 'bPd5', 'bKe8']],
    node: [],
    side: 'w',
  };
  const iV = StateBuilder.createInitialV(state);
  const result = StateBuilder.of(iV).buildCaptures('wPe4');

  expect(result.length).toBeGreaterThan(0);
});

test('buildCaptures returns only capture states (isCaptured = true)', () => {
  const state = {
    timeline: [['wKe1', 'wPe4', 'bPd5', 'bKe8']],
    node: [],
    side: 'w',
  };
  const iV = StateBuilder.createInitialV(state);
  const result = StateBuilder.of(iV).buildCaptures('wPe4');

  for (const s of result) {
    expect(s.isCaptured).toBe(true);
  }
});
