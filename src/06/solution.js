const findBiggestBank = memory =>
  memory.reduce((biggestIndex, blocks, index) => {
    if (blocks > memory[biggestIndex]) return index;
    return biggestIndex;
  }, 0);

const balanceMemory = memory => {
  const workingMemory = Array.of(...memory);

  let memoryBank = findBiggestBank(workingMemory);
  let blocks = workingMemory[memoryBank];
  // Reset current bank
  workingMemory[memoryBank] = 0;

  while (blocks > 0) {
    // Get next memory position
    memoryBank = (memoryBank + 1) % workingMemory.length;

    // Move one block to the bank
    workingMemory[memoryBank] += 1;
    blocks -= 1;
  }

  return workingMemory;
};

const findLoop = memory => {
  const knownConfigurations = {};
  let counter = 0;
  while (true) {
    // Generate memory configuration id
    const id = memory.join(':');

    // Check if the memory is a known configuration
    if (id in knownConfigurations) return { counter, size: counter - knownConfigurations[id] };
    knownConfigurations[id] = counter;

    // Process memory and do the whole thing again
    memory = balanceMemory(memory);
    counter += 1;
  }
};

const challenge1 = input => findLoop(input.split(/\s+/).map(Number)).counter;
const challenge2 = input => findLoop(input.split(/\s+/).map(Number)).size;

module.exports = {
  challenge1,
  challenge2,
  balanceMemory,
  findBiggestBank,
};
