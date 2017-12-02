module.exports = input => input
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
    .reduce((a,b) => a+b)