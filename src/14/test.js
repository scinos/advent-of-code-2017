const {
  challenge1,
  challenge2,
} = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 14 - Challenge 01', () => {
  it('Full example', () => {
    const key = 'flqrgnkx';
    expect(challenge1(key)).to.equal(8108);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge1(input);
    expect(result).to.equal(8304);
  });
});

describe('Day 14 - Challenge 02', () => {
  it('Full example', () => {
    const key = 'flqrgnkx';
    expect(challenge2(key)).to.equal(1242);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge2(input);
    expect(result).to.equal(1018);
  });
});
