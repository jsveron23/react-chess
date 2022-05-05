import { isEmpty } from 'ramda';

/**
 * Validate snapshot
 * @param  {Array}   snapshot
 * @return {Boolean}
 */
function validateSnapshot(snapshot) {
  return snapshot && Array.isArray(snapshot) && !isEmpty(snapshot);
}

export default validateSnapshot;
