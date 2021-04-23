/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
export function generateRandomString(length) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/**
 * Capitalize the first letter of each word
 */
export function toTitleCase(text) {
  return text
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}

/**
 * Format the duration of a song into min:sec i.e. 2:46
 * @param  {number} duration_ms The duration in milliseconds to conver
 * @return {string} The duration formatted in MM:SS form
 */
export function durationToMinSec(duration_ms) {
  const min = Math.floor(duration_ms / 1000 / 60);
  const sec = Math.floor(((duration_ms / 1000 / 60) % 1) * 60);
  return min + ':' + ('00' + sec).slice(-2);
}

/**
 * Convert a date object to date time string
 * @param   {Date} date A date object to convert
 * @returns {string} A string containing the date and local time
 */
export function dateToDateTimeString(date) {
  const todays_date = new Date().toLocaleDateString('en-US');
  if (date.toLocaleDateString('en-US') === todays_date) {
    const isPM = date.getHours() >= 12;
    var hours = isPM ? date.getHours() - 12 : date.getHours();
    hours = hours === 0 ? 12 : hours;

    return (
      ('00' + hours).slice(-2) +
      ':' +
      ('00' + date.getMinutes()).slice(-2) +
      ':' +
      ('00' + date.getSeconds()).slice(-2) +
      (isPM ? ' AM' : ' PM')
    );
  }

  return date.toLocaleDateString('en-US');
}
