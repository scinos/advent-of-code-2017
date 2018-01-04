const { challenge1, challenge2 } = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 13 - Challenge 01', () => {
  const exampleInput = ['0: 3', '1: 2', '4: 4', '6: 4'].join('\n');

  it('Full example', () => {
    expect(challenge1(exampleInput)).to.equal(24);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge1(input);
    expect(result).to.equal(1624);
  });
});

describe('Day 13 - Challenge 02', () => {
  const exampleInput = ['0: 3', '1: 2', '4: 4', '6: 4'].join('\n');

  it('Full example', () => {
    expect(challenge2(exampleInput)).to.equal(10);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge2(input);
    expect(result).to.equal(3923436);
  });
});
