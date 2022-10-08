import { InvalidArgumentError } from './error/InvalidArgumentError.js';
import { doesExist, isNone } from './Maybe.js';

/* eslint-disable-next-line @typescript-eslint/ban-types */
type Reflectable = object;

type Method<TClass> = (this: TClass, ...args: Array<unknown>) => unknown;

/**
 * Get the constructor from an instance.
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function getConstructor(val: Reflectable): Function {
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
    if (isNone(desc)) {
      continue;
    }

    const method = desc.value;
    if (typeof method === 'function') {
      methods.add(method);
    }
  }

  const proto = Reflect.getPrototypeOf(value);
  // eslint-disable-next-line no-restricted-syntax
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
export function constructorName(val: Reflectable): string {
  const proto = Reflect.getPrototypeOf(val);
  if (isNone(proto)) {
    throw new InvalidArgumentError('value has no prototype');
  } else {
    return getConstructor(proto).name;
  }
}
