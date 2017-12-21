const {
  challenge1,
  processList,
  inputToBytes,
  extendBytes,
  challenge2,
} = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 10 - Challenge 01', () => {
  describe('Process string', () => {
    it('Example 1', () => {
      const list = ['0', '1', '2', '3', '4'];
      const position = 0;
      const length = 3;
      const skip = 0;

      expect(processList({
        list, position, length, skip,
      })).to.deep.equal({
        list: ['2', '1', '0', '3', '4'],
        position: 3,
        skip: 1,
      });
    });

    it('Example 2', () => {
      const list = ['2', '1', '0', '3', '4'];
      const position = 3;
      const length = 4;
      const skip = 1;

      expect(processList({
        list, position, length, skip,
      })).to.deep.equal({
        list: ['4', '3', '0', '1', '2'],
        position: 3,
        skip: 2,
      });
    });

    it('Example 3', () => {
      const list = ['4', '3', '0', '1', '2'];
      const position = 3;
      const length = 1;
      const skip = 2;

      expect(processList({
        list, position, length, skip,
      })).to.deep.equal({
        list: ['4', '3', '0', '1', '2'],
        position: 1,
        skip: 3,
      });
    });

    it('Example 4', () => {
      const list = ['4', '3', '0', '1', '2'];
      const position = 1;
      const length = 5;
      const skip = 3;

      expect(processList({
        list, position, length, skip,
      })).to.deep.equal({
        list: ['3', '4', '2', '1', '0'],
        position: 4,
        skip: 4,
      });
    });
  });

  it('Example 1', () => {
    expect(challenge1('3,4,1,5', 5)).to.equal(12);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge1(input);
    expect(result).to.equal(62238);
  });
});

describe('Day 10 - Challenge 02', () => {
  it('Input to bytes', () => {
    const input = '1,2,3';

    expect(inputToBytes(input)).to.deep.equal([
      49, 44, 50, 44, 51,
    ]);
  });

  it('Extend bytes', () => {
    expect(extendBytes([49, 44, 50, 44, 51])).to.deep.equal([
      49, 44, 50, 44, 51, 17, 31, 73, 47, 23,
    ]);
  });

  it('Example 1: empty string', () => {
    expect(challenge2('')).to.equal('a2582a3a0e66e6e86e3812dcb672a272');
  });

  it('Example 2: AoC 2017', () => {
    expect(challenge2('AoC 2017')).to.equal('33efeb34ea91902bb2f59c9920caa6cd');
  });

  it('Example 3: 1,2,3', () => {
    expect(challenge2('1,2,3')).to.equal('3efbe78a8d82f29979031a4aa0b16a9d');
  });

  it('Example 4: 1,2,4', () => {
    expect(challenge2('1,2,4')).to.equal('63960835bcdc130f0b66d7ff4f6a5a8e');
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge2(input.trim());
    expect(result).to.equal('2b0c9cc0449507a0db3babd57ad9e8d8');
  });
});
