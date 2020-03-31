import { expect } from 'chai';

import { ChildProcessError } from '../../src';
import { ChildStreams, waitForChild } from '../../src/Child';
import { mustExist, Optional } from '../../src/Maybe';
import { describeLeaks, itLeaks } from '../helpers/async';

type Closer = (status: number) => Promise<void>;

function createChild(): ChildStreams & { closer: Optional<Closer> } {
  return {
    closer /* Optional<Closer> */ : undefined,
    on(event: string, fn: Closer) {
      if (event === 'close') {
        this.closer = fn;
      }
    },
    stderr: {
      on() {
        /* noop */
      },
    },
    stdout: {
      on() {
        /* noop */
      },
    },
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } as any;
}

describeLeaks('child process utils', async () => {
  describeLeaks('wait for child helper', async () => {
    itLeaks('should read stdout data', async () => {
      const child = createChild();

      const resultPromise = waitForChild(child);
      await mustExist(child.closer)(0);

      const result = await resultPromise;
      expect(result.status).to.equal(0);
    });

    itLeaks('should read stderr data');
    itLeaks('should resolve on success status');

    itLeaks('should reject on failure status', async () => {
      const child = createChild();

      const resultPromise = waitForChild(child);
      await mustExist(child.closer)(1);

      return expect(resultPromise).to.eventually.be.rejectedWith(ChildProcessError);
    });
  });
});
