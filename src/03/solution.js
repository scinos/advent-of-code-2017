//                   Axis 2
//                     |
//            17  16  15  14  13
//            18   5   4   3  12
// Axis 3  -- 19   6   1   2  11 -- Axis 1
//            20   7   8   9  10
//            21  22  23  24  25
//                     |
//                   Axis 4

// 1^2     entre 1^2  3^2 -- 2*4 -> 2*4
// 3^2     entre 3^2  5^2 -- 4*4 -> 4*4
// 5^2     entre 5^2  7^2 -- 3*8 -> 6*4
// 7^2

// D

// n >= candidate^2 + 1 --- n < (candidate^2 + 1) + candidate+1

// Index:   1         3               5
//         1         9               26
//         2         10 11 12
//         3 4       13 14 15 16
//         5 6       17 18 19 20
//         7 8       21 22 23 24


const getNextCoord = (n) => {
  if (n === 1) return [1, 0];

  let found = false;
  let candidate = 1;
  while (!found) {
    if (n > candidate ** 2 && n <= (candidate + 2) ** 2) {
      found = true;
    } else {
      candidate += 2;
    }
  }

  const firstNumberInLayer = candidate ** 2 + 1;
  const layerWidth = candidate + 1;
  const layerCorner = (candidate + 2) ** 2;

  if (n === layerCorner) return [1, 0];
  if (n >= firstNumberInLayer + 0 * layerWidth - 1 && n < firstNumberInLayer + 1 * layerWidth - 1) return [0, 1];
  if (n >= firstNumberInLayer + 1 * layerWidth - 1 && n < firstNumberInLayer + 2 * layerWidth - 1) return [-1, 0];
  if (n >= firstNumberInLayer + 2 * layerWidth - 1 && n < firstNumberInLayer + 3 * layerWidth - 1) return [0, -1];
  if (n >= firstNumberInLayer + 3 * layerWidth - 1 && n < firstNumberInLayer + 4 * layerWidth - 1) return [1, 0];

  throw new RangeError("Can't find number in layer");
};

const distanceToAxis = (axis, n) => {
  if (axis === 1) return 4 * (n * n) - (11 * n) + 8;
  if (axis === 2) return 4 * (n * n) - (9 * n) + 6;
  if (axis === 3) return 4 * (n * n) - (7 * n) + 4;
  if (axis === 4) return 4 * (n * n) - (5 * n) + 2;
  throw new Error('Invalid axis');
};

module.exports.challenge1 = (input) => {
  let n = 0;
  let min = Infinity;
  let minFoundInLastIteration = true;
  let axis = 1;

  while (minFoundInLastIteration) {
    minFoundInLastIteration = false;
    n += 1;

    // For each axis, check if the distance to the number is the smallest distance found so far
    [1, 2, 3, 4].forEach((candidateAxis) => {
      const diff = input - distanceToAxis(candidateAxis, n);
      // If the distance is negative, we have crossed the limit
      if (diff < 0) return;

      // If current distance is not smaller than the smallest distance, this is not the axis
      if (diff > min) return;

      // Update axis and smallest distance
      min = diff;
      minFoundInLastIteration = true;
      axis = candidateAxis;
    });
  }

  // We didn't found anything in the last iteration, so the good iteration is the previous one.
  n -= 1;

  return input - distanceToAxis(axis, n) + n - 1;
};


module.exports.getValueForSquare = (square) => {
  const matrix = [];
  for (let i = 0; i < 1000; i++) {
    matrix[i] = Array(1000);
  }

  let x = 500;
  let y = 500;
  matrix[x][y] = 1;
  let n = 1;

  while (n < square) {
    const nextCoords = getNextCoord(n);
    const newX = x + nextCoords[0];
    const newY = y + nextCoords[1];

    let sum = 0;
    sum += matrix[newX + 1][newY + 1] || 0;
    sum += matrix[newX + 1][newY] || 0;
    sum += matrix[newX + 1][newY - 1] || 0;
    sum += matrix[newX][newY + 1] || 0;
    sum += matrix[newX][newY] || 0;
    sum += matrix[newX][newY - 1] || 0;
    sum += matrix[newX - 1][newY + 1] || 0;
    sum += matrix[newX - 1][newY] || 0;
    sum += matrix[newX - 1][newY - 1] || 0;
    matrix[newX][newY] = sum;
    x = newX;
    y = newY;
    n++;
  }
  return matrix[x][y];
};

module.exports.challenge2 = (input) => {
  const matrix = [];
  for (let i = 0; i < 1000; i++) {
    matrix[i] = Array(1000);
  }

  let x = 500;
  let y = 500;
  matrix[x][y] = 1;
  let n = 1;

  const found = false;
  while (!found) {
    const nextCoords = getNextCoord(n);
    const newX = x + nextCoords[0];
    const newY = y + nextCoords[1];

    let sum = 0;
    sum += matrix[newX + 1][newY + 1] || 0;
    sum += matrix[newX + 1][newY] || 0;
    sum += matrix[newX + 1][newY - 1] || 0;
    sum += matrix[newX][newY + 1] || 0;
    sum += matrix[newX][newY] || 0;
    sum += matrix[newX][newY - 1] || 0;
    sum += matrix[newX - 1][newY + 1] || 0;
    sum += matrix[newX - 1][newY] || 0;
    sum += matrix[newX - 1][newY - 1] || 0;
    matrix[newX][newY] = sum;
    x = newX;
    y = newY;

    if (sum > input) return sum;
    n++;
  }
};

