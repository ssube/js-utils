import { expect } from 'chai';

import { defer, deferValue, timeout } from '../../src/Async';
import { TimeoutError } from '../../src/error/TimeoutError';

const TEST_DEFER = 10;
const TEST_TOO_LONG = 25;

describe('async utils', async () => {
  describe('defer', async () => {
    it('should resolve', async () => expect(defer(TEST_DEFER)).to.eventually.equal(undefined));
  });

  describe('defer value', async () => {
    it('should resolve to the given value', async () => expect(deferValue(TEST_DEFER, true)).to.eventually.equal(true));
  });

  describe('timeout', async () => {
    it('should reject slow promises', async () => expect(timeout(TEST_DEFER, defer(TEST_TOO_LONG))).to.eventually.be.rejectedWith(TimeoutError));
  });
});
