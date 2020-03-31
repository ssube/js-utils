import { BaseError } from 'noicejs';

/**
 * Error indicating that a promise timed out.
 *
 * @public
 */
export class TimeoutError extends BaseError {
  constructor(msg = 'operation timed out', ...nested: Array<Error>) {
    super(msg, ...nested);
  }
}
