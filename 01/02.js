const sum = (input) => {
    let inputAsArray = input.split('');

    const step = inputAsArray.length / 2;

    inputAsArray = inputAsArray.concat(inputAsArray.slice(0, step));

    return inputAsArray
        .map(Number)
        .reduce(
            (sum, current, index, list) => {
                if (current === list[index+step]) return sum + current;
                return sum;
            },
            0
        );
}

module.exports = sum;