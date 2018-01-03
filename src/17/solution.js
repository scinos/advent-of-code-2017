const getNextPosition = (buffer, currentPosition, step) => {
  let position = currentPosition;

  if (position + step > buffer.length - 1) {
    const stepsUntilTheEnd = (buffer.length) - position;
    const stepsLeft = step - stepsUntilTheEnd;
    position = (stepsLeft % buffer.length);
  } else {
    position += step;
  }
  return position;
};

module.exports.challenge1 = (step, endValue) => {
  const buffer = [0];
  let position = 0;

  for (let i = 1; i <= endValue; i += 1) {
    position = getNextPosition(buffer, position, step) + 1;
    buffer.splice(position, 0, i);
  }

  return buffer[position + 1];
};

/*
 * We need to find the element next to 0 at the end of the computation. Because 0 is always the
 * first element of the buffer, the only number we have to insert into its place is the number in
 * index=1. All other indexes don't matter, so we do the fastest operation: push at the end.
 *
 * At the end of the computation, we don't need to look up for 0, because we know is the first
 * element. So the result will always be on index 1.
*/
module.exports.challenge2 = (step, endValue) => {
  const buffer = [0];
  let position = 0;

  for (let i = 1; i <= endValue; i += 1) {
    position = getNextPosition(buffer, position, step) + 1;
    if (position === 1) {
      buffer.splice(position, 0, i);
    } else {
      buffer.push(i);
    }
  }

  return buffer[1];
};

