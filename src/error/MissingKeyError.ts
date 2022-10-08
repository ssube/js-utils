import { NotFoundError } from './NotFoundError.js';

/**
 * Error indicating that a required key did not exist in a map-like.
 *
 * @public
 */
export class MissingKeyError extends NotFoundError {
  constructor(msg = 'missing key', ...nested: Array<Error>) {
    super(msg, ...nested);
  }
}
