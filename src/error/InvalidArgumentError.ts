import { BaseError } from 'noicejs';

/**
 * Error indicating that an invalid argument was passed to a function call.
 *
 * @public
 */
export class InvalidArgumentError extends BaseError {
  constructor(msg = 'invalid argument passed', ...nested: Array<Error>) {
    super(msg, ...nested);
  }
}
