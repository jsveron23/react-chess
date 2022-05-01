import test from 'ava';
import getNextTiles from '../getNextTiles';

test('getNextTiles - invalid code', (t) => {
  t.is(typeof getNextTiles(), 'function');
  t.is(typeof getNextTiles('wPa2'), 'function');
  t.deepEqual(getNextTiles('wPa7', [[1, 2]]), []);
});

test('getNextTiles - valid code', (t) => {
  t.deepEqual(getNextTiles('wPa2', [[1, 1]]), ['b3']);
  t.deepEqual(
    getNextTiles('wPa2', [
      [1, 1],
      [1, 2],
      [1, 3],
    ]),
    ['b3', 'b4', 'b5']
  );
  t.deepEqual(
    getNextTiles('wKa7', [
      [1, 1],
      [1, 2],
      [1, 3],
    ]),
    ['b8']
  );
  t.deepEqual(getNextTiles('bPa7', [[1, 1]]), ['b6']);
});
