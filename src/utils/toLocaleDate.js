/**
 * Convert to date to local string
 * @param  {Date|string} date
 * @return {String}
 */
function toLocaleDate(date) {
  return new Date(date).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
}

export default toLocaleDate;
