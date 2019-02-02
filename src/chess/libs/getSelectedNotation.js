import { curry, compose, split } from 'ramda'
import { extract } from '~/utils'
import { parseSelected, getNotation } from './helpers'

/**
 * Get selection notation
 * @param  {Array}   notations
 * @param  {string?} selected
 * @return {Object}
 */
function getSelectedNotation (notations, selected) {
  const [selectedSide, selectedPiece, selectedFile, selectedRank] = compose(
    split(''),
    getNotation(notations),
    extract('selectedTile'),
    parseSelected
  )(selected)

  return { selectedSide, selectedPiece, selectedFile, selectedRank }
}

export default curry(getSelectedNotation)
