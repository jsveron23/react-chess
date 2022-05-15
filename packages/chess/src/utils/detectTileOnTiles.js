import { curry, includes } from 'ramda';

/**
 * Detect tile on movable tiles
 * @param  {String}  tile
 * @param  {Array}   movableTiles
 * @return {Boolean}
 */
function detectTileOnTiles(tile, movableTiles) {
  return includes(tile, movableTiles);
}

export default curry(detectTileOnTiles);
