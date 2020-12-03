const { readFileByLines } = require("./io_util");

function compute2sum(input, target = 2020) {
    const l = input.length;
    const m = {};

    let j = 0;
    for (let i = 0; i < l - 1; i++) {
        if ((j = m[target - input[i]])) {
            return input[j] * input[i];
        }

        m[input[i]] = i;
    }

    return -1;
}

function compute3sum(input, target) {
    const l = input.length;

    input.sort();

    for (let i = 0; i < l; i++) {
        let j = i + 1;
        let k = l - 1;

        while (j < k) {
            let s = input[i] + input[j] + input[k];

            if (s === target) {
                return input[i] * input[j] * input[k];
            } else if (s < target) {
                j++;
            } else {
                k--;
            }
        }

        while (i < l - 1 && input[i] === input[i + 1]) i++;
    }

    return -1;
}

function computeSum(input, target, n) {
    if (n === 2) {
        return compute2sum(input, target);
    } else if (n === 3) {
        return compute3sum(input, target);
    }

    throw new Error("Unknown sum length!");
}

(function main([path]) {
    const input = readFileByLines(path).map((e) => parseInt(e));

    const result1 = computeSum(input, 2020, 2);
    const result2 = computeSum(input, 2020, 3);

    console.log(result1, result2);
})(process.argv.slice(2));
