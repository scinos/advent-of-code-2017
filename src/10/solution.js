const processList = ({ list, position, length, skip }) => {
  if (position + length < list.length) {
    const twistedString = list.slice(position, position + length).reverse();

    const newList = [
      ...list.slice(0, position),
      ...twistedString,
      ...list.slice(position + length),
    ];

    return {
      list: newList,
      position: (position + length + skip) % list.length,
      skip: skip + 1,
    };
  }

  const firstPartOfTheString = list.slice(position);
  const lastPartOfTheString = list.slice(0, length - (list.length - position));
  const totalStringToTwist = [...firstPartOfTheString, ...lastPartOfTheString].reverse();

  const newList = [
    ...totalStringToTwist.slice(firstPartOfTheString.length),
    ...list.slice(length - (list.length - position), position),
    ...totalStringToTwist.slice(0, firstPartOfTheString.length),
  ];
  return {
    list: newList,
    position: (position + length + skip) % list.length,
    skip: skip + 1,
  };
};
const inputToBytes = input => input.split('').map(c => c.charCodeAt(0));
const extendBytes = bytes => [...bytes, 17, 31, 73, 47, 23];
const round = (input, initialList, initialPosition = 0, initialSkip = 0) =>
  input.reduce(
    ({ list, position, skip }, length) =>
      processList({
        list,
        position,
        length,
        skip,
      }),
    {
      list: initialList,
      position: initialPosition,
      skip: initialSkip,
    },
  );

module.exports.challenge1 = (input, size = 256) => {
  // Clean up the input
  const inputAsNumbers = input.split(',').map(n => Number(n));

  // Construct initial list
  const initialList = [];
  for (let index = 0; index < size; index += 1) {
    initialList[index] = index;
  }

  // Do one round of processing in the list
  const { list: finalList } = round(inputAsNumbers, initialList);

  // Return basic hash
  return finalList[0] * finalList[1];
};

module.exports.challenge2 = (input, size = 256) => {
  // Expand input
  const bytes = extendBytes(inputToBytes(input));

  // Construct initial list
  let list = [];
  for (let index = 0; index < size; index += 1) {
    list[index] = index;
  }

  // Do 64 rounds
  let position = 0;
  let skip = 0;
  for (let index = 0; index < 64; index += 1) {
    const result = round(bytes, list, position, skip);
    list = result.list;
    position = result.position;
    skip = result.skip;
  }

  let hash = '';
  for (let index = 0; index < list.length; index += 16) {
    const block = list.slice(index, index + 16);
    const xor = block.reduce((a, b) => a ^ b);
    const hex = xor.toString(16);
    hash += hex.length === 1 ? `0${hex}` : hex;
  }

  return hash;
};

module.exports.processList = processList;
module.exports.inputToBytes = inputToBytes;
module.exports.extendBytes = extendBytes;
