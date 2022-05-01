import {
  compose,
  curry,
  reduce,
  keys,
  values,
  map,
  filter,
  flatten,
} from 'ramda';
import snapshotToTiles from './snapshotToTiles';
import groupDirectionTilesByCode from './internal/groupDirectionTilesByCode';
import validateCode from '../utils/validateCode';
import validateSnapshot from '../utils/validateSnapshot';

// TODO change spec

/**
 * Compute generic movable tiles
 * @param  {String} code
 * @param  {Array}  snapshot
 * @return {Array}
 */
function computeMTByDirection(code, snapshot) {
  if (!validateCode(code) || !validateSnapshot(snapshot)) {
    throw new Error(`invalid argument | code: ${code} / snapshot: ${snapshot}`);
  }

  // generic direction group (tiles)
  const tilesGrp = groupDirectionTilesByCode(code);

  // change all code to tiles
  const placedTiles = snapshotToTiles(snapshot);

  return compose(
    flatten,
    values,

    // until here, remove all blocked tiles and further tile
    reduce((acc, key) => {
      return {
        ...acc,
        [key]: compose(
          map((tiles) => {
            let lastIdx = -1;

            return compose(
              filter(Boolean),
              map((tile) => {
                // ignore first tile also
                // compare with placedTiles(snapshot)
                //
                if (lastIdx === -1) {
                  lastIdx = placedTiles.indexOf(tile);
                }

                if (lastIdx > -1) {
                  return '';
                }

                return tile;
              })
            )(tiles);
          }),
          values
        )(tilesGrp[key]),
      };
    }, {}),
    keys
  )(tilesGrp);
}

export default curry(computeMTByDirection);
