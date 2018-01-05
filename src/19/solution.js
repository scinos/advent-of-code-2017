const parseInput = input => {
  const map = input.split('\n').map(line => {
    if (line.length !== input.length) {
      line += Array(input.length - line.length + 1).join(' ');
    }
    return line.split('');
  });
  return map;
};

const findStartingPoint = map => ({
  h: map[0].indexOf('|'),
  v: 0,
});

const walk = map => {
  const startingPoint = findStartingPoint(map);
  const letters = [];
  let steps = 0;

  let h = startingPoint.h;
  let v = startingPoint.v;
  let dir = 'down';
  let atTheEndPoint = false;
  while (!atTheEndPoint) {
    steps += 1;
    const canGoDown = map[v + 1][h] !== ' ';
    const canGoUp = map[v - 1] ? map[v - 1][h] !== ' ' : false;
    const canGoLeft = map[v][h - 1] !== ' ';
    const canGoRight = map[v][h + 1] !== ' ';
    const goLeft = () => {
      h -= 1;
      dir = 'left';
    };
    const goRight = () => {
      h += 1;
      dir = 'right';
    };
    const goUp = () => {
      v -= 1;
      dir = 'up';
    };
    const goDown = () => {
      v += 1;
      dir = 'down';
    };

    const c = map[v][h];

    if (c === '+') {
      switch (dir) {
        case 'down':
        case 'up':
          if (canGoLeft) goLeft();
          else if (canGoRight) goRight();
          else throw new Error('Found a + without an exit');
          break;
        case 'left':
        case 'right':
          if (canGoUp) goUp();
          else if (canGoDown) goDown();
          else throw new Error('Found a + without an exit');
          break;
        default:
          throw new Error('Unknown direction');
      }
      continue;
    }

    if (!c) debugger;

    if (c.match(/[A-Z]/)) {
      letters.push(c);
    }

    switch (dir) {
      case 'down':
        if (canGoDown) goDown();
        else atTheEndPoint = true;
        break;
      case 'up':
        if (canGoUp) goUp();
        else atTheEndPoint = true;
        break;
      case 'right':
        if (canGoRight) goRight();
        else atTheEndPoint = true;
        break;
      case 'left':
        if (canGoLeft) goLeft();
        else atTheEndPoint = true;
        break;
      default:
        throw new Error('Unknown direction');
    }
  }

  return {
    letters: letters.join(''),
    steps,
  };
};

module.exports.challenge1 = input => {
  const map = parseInput(input);
  return walk(map).letters;
};

module.exports.challenge2 = input => {
  const map = parseInput(input);
  return walk(map).steps;
};
