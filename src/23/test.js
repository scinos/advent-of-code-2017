const { challenge1, challenge2 } = require('./solution');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 23 - Challenge 01', () => {
  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge1(input)).to.equal(5929);
  });
});

// Requires manual analysis
describe.skip('Day 23 - Challenge 02', () => {
  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge2(input)).to.equal(11);
  });
});
