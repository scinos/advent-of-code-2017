
const parseMove = (move) => {
  let match;

  if (match = move.match(/^s(\d+)$/)) {
    return {
      type: 'spin',
      ammount: match[1],
    };
  }

  if (match = move.match(/^x(\d+)\/(\d+)$/)) {
    return {
      type: 'exchange',
      a: match[1],
      b: match[2],
    };
  }

  if (match = move.match(/^p([a-z])\/([a-z])$/)) {
    return {
      type: 'partner',
      a: match[1],
      b: match[2],
    };
  }

  throw new Error('Unknown move');
};

const doDance = (dancers, moves) => {
  let swap;
  let positionA;
  let positionB;
  let line = dancers;

  for (let i = 0; i < moves.length; i += 1) {
    const move = moves[i];

    switch (move.type) {
      case 'spin':
        line = [...line.slice(-move.ammount), ...line.slice(0, line.length - move.ammount)];
        break;
      case 'exchange':
        swap = line[move.a];
        line[move.a] = line[move.b];
        line[move.b] = swap;
        break;
      case 'partner':
        positionA = line.indexOf(move.a);
        positionB = line.indexOf(move.b);
        swap = line[positionA];
        line[positionA] = line[positionB];
        line[positionB] = swap;
        break;
      default:
        throw new Error('Unknown move');
    }
  }
  return line;
};

module.exports.challenge1 = (initialLine, dance) => {
  const moves = dance.split(',').map(parseMove);
  const dancers = initialLine.split('');

  return doDance(dancers, moves).join('');
};

module.exports.challenge2 = (initialLine, dance, repetitions = 100) => {
  const moves = dance.split(',').map(parseMove);
  let dancers = initialLine.split('');

  const patterns = [];
  let loop;
  for (let i = 0; i < repetitions; i += 1) {
    dancers = doDance(dancers, moves);
    if (patterns.includes(dancers.join(''))) {
      loop = i;
      break;
    }
    patterns.push(dancers.join(''));
  }

  return patterns[(repetitions % loop) - 1];
};

