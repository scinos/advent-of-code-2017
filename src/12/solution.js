const regroupTree = tree => {
  let changed;
  do {
    changed = false;
    Object.values(tree).forEach(node => {
      const newGroupId = Math.min(node.id, ...node.peers.map(p => tree[p].groupId));
      if (newGroupId !== node.groupId) {
        node.groupId = newGroupId;
        changed = true;
      }
    });
  } while (changed);
};

const parseInput = input => {
  const re = /^([0-9]+) <-> (.*)$/;
  const nodes = input.split('\n').map(line => {
    const [, id, pipes] = line.match(re);
    const peers = pipes
      .replace(/ /g, '')
      .split(',')
      .map(Number);
    return {
      id: Number(id),
      peers,
      groupId: Number(id),
    };
  });

  regroupTree(nodes);
  return nodes;
};

const isInGroup = (input, group, number) => {
  const tree = typeof input === 'string' ? parseInput(input) : input;

  return Object.values(tree)
    .filter(node => node.groupId === group)
    .map(node => node.id)
    .includes(number);
};

const challenge1 = input => {
  const nodes = parseInput(input);
  return Object.values(nodes).filter(node => node.groupId === 0).length;
};

const challenge2 = input => {
  const nodes = parseInput(input);
  return new Set(Object.values(nodes).map(node => node.groupId)).size;
};

module.exports = {
  isInGroup,
  challenge1,
  challenge2,
};
