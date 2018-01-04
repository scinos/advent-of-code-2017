const { challenge1, challenge2 } = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 05 - Challenge 01', () => {
  it('Example #1: 0 3 0 1 -3', () => {
    const result = challenge1(['0', '3', '0', '1', '-3'].join('\n'));
    expect(result).to.equal(5);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge1(input);
    expect(result).to.equal(343467);
  });
});

describe('Day 05 - Challenge 02', () => {
  it('Example #1: 0 3 0 1 -3', () => {
    const result = challenge2(['0', '3', '0', '1', '-3'].join('\n'));
    expect(result).to.equal(10);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge2(input);
    expect(result).to.equal(24774780);
  });
});
