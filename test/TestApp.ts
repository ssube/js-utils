import { expect } from 'chai';
import { spy } from 'sinon';

import { createApp } from '../src/app';
import { describeLeaks, itLeaks } from './helpers/async';

describeLeaks('app', async () => {
  itLeaks('should log a message', async () => {
    /* tslint:disable-next-line:no-console no-unbound-method */
    const logSpy = spy(console, 'log');

    await createApp();

    expect(logSpy).to.have.callCount(1);
  });
});
