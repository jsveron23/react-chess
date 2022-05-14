import test from 'ava';
import getRankNameByIndex from '../getRankNameByIndex';

test('getRankNameByIndex', (t) => {
  t.is(typeof getRankNameByIndex(), 'function');
  t.is(typeof getRankNameByIndex('2'), 'function');
  t.deepEqual(getRankNameByIndex('2', 1), 3);
});
