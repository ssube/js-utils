import { expect } from 'chai';

import { defer, timeout } from '../../src/utils/Async';
import { describeLeaks, itLeaks } from '../helpers/async';
import { TimeoutError } from '../../src';

describeLeaks('async utils', async () => {
  describeLeaks('defer', async () => {
    itLeaks('should resolve', async () => expect(defer(10, true)).to.eventually.equal(true));
  });

  describeLeaks('timeout', async () => {
    itLeaks('should reject slow promises', async () => expect(timeout(10, defer(20))).to.eventually.be.rejectedWith(TimeoutError));
  });
});
