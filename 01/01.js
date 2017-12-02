const sum = (input) => {
    const inputAsArray = input.split('');
    inputAsArray.push(inputAsArray[0]);

    return inputAsArray
        .map(Number)
        .reduce(
            (sum, current, index, list) => {
                if (current === list[index+1]) return sum + current;
                return sum;
            },
            0
        );
}

module.exports = sum;