const parseInput = input =>
  input
    .split('\n')
    .map(line => line.match(/^(.*?)\/(.*?)$/))
    .map(match => ({
      a: Number(match[1]),
      b: Number(match[2]),
    }))
    .reduce((acc, component) => {
      const reverseComponent = { a: component.b, b: component.a, used: false };
      component.pair = reverseComponent;
      reverseComponent.pair = component;
      return [...acc, component, reverseComponent];
    }, []);

const strengthChain = chain => chain.reduce((acc, c) => acc + c.a + c.b, 0);

const buildChains = (originalChain, originalComponents) => {
  const chains = [];

  const buildChain = (chain, components) => {
    const lastChainComponent = chain[chain.length - 1];

    for (let i = 0; i < components.length; i += 1) {
      const newComponent = components[i];

      if (lastChainComponent.b === newComponent.a) {
        const newChain = chain.concat(newComponent);
        const newComponents = [].concat(components);
        newComponents.splice(newComponents.indexOf(newComponent), 1);
        newComponents.splice(newComponents.indexOf(newComponent.pair), 1);

        chains.push(newChain);
        buildChain(newChain, newComponents);
      }
    }
  };
  buildChain(originalChain, originalComponents);
  return chains;
};

module.exports.challenge1 = input => {
  const components = parseInput(input);
  return buildChains([{ a: 0, b: 0 }], components)
    .map(strengthChain)
    .reduce((a, b) => Math.max(a, b));
};

module.exports.challenge2 = input => {
  const components = parseInput(input);
  const chains = buildChains([{ a: 0, b: 0 }], components)
    .map(chain => ({
      length: chain.length,
      strength: strengthChain(chain),
    }))
    .sort((a, b) => {
      if (a.length === b.length) return b.strength - a.strength;
      return b.length - a.length;
    });
  return chains[0].strength;
};
