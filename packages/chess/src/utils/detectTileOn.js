import { curry, includes } from 'ramda';

/**
 * Detect tile on movable tiles
 * @param  {String}  tileName
 * @param  {Array}   movableTiles
 * @return {Boolean}
 */
function detectTileOn(tileName, movableTiles) {
  return includes(tileName, movableTiles);
}

export default curry(detectTileOn);
