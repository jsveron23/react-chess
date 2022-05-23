import test from 'ava';
import getDirection from '../getDirection';

test('Should be returned function', (t) => {
  t.is(typeof getDirection(), 'function');
  t.is(typeof getDirection(null), 'function');
});

test('Should be returned no direction string', (t) => {
  t.is(getDirection(2, 3), '');
  t.is(getDirection(2, 5), '');
  t.is(getDirection(6, 5), '');
});

test('Should be returned direction string', (t) => {
  t.is(getDirection(0, 1), 'Vertical');
  t.is(getDirection(0, 2), 'Vertical');
  t.is(getDirection(0, 3), 'Vertical');
  t.is(getDirection(0, 4), 'Vertical');
  t.is(getDirection(1, 0), 'Horizontal');
  t.is(getDirection(2, 0), 'Horizontal');
  t.is(getDirection(3, 0), 'Horizontal');
  t.is(getDirection(4, 0), 'Horizontal');
  t.is(getDirection(1, 1), 'Diagonal');
  t.is(getDirection(2, 2), 'Diagonal');
  t.is(getDirection(3, 3), 'Diagonal');
  t.is(getDirection(4, 4), 'Diagonal');
});
