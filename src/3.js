const { readFileByLines } = require("./io_util");

function compute(input, rightShift, downShift) {
    const l = input.length;
    const ll = input[0].length;
    let rightOffset = rightShift;
    let ret = 0;

    for (let i = downShift; i < l; i += downShift) {
        if (input[i][rightOffset] === "#") {
            ret += 1;
        }

        rightOffset += rightShift;
        if (rightOffset >= ll) {
            rightOffset = Math.abs(rightOffset - ll);
        }
    }

    return ret;
}

(function main([path]) {
    const input = readFileByLines(path);
    const shifts = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ];
    let ret = 1;

    for (const [rightShift, downShift] of shifts) {
        const result = compute(input, rightShift, downShift);
        console.log(`Intermediate result: ${result}`);

        ret *= result;
    }

    console.log(ret);
})(process.argv.slice(2));
