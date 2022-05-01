import test from 'ava';
import computeMovableTiles from '../computeMovableTiles';

test('computeMovableTiles - invalid code', (t) => {
  t.deepEqual(computeMovableTiles(), []);
});

test('computeMovableTiles - valid code', (t) => {
  t.deepEqual(computeMovableTiles('wPa2'), ['a3']);
  t.deepEqual(computeMovableTiles('wNg1'), ['f3', 'h3', 'e2']);
});
