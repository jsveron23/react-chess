import test from 'ava';
import detectPiece from '../detectPiece';

test('Should return function (curry)', (t) => {
  t.is(typeof detectPiece(), 'function');
  t.is(typeof detectPiece(null), 'function');
});

test('Should return boolean value', (t) => {
  t.true(detectPiece('R', 'wRc4'));
  t.true(detectPiece('Q', 'bQc4'));
});
