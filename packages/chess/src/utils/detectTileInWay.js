import { curry, includes } from 'ramda';

function detectTileInWay(tileName, movableTiles) {
  return includes(tileName, movableTiles);
}

export default curry(detectTileInWay);
