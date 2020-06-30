import { expect } from 'chai';

import { defer, timeout } from '../../src/Async';
import { TimeoutError } from '../../src/error/TimeoutError';

describe('async utils', async () => {
  describe('defer', async () => {
    it('should resolve', async () => expect(defer(10, true)).to.eventually.equal(true));
  });

  describe('timeout', async () => {
    it('should reject slow promises', async () => expect(timeout(10, defer(20))).to.eventually.be.rejectedWith(TimeoutError));
  });
});
