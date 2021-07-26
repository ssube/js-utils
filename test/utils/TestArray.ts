/* eslint-disable no-magic-numbers */
import { expect } from 'chai';
import { array, falsy, integer } from 'fast-check';
import { over } from 'mocha-foam';
import sinon from 'sinon';

import { isNone } from '../../src';
import { ensureArray, filterZip, hasItems, isEmpty, lengthOf, mergeArray, toArray } from '../../src/Array';
import { sum } from '../../src/Predicate';

const { match, stub } = sinon;

describe('list utils', async () => {
  describe('filter many helper', async () => {
    it('should call the predicate with an item from each list', async () => {
      const cb = stub().returns(true);
      const results = filterZip(cb, [1], ['a']);

      expect(results.length).to.equal(1);
      expect(cb).to.have.callCount(1);
      expect(cb).to.have.been.calledWithMatch(match.number, match.string);
    });

    it('should call the predicate for each slice', async () => {
      const data = [1, 2, 3, 4, 5];
      const cb = stub().returns(true);
      const results = filterZip(cb, data);

      expect(results.length).to.equal(data.length);
      expect(cb).to.have.callCount(data.length);
    });

    it('should keep slices that passed the predicate', async () => {
      const data = [1, 2, 3, 4, 5];
      const cb = stub().returns(false);
      const results = filterZip(cb, data);

      expect(results.length).to.equal(0);
      expect(cb).to.have.callCount(data.length);
    });
  });

  describe('to array helper', async () => {
    it('should convert nil values to arrays', async () => {
      /* eslint-disable-next-line no-null/no-null */
      expect(toArray(null)).to.deep.equal([]);
      expect(toArray(undefined)).to.deep.equal([]);
    });

    it('should copy arrays', async () => {
      const data: Array<number> = [];
      const copy = toArray(data);

      expect(copy).not.to.equal(data);
      expect(copy).to.deep.equal(data);
    });

    over('filled arrays', array(integer()), (it) => {
      it('should copy the array', (val) => {
        const copy = toArray(val);
        // these need to be two different expectations, because not and deep both carry over
        expect(copy).not.to.equal(val);
        expect(copy).to.deep.equal(val);
      });

      it('should be a synonym for ensure array', (val) => {
        expect(ensureArray(val)).to.deep.equal(toArray(val));
      });
    });
  });

  describe('count list', async () => {
    it('should count a single item', async () => {
      expect(lengthOf(1)).to.equal(1, 'numbers');
      expect(lengthOf('')).to.equal(1, 'empty strings');
      expect(lengthOf('123')).to.equal(1, 'other strings');
    });

    it('should count an array of items', async () => {
      expect(lengthOf([1])).to.equal(1, 'single item list');
      expect(lengthOf([1, 2, 3])).to.equal(3, 'multi item list');
    });

    it('should count an unknown argument as 0', async () => {
      expect(lengthOf(undefined)).to.equal(0, 'undefined');
      // eslint-disable-next-line no-null/no-null
      expect(lengthOf(null)).to.equal(0, 'null');
    });
  });

  describe('has items helper', async () => {
    it('should return false for non-array values', async () => {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      expect(hasItems({} as any)).to.equal(false);
      expect(hasItems(4 as any)).to.equal(false);
      /* eslint-enable @typescript-eslint/no-explicit-any */
    });

    it('should return false for empty arrays', async () => {
      expect(hasItems([])).to.equal(false);
    });

    it('should return true for arrays with elements', async () => {
      expect(hasItems([
        true,
        false,
      ])).to.equal(true);
    });
  });

  describe('is empty helper', () => {
    over('falsy values', falsy().filter(isNone), (it) => {
      it('should be empty', (val) => {
        expect(isEmpty(val)).to.equal(true);
      });
    });

    over('filled arrays', array(integer(), {minLength: 1}), (it) => {
      it('should have items', (val) => {
        expect(isEmpty(val)).to.equal(false);
      });
    });
  });

  describe('merge array helper', () => {
    over('some arrays', array(array(integer())), (it) => {
      it('should be the total length', (val) => {
        const total = val.map((a) => a.length).reduce(sum, 0);
        expect(mergeArray(...val)).to.have.lengthOf(total);
      });
    });
  });
});
