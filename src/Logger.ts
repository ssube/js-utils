import { ConsoleLogger, Logger, NullLogger } from 'noicejs';

import { isDebug } from './Env.js';

/**
 * Get a test logger. Returns a null logger unless `verbose` is true or run under debug mode.
 *
 * @public
 */
export function getTestLogger(verbose = false): Logger {
  if (verbose || isDebug()) {
    return ConsoleLogger.global;
  } else {
    return NullLogger.global;
  }
}

/**
 * Create a spy logger using the provided methods, which returns itself as a child.
 *
 * @internal
 */
export function spyLogger(spies: Partial<Logger>): Logger {
  // TODO: ensure all methods are present by extending null logger
  const logger = {
    ...spies,
    child: () => logger,
  } as Logger;

  return logger;
}
