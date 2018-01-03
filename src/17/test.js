const {
  challenge1,
  challenge2,
} = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 17 - Challenge 01', () => {
  it('Example #1', () => {
    const steps = 3;
    const values = 3;

    expect(challenge1(steps, values)).to.equal(1);
  });

  it('Example #2', () => {
    const steps = 3;
    const values = 9;

    expect(challenge1(steps, values)).to.equal(5);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge1(Number(input), 2017)).to.equal(808);
  });
});

describe('Day 17 - Challenge 02', () => {
  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge2(Number(input), 50000000)).to.equal(47465686);
  });
});

