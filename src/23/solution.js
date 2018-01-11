const isPrime = require('quick-is-prime');

const parse = input =>
  input.split('\n').map(line => {
    const [, instruction, a, b] = line.match(/^([a-z]{3}) (.*?)(?: (.*?))?$/);
    return {
      instruction,
      a,
      b,
    };
  });

class Program {
  static runProgram(programToRun) {
    let result;
    do {
      result = programToRun.runNext();
    } while (result);
  }

  constructor(instructions) {
    this.registry = {};
    this.next = 0;
    this.instructions = instructions;
    this.instructionsCount = {};
    this.initialValue = 0;
  }

  resolve(v) {
    if (v === undefined) return undefined;

    const r = Number(v);
    if (!Number.isNaN(r)) return r;

    if (!(v in this.registry)) this.registry[v] = this.initialValue;
    return this.registry[v];
  }

  processSet(a, b) {
    const r2 = this.resolve(b);
    this.registry[a] = r2;
    this.next += 1;
    return {
      type: Program.RUN_NEXT,
    };
  }

  processSub(a, b) {
    const r1 = this.resolve(a);
    const r2 = this.resolve(b);
    this.registry[a] = r1 - r2;
    this.next += 1;
    return {
      type: Program.RUN_NEXT,
    };
  }

  processMul(a, b) {
    const r1 = this.resolve(a);
    const r2 = this.resolve(b);
    this.registry[a] = r1 * r2;
    this.next += 1;
    return {
      type: Program.RUN_NEXT,
    };
  }

  processJnz(a, b) {
    const r1 = this.resolve(a);
    const r2 = this.resolve(b);
    if (r1 !== 0) {
      this.next += r2;
    } else {
      this.next += 1;
    }
    return {
      type: Program.RUN_NEXT,
    };
  }

  countInstruction(ins) {
    if (!(ins in this.instructionsCount)) this.instructionsCount[ins] = 0;
    this.instructionsCount[ins] += 1;
  }

  runNext() {
    if (this.next > this.instructions.length - 1) {
      return null;
    }

    const { instruction, a, b } = this.instructions[this.next];
    this.countInstruction(instruction);

    switch (instruction) {
      case 'set':
        return this.processSet(a, b);

      case 'sub':
        return this.processSub(a, b);

      case 'mul':
        return this.processMul(a, b);

      case 'jnz':
        return this.processJnz(a, b);

      default:
        throw new Error(`Unknown instrunction ${instruction}`);
    }
  }
}
Program.RUN_NEXT = 'run_next';
Program.BLOCKED = 'blocked';
Program.VALUE = 'value';

module.exports.challenge1 = input => {
  const instructions = parse(input);
  const program = new Program(instructions);
  Program.runProgram(program);
  return program.instructionsCount.mul;
};

// Huge hack
module.exports.challenge2 = () => {
  const b = 79 * 100 + 100000;
  const c = b + 17000;

  let primeCount = 0;
  for (let i = c; i >= b; i -= 17) {
    if (!isPrime(i)) primeCount += 1;
  }
  return primeCount;
};
