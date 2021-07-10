/* eslint-disable no-magic-numbers */
import { expect } from 'chai';

import { leftPad, trim } from '../../src/String';

const TEST_SHORT = 'hello';
const TEST_LONG = 'hello world';

describe('left pad helper', async () => {
  it('should prepend padding', async () => {
    expect(leftPad('test')).to.equal('0000test');
  });

  it('should return long strings as-is', async () => {
    const long = 'testing-words';
    expect(leftPad(long, 8)).to.equal(long);
  });

  it('should use padding string', async () => {
    expect(leftPad('test', 8, 'too')).to.equal('toottest', 'must repeat and truncate the padding string');
  });
});

describe('trim helper', async () => {
  it('should return strings shorter than max', async () => {
    expect(trim('yes', 5)).to.equal('yes', 'shorter than max');
    expect(trim(TEST_SHORT, 5)).to.equal(TEST_SHORT, 'equal to max');
  });

  it('should trim strings longer than max', async () => {
    expect(trim(TEST_LONG, 3, '...')).to.equal('...');
    expect(trim(TEST_LONG, 5)).to.equal('he...');
    expect(trim(TEST_LONG, 8)).to.equal('hello...');
  });

  it('should not add tail when max is small', async () => {
    expect(trim(TEST_SHORT, 2, '...')).to.equal('he');
    expect(trim(TEST_LONG, 5, 'very long tail')).to.equal(TEST_SHORT);
    expect(trim(TEST_SHORT, 8, 'very long tail')).to.equal(TEST_SHORT);
  });
});
