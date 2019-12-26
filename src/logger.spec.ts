import { expect } from 'chai';

import initLogger from './logger';

describe('Logger', () => {
  it('should create logger with all methods', () => {
    const result = initLogger();
    expect(result).to.be.a('function');
    expect(result.trace).to.be.a('function');
    expect(result.debug).to.be.a('function');
    expect(result.info).to.be.a('function');
    expect(result.warn).to.be.a('function');
    expect(result.error).to.be.a('function');
    expect(result.fatal).to.be.a('function');
    expect(result.ok).to.be.a('function');
    expect(result.create).to.be.a('function');
  });
});
