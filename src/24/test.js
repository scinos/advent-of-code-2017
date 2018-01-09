const { challenge1, challenge2 } = require('./solution');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 24 - Challenge 01', () => {
  it('Example', () => {
    const components = ['0/2', '2/2', '2/3', '3/4', '3/5', '0/1', '10/1', '9/10'].join('\n');
    expect(challenge1(components)).to.equal(31);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge1(input)).to.equal(1656);
  });
});

describe('Day 24 - Challenge 02', () => {
  it('Example', () => {
    const components = ['0/2', '2/2', '2/3', '3/4', '3/5', '0/1', '10/1', '9/10'].join('\n');
    expect(challenge2(components)).to.equal(19);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge2(input)).to.equal(1642);
  });
});
