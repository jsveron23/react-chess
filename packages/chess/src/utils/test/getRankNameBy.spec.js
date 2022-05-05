import test from 'ava';
import getRankNameBy from '../getRankNameBy';

test('getRankNameBy - invalid code', (t) => {
  t.is(typeof getRankNameBy(), 'function');
  t.is(typeof getRankNameBy('2'), 'function');
});

test('getRankNameBy - valid code', (t) => {
  t.deepEqual(getRankNameBy('2', 1), 3);
});
