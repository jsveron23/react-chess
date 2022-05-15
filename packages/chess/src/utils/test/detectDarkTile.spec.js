import test from 'ava';
import detectDarkTile from '../detectDarkTile';

test('Should throw Error', (t) => {
  t.throws(() => detectDarkTile('', 2), {
    instanceOf: TypeError,
  });
  t.throws(() => detectDarkTile('a', 0), {
    instanceOf: TypeError,
  });
});

test('Should return function (curry)', (t) => {
  t.is(typeof detectDarkTile(), 'function');
  t.is(typeof detectDarkTile('a'), 'function');
});

test('Should return boolean value', (t) => {
  t.false(detectDarkTile('a', 2));
  t.true(detectDarkTile('a', 3));
});
