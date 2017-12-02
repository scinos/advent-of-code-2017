const {challenge1, challenge2} = require('./solution.js');
const expect = require('chai').expect;

const fs = require('fs');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);
const path = require('path');

describe("Challenge 01 - Day 01", () => {
    it("1122", () => {
        const result = challenge1("1122")
        expect(result).to.be.equal(3)
    });
    it("1111", () => {
        const result = challenge1("1111")
        expect(result).to.be.equal(4)
    });
    it("1234", () => {
        const result = challenge1("1234")
        expect(result).to.be.equal(0)
    });
    it("91212129", () => {
        const result = challenge1("91212129")
        expect(result).to.be.equal(9)
    });
    it("Puzzle input", async () => {
        const input = await readFile(path.join(__dirname, 'input.txt'), 'utf8');
        const result = challenge1(input);
        expect(result).to.be.equal(1228)
    })
})

describe("Challenge 01 - Day 02", () => {
    it("1212", () => {
        const result = challenge2("1212")
        expect(result).to.be.equal(6)
    });
    it("1221", () => {
        const result = challenge2("1221")
        expect(result).to.be.equal(0)
    });
    it("123425", () => {
        const result = challenge2("123425")
        expect(result).to.be.equal(4)
    });
    it("123123", () => {
        const result = challenge2("123123")
        expect(result).to.be.equal(12)
    });
    it("12131415", () => {
        const result = challenge2("12131415")
        expect(result).to.be.equal(4)
    });
    it("Puzzle input", async () => {
        const input = await readFile(path.join(__dirname, 'input.txt'), 'utf8');
        const result = challenge2(input);
        expect(result).to.be.equal(1238)
    })
})