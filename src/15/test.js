const {
  challenge1,
  generateAndCompareAll,
  generateAndCompareMultiples,
  challenge2,
} = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 15 - Challenge 01', () => {
  it('Full example', () => {
    const initialA = 65;
    const initialB = 8921;

    expect(generateAndCompareAll(initialA, initialB, 5)).to.equal(1);
  });

  it('Full example #2', () => {
    const initialA = 65;
    const initialB = 8921;

    expect(generateAndCompareAll(initialA, initialB, 40000000)).to.equal(588);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge1(input);
    expect(result).to.equal(569);
  });
});

describe('Day 15 - Challenge 02', () => {
  it('Full example', () => {
    const initialA = 65;
    const initialB = 8921;

    expect(generateAndCompareMultiples(initialA, initialB, 5)).to.equal(0);
  });

  it('Full example #2', () => {
    const initialA = 65;
    const initialB = 8921;

    expect(generateAndCompareMultiples(initialA, initialB, 1056)).to.equal(1);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge2(input);
    expect(result).to.equal(298);
  });
});
