const { challenge1, challenge2, balanceMemory, findBiggestBank } = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 06 - Challenge 01', () => {
  it('Example #01: 0, 2, 7, 0', () => {
    const memory = [0, 2, 7, 0];
    const biggestBank = findBiggestBank(memory);
    expect(biggestBank).to.equal(2);

    const balancedMemory = balanceMemory(memory);
    expect(balancedMemory).to.deep.equal([2, 4, 1, 2]);
  });

  it('Example #02: 2, 4, 1, 2', () => {
    const memory = [2, 4, 1, 2];
    const biggestBank = findBiggestBank(memory);
    expect(biggestBank).to.equal(1);

    const balancedMemory = balanceMemory(memory);
    expect(balancedMemory).to.deep.equal([3, 1, 2, 3]);
  });

  it('Example #03: 3, 1, 2, 3', () => {
    const memory = [3, 1, 2, 3];
    const biggestBank = findBiggestBank(memory);
    expect(biggestBank).to.equal(0);

    const balancedMemory = balanceMemory(memory);
    expect(balancedMemory).to.deep.equal([0, 2, 3, 4]);
  });

  it('Example #04: 0, 2, 3, 4', () => {
    const memory = [0, 2, 3, 4];
    const biggestBank = findBiggestBank(memory);
    expect(biggestBank).to.equal(3);

    const balancedMemory = balanceMemory(memory);
    expect(balancedMemory).to.deep.equal([1, 3, 4, 1]);
  });

  it('Example #05: 1, 3, 4, 1', () => {
    const memory = [1, 3, 4, 1];
    const biggestBank = findBiggestBank(memory);
    expect(biggestBank).to.equal(2);

    const balancedMemory = balanceMemory(memory);
    expect(balancedMemory).to.deep.equal([2, 4, 1, 2]);
  });

  it('Example #06: 0, 2, 7, 0', () => {
    const memory = '0 2 7 0';
    const loopIndex = challenge1(memory);
    expect(loopIndex).to.equal(5);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge1(input);
    expect(result).to.equal(7864);
  });
});

describe('Day 06 - Challenge 02', () => {
  it('Example #01: 0, 2, 7, 0', () => {
    const memory = '0 2 7 0';
    const loopSize = challenge2(memory);
    expect(loopSize).to.equal(4);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge2(input);
    expect(result).to.equal(1695);
  });
});
