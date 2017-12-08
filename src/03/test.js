const { challenge1 } = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 03 - Challenge 01', () => {
  it('Example #1: 1', () => {
    const result = challenge1(1);
    expect(result).to.be.equal(0);
  });

  it('Example #1: 12', () => {
    const result = challenge1(12);
    expect(result).to.be.equal(3);
  });

  it('Example #2: 23', () => {
    const result = challenge1(23);
    expect(result).to.be.equal(2);
  });

  it('Example #3: 1024', () => {
    const result = challenge1(1024);
    expect(result).to.be.equal(31);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge1(input);
    expect(result).to.be.equal(475);
  });
});
