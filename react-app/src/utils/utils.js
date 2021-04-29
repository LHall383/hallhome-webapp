import { DateTime, Duration } from 'luxon';

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
 * @param  {number} durationMs The duration in milliseconds to conver
 * @return {string} The duration formatted in MM:SS form
 */
export function durationToMinSec(durationMs) {
  const duration = Duration.fromMillis(durationMs);
  return duration.toFormat('m:ss');
}

/**
 * Convert ISO time string to date or time depending on range
 * @param {string} isoString ISO string
 * @returns {string} String containing time if ISO string is today, otherwise contains date string
 */
export function isoToTimeOrDate(isoString) {
  const dt = DateTime.fromISO(isoString);
  const now = DateTime.now();

  // If it is the same day, return a time string
  if (dt.startOf('day').toMillis() === now.startOf('day').toMillis()) {
    return dt.toLocaleString(DateTime.TIME_SIMPLE);
  }

  // Otherwise, return a date string
  return dt.toLocaleString();
}
