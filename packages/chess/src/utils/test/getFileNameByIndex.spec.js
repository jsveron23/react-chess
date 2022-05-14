import test from 'ava';
import getFileNameByIndex from '../getFileNameByIndex';

test('getFileNameByIndex', (t) => {
  t.is(typeof getFileNameByIndex(), 'function');
  t.is(typeof getFileNameByIndex('a'), 'function');
  t.deepEqual(getFileNameByIndex('a', 1), 'b');
});
