import { BaseError } from 'noicejs';

/**
 * Error indicating that a child process exited with an error status.
 *
 * @public
 */
export class ChildProcessError extends BaseError {
  constructor(msg = 'child process exited with error status', ...nested: Array<Error>) {
    super(msg, ...nested);
  }
}
