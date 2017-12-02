module.exports.challenge1 = input => input
    // Split into rows
    .split('\n')

    // Process each row
    .map((row) => {
        const re = /\s*(\d+)\s*/g;
        let max = 0;
        let min = Infinity;

        let match;
        // Split into cells
        while(match = re.exec(row)) {
            const cell = Number(match[1]);

            // Find max & min cells
            max = Math.max(max, cell);
            min = Math.min(min, cell);
        }

        // Return row checksum
        return max - min;
    })

    // Returns table checksum
    .reduce((a,b) => a+b);

module.exports.challenge2 = input => input
    // Split into rows
    .split('\n')

    // Process each row
    .map((row) => {
        const re = /\s*(\d+)\s*/g;

        let match;
        const cells = [];

        // Split into cells
        while(match = re.exec(row)) {
            const cell = Number(match[1]);
            cells.push(cell);
        }

        for (let i = 0; i<cells.length; i++) {
            for (let h = i+1; h<cells.length; h++) {
                const numA = cells[i];
                const numB = cells[h];
                if (numB % numA === 0) return numB/numA;
                if (numA % numB === 0) return numA/numB;
            }
        }
    })

    // Returns table checksum
    .reduce((a,b) => a+b);

