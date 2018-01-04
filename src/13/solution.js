const moveScannerUp = layer => {
  layer.direction = 'up';
  layer.position = Math.max(0, layer.position - 1);
};

const moveScannerDown = layer => {
  layer.direction = 'down';
  layer.position = Math.min(layer.range - 1, layer.position + 1);
};

const moveScanner = layer => {
  if (layer.direction === 'down') {
    if (layer.position === layer.range - 1) {
      moveScannerUp(layer);
    } else {
      moveScannerDown(layer);
    }
  } else if (layer.direction === 'up') {
    if (layer.position === 0) {
      moveScannerDown(layer);
    } else {
      moveScannerUp(layer);
    }
  }
};

const movePacket = (packet, scanner) => {
  packet.layer += 1;
  const layer = scanner[packet.layer];

  if (typeof layer === 'object' && layer.position === 0) {
    packet.cost += packet.layer * layer.range;
  }
};

const parseInput = input => {
  const re = /^(\d*?): (\d*?)$/;

  const recording = input
    .split('\n')
    .map(line => line.match(re))
    .map(([, depth, range]) => ({ depth: Number(depth), range: Number(range) }));

  const firewall = [];
  recording.forEach(({ depth, range }) => {
    firewall[depth] = {
      range,
      position: 0,
      direction: 'down',
    };
  });
  return firewall;
};

const crossFirewall = firewall => {
  const packet = {
    layer: -1,
    cost: 0,
  };
  while (packet.layer < firewall.length) {
    movePacket(packet, firewall);
    for (let index = 0; index < firewall.length; index += 1) {
      const f = firewall[index];
      if (!f) continue;
      moveScanner(f);
    }
  }

  return packet.cost;
};

module.exports.challenge1 = input => {
  const firewall = parseInput(input);
  return crossFirewall(firewall);
};

const layerIsZero = (range, delay, index) => {
  const period = (range - 1) * 2;
  return (delay + index) % period === 0;
};

module.exports.challenge2 = input => {
  const firewall = parseInput(input);

  const hasZeroForDelay = delay =>
    firewall.some(({ range }, index) => layerIsZero(range, delay, index));

  let delay = 0;
  while (hasZeroForDelay(delay)) {
    delay += 1;
  }
  return delay;
};
