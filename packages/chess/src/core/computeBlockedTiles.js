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
import _groupTilesByDirection from './internal/_groupTilesByDirection';

function computeBlockedTiles(code, snapshot, movableTiles) {
  // change all code to tiles
  const placedTiles = snapshotToTiles(snapshot);

  // generic direction group (tiles)
  const tilesGrp = _groupTilesByDirection(code);

  return compose(
    // remain only movable tiles
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
