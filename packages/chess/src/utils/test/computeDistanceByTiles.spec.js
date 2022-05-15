import test from 'ava';
import computeDistanceByTiles from '../computeDistanceByTiles';

// TODO create tile validation function
// test('Should throw TypeError', (t) => {
//   const typeError = {
//     instanceOf: TypeError,
//   };
//   t.throws(() => computeDistanceByTiles('', ''), typeError);
//   t.throws(() => computeDistanceByTiles('abc', ''), typeError);
//   t.throws(() => computeDistanceByTiles('abc', 'def'), typeError);
//   t.throws(() => computeDistanceByTiles('abc', 'def'), typeError);
// });

test('Should return function (curry)', (t) => {
  t.is(typeof computeDistanceByTiles(''), 'function');
  t.is(typeof computeDistanceByTiles('abc'), 'function');
});

test('Should return object of distance data', (t) => {
  t.deepEqual(computeDistanceByTiles('a2', 'a8'), {
    contact: false,
    direction: 'Vertical',
    rank: 6,
    file: 0,
  });

  t.deepEqual(computeDistanceByTiles('a2', 'a3'), {
    contact: true,
    rank: 1,
    file: 0,
    direction: 'Vertical',
  });

  t.deepEqual(computeDistanceByTiles('a2', 'b2'), {
    contact: true,
    rank: 0,
    file: 1,
    direction: 'Horizontal',
  });

  t.deepEqual(computeDistanceByTiles('a2', 'b3'), {
    contact: true,
    rank: 1,
    file: 1,
    direction: 'Diagonal',
  });

  t.deepEqual(computeDistanceByTiles('a2', 'h2'), {
    contact: false,
    rank: 0,
    file: 7,
    direction: 'Horizontal',
  });
});

test('Not ok but able to use that way', (t) => {
  const result = computeDistanceByTiles('a2', 'f6');

  t.is(
    result.direction,
    '',
    'this direction is not supported but can compute distance'
  );

  t.false(result.contact);
  t.is(result.file, 5);
  t.is(result.rank, 4);
});
