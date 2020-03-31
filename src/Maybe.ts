import { NotFoundError } from './error/NotFoundError';
import { PredicateC1 } from './Predicate';

/**
 * Unset value.
 *
 * @public
 */
/* eslint-disable-next-line @typescript-eslint/ban-types */
export type Nil = null | undefined;

/**
 * Value that may be nil.
 *
 * @public
 */
export type Optional<T> = T | Nil;

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
 * Remove any null or undefined items from the list.
 *
 * @public
 */
export function filterNil<TItem>(list: ArrayLike<Optional<TItem>>): Array<TItem> {
  return Array.from(list).filter(doesExist);
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
