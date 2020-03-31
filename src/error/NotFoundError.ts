import { BaseError } from 'noicejs';

/**
 * Error indicating that some value was not found.
 *
 * @public
 */
export class NotFoundError extends BaseError {
  constructor(msg = 'value not found', ...nested: Array<Error>) {
    super(msg, ...nested);
  }
}
