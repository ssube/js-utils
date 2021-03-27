import { InvalidArgumentError } from './error/InvalidArgumentError';
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
    if (typeof method === 'function') {
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
  const proto = Reflect.getPrototypeOf(val);
  if (isNil(proto)) {
    throw new InvalidArgumentError('value has no prototype');
  } else {
    return getConstructor(proto).name;
  }
}
