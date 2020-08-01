import { isNil, Optional } from './Maybe';

/**
 * Merge arguments, which may or may not be arrays, into one return that is definitely an array.
 *
 * @public
 */
export function mergeList<TItem>(...parts: Array<TItem | Array<TItem>>): Array<TItem>;
export function mergeList<TItem>(...parts: ReadonlyArray<TItem | ReadonlyArray<TItem>>): ReadonlyArray<TItem>;
export function mergeList<TItem>(...parts: ReadonlyArray<TItem | ReadonlyArray<TItem>>): ReadonlyArray<TItem> {
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

export function ensureArray<T>(val: Optional<Array<T>>): Array<T>;
export function ensureArray<T>(val: Optional<ReadonlyArray<T>>): ReadonlyArray<T>;
export function ensureArray<T>(val: Optional<ReadonlyArray<T>>): ReadonlyArray<T> {
  if (isNil(val)) {
    return [];
  } else {
    return Array.from(val);
  }
}

export function toList<TVal>(val: TVal | Array<TVal>): Array<TVal>;
export function toList<TVal>(val: TVal | ReadonlyArray<TVal>): ReadonlyArray<TVal>;
export function toList<TVal>(val: TVal | ReadonlyArray<TVal>): ReadonlyArray<TVal> {
  if (isList(val)) {
    return val;
  } else {
    return [val];
  }
}

/**
 * Wrapper for `Array.isArray` with better readonly type handling.
 */
export function isList<TVal>(list: TVal | Array<TVal>): list is Array<TVal>;
export function isList<TVal>(list: TVal | ReadonlyArray<TVal>): list is ReadonlyArray<TVal>;
export function isList<TVal>(list: TVal | ReadonlyArray<TVal>): list is ReadonlyArray<TVal> {
  return Array.isArray(list);
}

export function isEmpty(val: Optional<Array<unknown> | ReadonlyArray<unknown>>): boolean {
  return !Array.isArray(val) || val.length === 0;
}

export function filterMany<T1>(cb: (a: T1) => boolean, l1: Array<T1>): Array<T1>;
export function filterMany<T1, T2>(cb: (a: T1, b: T2) => boolean, l1: Array<T1>, l2: Array<T2>): [Array<T1>, Array<T2>];
export function filterMany<T1, T2, T3>(cb: (a: T1, b: T2) => boolean, l1: Array<T1>, l2: Array<T2>, l3: Array<T3>): [Array<T1>, Array<T2>, Array<T3>];
export function filterMany<T1, T2, T3, T4>(cb: (a: T1, b: T2) => boolean, l1: Array<T1>, l2: Array<T2>, l3: Array<T3>, l4: Array<T4>): [Array<T1>, Array<T2>, Array<T3>, Array<T4>];
export function filterMany(cb: (...d: Array<unknown>) => boolean, ...l: Array<Array<unknown>>): Array<Array<unknown>> {
  const results = [];
  for (let i = 0; i < l[0].length; ++i) {
    const slice = l.map((li) => li[i]);
    if (cb(...slice)) {
      results.push(slice);
    }
  }
  return results;
}
