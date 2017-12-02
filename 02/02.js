module.exports = input => input
    // Split into rows
    .split('/n')

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
    .reduce((a,b) => a+b)