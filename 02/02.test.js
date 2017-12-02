const sut = require('./02.js');
const expect = require('chai').expect;

const fs = require('fs');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);
const path = require('path');

describe("Challenge 02 - Day 02", () => {
    it([
        "5 9 2 8",
        "9 4 7 3",
        "3 8 6 5",
    ].join(' - '), () => {
        const result = sut([
            "5 9 2 8",
            "9 4 7 3",
            "3 8 6 5",
        ].join('\n'))
        expect(result).to.be.equal(9)
    });

    it("Puzzle input", async () => {
        const input = await readFile(path.join(__dirname, 'input.txt'), 'utf8');
        const result = sut(input);
        expect(result).to.be.equal(282);
    })
});
