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
  static runProgram(programToRun, programWithQueue) {
    let type;
    let value;
    do {
      const result = programToRun.runNext();
      type = result.type;
      value = result.value;

      if (type === Program.VALUE) programWithQueue.queue.push(value);
    } while (type !== Program.BLOCKED);
  }

  constructor(id, instructions) {
    this.initialValue = id;
    this.registry = {};
    this.next = 0;
    this.instructions = instructions;
    this.queue = [];
    this.countValuesSent = 0;
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

  processAdd(a, b) {
    const r1 = this.resolve(a);
    const r2 = this.resolve(b);
    this.registry[a] = r1 + r2;
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

  processMod(a, b) {
    const r1 = this.resolve(a);
    const r2 = this.resolve(b);
    this.registry[a] = r1 % r2;
    this.next += 1;
    return {
      type: Program.RUN_NEXT,
    };
  }

  processJgz(a, b) {
    const r1 = this.resolve(a);
    const r2 = this.resolve(b);
    if (r1 > 0) {
      this.next += r2;
    } else {
      this.next += 1;
    }
    return {
      type: Program.RUN_NEXT,
    };
  }

  processSnd(a) {
    const r1 = this.resolve(a);
    this.next += 1;
    this.countValuesSent += 1;
    return {
      type: Program.VALUE,
      value: r1,
    };
  }

  processRcv(a) {
    if (this.queue.length) {
      this.registry[a] = this.queue.shift();
      this.next += 1;
      return {
        type: Program.RUN_NEXT,
      };
    }
    return {
      type: Program.BLOCKED,
    };
  }

  runNext() {
    if (this.next > this.instructions.length - 1) {
      this.queue.length = 0;
      return null;
    }

    const { instruction, a, b } = this.instructions[this.next];

    switch (instruction) {
      case 'set':
        return this.processSet(a, b);

      case 'add':
        return this.processAdd(a, b);

      case 'mul':
        return this.processMul(a, b);

      case 'mod':
        return this.processMod(a, b);

      case 'jgz':
        return this.processJgz(a, b);

      case 'snd':
        return this.processSnd(a);

      case 'rcv':
        return this.processRcv(a);

      default:
        throw new Error(`Unknown instrunction ${instruction}`);
    }
  }
}
Program.RUN_NEXT = 'run_next';
Program.BLOCKED = 'blocked';
Program.VALUE = 'value';

class ProgramSound extends Program {
  static runProgram(program) {
    let type;
    let value;
    do {
      const result = program.runNext();
      type = result.type;
      value = result.value;
    } while (type !== Program.BLOCKED);
    return value;
  }
  processSnd(a) {
    const r1 = this.resolve(a);
    this.sound = r1;
    this.next += 1;
    return {
      type: Program.RUN_NEXT,
    };
  }

  processRcv(a) {
    const r1 = this.resolve(a);
    if (r1 === 0) {
      this.next += 1;
      return {
        type: Program.RUN_NEXT,
      };
    }
    return {
      type: Program.BLOCKED,
      value: this.sound,
    };
  }
}

module.exports.challenge1 = input => {
  const instructions = parse(input);
  const program = new ProgramSound(0, instructions);
  return ProgramSound.runProgram(program);
};

module.exports.challenge2 = input => {
  const instructions = parse(input);

  const programA = new Program(0, instructions);
  const programB = new Program(1, instructions);

  do {
    Program.runProgram(programA, programB);
    Program.runProgram(programB, programA);
  } while (programA.queue.length !== 0 || programB.queue.length !== 0);

  return programB.countValuesSent;
};
