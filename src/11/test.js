const {
  challenge1,
  challenge2,
} = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 11 - Challenge 01', () => {
  it('Example 1: ne,ne,ne', () => {
    const input = 'ne,ne,ne';
    expect(challenge1(input)).to.equal(3);
  });

  it('Example 2: ne,ne,sw,sw', () => {
    const input = 'ne,ne,sw,sw';
    expect(challenge1(input)).to.equal(0);
  });

  it('Example 3: ne,ne,s,s', () => {
    const input = 'ne,ne,s,s';
    expect(challenge1(input)).to.equal(2);
  });

  it('Example 3: se,sw,se,sw,sw', () => {
    const input = 'se,sw,se,sw,sw';
    expect(challenge1(input)).to.equal(3);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge1(input);
    expect(result).to.equal(784);
  });
});

describe('Day 11 - Challenge 02', () => {
  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge2(input);
    expect(result).to.equal(1558);
  });
});
