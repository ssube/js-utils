import { ConsoleLogger, Logger, NullLogger } from 'noicejs';
import { isDebug } from './utils/Env';

export function getTestLogger(verbose = false): Logger {
  if (verbose || isDebug()) {
    return ConsoleLogger.global;
  } else {
    return NullLogger.global;
  }
}

export function spyLogger(spies: Partial<Logger>): Logger {
  const logger = {
    ...spies,
    child: () => logger,
  } as Logger;
  return logger;
}
