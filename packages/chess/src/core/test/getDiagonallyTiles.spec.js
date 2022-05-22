import test from 'ava';
import getDiagonallyTiles from '../getDiagonallyTiles';

// prettier-ignore
const snapshot = [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb7', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc4', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRa1', 'wNb1', 'wBc1', 'wQa4', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
  ]

test('Should be returned function', (t) => {
  t.is(typeof getDiagonallyTiles(), 'function');
  t.is(typeof getDiagonallyTiles(null), 'function');
});

test('Should be returned empty value', (t) => {
  t.deepEqual(getDiagonallyTiles('wPa2', snapshot), []);
  t.deepEqual(getDiagonallyTiles('bPh7', snapshot), []);
});

test('Should be returned diagonally forward tiles', (t) => {
  t.deepEqual(getDiagonallyTiles('wPc4', snapshot), ['d5']);
  t.deepEqual(getDiagonallyTiles('bPd5', snapshot), ['c4']);
});
