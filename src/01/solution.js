module.exports.challenge1 =  (input) => {
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
};

module.exports.challenge2 = (input) => {
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
};