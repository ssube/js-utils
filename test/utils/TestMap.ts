import { expect } from 'chai';

import { NotFoundError } from '../../src/error/NotFoundError';
import {
  entriesOf,
  getHead,
  getHeadOrDefault,
  getOrDefault,
  makeDict,
  makeMap,
  mustGet,
  pairsToMap,
  setOrPush,
  mergeMap,
  pushMergeMap,
  normalizeMap,
} from '../../src/utils/Map';
import { describeLeaks, itLeaks } from '../helpers/async';

const DEFAULT_VALUE = 'default';
const mapKey = 'key';
const mapValue = 'value';
const singleItem = new Map([[mapKey, mapValue]]);
const multiItem = new Map([
  [mapKey, [mapValue]],
  /* eslint-disable */
  ['nilKey', null as any],
  ['nilValue', [null]],
  /* eslint-enable */
]);

describeLeaks('map utils', async () => {
  describeLeaks('make dict', async () => {
    itLeaks('should return an empty dict for nil values', async () => {
      /* eslint-disable-next-line no-null/no-null */
      expect(makeDict(null)).to.deep.equal({});
      expect(makeDict(undefined)).to.deep.equal({});
    });

    itLeaks('should return an existing dict', async () => {
      const input = {};
      expect(makeDict(input)).to.equal(input);
    });
  });

  describeLeaks('make map', async () => {
    itLeaks('should convert objects to maps', async () => {
      const data = {
        bar: '2',
        foo: '1',
      };
      const map = makeMap(data);

      expect(Array.from(map.entries())).to.deep.equal(Object.entries(data));
    });
  });

  describeLeaks('must get helper', async () => {
    itLeaks('should get existing keys', async () => {
      expect(mustGet(singleItem, mapKey)).to.equal(mapValue);
    });

    itLeaks('should throw on missing keys', async () => {
      expect(() => {
        mustGet(singleItem, 'nope');
      }).to.throw(NotFoundError);
    });
  });

  describeLeaks('get head helper', async () => {
    itLeaks('should get the first item from existing keys', async () => {
      expect(getHead(multiItem, mapKey)).to.equal(mapValue);
    });

    itLeaks('should throw on missing keys', async () => {
      expect(() => {
        getHead(multiItem, 'nope');
      }).to.throw(NotFoundError);
    });
  });

  describeLeaks('get head or default helper', async () => {
    itLeaks('should get the first item from existing keys', async () => {
      expect(getHeadOrDefault(multiItem, mapKey, 'nope')).to.equal(mapValue);
    });

    itLeaks('should get the default for missing keys', async () => {
      expect(getHeadOrDefault(multiItem, 'nope', mapValue)).to.equal(mapValue);
    });

    itLeaks('should return the default value for nil values', async () => {
      expect(getHeadOrDefault(multiItem, 'nilValue', mapValue)).to.equal(mapValue);
    });

    itLeaks('should return the default value for nil keys', async () => {
      expect(getHeadOrDefault(multiItem, 'nilKey', mapValue)).to.equal(mapValue);
    });
  });

  describe('get or default helper', () => {
    it('should get the item for existing keys', () => {
      expect(getOrDefault(singleItem, mapKey, DEFAULT_VALUE)).to.equal(mapValue);
    });

    it('should get the item for missing keys', () => {
      expect(getOrDefault(singleItem, 'missing', DEFAULT_VALUE)).to.equal(DEFAULT_VALUE);
    });

    it('should return the default for nil values', () => {
      expect(getOrDefault(multiItem, 'nilKey', DEFAULT_VALUE)).to.equal(DEFAULT_VALUE);
    });

    xit('should return falsy values for existing keys');
  });

  describe('pairs to map helper', () => {
    it('should convert pairs', () => {
      const result = pairsToMap([{
        name: 'foo',
        value: 3,
      }]);
      expect(result.get('foo')).to.equal(3);
    });
  });

  describe('entries of helper', () => {
    it('should return entries for maps', () => {
      const input: Array<[string, number]> = [['foo', 1], ['bar', 3]];
      const value = new Map(input);
      const result = entriesOf(value);
      expect(result.length).to.equal(2);
      expect(result).to.deep.equal(input);
    });

    it('should return entries for objects', () => {
      const result = entriesOf({
        bar: 3,
        foo: 1,
      });
      expect(result.length).to.equal(2);
      expect(result[0][0]).to.equal('bar');
    });

    it('should return empty entries for nil values', () => {
      /* eslint-disable-next-line no-null/no-null */
      expect(entriesOf(null)).to.deep.equal([]);
      expect(entriesOf(undefined)).to.deep.equal([]);
    });
  });

  describe('set or push helper', () => {
    xit('should insert new lists');

    it('should wrap new items', () => {
      const values = new Map<string, Array<string>>([]);
      setOrPush(values, mapKey, 'fin');

      expect(Array.from(values.keys()).length).to.equal(1);
      expect(mustGet(values, mapKey).length).to.equal(1);
    });

    it('should append to existing items', () => {
      const values = new Map(multiItem);
      setOrPush(values, mapKey, 'fin');

      expect(Array.from(values.keys()).length).to.equal(3);
      expect(mustGet(values, mapKey).length).to.equal(2);
    });
  });

  describe('merge map helper', () => {
    it('should combine two maps', () => {
      const firstValue = new Map([[mapKey, mapValue]]);
      const otherValue = new Map([['foo', 'bar']]);

      const merged = mergeMap(firstValue, otherValue);

      expect(Array.from(merged.keys()).length).to.equal(2);
    });
  });

  describe('push merge map helper', () => {
    it('should combine two overlapping maps', () => {
      const firstValue = new Map([[mapKey, [1]]]);
      const otherValue = new Map([[mapKey, [2, 3]]]);

      const merged = pushMergeMap(firstValue, otherValue);
      expect(merged).to.have.keys(mapKey);
      expect(merged.get(mapKey)).to.deep.equal([1, 2, 3]);
    });
  });

  describe('make map helper', () => {
    it('should make an empty map', () => {
      expect(makeMap(undefined).size).to.equal(0);
    });

    it('should copy an existing map', () => {
      const copy = makeMap(singleItem);
      expect(copy).to.deep.equal(singleItem);
      expect(copy).not.to.equal(singleItem);
    });

    it('should copy a dict', () => {
      expect(makeMap({
        [mapKey]: mapValue,
      })).to.deep.equal(singleItem);
    });
  });

  describe('normalize map helper', () => {
    it('should convert values into arrays of strings', () => {
      const banVal = [Symbol()];
      const initial = new Map<string, unknown>([
        ['bar', 'bin'],
        ['ban', banVal],
        ['toad', {
          toString() {
            return 'too';
          },
        }],
      ]);

      const normalized = normalizeMap(initial);

      expect(normalized.bar).to.deep.equal(['bin']);
      expect(normalized.ban).to.equal(banVal);
      expect(normalized.toad).to.deep.equal(['too']);
    });

    /* ['foo', 1] */
    xit('should convert numbers into string values');
  });
});
