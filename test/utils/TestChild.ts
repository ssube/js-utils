import { expect } from 'chai';

import { ChildProcessError } from '../../src';
import { ChildStreams, waitForChild } from '../../src/Child';
import { Maybe, mustExist } from '../../src/Maybe';

type Closer = (status: number) => Promise<void>;

function createChild(): ChildStreams & { closer: Maybe<Closer> } {
  return {
    closer /* Maybe<Closer> */ : undefined,
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

describe('child process utils', async () => {
  describe('wait for child helper', async () => {
    it('should read stdout data', async () => {
      const child = createChild();

      const resultPromise = waitForChild(child);
      await mustExist(child.closer)(0);

      const result = await resultPromise;
      expect(result.status).to.equal(0);
    });

    it('should read stderr data');
    it('should resolve on success status');

    it('should reject on failure status', async () => {
      const child = createChild();

      const resultPromise = waitForChild(child);
      await mustExist(child.closer)(1);

      return expect(resultPromise).to.eventually.be.rejectedWith(ChildProcessError);
    });
  });
});
