import test from 'ava';
import getNextTile from '../getNextTile';

test('getNextTile - invalid code', (t) => {
  t.is(typeof getNextTile(), 'function');
  t.is(typeof getNextTile('wPa2'), 'function');
  t.is(getNextTile('wPa7', [1, 2]), '');
});

test('getNextTile - valid code', (t) => {
  t.is(getNextTile('wPa2', [1, 1]), 'b3');
  t.is(getNextTile('bPa7', [1, 1]), 'b6');
});
