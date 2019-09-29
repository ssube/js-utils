import { expect } from 'chai';
import { spy } from 'sinon';

import { main } from '../src/app';
import { describeLeaks, itLeaks } from './helpers/async';

describeLeaks('app', async () => {
  itLeaks('should log a message', async () => {
    /* tslint:disable-next-line:no-console no-unbound-method */
    const logSpy = spy(console, 'log');

    await main([]);

    expect(logSpy).to.have.callCount(1);
  });
});
