import { ConsoleLogger, Logger, NullLogger } from 'noicejs';

const ENV_DEBUG = 'DEBUG';

export function getTestLogger(verbose = false): Logger {
  if (verbose || process.env[ENV_DEBUG] === 'TRUE') {
    return new ConsoleLogger();
  } else {
    return new NullLogger();
  }
}

export function spyLogger(spies: Partial<Logger>): Logger {
  const logger = {
    ...spies,
    child: () => logger,
  } as Logger;
  return logger;
}
