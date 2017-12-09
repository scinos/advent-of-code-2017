const { challenge1, challenge2 } = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 04 - Challenge 01', () => {
  it('Example #1: aa bb cc dd ee', () => {
    const result = challenge1('aa bb cc dd ee');
    expect(result).to.equal(1);
  });

  it('Example #2: aa bb cc dd aa', () => {
    const result = challenge1('aa bb cc dd aa');
    expect(result).to.equal(0);
  });

  it('Example #3: aa bb cc dd aaa', () => {
    const result = challenge1('aa bb cc dd aaa');
    expect(result).to.equal(1);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge1(input);
    expect(result).to.equal(455);
  });
});

describe('Day 04 - Challenge 02', () => {
  it('Example #1: abcde fghij', () => {
    const result = challenge2('abcde fghij');
    expect(result).to.equal(1);
  });

  it('Example #2: abcde xyz ecdab', () => {
    const result = challenge2('abcde xyz ecdab');
    expect(result).to.equal(0);
  });

  it('Example #3: a ab abc abd abf abj', () => {
    const result = challenge2('a ab abc abd abf abj');
    expect(result).to.equal(1);
  });

  it('Example #4: iiii oiii ooii oooi oooo', () => {
    const result = challenge2('iiii oiii ooii oooi oooo');
    expect(result).to.equal(1);
  });

  it('Example #5: oiii ioii iioi iiio', () => {
    const result = challenge2('oiii ioii iioi iiio');
    expect(result).to.equal(0);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge2(input);
    expect(result).to.be.equal(186);
  });
});
