const countStream = (stream) => {
  let groupScore = 0;
  let nextScore = 1;
  let garbageCount = 0;
  let inGarbage = false;
  let character;
  let index = 0;

  while (character = stream[index]) {
    switch (character) {
      case '{':
        if (inGarbage) {
          garbageCount += 1;
        } else {
          groupScore += nextScore;
          nextScore += 1;
        }
        break;

      case '}':
        if (inGarbage) {
          garbageCount += 1;
        } else {
          nextScore -= 1;
        }
        break;

      case '<':
        if (!inGarbage) {
          inGarbage = true;
        } else {
          garbageCount += 1;
        }
        break;

      case '>':
        inGarbage = false;
        break;

      case '!':
        index += 1;
        break;

      default:
        if (inGarbage) {
          garbageCount += 1;
        }
        break;
    }
    index += 1;
  }

  return {
    groupScore,
    garbageCount,
  };
};

module.exports.challenge1 = input => countStream(input).groupScore;
module.exports.challenge2 = input => countStream(input).garbageCount;
