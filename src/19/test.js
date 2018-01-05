const { challenge1, challenge2 } = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe.only('Day 19 - Challenge 01', () => {
  it('Example #1', () => {
    const input = [
      '      |          ',
      '      |  +--+    ',
      '      A  |  C    ',
      '  F---|----E|--+ ',
      '      |  |  |  D ',
      '      +B-+  +--+ ',
      '                 ',
    ].join('\n');

    expect(challenge1(input)).to.equal('ABCDEF');
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge1(input)).to.equal('EOCZQMURF');
  });
});

describe.only('Day 19 - Challenge 02', () => {
  it('Example #1', () => {
    const input = [
      '      |          ',
      '      |  +--+    ',
      '      A  |  C    ',
      '  F---|----E|--+ ',
      '      |  |  |  D ',
      '      +B-+  +--+ ',
      '                 ',
    ].join('\n');

    expect(challenge2(input)).to.equal(38);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge2(input)).to.equal(16312);
  });
});
