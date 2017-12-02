const sut = require('./01.js');
const expect = require('chai').expect;

const fs = require('fs');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);
const path = require('path');

describe("Challenge 02 - Day 01", () => {
    it([
        "5 1 9 5",
        "7 5 3",
        "2 4 6 8",
    ].join(' - '), () => {
        const result = sut([
            "5 1 9 5",
            "7 5 3",
            "2 4 6 8",
        ].join('\n'))
        expect(result).to.be.equal(18)
    });

    it("Puzzle input", async () => {
        const input = await readFile(path.join(__dirname, 'input.txt'), 'utf8');
        const result = sut(input);
        expect(result).to.be.equal(53460);
    })
});
