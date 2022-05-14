import test from 'ava';
import getRankNameByIndex from '../getRankNameByIndex';

test('getRankNameByIndex - invalid code', (t) => {
  t.is(typeof getRankNameByIndex(), 'function');
  t.is(typeof getRankNameByIndex('2'), 'function');
});

test('getRankNameByIndex - valid code', (t) => {
  t.deepEqual(getRankNameByIndex('2', 1), 3);
});
