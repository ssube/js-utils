import { expect } from 'chai';
import { array, constant, integer, record } from 'fast-check';
import { over } from 'mocha-foam';

import { Checklist, ChecklistMode } from '../../src/Checklist';

const EXISTING_ITEM = 'foo';
const MISSING_ITEM = 'bin';
const TEST_DATA = [EXISTING_ITEM, 'bar'];

// tslint:disable:no-duplicate-functions
describe('checklist', async () => {
  describe('exclude mode', async () => {
    it('should check for present values', async () => {
      const list = new Checklist({
        data: TEST_DATA,
        mode: ChecklistMode.EXCLUDE,
      });
      expect(list.check(EXISTING_ITEM)).to.equal(false);
    });

    it('should check for missing values', async () => {
      const list = new Checklist({
        data: TEST_DATA,
        mode: ChecklistMode.EXCLUDE,
      });
      expect(list.check(MISSING_ITEM)).to.equal(true);
    });
  });

  describe('include mode', async () => {
    it('should check for present values', async () => {
      const list = new Checklist<string>({
        data: TEST_DATA,
        mode: ChecklistMode.INCLUDE,
      });
      expect(list.check(EXISTING_ITEM)).to.equal(true);
    });

    it('should check for missing values', async () => {
      const list = new Checklist<string>({
        data: TEST_DATA,
        mode: ChecklistMode.INCLUDE,
      });
      expect(list.check(MISSING_ITEM)).to.equal(false);
    });
  });

  over('arrays of numbers', record({
    data: array(integer()),
    mode: constant(ChecklistMode.EXCLUDE),
  }), (it) => {
    it('should exclude the data items', (options) => {
      const list = new Checklist(options);
      for (const val of options.data) {
        expect(list.check(val)).to.equal(false);
      }
    });
  });
});
