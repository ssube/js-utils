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
