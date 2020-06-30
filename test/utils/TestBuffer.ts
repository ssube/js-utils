import { expect } from 'chai';

import { concat, encode } from '../../src/Buffer';

describe('buffer utils', async () => {
  describe('concat', async () => {
    it('should append chunk buffers', async () => {
      expect(concat([
        Buffer.from('hello'),
        Buffer.from('world'),
      ])).to.deep.equal(Buffer.from('helloworld'));
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
