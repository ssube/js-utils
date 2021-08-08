import { expect } from 'chai';
import sinon from 'sinon';

import { ChildProcessError } from '../../src';
import { ChildStreams, childResult } from '../../src/Child';
import { Maybe, mustExist } from '../../src/Maybe';

const { match, stub } = sinon;

type Closer = (status: number) => Promise<void>;

function createChild(): ChildStreams & { closer: Maybe<Closer> } {
  return {
    closer /* Maybe<Closer> */: undefined,
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
    it('should read exit status', async () => {
      const child = createChild();

      const resultPromise = childResult(child);
      await mustExist(child.closer)(0);

      const result = await resultPromise;
      expect(result.status).to.equal(0);
    });

    it('should reject on failure status', async () => {
      const child = createChild();

      const resultPromise = childResult(child);
      await mustExist(child.closer)(1);

      return expect(resultPromise).to.eventually.be.rejectedWith(ChildProcessError);
    });

    it('should read output', async () => {
      const child = createChild();
      stub(child.stdout, 'on').withArgs('data', match.func).yields(Buffer.from('hello'));

      const resultPromise = childResult(child);
      await mustExist(child.closer)(0);

      return expect(resultPromise).to.eventually.deep.equal({
        stderr: '',
        stdout: 'hello',
        status: 0,
      });
    });

    it('should reject on error output', async () => {
      const child = createChild();
      stub(child.stderr, 'on').withArgs('data', match.func).yields(Buffer.from('nope'));

      const resultPromise = childResult(child);
      await mustExist(child.closer)(0);

      return expect(resultPromise).to.eventually.be.rejectedWith(ChildProcessError);
    });
  });
});
