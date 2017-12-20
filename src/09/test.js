const {
  challenge1,
  challenge2,
} = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe.only('Day 09 - Challenge 01', () => {
  it('Example 1', () => {
    expect(challenge1('{}')).to.equal(1);
  });

  it('Example 2', () => {
    expect(challenge1('{{{}}}')).to.equal(6);
  });

  it('Example 3', () => {
    expect(challenge1('{{},{}}')).to.equal(5);
  });

  it('Example 4', () => {
    expect(challenge1('{{{},{},{{}}}}')).to.equal(16);
  });

  it('Example 5', () => {
    expect(challenge1('{<a>,<a>,<a>,<a>}')).to.equal(1);
  });

  it('Example 6', () => {
    expect(challenge1('{{<ab>},{<ab>},{<ab>},{<ab>}}')).to.equal(9);
  });

  it('Example 7', () => {
    expect(challenge1('{{<!!>},{<!!>},{<!!>},{<!!>}}')).to.equal(9);
  });

  it('Example 8', () => {
    expect(challenge1('{{<a!>},{<a!>},{<a!>},{<ab>}}')).to.equal(3);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge1(input);
    expect(result).to.equal(14204);
  });
});

describe.only('Day 09 - Challenge 02', () => {
  it('Example 1', () => {
    expect(challenge2('<>')).to.equal(0);
  });

  it('Example 2', () => {
    expect(challenge2('<random characters>')).to.equal(17);
  });

  it('Example 3', () => {
    expect(challenge2('<<<<>')).to.equal(3);
  });

  it('Example 4', () => {
    expect(challenge2('<{!>}>')).to.equal(2);
  });

  it('Example 5', () => {
    expect(challenge2('<!!>')).to.equal(0);
  });

  it('Example 6', () => {
    expect(challenge2('<!!!>>')).to.equal(0);
  });

  it('Example 7', () => {
    expect(challenge2('<{o"i!a,<{i<a>')).to.equal(10);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge2(input);
    expect(result).to.equal(6622);
  });
});

