const { challenge1, challenge2, getValueForSquare } = require('./solution.js');
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

describe('Day 03 - Challenge 02', () => {
  it('Example #1: 1', () => {
    const result = getValueForSquare(1);
    expect(result).to.be.equal(1);
  });

  it('Example #1: 2', () => {
    const result = getValueForSquare(2);
    expect(result).to.be.equal(1);
  });

  it('Example #2: 3', () => {
    const result = getValueForSquare(3);
    expect(result).to.be.equal(2);
  });

  it('Example #3: 4', () => {
    const result = getValueForSquare(4);
    expect(result).to.be.equal(4);
  });

  it('Example #4: 5', () => {
    const result = getValueForSquare(5);
    expect(result).to.be.equal(5);
  });

  it('Example #5: 6', () => {
    const result = getValueForSquare(6);
    expect(result).to.be.equal(10);
  });

  it('Example #5: 7', () => {
    const result = getValueForSquare(23);
    expect(result).to.be.equal(806);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge2(input);
    expect(result).to.be.equal(279138);
  });
});
