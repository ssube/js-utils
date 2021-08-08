import { NotFoundError } from './error/NotFoundError';
import { PredicateC1 } from './Predicate';

/**
 * Unset value.
 *
 * @public
 */
/* eslint-disable-next-line @typescript-eslint/ban-types */
export type None = null | undefined;

/**
 * Value that may be nil.
 *
 * @public
 */
export type Maybe<T> = T | None;

/**
 * Typeguard to check if a `Maybe` is `None` (null or undefined).
 *
 * @public
 */
export function isNone<T>(val: Maybe<T>): val is None {
  /* eslint-disable-next-line no-null/no-null */
  return val === null || val === undefined;
}

/**
 * Typeguard to check if a `Maybe` is `Some` value (not `None`).
 *
 * @public
 */
export function isSome<T>(val: Maybe<T>): val is T {
  return isNone(val) === false;
}

/**
 * Check if a variable is some `T`.
 *
 * @public
 */
export function doesExist<T>(val: Maybe<T>): val is T {
  return isNone(val) === false;
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
 * Assert that a variable is not `None` and return the value.
 * Throw if it is `None`.
 *
 * @throws NotFoundError
 * @returns val
 *
 * @public
 */
export function mustExist<T>(val: Maybe<T>, err?: string): T {
  if (isNone(val)) {
    throw new NotFoundError(err);
  }

  return val;
}

/**
 * Return the first value that is not nil.
 *
 * @public
 * @deprecated
 */
export function mustCoalesce<T>(...values: Array<Maybe<T>>): T {
  return mustDefault(...values);
}

/**
 * Return the first value that is some `T`. Throw if they are all `None`.
 *
 * @public
 */
export function mustDefault<T>(...values: Array<Maybe<T>>): T {
  return mustFind(values, doesExist);
}

/**
 * Find a value matching the given predicate or throw.
 *
 * @public
 */
export function mustFind<TVal>(list: Array<Maybe<TVal>>, predicate: PredicateC1<TVal>): TVal {
  const val = removeNone(list).find(predicate);
  return mustExist(val);
}

/**
 * Remove any null or undefined items from the list.
 *
 * @public
 */
export function removeNone<TItem>(list: ArrayLike<Maybe<TItem>>): Array<TItem> {
  return Array.from(list).filter(doesExist);
}
