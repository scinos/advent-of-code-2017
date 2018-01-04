const { challenge1, isInGroup, challenge2 } = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 12 - Challenge 01', () => {
  const exampleInput = [
    '0 <-> 2',
    '1 <-> 1',
    '2 <-> 0, 3, 4',
    '3 <-> 2, 4',
    '4 <-> 2, 3, 6',
    '5 <-> 6',
    '6 <-> 4, 5',
  ].join('\n');

  it('Example 1', () => expect(isInGroup(exampleInput, 0, 0)).to.equal(true));
  it('Example 2', () => expect(isInGroup(exampleInput, 0, 1)).to.equal(false));
  it('Example 3', () => expect(isInGroup(exampleInput, 0, 2)).to.equal(true));
  it('Example 4', () => expect(isInGroup(exampleInput, 0, 3)).to.equal(true));
  it('Example 5', () => expect(isInGroup(exampleInput, 0, 4)).to.equal(true));
  it('Example 6', () => expect(isInGroup(exampleInput, 0, 5)).to.equal(true));
  it('Example 7', () => expect(isInGroup(exampleInput, 0, 6)).to.equal(true));

  it('Full example', () => {
    expect(challenge1(exampleInput)).to.equal(6);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge1(input);
    expect(result).to.equal(169);
  });
});

describe('Day 12 - Challenge 02', () => {
  const exampleInput = [
    '0 <-> 2',
    '1 <-> 1',
    '2 <-> 0, 3, 4',
    '3 <-> 2, 4',
    '4 <-> 2, 3, 6',
    '5 <-> 6',
    '6 <-> 4, 5',
  ].join('\n');

  it('Full example', () => {
    expect(challenge2(exampleInput)).to.equal(2);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge2(input);
    expect(result).to.equal(179);
  });
});
