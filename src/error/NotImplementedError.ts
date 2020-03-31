import { BaseError } from 'noicejs';

/**
 * Error indicating that a function has not been implemented yet.
 *
 * @public
 */
export class NotImplementedError extends BaseError {
  constructor(msg = 'method not implemented', ...nested: Array<Error>) {
    super(msg, ...nested);
  }
}
