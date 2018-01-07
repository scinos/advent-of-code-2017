const { challenge1, challenge2 } = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe.only('Day 22 - Challenge 01', () => {
  const map = ['..#', '#..', '...'].join('\n');

  it('Example #', () => {
    expect(challenge1(map, 7)).to.equal(5);
  });

  it('Example #2', () => {
    expect(challenge1(map, 70)).to.equal(41);
  });

  it('Example #3', () => {
    expect(challenge1(map, 10000)).to.equal(5587);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge1(input, 10000)).to.equal(5256);
  });
});

describe.only('Day 22 - Challenge 02', () => {
  const map = ['..#', '#..', '...'].join('\n');

  it('Example #', () => {
    expect(challenge2(map, 100)).to.equal(26);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge2(input, 10000000)).to.equal(2511345);
  });
});
