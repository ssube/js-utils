import { expect } from 'chai';
import sinon from 'sinon';

import { main } from '../src/app.js';

const { spy } = sinon;

describe('app', async () => {
  it('should log a message', async () => {
    /* tslint:disable-next-line:no-console no-unbound-method */
    const logSpy = spy(console, 'log');

    await main([]);

    expect(logSpy).to.have.callCount(1);
  });
});
