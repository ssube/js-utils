/* eslint-disable no-magic-numbers */
import { expect } from 'chai';
import { array, dictionary, integer, nat, record, string, tuple } from 'fast-check';
import { over } from 'mocha-foam';

import { NotFoundError } from '../../src/error/NotFoundError.js';
import {
  entriesOf,
  getHead,
  getHeadOrDefault,
  getOrDefault,
  makeDict,
  makeMap,
  mergeMap,
  mustGet,
  normalizeMap,
  pairsToMap,
  pushMergeMap,
  setOrPush,
} from '../../src/Map.js';

const DEFAULT_VALUE = 'default';
const mapKey = 'key';
const mapValue = 'value';
const singleItem = new Map([[mapKey, mapValue]]);
const multiItem = new Map([
  [mapKey, [mapValue]],
  // eslint-disable-next-line no-null/no-null,@typescript-eslint/no-explicit-any
  ['nilKey', null as any],
  // eslint-disable-next-line no-null/no-null
  ['nilValue', [null]],
]);

describe('map utils', async () => {
  describe('make dict', async () => {
    it('should return an empty dict for nil values', async () => {
      /* eslint-disable-next-line no-null/no-null */
      expect(makeDict(null)).to.deep.equal({});
      expect(makeDict(undefined)).to.deep.equal({});
    });

    it('should return an existing dict', async () => {
      const input = {};
      expect(makeDict(input)).to.equal(input);
    });

    over('maps of strings', dictionary(string(), string()), (it) => {
      it('should convert map to dict', async (data) => {
        const map = new Map(Object.entries(data));
        expect(makeDict(map)).to.deep.equal(data);
      });
    });
  });

  describe('make map', async () => {
    it('should convert objects to maps', async () => {
      const data = {
        bar: '2',
        foo: '1',
      };
      const map = makeMap(data);

      expect(Array.from(map.entries())).to.deep.equal(Object.entries(data));
    });
  });

  describe('must get helper', async () => {
    it('should get existing keys', async () => {
      expect(mustGet(singleItem, mapKey)).to.equal(mapValue);
    });

    it('should throw on missing keys', async () => {
      expect(() => {
        mustGet(singleItem, 'nope');
      }).to.throw(NotFoundError);
    });

    over('map with truthy values', array(tuple(string(), nat()), { minLength: 1 }).map((t) => new Map(t)), (it) => {
      it('should return a value', (val) => {
        for (const [key, _value] of val) {
          expect(() => mustGet(val, key)).not.to.throw(Error);
        }
      });
    });
  });

  describe('get head helper', async () => {
    it('should get the first item from existing keys', async () => {
      expect(getHead(multiItem, mapKey)).to.equal(mapValue);
    });

    it('should throw on missing keys', async () => {
      expect(() => {
        getHead(multiItem, 'nope');
      }).to.throw(NotFoundError);
    });
  });

  describe('get head or default helper', async () => {
    it('should get the first item from existing keys', async () => {
      expect(getHeadOrDefault(multiItem, mapKey, 'nope')).to.equal(mapValue);
    });

    it('should get the default for missing keys', async () => {
      expect(getHeadOrDefault(multiItem, 'nope', mapValue)).to.equal(mapValue);
    });

    it('should return the default value for nil values', async () => {
      expect(getHeadOrDefault(multiItem, 'nilValue', mapValue)).to.equal(mapValue);
    });

    it('should return the default value for nil keys', async () => {
      expect(getHeadOrDefault(multiItem, 'nilKey', mapValue)).to.equal(mapValue);
    });
  });

  describe('get or default helper', () => {
    it('should get the item for existing keys', async () => {
      expect(getOrDefault(singleItem, mapKey, DEFAULT_VALUE)).to.equal(mapValue);
    });

    it('should get the item for missing keys', async () => {
      expect(getOrDefault(singleItem, 'missing', DEFAULT_VALUE)).to.equal(DEFAULT_VALUE);
    });

    it('should return the default for nil values', async () => {
      expect(getOrDefault(multiItem, 'nilKey', DEFAULT_VALUE)).to.equal(DEFAULT_VALUE);
    });

    xit('should return falsy values for existing keys');

    over('map with truthy values', array(tuple(string(), nat()), { minLength: 1 }).map((t) => new Map(t)), (it) => {
      it('should return a value other than missing', async (val) => {
        const missing = -1;
        for (const [key, _value] of val) {
          expect(getOrDefault(val, key, missing)).not.to.equal(missing);
        }
      });
    });
  });

  describe('pairs to map helper', () => {
    it('should convert pairs', async () => {
      const result = pairsToMap([{
        name: 'foo',
        value: 3,
      }]);
      expect(result.get('foo')).to.equal(3);
    });

    over('paired values', array(record({
      name: string(),
      value: integer(),
    })), (it) => {
      it('should include each unique key', async (val) => {
        const keys = new Set(val.map((pair) => pair.name));
        const map = pairsToMap(val);
        expect(map.size).to.equal(keys.size);
      });
    });
  });

  describe('entries of helper', () => {
    it('should return entries for maps', async () => {
      const input: Array<[string, number]> = [['foo', 1], ['bar', 3]];
      const value = new Map(input);
      const result = entriesOf(value);
      expect(result.length).to.equal(2);
      expect(result).to.deep.equal(input);
    });

    it('should return entries for objects', async () => {
      const result = entriesOf({
        bar: 3,
        foo: 1,
      });
      expect(result.length).to.equal(2);
      expect(result[0][0]).to.equal('bar');
    });

    it('should return empty entries for nil values', async () => {
      /* eslint-disable-next-line no-null/no-null */
      expect(entriesOf(null)).to.deep.equal([]);
      expect(entriesOf(undefined)).to.deep.equal([]);
    });

    over('dict objects', dictionary(string(), integer()), (it) => {
      it('should list the properties', async (val) => {
        const props = entriesOf(val);
        for (const [key, value] of props) {
          expect(val[key]).to.equal(value);
        }
      });
    });
  });

  describe('set or push helper', () => {
    xit('should insert new lists');

    it('should wrap new items', async () => {
      const values = new Map<string, Array<string>>([]);
      setOrPush(values, mapKey, 'fin');

      expect(Array.from(values.keys()).length).to.equal(1);
      expect(mustGet(values, mapKey).length).to.equal(1);
    });

    it('should append to existing items', async () => {
      const values = new Map(multiItem);
      setOrPush(values, mapKey, 'fin');

      expect(Array.from(values.keys()).length).to.equal(3);
      expect(mustGet(values, mapKey).length).to.equal(2);
    });
  });

  describe('merge map helper', () => {
    it('should combine two maps', async () => {
      const firstValue = new Map([[mapKey, mapValue]]);
      const otherValue = new Map([['foo', 'bar']]);

      const merged = mergeMap(firstValue, otherValue);

      expect(Array.from(merged.keys()).length).to.equal(2);
    });
  });

  describe('push merge map helper', () => {
    it('should combine two overlapping maps', async () => {
      const firstValue = new Map([[mapKey, [1]]]);
      const otherValue = new Map([[mapKey, [2, 3]]]);

      const merged = pushMergeMap(firstValue, otherValue);
      expect(merged).to.have.keys(mapKey);
      expect(merged.get(mapKey)).to.deep.equal([1, 2, 3]);
    });
  });

  describe('make map helper', () => {
    it('should make an empty map', async () => {
      expect(makeMap(undefined).size).to.equal(0);
    });

    it('should copy an existing map', async () => {
      const copy = makeMap(singleItem);
      expect(copy).to.deep.equal(singleItem);
      expect(copy).not.to.equal(singleItem);
    });

    it('should copy a dict', async () => {
      expect(makeMap({
        [mapKey]: mapValue,
      })).to.deep.equal(singleItem);
    });
  });

  describe('normalize map helper', () => {
    it('should convert values into arrays of strings', async () => {
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

    it('should convert number arguments into string values', async () => {
      const INPUT_VALUE = 123;
      const input = new Map([
        ['foo', INPUT_VALUE],
      ]);
      const normalized = normalizeMap(input);

      expect(normalized.foo).to.deep.equal([INPUT_VALUE.toString()]);
    });

    it('should convert object arguments into string values', async () => {
      const OUTPUT_VALUE = 'bar';
      const input = new Map([
        ['foo', {
          toString: () => OUTPUT_VALUE,
        }],
      ]);
      const normalized = normalizeMap(input);

      expect(normalized.foo).to.deep.equal([OUTPUT_VALUE]);
    });
  });
});
