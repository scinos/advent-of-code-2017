const toCells = row => {
    const re = /\s*(\d+)\s*/g;
    const cells = [];
    while(match = re.exec(row)) {
        const cell = Number(match[1]);
        cells.push(cell);
    }
    return cells;
}

module.exports.challenge1 = input => input
    .split('\n')
    .map(toCells)
    .map((cells) => {
        const {max, min} = cells.reduce(
            ({max, min}, cell) => {
                // Find max & min cells
                return {
                    max: Math.max(max, cell),
                    min: Math.min(min, cell)
                }
            },
            {max: 0, min: Infinity}
        )
        return max - min;
    })
    .reduce((a,b) => a+b);

module.exports.challenge2 = input => input
    .split('\n')
    .map(toCells)
    .map((cells) => {
        for (let i = 0; i<cells.length; i++) {
            for (let h = i+1; h<cells.length; h++) {
                const numA = cells[i];
                const numB = cells[h];
                if (numB % numA === 0) return numB/numA;
                if (numA % numB === 0) return numA/numB;
            }
        }
    })
    .reduce((a,b) => a+b);

