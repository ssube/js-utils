import { expect } from 'chai';
import { match, stub } from 'sinon';

import { filterMany } from '../../src/List';

describe('list utils', async () => {
  describe('filter many helper', async () => {
    it('should call the predicate with an item from each list', async () => {
      const cb = stub().returns(true);
      const results = filterMany(cb, [1], ['a']);

      expect(results.length).to.equal(1);
      expect(cb).to.have.callCount(1);
      expect(cb).to.have.been.calledWithMatch(match.number, match.string);
    });

    it('should call the predicate for each slice', async () => {
      const data = [1, 2, 3, 4, 5];
      const cb = stub().returns(true);
      const results = filterMany(cb, data);

      expect(results.length).to.equal(data.length);
      expect(cb).to.have.callCount(data.length);
    });

    it('should keep slices that passed the predicate', async () => {
      const data = [1, 2, 3, 4, 5];
      const cb = stub().returns(false);
      const results = filterMany(cb, data);

      expect(results.length).to.equal(0);
      expect(cb).to.have.callCount(data.length);
    });
  });
});
