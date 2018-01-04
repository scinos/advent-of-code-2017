const { challenge1, challenge2 } = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 16 - Challenge 01', () => {
  it('Example', () => {
    const line = 'abcde';
    const dance = 's1,x3/4,pe/b';

    expect(challenge1(line, dance)).to.equal('baedc');
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge1('abcdefghijklmnop', input);
    expect(result).to.equal('gkmndaholjbfcepi');
  });
});

describe('Day 16 - Challenge 02', () => {
  it('Example', () => {
    const line = 'abcde';
    const dance = 's1,x3/4,pe/b';

    expect(challenge2(line, dance, 2)).to.equal('ceadb');
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge2('abcdefghijklmnop', input, 1000000000);
    expect(result).to.equal('abihnfkojcmegldp');
  });
});
