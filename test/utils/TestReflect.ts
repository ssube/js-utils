import { expect } from 'chai';

import { InvalidArgumentError } from '../../src/error/InvalidArgumentError.js';
import { constructorName, getConstructor, getMethods } from '../../src/Reflect.js';

class Test {
  public foo() { /* noop */ }
  public bar() { /* noop */ }
}

describe('reflect utils', () => {
  describe('get methods helper', () => {
    it('should collect method functions', async () => {
      const methods = getMethods(new Test()).values();

      /* eslint-disable @typescript-eslint/unbound-method */
      expect(methods).to.include(Test.prototype.foo);
      expect(methods).to.include(Test.prototype.bar);
    });
  });

  describe('get constructor helper', () => {
    it('should get the constructor from an instance', async () => {
      const instance = new Test();
      expect(getConstructor(instance)).to.equal(Test);
    });
  });

  describe('get constructor name helper', () => {
    it('should get the constructor name from an instance', async () => {
      const instance = new Test();
      expect(constructorName(instance)).to.equal(Test.name);
    });

    it('should throw when value has no prototype', async () => {
      /* eslint-disable-next-line no-null/no-null */
      const protoless = Object.create(null, {});
      expect(() => constructorName(protoless)).to.throw(InvalidArgumentError);
    });

    xit('should handle nil values');
  });
});
