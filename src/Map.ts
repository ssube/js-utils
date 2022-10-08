import { mergeArrays, toArray } from './Array.js';
import { NotFoundError } from './error/NotFoundError.js';
import { doesExist, isNone, Maybe, mustExist } from './Maybe.js';

export interface Dict<TVal> {
  [key: string]: TVal;
}

/**
 * A `Map` or dictionary object with string keys and `TVal` values.
 *
 * @public
 */
export type MapLike<TVal> = Map<string, TVal> | Dict<TVal>;

/**
 * Get an element from a Map and guard against nil values.
 *
 * @public
 */
export function mustGet<TKey, TVal>(map: Map<TKey, TVal>, key: TKey): TVal {
  const val = map.get(key);
  return mustExist(val);
}

/**
 * Get a map key or default value when the key does not exist or is nil.
 *
 * @public
 */
export function getOrDefault<TKey, TVal>(map: Map<TKey, TVal>, key: TKey, defaultValue: TVal): TVal {
  if (map.has(key)) {
    const data = map.get(key);
    if (doesExist(data)) {
      return data;
    }
  }

  return defaultValue;
}

/**
 * Get the first element from the specified key within a map of lists.
 *
 * @public
 */
export function getHead<TKey, TVal>(map: Map<TKey, ReadonlyArray<TVal>>, key: TKey): TVal {
  const value = map.get(key);
  if (isNone(value) || value.length === 0) {
    throw new NotFoundError();
  }
  return value[0];
}

/**
 * Get the first element from the specified key, within a map of lists, or a default value when
 * the key does not exist or is nil.
 *
 * @public
 */
export function getHeadOrDefault<TKey, TVal>(map: Map<TKey, ReadonlyArray<Maybe<TVal>>>, key: TKey, defaultValue: TVal): TVal {
  if (map.has(key) === false) {
    return defaultValue;
  }

  const data = map.get(key);
  if (isNone(data)) {
    return defaultValue;
  }

  const [head] = data;
  if (isNone(head)) {
    return defaultValue;
  }

  return head;
}

/**
 * Set a map key to a new array or push to the existing value.
 * @param map The destination map and source of existing values.
 * @param key The key to get and set.
 * @param val The value to add.
 *
 * @public
 */
export function setOrPush<TKey, TVal>(map: Map<TKey, ReadonlyArray<TVal>>, key: TKey, val: TVal | ReadonlyArray<TVal>): Map<TKey, ReadonlyArray<TVal>> {
  const prev = map.get(key);
  if (doesExist(prev)) {
    map.set(key, mergeArrays(prev, val));
  } else {
    map.set(key, toArray(val));
  }
  return map;
}

/**
 * Merge the `source` map into the `target` map, replacing keys that already exist.
 *
 * @public
 */
export function mergeMap<TKey, TVal>(target: Map<TKey, TVal>, source: Map<TKey, TVal> | ReadonlyArray<[TKey, TVal]>): Map<TKey, TVal> {
  for (const [k, v] of source) {
    target.set(k, v);
  }

  return target;
}

/**
 * Merge the provided maps into a new map, merging keys that already exist by pushing new items.
 *
 * @public
 */
export function pushMergeMap<TKey, TVal>(...args: Array<Map<TKey, TVal | Array<TVal>>>): Map<TKey, Array<TVal>>;
/**
 * Merge the provided maps into a new map, merging keys that already exist by pushing new items.
 *
 * @public
 */
export function pushMergeMap<TKey, TVal>(...args: ReadonlyArray<Map<TKey, TVal | ReadonlyArray<TVal>>>): Map<TKey, ReadonlyArray<TVal>>;
export function pushMergeMap<TKey, TVal>(...args: ReadonlyArray<Map<TKey, TVal | ReadonlyArray<TVal>>>): Map<TKey, ReadonlyArray<TVal>> {
  const out = new Map();
  for (const arg of args) {
    for (const [key, val] of arg) {
      setOrPush(out, key, val);
    }
  }
  return out;
}

/**
 * Clone a map or map-like object into a new map.
 *
 * @public
 */
export function makeMap<TVal>(val: Maybe<MapLike<TVal>>): Map<string, TVal> {
  // none: empty map
  if (isNone(val)) {
    return new Map();
  }

  // already a map: make a copy
  if (val instanceof Map) {
    return new Map(val.entries());
  }

  // otherwise: dict
  return new Map(Object.entries(val));
}

/**
 * Turns a map or dict into a dict
 *
 * @public
 */
export function makeDict<TVal>(map: Maybe<MapLike<TVal>>): Dict<TVal> {
  if (isNone(map)) {
    return {};
  }

  if (map instanceof Map) {
    const result: Dict<TVal> = {};
    for (const [key, val] of map) {
      result[key] = val;
    }
    return result;
  }

  return map;
}

export interface NameValuePair<TVal> {
  name: string;
  value: TVal;
}

/**
 * Turns a list of name-value pairs into a map.
 *
 * @public
 */
export function pairsToMap<TVal>(pairs: ReadonlyArray<NameValuePair<TVal>>): Map<string, TVal> {
  const map = new Map();
  for (const p of pairs) {
    map.set(p.name, p.value);
  }
  return map;
}

export function dictValuesToArrays<TVal>(map: MapLike<TVal>): Dict<Array<TVal>> {
  const data: Dict<Array<TVal>> = {};
  for (const [key, value] of entriesOf(map)) {
    if (Array.isArray(value)) {
      data[key] = value;
    } else {
      data[key] = [value];
    }
  }

  return data;
}

/**
 * Normalize a map-like of values into a dict of lists of strings.
 *
 * @public
 * @deprecated
 */
export function normalizeMap(map: MapLike<unknown>): Dict<Array<string>> {
  const data: Dict<Array<string>> = {};
  for (const [key, value] of makeMap(map)) {
    // eslint-disable-next-line no-restricted-syntax
    if (Array.isArray(value)) {
      data[key] = value;
    // eslint-disable-next-line no-restricted-syntax
    } else if (typeof value === 'string') {
      data[key] = [value];
    // eslint-disable-next-line no-restricted-syntax
    } else if (typeof value === 'number') {
      data[key] = [value.toString()];
    } else if (typeof value === 'object' && doesExist(value)) {
      data[key] = [value.toString()];
    }
  }

  return data;
}

/**
 * Get entries of a map-like.
 *
 * @public
 */
export function entriesOf<TVal>(map: Maybe<MapLike<TVal>>): Array<[string, TVal]> {
  if (map instanceof Map) {
    return Array.from(map.entries());
  }

  if (map instanceof Object) {
    return Object.entries(map);
  }

  return [];
}
