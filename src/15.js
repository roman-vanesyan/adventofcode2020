const { readFileByLines } = require("./io_util");

function compute(input, target) {
    const nums = input.slice();
    const map = new Map();
    let i = 1;

    while (i < target) {
        const n = nums.shift();

        if (map.has(n)) {
            nums.push(i - map.get(n));
        }

        if (nums.length === 0) nums.push(0);

        map.set(n, i);
        i++;
    }

    return nums[nums.length - 1];
}

(function main([path]) {
    const input = readFileByLines(path)[0]
        .split(",")
        .map((e) => parseInt(e));

    const result = compute(input, 30000000);

    console.info(result);
})(process.argv.slice(2));
