import { curry, indexOf, flip } from 'ramda';
import parseCode from './parseCode';
import { File, Rank } from '../presets';

/**
 * Compute distance
 * @param  {String} aCode
 * @param  {String} bCode
 * @return {Object}
 */
function computeDistant(aCode, bCode) {
  const { fileName: aFn, rankName: aRn } = parseCode(aCode);
  const { fileName: dFn, rankName: dRn } = parseCode(bCode);
  const _idxOfF = flip(indexOf)(File);
  const _idxOfR = flip(indexOf)(Rank);

  return {
    file: Math.abs(_idxOfF(aFn) - _idxOfF(dFn)),
    rank: Math.abs(_idxOfR(Number(aRn)) - _idxOfR(Number(dRn))),
  };
}

export default curry(computeDistant);
