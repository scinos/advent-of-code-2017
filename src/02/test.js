const {challenge1, challenge2} = require('./solution.js');
const expect = require('chai').expect;
const path = require('path');

const readInput = require('../lib/readInput')(path.join(__dirname, 'input.txt'));

describe("Challenge 02 - Day 01", () => {
    it([
        "5 1 9 5",
        "7 5 3",
        "2 4 6 8",
    ].join(' - '), () => {
        const result = challenge1([
            "5 1 9 5",
            "7 5 3",
            "2 4 6 8",
        ].join('\n'))
        expect(result).to.be.equal(18)
    });

    it("Puzzle input", async () => {
        const input = await readInput();
        const result = challenge1(input);
        expect(result).to.be.equal(53460);
    })
});

describe("Challenge 02 - Day 02", () => {
    it([
        "5 9 2 8",
        "9 4 7 3",
        "3 8 6 5",
    ].join(' - '), () => {
        const result = challenge2([
            "5 9 2 8",
            "9 4 7 3",
            "3 8 6 5",
        ].join('\n'))
        expect(result).to.be.equal(9)
    });

    it("Puzzle input", async () => {
        const input = await readInput();
        const result = challenge2(input);
        expect(result).to.be.equal(282);
    })
});
