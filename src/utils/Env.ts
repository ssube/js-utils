export function isDebug() {
  return Reflect.has(process.env, 'DEBUG');
}
