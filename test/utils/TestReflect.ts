import { expect } from 'chai';
import { getMethods } from '../../src/utils/Reflect';

describe('reflect utils', () => {
  describe('get methods helper', () => {
    it('should collect method functions', () => {
      class Test {
        public foo() { /* noop */ }
        public bar() { /* noop */ }
      }

      const methods = getMethods(new Test()).values();
      /* eslint-disable @typescript-eslint/unbound-method */
      expect(methods).to.include(Test.prototype.foo);
      expect(methods).to.include(Test.prototype.bar);
    });
  });
});
