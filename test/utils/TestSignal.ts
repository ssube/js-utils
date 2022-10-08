import { expect } from 'chai';

import { timeout } from '../../src/Async.js';
import { signal, SIGNAL_RESET } from '../../src/Signal.js';

const MAX_SIGNAL_TIME = 500;

describe('signal utils', async () => {
  it('should wait for a signal', async () => {
    const signalPromise = signal(SIGNAL_RESET);

    process.kill(process.pid, SIGNAL_RESET);
    await timeout(MAX_SIGNAL_TIME, signalPromise);

    const signalValue = await signalPromise;

    expect(signalValue).to.equal(SIGNAL_RESET);
  });
});
