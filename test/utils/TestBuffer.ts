import { expect } from 'chai';

import { concat, encode } from '../../src/Buffer';
import { describeLeaks, itLeaks } from '../helpers/async';

describeLeaks('buffer utils', async () => {
  describeLeaks('concat', async () => {
    itLeaks('should append chunk buffers', async () => {
      expect(concat([
        Buffer.from('hello'),
        Buffer.from('world'),
      ])).to.deep.equal(Buffer.from('helloworld'));
    });
  });

  describeLeaks('encode', async () => {
    itLeaks('should encode chunk buffers', async () => {
      expect(encode([
        Buffer.from('hello world'),
      ], 'utf-8')).to.equal('hello world');
    });

    itLeaks('should encode no buffers', async () => {
      expect(encode([], 'utf-8')).to.equal('');
    });

    itLeaks('should encode empty buffers', async () => {
      expect(encode([
        new Buffer(0),
      ], 'utf-8')).to.equal('');
    });
  });
});
