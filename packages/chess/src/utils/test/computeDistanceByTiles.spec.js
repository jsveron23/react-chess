import test from 'ava';
import computeDistanceByTiles from '../computeDistanceByTiles';

test('Should be returned function', (t) => {
  t.is(typeof computeDistanceByTiles(''), 'function');
  t.is(typeof computeDistanceByTiles('abc'), 'function');
});

test('Should be returned distance object', (t) => {
  t.deepEqual(computeDistanceByTiles('a2', 'a8'), {
    rank: 6,
    file: 0,
  });

  t.deepEqual(computeDistanceByTiles('a2', 'a3'), {
    rank: 1,
    file: 0,
  });

  t.deepEqual(computeDistanceByTiles('a2', 'b2'), {
    rank: 0,
    file: 1,
  });

  t.deepEqual(computeDistanceByTiles('a2', 'b3'), {
    rank: 1,
    file: 1,
  });

  t.deepEqual(computeDistanceByTiles('a2', 'h2'), {
    rank: 0,
    file: 7,
  });

  t.deepEqual(computeDistanceByTiles('a2', 'f6'), {
    rank: 4,
    file: 5,
  });
});
