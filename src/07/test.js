const { challenge1, challenge2 } = require('./solution.js');
const { expect } = require('chai');
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe('Day 07 - Challenge 01', () => {
  it('Example #01', () => {
    const list = [
      'pbga (66)',
      'xhth (57)',
      'ebii (61)',
      'havc (66)',
      'ktlj (57)',
      'fwft (72) -> ktlj, cntj, xhth',
      'qoyq (66)',
      'padx (45) -> pbga, havc, qoyq',
      'tknk (41) -> ugml, padx, fwft',
      'jptl (61)',
      'ugml (68) -> gyxo, ebii, jptl',
      'gyxo (61)',
      'cntj (57)',
    ].join('\n');

    const root = challenge1(list);
    expect(root).to.equal('tknk');
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge1(input);
    expect(result).to.equal('rqwgj');
  });
});

describe('Day 07 - Challenge 02', () => {
  it('Example #01', () => {
    const list = [
      'pbga (66)',
      'xhth (57)',
      'ebii (61)',
      'havc (66)',
      'ktlj (57)',
      'fwft (72) -> ktlj, cntj, xhth',
      'qoyq (66)',
      'padx (45) -> pbga, havc, qoyq',
      'tknk (41) -> ugml, padx, fwft',
      'jptl (61)',
      'ugml (68) -> gyxo, ebii, jptl',
      'gyxo (61)',
      'cntj (57)',
    ].join('\n');

    const root = challenge2(list);
    expect(root).to.equal(60);
  });

  it('Puzzle input', async () => {
    const input = await readInput();
    const result = challenge2(input);
    expect(result).to.equal(333);
  });
});
