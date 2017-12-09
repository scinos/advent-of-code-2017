const processInstructions = (instructions, incrementer) => {
  let pointer = 0;
  let counter = 0;

  while (pointer >= 0 && pointer < instructions.length) {
    counter += 1;
    const newPointer = pointer + instructions[pointer];
    instructions[pointer] += incrementer(instructions[pointer]);
    pointer = newPointer;
  }

  return counter;
};

const challenge1 = input => processInstructions(
  input.split('\n').map(Number),
  () => 1,
);

const challenge2 = input => processInstructions(
  input.split('\n').map(Number),
  offset => (
    offset >= 3 ? -1 : 1
  ),
);

module.exports = { challenge1, challenge2 };

