export const DEFAULT_TRIM = 8;

/**
 * Prefix `val` with `fill` until it is at least `min` characters.
 *
 * @public
 */
export function leftPad(val: string, min = DEFAULT_TRIM, fill = '0'): string {
  if (val.length < min) {
    const len = min - val.length;
    const pre = Array(len).fill(fill).join('').slice(0, len);
    return `${pre}${val}`;
  } else {
    return val;
  }
}

/**
 * Return the start of `val`, up to `max` characters. If `val` is longer than `max` and there is room,
 * suffix with `tail`.
 *
 * @public
 */
export function trim(val: string, max: number, tail = '...'): string {
  if (val.length <= max) {
    return val;
  }

  if (max < tail.length) {
    return val.substr(0, max);
  }

  const start = val.substr(0, max - tail.length);
  return `${start}${tail}`;
}
