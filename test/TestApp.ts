import { expect } from 'chai';
import { spy } from 'sinon';

import { describeLeaks, itLeaks } from './helpers/async';
import { createApp } from '../src/app';

describeLeaks('app', async () => {
  itLeaks('should log a message', async () => {
    const logSpy = spy(console.log);

    await createApp();

    expect(logSpy).to.have.callCount(1);
  });
});
