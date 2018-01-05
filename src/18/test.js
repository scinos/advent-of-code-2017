const { challenge1, challenge2 } = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 18 - Challenge 01', () => {
  it('Example #1', () => {
    const input = [
      'set a 1',
      'add a 2',
      'mul a a',
      'mod a 5',
      'snd a',
      'set a 0',
      'rcv a',
      'jgz a -1',
      'set a 1',
      'jgz a -2',
    ].join('\n');

    expect(challenge1(input)).to.equal(4);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge1(input)).to.equal(2951);
  });
});

describe('Day 18 - Challenge 02', () => {
  it('Example #1', () => {
    const input = ['snd 1', 'snd 2', 'snd p', 'rcv a', 'rcv b', 'rcv c', 'rcv d'].join('\n');

    expect(challenge2(input)).to.equal(3);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge2(input)).to.equal(7366);
  });
});
