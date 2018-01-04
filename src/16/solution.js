const parseMove = move => {
  let match;

  if ((match = move.match(/^s(\d+)$/))) {
    return {
      type: 'spin',
      ammount: match[1],
    };
  }

  if ((match = move.match(/^x(\d+)\/(\d+)$/))) {
    return {
      type: 'exchange',
      a: match[1],
      b: match[2],
    };
  }

  if ((match = move.match(/^p([a-z])\/([a-z])$/))) {
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

/*
 * We exploit the fact that there are probably loops in the instructions. This means that after
 * running N instructions, we'll get the initial configuration again.
 *
 * Once we have detected a loop, we don't need to compute all repetitions. We only need to
 * compuet those "outside" the loops. For example, if there are 100 repetitions and the loop
 * occurs at position 30, we only need to run 10 repetitions, because the first 90 (3 loops)
 * will always yield the initial configuration.
 *
 * Also, because we have been saving all configurations that happens inside the loop, we don't
 * need to re-compute it, because literally all posible values have been alraedy computed to
 * detect the loop. In other words, `patterns` is like a memoization of the dance: we can just
 * pick the expected value from there.
 */
module.exports.challenge2 = (initialLine, dance, repetitions) => {
  const moves = dance.split(',').map(parseMove);
  let dancers = initialLine.split('');

  const patterns = [];
  let loop = Infinity;
  for (let i = 0; i < repetitions; i += 1) {
    dancers = doDance(dancers, moves);
    if (patterns.includes(dancers.join(''))) {
      loop = i;
      break;
    }
    patterns.push(dancers.join(''));
  }

  return patterns[repetitions % loop - 1];
};
