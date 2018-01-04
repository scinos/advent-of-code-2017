const FACTOR_A = 16807;
const FACTOR_B = 48271;
const MASK = 2147483647;

const generateNext = (initial, factor, cond) => {
  let value = initial;

  while (true) {
    value = (value * factor) % MASK;
    if (cond(value)) return value;
  }
};

const generateAndCompare = (initialA, condA, initialB, condB, total) => {
  let counter = 0;
  let a = initialA;
  let b = initialB;

  for (let i = 0; i < total; i += 1) {
    a = generateNext(a, FACTOR_A, condA);
    b = generateNext(b, FACTOR_B, condB);

    if ((a & (2 ** 16 - 1)) === (b & (2 ** 16 - 1))) {
      counter += 1;
    }
  }

  return counter;
};

const generateAndCompareAll = (initialA, initialB, total) =>
  generateAndCompare(initialA, () => true, initialB, () => true, total);

const generateAndCompareMultiples = (initialA, initialB, total) =>
  generateAndCompare(initialA, value => value % 4 === 0, initialB, value => value % 8 === 0, total);

const challenge1 = input => {
  const lines = input.split('\n');
  const [, initialA] = lines[0].match(/^Generator A starts with (\d+)$/);
  const [, initialB] = lines[1].match(/^Generator B starts with (\d+)$/);
  return generateAndCompareAll(Number(initialA), Number(initialB), 40000000);
};

const challenge2 = input => {
  const lines = input.split('\n');
  const [, initialA] = lines[0].match(/^Generator A starts with (\d+)$/);
  const [, initialB] = lines[1].match(/^Generator B starts with (\d+)$/);
  return generateAndCompareMultiples(Number(initialA), Number(initialB), 5000000);
};

module.exports = {
  generateAndCompareAll,
  generateAndCompareMultiples,
  challenge1,
  challenge2,
};
