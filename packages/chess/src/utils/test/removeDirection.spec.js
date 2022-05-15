import test from 'ava';
import removeDirection from '../removeDirection';

test('Should return function (curry)', (t) => {
  t.is(typeof removeDirection(), 'function');
  t.is(typeof removeDirection(null), 'function');
  t.is(typeof removeDirection(null, null), 'function');
});

test('Should return movable tiles that removed direction code', (t) => {
  // TODO more test case
  t.deepEqual(removeDirection('Vertical', ['e5', 'e6'], 'bPe7'), []);
});
