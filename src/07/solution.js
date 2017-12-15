/*
                gyxo
              /
         ugml - ebii
       /      \
      |         jptl
      |
      |         pbga
     /        /
tknk --- padx - havc
     \        \
      |         qoyq
      |
      |         ktlj
       \      /
         fwft - cntj
              \
                xhth
Solution: tknk
*/

const assert = require('assert');

const findRoot = node => (node.parent ? findRoot(node.parent) : node);

const computeWeight = ((node) => {
  node.totalWeight = node.weight;
  if (node.children.length) {
    node.children.forEach(computeWeight);
    node.children = node.children.sort((a, b) => a.totalWeight - b.totalWeight);
    const firstChild = node.children[0];
    const lastChild = node.children[node.children.length - 1];
    node.isBalance = firstChild.totalWeight === lastChild.totalWeight;
    node.totalWeight += node.children.reduce((total, child) => total + child.totalWeight, 0);
  }
});

const findUnbalanced = ((node) => {
  if (node.isBalance) return null;
  if (!node.children.length) return null;

  const unbalnacedChild = node.children.find(child => !child.isBalance);
  if (unbalnacedChild) return findUnbalanced(unbalnacedChild);
  return node;
});

const inputToTree = (input) => {
  const re = /^(.*?)\((.*?)\)(?:->(.*))?$/;
  const discs = input
    .split('\n')
    .map((disc) => {
      const [, name, weight, children] = disc.replace(/ /g, '').match(re);
      return {
        name,
        weight: Number(weight),
        children: children ? children.split(',') : [],
      };
    });

  const tree = {};

  // Create nodes in the tree
  discs.forEach((disc) => {
    tree[disc.name] = {
      name: disc.name,
      weight: disc.weight,
      children: [],
      parent: null,
    };
  });

  // Link the nodes in the tree
  discs
    .filter(disc => disc.children.length)
    .forEach((disc) => {
      const parentNode = tree[disc.name];
      disc.children
        .map(name => tree[name])
        .forEach((childNode) => {
          childNode.parent = parentNode;
          parentNode.children.push(childNode);
        });
    });

  return tree;
};

module.exports.challenge1 = (input) => {
  const tree = inputToTree(input);
  return findRoot(tree[Object.keys(tree)[0]]).name;
};

module.exports.challenge2 = (input) => {
  const tree = inputToTree(input);

  const root = findRoot(tree[Object.keys(tree)[0]]);
  computeWeight(root);
  const unbalancedNode = findUnbalanced(root);

  let balancedChild;
  let unbalancedChild;
  unbalancedNode.children.sort((a, b) => a - b);
  if (unbalancedNode.children[0].totalWeight === unbalancedNode.children[1].totalWeight) {
    [balancedChild] = unbalancedNode.children;
    unbalancedChild = unbalancedNode.children[unbalancedNode.children.length - 1];
  } else {
    balancedChild = unbalancedNode.children[unbalancedNode.children.length - 1];
    [unbalancedChild] = unbalancedNode.children;
  }

  return unbalancedChild.weight - (unbalancedChild.totalWeight - balancedChild.totalWeight);
};
