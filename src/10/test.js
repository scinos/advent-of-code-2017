const {
  challenge1,
  processList,
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
    expect(challenge1('3,4,1,5')).to.equal(12);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge1(input);
    expect(result).to.equal(62238);
  });
});
