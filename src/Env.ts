const ENV_DEBUG = 'DEBUG';

/**
 * Test if DEBUG mode is set.
 *
 * TODO: check variable value as well
 */
export function isDebug() {
  return Reflect.has(process.env, ENV_DEBUG);
}
