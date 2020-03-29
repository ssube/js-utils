import { expect } from 'chai';

import { ChildProcessError } from '../../../js-utils/src/error/ChildProcessError';
import { InvalidArgumentError } from '../../../js-utils/src/error/InvalidArgumentError';
import { MissingKeyError } from '../../../js-utils/src/error/MissingKeyError';
import { NotFoundError } from '../../src/error/NotFoundError';
import { NotImplementedError } from '../../../js-utils/src/error/NotImplementedError';
import { TimeoutError } from '../../../js-utils/src/error/TimeoutError';

const errors = [
  ChildProcessError,
  InvalidArgumentError,
  MissingKeyError,
  NotFoundError,
  NotImplementedError,
  TimeoutError,
];

describe('errors', () => {
  for (const errorType of errors) {
    describe(errorType.name, () => {
      it('should have a message', () => {
        const err = new errorType();
        expect(err.message).to.not.equal('');
      });

      it('should include nested errors in the stack trace', () => {
        const inner = new Error('inner error');
        const err = new errorType('outer error', inner);
        expect(err.stack).to.include('inner', 'inner error message').and.include('outer', 'outer error message');
      });

      it('should have the nested error', () => {
        const inner = new Error('inner error');
        const err = new errorType('outer error', inner);
        expect(err.cause()).to.equal(inner);
        expect(err.length).to.equal(1);
      });
    });
  }
});
