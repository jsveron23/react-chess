import { curry, includes } from 'ramda';

/**
 * Detect tile on the way
 * @param  {String}  tileName
 * @param  {Array}   movableTiles
 * @return {Boolean}
 */
function detectTileOTW(tileName, movableTiles) {
  return includes(tileName, movableTiles);
}

export default curry(detectTileOTW);
