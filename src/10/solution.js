
const processList = ({
  list, position, length, skip,
}) => {
  if ((position + length) < list.length) {
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

module.exports.challenge1 = (input) => {
  const initialList = [];
  for (let index = 0; index < 256; index += 1) {
    initialList[index] = index;
  }

  const { list: finalList } = input
    .split(',')
    .map(n => Number(n))
    .reduce(({ list, position, skip }, length) => processList({
      list,
      position,
      length,
      skip,
    }), {
      list: initialList,
      position: 0,
      skip: 0,
    });

  return finalList[0] * finalList[1];
};

module.exports.processList = processList;
