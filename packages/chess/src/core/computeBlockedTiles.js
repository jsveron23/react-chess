import {
  compose,
  curry,
  reduce,
  keys,
  values,
  map,
  filter,
  flatten,
  intersection,
} from 'ramda';
import snapshotToTiles from './snapshotToTiles';
import groupDirectionTilesByCode from './groupDirectionTilesByCode';

/**
 * Compute blocked tiles
 * @param  {String} code
 * @param  {Array}  snapshot
 * @param  {Array}  movableTiles
 * @return {Array}
 *
 * @description
 * convert all axis to next tiles of piece movement (tilesGrp)
 * then comparing with placed tiles (placedTiles)
 * then get tiles by intersect with computed movable tiles
 */
function computeBlockedTiles(code, snapshot, movableTiles) {
  // generic direction group (tiles)
  const tilesGrp = groupDirectionTilesByCode(code);

  // change all code to tiles
  const placedTiles = snapshotToTiles(snapshot);

  return compose(
    // remain only movable tiles without blocked tiles
    // intersection(
    //   calculated actual movable tiles
    //   calculated generic blocked tiles,
    // )
    intersection(movableTiles),
    flatten,
    values,

    // until here, remove all blocked tiles and further tile
    reduce((acc, key) => {
      return {
        ...acc,
        [key]: compose(
          map((tiles) => {
            let lastIdx = -1;

            // ignore first tile also
            // compare with placedTiles(snapshot)
            const _ignoreTilesAfter = (tile) => {
              if (lastIdx === -1) {
                lastIdx = placedTiles.indexOf(tile);
              }

              if (lastIdx > -1) {
                return '';
              }

              return tile;
            };

            return compose(filter(Boolean), map(_ignoreTilesAfter))(tiles);
          }),
          values
        )(tilesGrp[key]),
      };
    }, {}),
    keys
  )(tilesGrp);
}

export default curry(computeBlockedTiles);
