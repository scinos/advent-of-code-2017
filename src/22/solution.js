const parseInput = input =>
  input.split('\n').map(line => line.split('').map(c => (c === '#' ? 1 : 0)));

const buildInitialMap = (initialMap, factor) => {
  const mapSizeX = factor * 2 + initialMap.length;
  const mapSizeY = factor * 2 + initialMap[0].length;

  const map = [];
  for (let i = 0; i < mapSizeX; i += 1) {
    const row = [];
    for (let h = 0; h < mapSizeY; h += 1) {
      row.push(0);
    }
    map.push(row);
  }

  const offsetX = (map.length - initialMap.length) / 2;
  const offsetY = (map[0].length - initialMap[0].length) / 2;
  for (let i = 0; i < initialMap.length; i += 1) {
    for (let h = 0; h < initialMap[i].length; h += 1) {
      map[i + offsetX][h + offsetY] = initialMap[i][h];
    }
  }

  return map;
};

const turnLeft = direction => {
  if (direction === 'up') return 'left';
  if (direction === 'left') return 'down';
  if (direction === 'down') return 'right';
  if (direction === 'right') return 'up';
  throw new Error('Unknown direction');
};

const turnRight = direction => {
  if (direction === 'up') return 'right';
  if (direction === 'right') return 'down';
  if (direction === 'down') return 'left';
  if (direction === 'left') return 'up';
  throw new Error('Unknown direction');
};

const reverse = direction => {
  if (direction === 'up') return 'down';
  if (direction === 'right') return 'left';
  if (direction === 'down') return 'up';
  if (direction === 'left') return 'right';
  throw new Error('Unknown direction');
};

const factor = 1000;

module.exports.challenge1 = (input, iterations) => {
  const initialMap = parseInput(input);
  const map = buildInitialMap(initialMap, factor);
  let infections = 0;

  const position = [(map.length - 1) / 2, (map[0].length - 1) / 2];
  let direction = 'up';

  for (let i = 0; i < iterations; i += 1) {
    const node = map[position[0]][position[1]];
    if (node === 0) {
      direction = turnLeft(direction);
      infections += 1;
      map[position[0]][position[1]] = 1;
    } else if (node === 1) {
      direction = turnRight(direction);
      map[position[0]][position[1]] = 0;
    }

    if (direction === 'up') position[0] -= 1;
    if (direction === 'down') position[0] += 1;
    if (direction === 'left') position[1] -= 1;
    if (direction === 'right') position[1] += 1;
  }

  return infections;
};

module.exports.challenge2 = (input, iterations) => {
  const initialMap = parseInput(input).map(line => line.map(c => (c === 1 ? 2 : c)));
  const map = buildInitialMap(initialMap, factor);
  let infections = 0;

  const position = [(map.length - 1) / 2, (map[0].length - 1) / 2];
  let direction = 'up';

  for (let i = 0; i < iterations; i += 1) {
    const node = map[position[0]][position[1]];

    switch (node) {
      case 0:
        direction = turnLeft(direction);
        map[position[0]][position[1]] = 1;
        break;
      case 1:
        map[position[0]][position[1]] = 2;
        infections += 1;
        break;
      case 2:
        direction = turnRight(direction);
        map[position[0]][position[1]] = 3;
        break;
      case 3:
        direction = reverse(direction);
        map[position[0]][position[1]] = 0;
        break;
      default:
        throw new Error('Unkonwn state');
    }

    if (direction === 'up') position[0] -= 1;
    if (direction === 'down') position[0] += 1;
    if (direction === 'left') position[1] -= 1;
    if (direction === 'right') position[1] += 1;
  }

  return infections;
};
