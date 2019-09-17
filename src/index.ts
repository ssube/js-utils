import { createApp } from './app';

/**
 * This is the main entry-point to the program and the only file not included in the main bundle.
 *
 * Keep the main method minimal, since this file cannot be tested.
 */
const STATUS_SUCCESS = 0;
const STATUS_ERROR = 1;

async function main(argv: Array<string>): Promise<number> {
  await createApp();
  return STATUS_SUCCESS;
}

main(process.argv).then((status) => process.exit(status)).catch((err: Error) => {
  /* tslint:disable-next-line:no-console */
  console.error('uncaught error during main:', err);
  process.exit(STATUS_ERROR);
});
