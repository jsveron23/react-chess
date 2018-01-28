/**
 * Set records
 * @param  {Array}  records
 * @return {Object}
 */
export function setRecords (records) {
  return {
    type: 'SET_RECORDS',
    payload: records
  }
}

/**
 * Reset records
 * @return {Object}
 */
export function resetRecords () {
  return {
    type: 'RESET_RECORDS'
  }
}
