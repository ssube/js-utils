import { VERSION_INFO } from './version';

export async function createApp(): Promise<void> {
  // tslint:disable-next-line:no-console
  console.log('Hello World!', VERSION_INFO);
}
