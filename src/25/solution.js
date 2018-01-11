const parseInput = input => {
  let initialState;
  let numberOfSteps;
  let lastState = null;
  let lastValue = null;
  const states = {};

  input.split('\n').forEach(line => {
    let match;
    if ((match = line.match(/^Begin in state (.*)\.$/))) {
      initialState = match[1];
      return;
    }
    if ((match = line.match(/^Perform a diagnostic checksum after (.*) steps\.$/))) {
      numberOfSteps = Number(match[1]);
      return;
    }
    if ((match = line.match(/^In state (.*):$/))) {
      lastState = match[1];
      states[lastState] = {};
      return;
    }
    if ((match = line.match(/^ {2}If the current value is (.*):$/))) {
      lastValue = Number(match[1]);
      states[lastState][lastValue] = {};
      return;
    }
    if ((match = line.match(/^ {4}- Write the value (.)*\.$/))) {
      states[lastState][lastValue].value = Number(match[1]);
      return;
    }

    if ((match = line.match(/^ {4}- Move one slot to the (.*)\.$/))) {
      states[lastState][lastValue].next = match[1] === 'left' ? -1 : 1;
    }

    if ((match = line.match(/^ {4}- Continue with state (.*)\.$/))) {
      states[lastState][lastValue].nextState = match[1];
    }
  });

  return {
    initialState,
    numberOfSteps,
    states,
  };
};

const getCurrentValue = (cursor, positiveTape, negativeTape) => {
  if (cursor >= 0) {
    if (cursor >= positiveTape.length) positiveTape[cursor] = 0;
    return positiveTape[cursor];
  }

  const negativeCursor = Math.abs(cursor) - 1;
  if (negativeCursor >= negativeTape.length) negativeTape[negativeCursor] = 0;
  return negativeTape[negativeCursor];
};

const setCurrentValue = (cursor, value, positiveTape, negativeTape) => {
  if (cursor >= 0) {
    positiveTape[cursor] = value;
  } else {
    negativeTape[Math.abs(cursor) - 1] = value;
  }
};

module.exports.challenge1 = input => {
  const blueprint = parseInput(input);

  const positiveTape = [0];
  const negativeTape = [];
  let currentState = blueprint.initialState;
  let cursor = 0;

  for (let i = 0; i < blueprint.numberOfSteps; i += 1) {
    const value = getCurrentValue(cursor, positiveTape, negativeTape);
    const state = blueprint.states[currentState][value];
    setCurrentValue(cursor, state.value, positiveTape, negativeTape);
    cursor += state.next;
    currentState = state.nextState;
  }

  return positiveTape.filter(v => v === 1).length + negativeTape.filter(v => v === 1).length;
};
