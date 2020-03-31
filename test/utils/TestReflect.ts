import { expect } from 'chai';
import { getMethods, getConstructor, constructorName } from '../../src/utils/Reflect';

class Test {
  public foo() { /* noop */ }
  public bar() { /* noop */ }
}

describe('reflect utils', () => {
  describe('get methods helper', () => {
    it('should collect method functions', () => {
      const methods = getMethods(new Test()).values();

      /* eslint-disable @typescript-eslint/unbound-method */
      expect(methods).to.include(Test.prototype.foo);
      expect(methods).to.include(Test.prototype.bar);
    });
  });

  describe('get constructor helper', () => {
    it('should get the constructor from an instance', () => {
      const instance = new Test();
      expect(getConstructor(instance)).to.equal(Test);
    });
  });

  describe('get constructor name helper', () => {
    it('should get the constructor name from an instance', () => {
      const instance = new Test();
      expect(constructorName(instance)).to.equal(Test.name);
    });
  });
});
