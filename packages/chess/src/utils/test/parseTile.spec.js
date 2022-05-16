import test from 'ava';
import parseTile from '../parseTile';

test('Should return object that parsed given tile', (t) => {
  t.deepEqual(parseTile('a2'), {
    tileName: 'a2',
    fileName: 'a',
    rankName: '2',
  });
});
