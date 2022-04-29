import { compose, prop } from 'ramda';
import parseCode from './parseCode';

export default function snapshotToTiles(snapshot) {
  return snapshot.map(compose(prop('tileName'), parseCode));
}
