import { isFunction } from 'lodash';

import { doesExist, isNil } from './Maybe';

/* eslint-disable-next-line @typescript-eslint/ban-types */
type Reflectable = object;

type Method<TClass> = (this: TClass, ...args: Array<unknown>) => unknown;

/**
 * Get the constructor from an instance.
 *
 * @public
 */
export function getConstructor(val: Reflectable) {
  return val.constructor;
}

/**
 * Get the methods from an instance and its prototypes.
 *
 * @public
 */
export function getMethods<TValue extends Reflectable>(value: TValue): Set<Method<TValue>> {
  const methods = new Set<Method<TValue>>();

  for (const name of Object.getOwnPropertyNames(value)) {
    const desc = Object.getOwnPropertyDescriptor(value, name);
    if (isNil(desc)) {
      continue;
    }

    const method = desc.value;
    if (isFunction(method)) {
      methods.add(method);
    }
  }

  const proto = Reflect.getPrototypeOf(value);
  if (proto !== value && doesExist(proto)) {
    for (const m of getMethods(proto)) {
      methods.add(m);
    }
  }

  return methods;
}

/**
 * Get the constructor name from an instance.
 *
 * @public
 */
export function constructorName(val: Reflectable) {
  return getConstructor(Reflect.getPrototypeOf(val)).name;
}
