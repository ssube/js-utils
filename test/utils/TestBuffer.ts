import { expect } from 'chai';
import { array, uint8Array } from 'fast-check';
import { over } from 'mocha-foam';

import { concat, encode } from '../../src/Buffer';
import { sum } from '../../src/Math';

describe('buffer utils', async () => {
  describe('concat', async () => {
    it('should append chunk buffers', async () => {
      expect(concat([
        Buffer.from('hello'),
        Buffer.from('world'),
      ])).to.deep.equal(Buffer.from('helloworld'));
    });

    over('many chunk buffers', array(uint8Array().map((it) => Buffer.from(it.buffer))), (it) => {
      it('should be the sum of the chunk lengths', (chunks) => {
        const result = concat(chunks);
        const total = chunks.map((c) => c.length).reduce(sum, 0);
        expect(result.length).to.equal(total);
      });
    });
  });

  describe('encode', async () => {
    it('should encode chunk buffers', async () => {
      expect(encode([
        Buffer.from('hello world'),
      ], 'utf-8')).to.equal('hello world');
    });

    it('should encode no buffers', async () => {
      expect(encode([], 'utf-8')).to.equal('');
    });

    it('should encode empty buffers', async () => {
      expect(encode([
        new Buffer(0),
      ], 'utf-8')).to.equal('');
    });
  });
});
