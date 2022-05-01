import { compose, prop } from 'ramda';
import parseCode from './parseCode';
import validateSnapshot from '../utils/validateSnapshot';

export default function snapshotToTiles(snapshot) {
  if (!validateSnapshot(snapshot)) {
    return [];
  }

  return snapshot.map(compose(prop('tileName'), parseCode));
}
