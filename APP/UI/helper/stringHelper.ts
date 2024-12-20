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
