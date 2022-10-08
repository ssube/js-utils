// deprecated alternative names for Maybe
import { isNone, Maybe, None } from './Maybe.js';

/**
 * Old name for None.
 *
 * @deprecated use `None` instead
 * @public
 */
export type Nil = None;

/**
 * Old name for Maybe.
 *
 * @deprecated use Maybe instead
 * @public
 */
export type Optional<T> = Maybe<T>;

/**
 * Check if a value is nil.
 *
 * @deprecated use `isNone` instead
 * @public
 */
export function isNil<T>(val: Maybe<T>): val is Nil {
  return isNone(val);
}
