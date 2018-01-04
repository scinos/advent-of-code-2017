const findHighest = memory => {
  const sortedMemory = Object.values(memory).sort((a, b) => b - a);
  return sortedMemory[0];
};

const processInstruction = (memory, instruction) => {
  const {
    register,
    operation,
    ammount,
    conditionRegister,
    conditionOperation,
    conditionAmmount,
  } = instruction;

  if (!(register in memory)) memory[register] = 0;
  if (!(conditionRegister in memory)) memory[conditionRegister] = 0;

  let conditionPasses = false;
  switch (conditionOperation) {
    case '>':
      conditionPasses = memory[conditionRegister] > conditionAmmount;
      break;
    case '<':
      conditionPasses = memory[conditionRegister] < conditionAmmount;
      break;
    case '>=':
      conditionPasses = memory[conditionRegister] >= conditionAmmount;
      break;
    case '<=':
      conditionPasses = memory[conditionRegister] <= conditionAmmount;
      break;
    case '==':
      conditionPasses = memory[conditionRegister] === conditionAmmount;
      break;
    case '!=':
      conditionPasses = memory[conditionRegister] !== conditionAmmount;
      break;
    default:
      throw new Error('Unknown condition');
  }

  if (conditionPasses) {
    switch (operation) {
      case 'inc':
        memory[register] += ammount;
        break;
      case 'dec':
        memory[register] -= ammount;
        break;
      default:
        throw new Error('Unknown operation');
    }
  }
  return register;
};

const parseInstructions = input => {
  const re = /^(.*?) (.*?) (.*?) if (.*?) (.*?) (.*?)$/;
  return input.split('\n').map(line => {
    const [
      ,
      register,
      operation,
      ammount,
      conditionRegister,
      conditionOperation,
      conditionAmmount,
    ] = line.match(re);
    return {
      register,
      operation,
      ammount: Number(ammount),
      conditionRegister,
      conditionOperation,
      conditionAmmount: Number(conditionAmmount),
    };
  });
};

module.exports.challenge1 = input => {
  const memory = {};
  parseInstructions(input).forEach(processInstruction.bind(null, memory));
  return findHighest(memory);
};

module.exports.challenge2 = input => {
  const memory = {};
  let highest = -Infinity;

  parseInstructions(input).forEach(instruction => {
    const register = processInstruction(memory, instruction);
    highest = Math.max(memory[register], highest);
  });

  return highest;
};
