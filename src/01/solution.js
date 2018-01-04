const findRelatedNumbers = (input, step) => {
  // Clone input array to not modify external object
  const workArray = input.slice();

  return (
    workArray
      // Duplicate part of the array for easier circular checks
      .concat(workArray.slice(0, step))

      // Sum related numbers
      .reduce((sum, current, index, list) => {
        if (current === list[index + step]) return sum + current;
        return sum;
      }, 0)
  );
};

module.exports.challenge1 = input => {
  const inputAsArray = input.split('').map(Number);
  return findRelatedNumbers(inputAsArray, 1);
};

module.exports.challenge2 = input => {
  const inputAsArray = input.split('').map(Number);
  const step = inputAsArray.length / 2;
  return findRelatedNumbers(inputAsArray, step);
};
