/**
 * Convert to date to local string
 * @param  {Date|string} date
 * @param  {Object?}     options
 * @return {String}
 */
function toLocaleDate(
  date,
  options = {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
) {
  return new Date(date).toLocaleDateString(undefined, options);
}

export default toLocaleDate;
