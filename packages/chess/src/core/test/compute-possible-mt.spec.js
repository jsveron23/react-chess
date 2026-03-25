import { test, expect } from 'bun:test';
import { computePossibleMT } from '../compute-possible-mt';

// prettier-ignore
const timeline = [
  [
    "bRa8", "bNb8", "bBc8", "bQb4", "bKe8", "bBf8", "bNg8", "bRh8",
    "bPa7", "bPb7", "bPc7", "bPd7", "bPe5", "bPf7", "bPg7", "bPh7",
    "wPa2", "wPb2", "wPc2", "wPd4", "wPe2", "wPf2", "wPg2", "wPh2",
    "wRa1", "wNb1", "wBc1", "wQc3", "wKe1", "wBf1", "wNg1", "wRh1"
  ],
  [
    "bRa8", "bNb8", "bBc8", "bQd8", "bKe8", "bBf8", "bNg8", "bRh8",
    "bPa7", "bPb7", "bPc7", "bPd7", "bPe7", "bPf7", "bPg7", "bPh7",
    "wPa2", "wPb2", "wPc2", "wPd2", "wPe2", "wPf2", "wPg2", "wPh2",
    "wRa1", "wNb1", "wBc1", "wQd1", "wKe1", "wBf1", "wNg1", "wRh1"
  ],
  [
    "bRa8", "bNb8", "bBc8", "bQd8", "bKe8", "bBf8", "bNg8", "bRh8",
    "bPa7", "bPb7", "bPc7", "bPd7", "bPe7", "bPf7", "bPg7", "bPh7",
    "wPa2", "wPb2", "wPc2", "wPd4", "wPe2", "wPf2", "wPg2", "wPh2",
    "wRa1", "wNb1", "wBc1", "wQd1", "wKe1", "wBf1", "wNg1", "wRh1"
  ],
  [
    "bRa8", "bNb8", "bBc8", "bQd8", "bKe8", "bBf8", "bNg8", "bRh8",
    "bPa7", "bPb7", "bPc7", "bPd7", "bPe5", "bPf7", "bPg7", "bPh7",
    "wPa2", "wPb2", "wPc2", "wPd4", "wPe2", "wPf2", "wPg2", "wPh2",
    "wRa1", "wNb1", "wBc1", "wQd1", "wKe1", "wBf1", "wNg1", "wRh1"
  ],
  [
    "bRa8", "bNb8", "bBc8", "bQd8", "bKe8", "bBf8", "bNg8", "bRh8",
    "bPa7", "bPb7", "bPc7", "bPd7", "bPe5", "bPf7", "bPg7", "bPh7",
    "wPa2", "wPb2", "wPc2", "wPd4", "wPe2", "wPf2", "wPg2", "wPh2",
    "wRa1", "wNb1", "wBc1", "wQd2", "wKe1", "wBf1", "wNg1", "wRh1"
  ],
  [
    "bRa8", "bNb8", "bBc8", "bQe7", "bKe8", "bBf8", "bNg8", "bRh8",
    "bPa7", "bPb7", "bPc7", "bPd7", "bPe5", "bPf7", "bPg7", "bPh7",
    "wPa2", "wPb2", "wPc2", "wPd4", "wPe2", "wPf2", "wPg2", "wPh2",
    "wRa1", "wNb1", "wBc1", "wQd2", "wKe1", "wBf1", "wNg1", "wRh1"
  ],
  [
    "bRa8", "bNb8", "bBc8", "bQe7", "bKe8", "bBf8", "bNg8", "bRh8",
    "bPa7", "bPb7", "bPc7", "bPd7", "bPe5", "bPf7", "bPg7", "bPh7",
    "wPa2", "wPb2", "wPc2", "wPd4", "wPe2", "wPf2", "wPg2", "wPh2",
    "wRa1", "wNb1", "wBc1", "wQc3", "wKe1", "wBf1", "wNg1", "wRh1"
  ]
]

test('Should be returned movable tiles', () => {
  expect(computePossibleMT('', [], 'wQc3', timeline)).toEqual(['d2', 'b4']);
});

// F1
test('Piece pinned along rank cannot move off the rank', () => {
  // wKe1 and bRa1 share rank 1; wRd1 is pinned between them
  const t = [['wKe1', 'wRd1', 'bRa1']];
  const result = computePossibleMT('', [], 'wRd1', t);

  expect(result).not.toContain('d2');
  expect(result).not.toContain('d3');
  expect(result).toContain('c1'); // can slide toward the king along the rank
});

// F2
test('Piece pinned along file cannot move off the file', () => {
  // wKe1 and bRe8 share the e-file; wRe4 is pinned between them
  const t = [['wKe1', 'wRe4', 'bRe8']];
  const result = computePossibleMT('', [], 'wRe4', t);

  expect(result).not.toContain('d4');
  expect(result).not.toContain('f4');
  expect(result).toContain('e5'); // can slide along the file
  expect(result).toContain('e8'); // can capture the attacker
});

// F3
test('Piece pinned along diagonal cannot move off the diagonal', () => {
  // bBa5 attacks wKe1 along the a5-e1 diagonal; wBd2 is pinned on it
  const t = [['wKe1', 'wBd2', 'bBa5']];
  const result = computePossibleMT('', [], 'wBd2', t);

  expect(result).not.toContain('e3'); // off the pin diagonal
  expect(result).toContain('c3'); // on the diagonal (interpose)
  expect(result).toContain('a5'); // can capture the attacker
});

// F6
test('Pinned piece can capture the attacker along the pin line', () => {
  // wRd1 pinned by bRa1; can still slide to a1 to capture
  const t = [['wKe1', 'wRd1', 'bRa1']];
  const result = computePossibleMT('', [], 'wRd1', t);

  expect(result).toContain('a1');
});
