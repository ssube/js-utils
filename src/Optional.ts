// deprecated alternative names for Maybe
import { isNone, Maybe, None } from '.';


/**
 * Old name for None.
 *
 * @deprecated
 * @public
 */
export type Nil = None;

/**
 * Old name for Maybe.
 *
 * @deprecated
 * @public
 */
export type Optional<T> = Maybe<T>;

/**
 * Check if a value is nil.
 *
 * @deprecated
 * @public
 */
export function isNil<T>(val: Maybe<T>): val is Nil {
  return isNone(val);
}
