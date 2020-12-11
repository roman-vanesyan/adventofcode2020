const { readFileByLines } = require("./io_util");

const assert = (cond) => {
    if (!cond) {
        throw Error("Assertion is failed!");
    }
};

function compute1(input, size) {
    const l = input.length;
    const preambles = input.slice(0, size);

    for (let i = size; i < l; i++) {
        const ll = preambles.length;
        let isFound = false;

        assert(ll === size);

        for (let j = 0; j < ll; j++) {
            for (let k = 0; k < ll; k++) {
                if (k === j) {
                    continue;
                }

                const pj = preambles[j];
                const pk = preambles[k];

                if (pj + pk === input[i]) {
                    isFound = true;
                }
            }
        }

        if (!isFound) {
            return input[i];
        }

        preambles.shift();
        preambles.push(input[i]);
    }

    return -1;
}

function compute2(input, target) {
    let i = 0;
    let j = 1;
    let sum = input[i];
    let result = [];

    while (i < j) {
        if (sum === target && i < j - 1) {
            console.info(i, j);
            result = input.slice(i, j);
            break;
        } else if (sum < target) {
            sum += input[j++];
        } else if (sum > target) {
            sum -= input[i++];
        }
    }

    assert(result.length >= 2);

    let min = Infinity;
    let max = -Infinity;

    for (const e of result) {
        if (min > e) min = e;
        if (max < e) max = e;
    }

    return min + max;
}

(function main([path]) {
    const input = readFileByLines(path).map((e) => parseInt(e));

    const result1 = compute1(input, 25);
    const result2 = compute2(input, result1);

    console.info(result1, result2);
})(process.argv.slice(2));
