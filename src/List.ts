import { isNil, Optional } from './Maybe';

/**
 * Merge arguments, which may or may not be arrays, into one return that is definitely an array.
 *
 * @public
 */
export function mergeList<TItem>(...parts: Array<TItem | Array<TItem>>): Array<TItem> {
  const out = [];

  for (const part of parts) {
    if (Array.isArray(part)) {
      out.push(...part);
    } else {
      out.push(part);
    }
  }

  return out;
}

/**
 * Test if a value is an array with some items (length > 0).
 *
 * This is not a general replacement for `.length > 0`, since it is also a typeguard:
 * `if (hasItems(val)) else { val }` will complain that `val` is `never` in the `else`
 * branch, since it was proven not to be an array by this function, even if `val` is
 * simply empty.
 */
export function hasItems<T>(val: Optional<Array<T>>): val is Array<T>;
export function hasItems<T>(val: Optional<ReadonlyArray<T>>): val is ReadonlyArray<T>;
export function hasItems<T>(val: Optional<ReadonlyArray<T>>): val is ReadonlyArray<T> {
  return (Array.isArray(val) && val.length > 0);
}

export function ensureArray<T>(val: Optional<Array<T>>): Array<T> {
  if (isNil(val)) {
    return [];
  } else {
    return Array.from(val);
  }
}
