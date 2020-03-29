import { VERSION_INFO } from './version';

export async function main(argv: Array<string>): Promise<number> {
  /* eslint-disable-next-line no-console */
  console.log('Hello World!', VERSION_INFO, argv);
  return 1;
}
