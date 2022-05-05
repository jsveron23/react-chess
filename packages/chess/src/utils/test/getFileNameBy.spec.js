import test from 'ava';
import getFileNameBy from '../getFileNameBy';

test('getFileNameBy - invalid code', (t) => {
  t.is(typeof getFileNameBy(), 'function');
  t.is(typeof getFileNameBy('a'), 'function');
});

test('getFileNameBy - valid code', (t) => {
  t.deepEqual(getFileNameBy('a', 1), 'b');
});
