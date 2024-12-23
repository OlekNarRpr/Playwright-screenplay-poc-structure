/**
 *
 * @param str check string if it's a number
 * @returns boolean
 *
 * @example
 * const one = "1,12";
 * const two = "1'123";
 * console.log(isNumber(one)); // Output: true
 * console.log(isNumber(three)); // Output: false
 *
 */

export function isNumber(str: string) {
  const num = parseFloat(str.replace(/,/g, ""));
  return !isNaN(num) && isFinite(num);
}

/**
 *
 * @param text check string for price format
 * @returns boolean
 *
 * @example
 * const one = "$1,412,123";
 * const two = "1,412";
 * console.log(isValidPriceFormat(one)); // Output: true
 * console.log(isValidPriceFormat(three)); // Output: false
 *
 */
export function isValidPriceFormat(text) {
  // Regular expression to match the desired format:
  // - Starts with '$'
  // - Followed by one or more digits
  // - Optionally followed by commas every three digits
  const regex = /^\$\d{1,3}(?:,\d{3})*$/;

  return regex.test(text);
}
