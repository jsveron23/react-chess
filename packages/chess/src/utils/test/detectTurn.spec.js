import test from 'ava';
import detectTurn from '../detectTurn';

test('Should throw TypeError', (t) => {
  t.throws(() => detectTurn('w', 'Pa2'), {
    instanceOf: TypeError,
  });
});

test('Should return boolean value', (t) => {
  t.true(detectTurn('white', 'wPa2'));
  t.false(detectTurn('white', 'bPa7'));
  t.true(detectTurn('black', 'bPa7'));
  t.false(detectTurn('black', 'wPa2'));
});
