import test from 'ava';
import computeBlockedTiles from '../computeBlockedTiles';

// prettier-ignore
const Snapshot = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
];

test('computeBlockedTiles - invalid code', (t) => {
  t.throws(() => computeBlockedTiles('Pa2', Snapshot));
});

test('computeBlockedTiles - valid code', (t) => {
  t.deepEqual(computeBlockedTiles('wPa2', Snapshot), ['a3', 'a4', 'a5', 'a6']);
  t.deepEqual(computeBlockedTiles('wNg1', Snapshot), ['h3', 'f3']);
});
