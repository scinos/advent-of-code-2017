const rot90 = require('compute-rot90');
const fliplr = require('compute-fliplr');
const flipud = require('compute-flipud');
const matrix = require('dstructs-matrix');

const permutate = rule => {
  const size = Math.sqrt(rule.length);

  // Convert the string into a matrix of char codes. We need to convert the string
  // to numbers because matrix can only operate on numbers
  let mtr = matrix(rule.split('').map(s => s.charCodeAt(0)), [size, size], 'int8');

  // Compute 16 permutations: 4 rotations * 4 flips each rotation
  const permutations = [];
  for (let i = 0; i < 4; i += 1) {
    mtr = rot90(mtr);
    permutations.push(mtr, fliplr(mtr), flipud(mtr), flipud(fliplr(mtr)));
  }

  // Convet each permutation back to a string
  return permutations.map(permutation =>
    permutation
      .toString()
      .replace(/;/g, ',')
      .split(',')
      .map(n => String.fromCharCode(Number(n)))
      .join(''),
  );
};

const parseInput = input => {
  const rules = {};
  input.split('\n').forEach(line => {
    const re = /^([.#]+) => ([.#]+)/;
    const [, from, to] = line.replace(/\//g, '').match(re);
    permutate(from).forEach(permutation => {
      rules[permutation] = to;
    });
  });
  return rules;
};

const stringToArray = pattern => {
  const size = pattern.length;

  if (size === 9) {
    return [
      [pattern[0], pattern[1], pattern[2]],
      [pattern[3], pattern[4], pattern[5]],
      [pattern[6], pattern[7], pattern[8]],
    ];
  }
  if (size === 16) {
    return [
      [pattern[0], pattern[1], pattern[2], pattern[3]],
      [pattern[4], pattern[5], pattern[6], pattern[7]],
      [pattern[8], pattern[9], pattern[10], pattern[11]],
      [pattern[12], pattern[13], pattern[14], pattern[15]],
    ];
  }
  throw new Error('Unknown size');
};

const arrayToString = pattern => pattern.map(i => i.join('')).join('');

const divideSubpatterns = pattern => {
  const size = pattern[0].length;
  const str = arrayToString(pattern);
  const subPatterns = [];

  // Divide in patterns of 2x2
  if (size % 2 === 0) {
    for (let i = 0; i < size ** 2; i += size * 2) {
      for (let h = 0; h < size; h += 2) {
        subPatterns.push([
          [str[i + h], str[i + h + 1]],
          [str[i + h + size], str[i + h + 1 + size]],
        ]);
      }
    }
  } else if (size % 3 === 0) {
    for (let i = 0; i < size ** 2; i += size * 3) {
      for (let h = 0; h < size; h += 3) {
        subPatterns.push([
          [str[i + h], str[i + h + 1], str[i + h + 2]],
          [str[i + h + size], str[i + h + 1 + size], str[i + h + 2 + size]],
          [str[i + h + size * 2], str[i + h + 1 + size * 2], str[i + h + 2 + size * 2]],
        ]);
      }
    }
  } else {
    throw new Error('Unknown size');
  }

  return subPatterns;
};
const transformPattern = (pattern, rules) => {
  const subPatterns = divideSubpatterns(pattern).map(subpattern => {
    const line = arrayToString(subpattern);
    const newPattern = rules[line];
    return stringToArray(newPattern);
  });
  const result = [];
  const sizeSubpattern = subPatterns[0][0].length;
  const numberSubpattern = Math.sqrt(subPatterns.length);

  for (let x = 0; x < subPatterns.length; x += numberSubpattern) {
    for (let i = 0; i < sizeSubpattern; i += 1) {
      const partialLine = [];
      for (let h = 0; h < numberSubpattern; h += 1) {
        partialLine.push(...subPatterns[h + x][i]);
      }
      result.push(partialLine);
    }
  }

  return result;
};

const challenge1 = (input, iterations) => {
  const rules = parseInput(input);
  let pattern = [['.', '#', '.'], ['.', '.', '#'], ['#', '#', '#']];
  for (let i = 0; i < iterations; i += 1) {
    pattern = transformPattern(pattern, rules);
  }

  return pattern.reduce((acc, row) => acc + row.filter(i => i === '#').length, 0);
};

module.exports = {
  transformPattern,
  parseInput,
  challenge1,
};
