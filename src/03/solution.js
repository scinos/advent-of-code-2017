//                   Axis 2
//                     |
//            17  16  15  14  13
//            18   5   4   3  12
// Axis 3  -- 19   6   1   2  11 -- Axis 1
//            20   7   8   9  10
//            21  22  23  24  25
//                     |
//                   Axis 4

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

