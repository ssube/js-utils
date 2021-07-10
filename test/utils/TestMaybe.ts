/* eslint-disable no-magic-numbers */
import { expect } from 'chai';

import { NotFoundError } from '../../src/error/NotFoundError';
import { defaultWhen, mustDefault, mustFind, removeNone } from '../../src/Maybe';

describe('utils', async () => {
  describe('remove none', async () => {
    it('should remove items that are none', async () => {
      // eslint-disable-next-line no-null/no-null
      expect(removeNone([1, undefined, 2, null, 3])).to.deep.equal([1, 2, 3]);
    });
  });

  describe('must find helper', async () => {
    it('should return matching item', async () => {
      expect(mustFind([1, 2, 3], (val) => (val % 2) === 0)).to.equal(2);
    });

    it('should throw if no item matches', async () => {
      expect(() => {
        mustFind([1, 2, 3], (val) => val === 4);
      }).to.throw(NotFoundError);
    });
  });

  describe('default when', async () => {
    it('should return the first item when the condition is true', async () => {
      expect(defaultWhen(true, 1, 2)).to.equal(1);
    });

    it('should return the second item otherwise', async () => {
      expect(defaultWhen(false, 1, 2)).to.equal(2);
    });
  });

  describe('must default helper', async () => {
    /* eslint-disable no-null/no-null */
    it('should return the first existent value', async () => {
      expect(mustDefault(null, null, 3, null)).to.equal(3);
      expect(mustDefault(null, null, undefined, 'string')).to.equal('string');
      expect(mustDefault(null, undefined, [], null)).to.deep.equal([]);
    });
    /* eslint-enable no-null/no-null */
  });
});
