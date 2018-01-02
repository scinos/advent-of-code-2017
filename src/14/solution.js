const { challenge2: knot } = require('../10/solution');

const GRID = 128;

const hashGrid = (key) => {
  const hashes = [];

  for (let index = 0; index < GRID; index += 1) {
    const rowKey = `${key}-${index}`;
    const hash = knot(rowKey);
    hashes.push(hash.split('').reduce((acc, hexadecimalCharacter) => {
      const binaryHash = parseInt(hexadecimalCharacter, 16)
        .toString(2)
        .split('')
        .map(b => Number(b));
      const paddedHash = [0, 0, 0, 0, ...binaryHash].slice(-4);
      return [...acc, ...paddedHash];
    }, []));
  }

  return hashes;
};

const removeGroup = (grid, x, y) => {
  if (grid[x][y] === 0) return;
  grid[x][y] = 0;
  if (x < grid[0].length - 1) removeGroup(grid, x + 1, y);
  if (x > 0) removeGroup(grid, x - 1, y);
  if (y < grid.length - 1) removeGroup(grid, x, y + 1);
  if (y > 0) removeGroup(grid, x, y - 1);
};

module.exports.challenge1 = (key) => {
  const hashes = hashGrid(key);
  const total = hashes
    .map(line => line.filter(c => c === 1).length)
    .reduce((a, b) => a + b);
  return total;
};

module.exports.challenge2 = (key) => {
  const grid = hashGrid(key);
  let groups = 0;

  for (let x = 0; x < grid.length; x += 1) {
    for (let y = 0; y < grid[x].length; y += 1) {
      const block = grid[x][y];
      if (block === 1) {
        groups += 1;
        removeGroup(grid, x, y);
      }
    }
  }

  return groups;
};

