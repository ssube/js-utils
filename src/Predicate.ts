export type SortAfter = 1;
export type SortBefore = -1;
export type SortEqual = 0;
export type SortOrder = SortAfter | SortBefore | SortEqual;

/**
 * Comparison predicate for arity 0 - constant.
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
 * Transform predicate for arity 0 - factory.
 * `() -> a`
 *
 * @beta
 */
export type PredicateR0<TVal> = () => TVal;

/**
 * Transform predicate for arity 1 - map.
 * `a -> b`
 *
 * @beta
 */
export type PredicateR1<RVal, TVal = RVal> = (val: TVal, idx: number, list: Array<TVal>) => RVal;

/**
 * Transform predicate for arity 2 - reduce.
 * `a -> a -> b`
 *
 * @beta
 */
export type PredicateR2<RVal, TVal = RVal> = (pval: TVal, nval: TVal, idx: number, list: Array<TVal>) => RVal;

/**
 * Add numbers.
 *
 * @implements PredicateR2<number, number>
 */
export function sum(a: number, b: number): number {
  return a + b;
}
