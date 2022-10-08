/* eslint-disable no-magic-numbers */
import { expect } from 'chai';
import { anything, array, boolean, integer, tuple } from 'fast-check';
import { over } from 'mocha-foam';

import { NotFoundError } from '../../src/error/NotFoundError.js';
import { defaultWhen, doesExist, isNone, isSome, mustCoalesce, mustDefault, mustFind, removeNone } from '../../src/Maybe.js';
import { isNil } from '../../src/Optional.js';

describe('maybe utils', () => {
  describe('remove none', () => {
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

  describe('default when', () => {
    it('should return the first item when the condition is true', async () => {
      expect(defaultWhen(true, 1, 2)).to.equal(1);
    });

    it('should return the second item otherwise', async () => {
      expect(defaultWhen(false, 1, 2)).to.equal(2);
    });

    over('random values', tuple(boolean(), integer(), integer()), (it) => {
      it('should switch on the first arg', ([c, a, b]) => {
        expect(defaultWhen(c, a, b)).to.equal(c ? a : b);
      });
    });
  });

  describe('must default helper', () => {
    /* eslint-disable no-null/no-null */
    it('should return the first existent value', async () => {
      expect(mustDefault(null, null, 3, null)).to.equal(3);
      expect(mustDefault(null, null, undefined, 'string')).to.equal('string');
      expect(mustDefault(null, undefined, [], null)).to.deep.equal([]);
    });
    /* eslint-enable no-null/no-null */

    over('arrays of values', array(integer({ min: 1 }), {
      minLength: 1,
      maxLength: 100,
    }), (it) => {
      it('should return the first truthy value', (val) => {
        expect(mustDefault(...val)).to.equal(val[0]);
      });

      it('should be a synonym for deprecated coalesce helper', (val) => {
        expect(mustDefault(...val)).to.deep.equal(mustCoalesce(...val));
      });
    });
  });

  describe('is none guard', () => {
    over('any value', anything(), (it) => {
      it('should be the inverse of the some guard', (val) => {
        expect(isSome(val)).not.to.equal(isNone(val));
      });
    }, {
      numRuns: 1_000,
    });
  });

  describe('is nil guard', () => {
    over('any value', anything(), (it) => {
      it('should be an alias for is none', async (x) => {
        expect(isNone(x)).to.equal(isNil(x));
      });
    });
  });

  describe('is some guard', () => {
    over('any value', anything(), (it) => {
      it('should be a synonym for does exist', (val) => {
        expect(isSome(val)).to.equal(doesExist(val));
      });
    }, {
      numRuns: 1_000,
    });
  });
});
