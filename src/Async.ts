import { TimeoutError } from './error/TimeoutError';
import { PredicateC0 } from './Predicate';

/**
 * Resolve after a set amount of time.
 *
 * @public
 */
export function defer(ms: number): Promise<void> {
  return new Promise((res, _rej) => {
    setTimeout(() => {
      res();
    }, ms);
  });
}

/**
 * Resolve with the given value, after a set amount of time.
 *
 * @public
 */
export function deferValue<T>(ms: number, val: T): Promise<T> {
  return new Promise((res, _rej) => {
    setTimeout(() => {
      res(val);
    }, ms);
  });
}

/**
 * Reject after a set amount of time if the original promise has not yet resolved.
 *
 * @public
 */
export function timeout<T>(ms: number, inner: Promise<T>): Promise<T> {
  const limit = new Promise<T>((_res, rej) => {
    setTimeout(() => {
      rej(new TimeoutError());
    }, ms);
  });

  return Promise.race([limit, inner]);
}

/**
 * Resolve if `cb` returns true within `max` tries, otherwise reject with a `TimeoutError`.
 *
 * @public
 * @throws TimeoutError
 */
export async function deferUntil(cb: PredicateC0, step: number, max: number): Promise<void> {
  let count = 0;
  while (count < max) {
    await defer(step);
    if (cb()) {
      return;
    }
    count += 1;
  }

  throw new TimeoutError();
}

/**
 * @public
 * @deprecated
 */
export async function waitFor(cb: PredicateC0, step: number, tries: number): Promise<void> {
  return deferUntil(cb, step, tries);
}
