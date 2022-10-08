import { expect } from 'chai';

import { ChildProcessError } from '../../src/error/ChildProcessError.js';
import { InvalidArgumentError } from '../../src/error/InvalidArgumentError.js';
import { MissingKeyError } from '../../src/error/MissingKeyError.js';
import { NotFoundError } from '../../src/error/NotFoundError.js';
import { NotImplementedError } from '../../src/error/NotImplementedError.js';
import { TimeoutError } from '../../src/error/TimeoutError.js';

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
      it('should have a message', async () => {
        const err = new errorType();
        expect(err.message).to.not.equal('');
      });

      it('should include nested errors in the stack trace', async () => {
        const inner = new Error('inner error');
        const err = new errorType('outer error', inner);
        expect(err.stack).to.include('inner', 'inner error message').and.include('outer', 'outer error message');
      });

      it('should have the nested error', async () => {
        const inner = new Error('inner error');
        const err = new errorType('outer error', inner);
        expect(err.cause()).to.equal(inner);
        expect(err.length).to.equal(1);
      });
    });
  }
});
