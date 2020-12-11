const { readFileByLines } = require("./io_util");

function compute(input, part) {
    input.sort((a, b) => a - b);

    const l = input.length;

    if (part === 1) {
        let c1 = 1;
        let c2 = 1;

        for (let i = 1; i < l; i++) {
            const diff = Math.abs(input[i - 1] - input[i]);

            if (diff === 1) {
                c1 += 1;
            } else if (diff === 3) {
                c2 += 1;
            }
        }

        return c1 * c2;
    }

    const m = Object.create(null);
    input.unshift(0);
    input.push(input[l - 1] + 3);

    for (let i = 1; i < l; i++) {
        const cases = [];
        let diff = 0;
        let offset = 0;

        while (1) {
            diff = Math.abs(input[i - 1] - input[i + offset]);
            if (diff <= 3) {
                cases.push(input[i + offset]);
            } else {
                break;
            }

            offset += 1;
        }

        m[input[i - 1]] = cases;
    }

    m[input[l - 1] + 3] = [];
    console.info(m);

    const memo = Object.create(null);
    function dfs(node) {
        if (!(node in m)) {
            return 1;
        }

        let count = 0;
        if (node in memo) {
            return memo[node];
        }

        const joints = m[node];
        for (const n of joints) {
            count += dfs(n);
        }

        memo[node] = count;

        return count;
    }

    const result = dfs(0);
    console.info(memo);

    return result;
}

(function main([path]) {
    const input = readFileByLines(path).map((e) => parseInt(e));

    const result1 = compute(input, 1);
    const result2 = compute(input, 2);

    console.info(result1, result2);
})(process.argv.slice(2));
