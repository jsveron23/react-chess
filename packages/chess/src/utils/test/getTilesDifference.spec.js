import test from 'ava';
import getTilesDifference from '../getTilesDifference';

test('Should be returned function', (t) => {
  t.is(typeof getTilesDifference(), 'function');
  t.is(typeof getTilesDifference(null), 'function');
});

test('Should be returned tiles difference', (t) => {
  t.deepEqual(getTilesDifference('a2', 'b5'), {
    file: 1,
    rank: 3,
  });
  t.deepEqual(getTilesDifference('h2', 'a5'), {
    file: 7,
    rank: 3,
  });
});
