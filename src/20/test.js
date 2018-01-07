const { challenge1, challenge2 } = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 20 - Challenge 01', () => {
  it('Example #1', () => {
    const input = ['p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>', 'p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>'].join(
      '\n',
    );

    expect(challenge1(input)).to.equal(0);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge1(input)).to.equal(144);
  });
});

describe('Day 20 - Challenge 02', () => {
  it('Example #1', () => {
    const input = [
      'p=<-6,0,0>, v=<3,0,0>, a=<0,0,0>',
      'p=<-4,0,0>, v=<2,0,0>, a=<0,0,0>',
      'p=<-2,0,0>, v=<1,0,0>, a=<0,0,0>',
      'p=< 3,0,0>, v=<-1,0,0>, a=<0,0,0>',
    ].join('\n');

    expect(challenge2(input)).to.equal(1);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    expect(challenge2(input)).to.equal(477);
  });
});
