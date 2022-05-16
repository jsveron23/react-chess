import test from 'ava';
import parseCode from '../parseCode';

test('Should return plain object if given code is not valid', (t) => {
  t.deepEqual(parseCode(), {});
  t.deepEqual(parseCode('Pa2'), {});
});

test('Should return object that parsed given code', (t) => {
  t.deepEqual(parseCode('wPa2'), {
    pKey: 'wP',
    tileName: 'a2',
    code: 'wPa2',
    side: 'w',
    piece: 'P',
    fileName: 'a',
    rankName: '2',
  });
});
