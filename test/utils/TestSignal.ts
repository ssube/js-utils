import { expect } from 'chai';

import { timeout } from '../../src/Async';
import { signal, SIGNAL_RESET } from '../../src/Signal';
import { describeLeaks, itLeaks } from '../helpers/async';

const MAX_SIGNAL_TIME = 500;

describeLeaks('signal utils', async () => {
  itLeaks('should wait for a signal', async () => {
    const signalPromise = signal(SIGNAL_RESET);

    process.kill(process.pid, SIGNAL_RESET);
    await timeout(MAX_SIGNAL_TIME, signalPromise);

    const signalValue = await signalPromise;

    expect(signalValue).to.equal(SIGNAL_RESET);
  });
});
