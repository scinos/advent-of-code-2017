const { challenge1, transformPattern, parseInput } = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe.only('Day 21 - Challenge 01', () => {
  const rawInput = ['../.# => ##./#../...', '.#./..#/### => #..#/..../..../#..#'].join('\n');

  it('Can transform pattern of size=2', () => {
    const pattern = [['#', '.'], ['.', '.']];
    const rules = parseInput(rawInput);

    expect(transformPattern(pattern, rules)).to.deep.equal([
      ['#', '#', '.'],
      ['#', '.', '.'],
      ['.', '.', '.'],
    ]);
  });

  it('Can transform pattern of size=3', () => {
    const pattern = [['.', '#', '.'], ['.', '.', '#'], ['#', '#', '#']];
    const rules = parseInput(rawInput);

    expect(transformPattern(pattern, rules)).to.deep.equal([
      ['#', '.', '.', '#'],
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['#', '.', '.', '#'],
    ]);
  });

  it('Full example #1', () => {
    expect(challenge1(rawInput, 2)).to.equal(12);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge1(input, 5)).to.equal(162);
  });
});

describe.only('Day 21 - Challenge 02', () => {
  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge1(input, 18)).to.equal(2264586);
  });
});
