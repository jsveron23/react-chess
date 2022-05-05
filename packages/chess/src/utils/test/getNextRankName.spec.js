import test from 'ava';
import getNextRankName from '../getNextRankName';

test('getNextRankName - invalid code', (t) => {
  t.is(typeof getNextRankName(), 'function');
  t.is(typeof getNextRankName('2'), 'function');
});

test('getNextRankName - valid code', (t) => {
  t.deepEqual(getNextRankName('2', 1), 3);
});
