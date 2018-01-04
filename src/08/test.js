const { challenge1, challenge2 } = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 08 - Challenge 01', () => {
  it('Example #01', () => {
    const list = [
      'b inc 5 if a > 1',
      'a inc 1 if b < 5',
      'c dec -10 if a >= 1',
      'c inc -20 if c == 10',
    ].join('\n');

    const highestNumber = challenge1(list);
    expect(highestNumber).to.equal(1);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge1(input);
    expect(result).to.equal(6343);
  });
});

describe('Day 08 - Challenge 02', () => {
  it('Example #01', () => {
    const list = [
      'b inc 5 if a > 1',
      'a inc 1 if b < 5',
      'c dec -10 if a >= 1',
      'c inc -20 if c == 10',
    ].join('\n');

    const highestNumber = challenge2(list);
    expect(highestNumber).to.equal(10);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge2(input);
    expect(result).to.equal(7184);
  });
});
