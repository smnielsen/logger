import { expect } from 'chai';
import sinon from 'sinon';
import { getTimeString } from './time';

describe('Time', () => {
  let clock: any;
  beforeEach(() => {
    const now = new Date('2019-12-26T17:23:02');
    clock = sinon.useFakeTimers(now.getTime());
    console.log('Test now', now.toUTCString());
  });
  afterEach(() => {
    //assertions
    clock.restore();
  });
  it('should create logger with all methods', () => {
    const result = getTimeString();

    expect(result).to.equal('2019-12-26 17:23:02:000');
  });
});
