import { NotFoundError } from '../error/NotFoundError';

/**
 * Unset value.
 *
 * @public
 */
/* eslint-disable-next-line @typescript-eslint/ban-types */
export type Nil = null | undefined;

export type SortAfter = 1;
export type SortBefore = -1;
export type SortEqual = 0;
export type SortOrder = SortAfter | SortBefore | SortEqual;

/**
 * Value that may be nil.
 *
 * @public
 */
export type Optional<T> = T | Nil;

/**
 * Comparison predicate for arity 0 - assert?
 *
 * @beta
 */
export type PredicateC0 = () => boolean;

/**
 * Comparison predicate for arity 1 - filter.
 *
 * @beta
 */
export type PredicateC1<TVal> = (val: TVal, idx: number, list: Array<TVal>) => boolean;

/**
 * Comparison predicate for arity 2 - sort.
 *
 * @beta
 */
export type PredicateC2<TVal> = (pval: TVal, nval: TVal, idx: number, list: Array<TVal>) => SortOrder;

/**
 * Transform predicate for arity 0 - constructor.
 *
 * @beta
 */
export type PredicateR0<TVal> = () => TVal;

/**
 * Transform predicate for arity 1 - map.
 *
 * @beta
 */
export type PredicateR1<TVal> = (val: TVal, idx: number, list: Array<TVal>) => TVal;

/**
 * Transform predicate for arity 2 - reduce.
 *
 * @beta
 */
export type PredicateR2<TVal> = (pval: TVal, nval: TVal, idx: number, list: Array<TVal>) => TVal;

/**
 * Check if a value is nil.
 *
 * @public
 */
/* eslint-disable-next-line @typescript-eslint/ban-types */
export function isNil<T>(val: Optional<T>): val is Nil {
  /* eslint-disable-next-line no-null/no-null */
  return val === null || val === undefined;
}

/**
 * Calculate the "length" of an array or value.
 *
 * Arrays return their length, single values return 1, and nil values return 0.
 * This counts the number of elements that setOrPush would add.
 *
 * @public
 */
export function countOf(val: unknown): number {
  if (Array.isArray(val)) {
    return val.length;
  }

  if (doesExist(val)) {
    return 1;
  }

  return 0;
}

/**
 * Return the first element when `condition` is true and the second element when `condition` is false.
 *
 * @public
 */
export function defaultWhen<TVal>(condition: boolean, ...items: Array<TVal>): TVal {
  if (condition) {
    return items[0];
  } else {
    return items[1];
  }
}

/**
 * Remove any null or undefined items from the list.
 *
 * @public
 */
export function filterNil<TItem>(list: ArrayLike<Optional<TItem>>): Array<TItem> {
  return Array.from(list).filter(doesExist);
}

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
 * Find a value matching the given predicate or throw.
 *
 * @public
 */
export function mustFind<TVal>(list: Array<Optional<TVal>>, predicate: PredicateC1<TVal>): TVal {
  const val = filterNil(list).find(predicate);
  return mustExist(val);
}

/**
 * Check if a variable is not nil.
 *
 * @public
 */
export function doesExist<T>(val: Optional<T>): val is T {
  return !isNil(val);
}

/**
 * Assert that a variable is not nil and return the value.
 *
 * @throws NotFoundError
 * @returns val
 *
 * @public
 */
export function mustExist<T>(val: Optional<T>): T {
  if (isNil(val)) {
    throw new NotFoundError();
  }

  return val;
}

/**
 * Return the first value that is not nil.
 *
 * @public
 * @todo: rename to mustDefault
 */
export function mustCoalesce<T>(...values: Array<Optional<T>>): T {
  return mustFind(values, doesExist);
}
