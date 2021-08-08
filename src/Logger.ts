import { ConsoleLogger, Logger, NullLogger } from 'noicejs';
import { isDebug } from './Env';

/**
 * Get a test logger. Returns a null logger unless `verbose` is true or run under debug mode.
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
 * @todo ensure all methods are present by extending null logger
 */
export function spyLogger(spies: Partial<Logger>): Logger {
  const logger = {
    ...spies,
    child: () => logger,
  } as Logger;

  return logger;
}
