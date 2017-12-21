const transform = (dir, result, count) => {
  const min = Math.min(count[dir[0]], count[dir[1]]);
  count[dir[0]] -= min;
  count[dir[1]] -= min;
  if (result) count[result] += min;
};

const processDirections = (directions) => {
  const plan = {
    n: 0,
    ne: 0,
    se: 0,
    s: 0,
    sw: 0,
    nw: 0,
  };
  let furthest = 0;
  let currentDistance = 0;

  directions.forEach((dir) => {
    plan[dir] += 1;
    transform(['n', 's'], null, plan);
    transform(['ne', 'sw'], null, plan);
    transform(['nw', 'se'], null, plan);
    transform(['n', 'se'], 'ne', plan);
    transform(['n', 'sw'], 'nw', plan);
    transform(['ne', 's'], 'se', plan);
    transform(['ne', 'nw'], 'n', plan);
    transform(['se', 'n'], 'ne', plan);
    transform(['se', 'sw'], 's', plan);
    transform(['s', 'ne'], 'se', plan);
    transform(['s', 'nw'], 'sw', plan);
    transform(['sw', 'n'], 'nw', plan);
    transform(['sw', 'se'], 's', plan);
    transform(['nw', 'ne'], 'n', plan);
    transform(['nw', 's'], 'sw', plan);

    currentDistance = Object.values(plan).reduce((a, b) => a + b);
    furthest = Math.max(currentDistance, furthest);
  });

  return { furthest, currentDistance };
};

module.exports.challenge1 = (input) => {
  const directions = input.split(',');
  const { currentDistance } = processDirections(directions);
  return currentDistance;
};

module.exports.challenge2 = (input) => {
  const directions = input.split(',');
  const { furthest } = processDirections(directions);
  return furthest;
};
