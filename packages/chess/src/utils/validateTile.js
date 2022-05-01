import { curry } from 'ramda';
import { File, Rank } from '../presets';

function validateTile(fileName, rankName) {
  return File.indexOf(fileName) > -1 && Rank.indexOf(Number(rankName)) > -1;
}

export default curry(validateTile);
