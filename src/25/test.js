const { challenge1, challenge2 } = require('./solution');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 25 - Challenge 01', () => {
  it('Example', () => {
    const components = [
      'Begin in state A.',
      'Perform a diagnostic checksum after 6 steps.',
      '',
      'In state A:',
      '  If the current value is 0:',
      '    - Write the value 1.',
      '    - Move one slot to the right.',
      '    - Continue with state B.',
      '  If the current value is 1:',
      '    - Write the value 0.',
      '    - Move one slot to the left.',
      '    - Continue with state B.',
      '',
      'In state B:',
      '  If the current value is 0:',
      '    - Write the value 1.',
      '    - Move one slot to the left.',
      '    - Continue with state A.',
      '  If the current value is 1:',
      '    - Write the value 1.',
      '    - Move one slot to the right.',
      '    - Continue with state A.',
    ].join('\n');
    expect(challenge1(components)).to.equal(3);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge1(input)).to.equal(3745);
  });
});

describe('Day 24 - Challenge 02', () => {
  it('Example', () => {
    const components = ['0/2', '2/2', '2/3', '3/4', '3/5', '0/1', '10/1', '9/10'].join('\n');
    expect(challenge2(components)).to.equal(19);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge2(input)).to.equal(907);
  });
});
