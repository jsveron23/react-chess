import test from 'ava';
import getNextRankByIndex from '../getNextRankByIndex';

test('Should return function (curry)', (t) => {
  t.is(typeof getNextRankByIndex(), 'function');
  t.is(typeof getNextRankByIndex(null), 'function');
});

test('Should return next rank of given index', (t) => {
  t.deepEqual(getNextRankByIndex('2', 1), 3);
});
