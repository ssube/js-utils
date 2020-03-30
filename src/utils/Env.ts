const ENV_DEBUG = 'DEBUG';

export function isDebug() {
  return Reflect.has(process.env, ENV_DEBUG);
}
