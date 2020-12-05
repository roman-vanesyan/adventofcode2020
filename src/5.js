const { readFileByLines } = require("./io_util");

function findSeat(input) {
    const l = input.length;

    if (l === 0) {
        return -1;
    } else if (l === 1) {
        return input[0];
    } else if (l === 2) {
        console.warn("Violating constraints");

        return -1;
    }

    const keys = input.map(({ id }) => id);
    const ids = keys.reduce((acc, id) => {
        acc[id] = true;

        return acc;
    }, Object.create(null));

    for (const left of keys) {
        for (const right of keys) {
            if (right === left + 2 && !(left + 1 in ids)) {
                return left + 1;
            }
        }
    }

    return -1;
}

function maxSeat(input) {
    const l = input.length;

    if (l === 0) return -1;

    let max = -1;
    for (let i = 1; i < l; i++) {
        const next = input[i].id;
        if (max < next) {
            max = next;
        }
    }

    return max;
}

const id = (r, c) => 8 * r + c;
const mid = (a, b) => a + (b - a) / 2;

function compute(input) {
    const results = [];

    for (const instr of input) {
        const len = instr.length;
        let f = 0;
        let b = 127;
        let l = 0;
        let r = 7;

        for (let i = 0; i < len; i++) {
            const op = instr[i];
            switch (op) {
                case "F":
                    b = Math.floor(mid(f, b));
                    break;
                case "B":
                    f = Math.ceil(mid(f, b));
                    break;
                case "L":
                    r = Math.floor(mid(l, r));
                    break;
                case "R":
                    l = Math.ceil(mid(l, r));
                    break;
            }
        }

        if (l !== r || f !== b) {
            console.warn(
                `Violated result, either front ${f} and back ${b} are not equal, or left ${l} and right ${r}`
            );

            continue;
        }

        results.push({ row: f, col: l, id: id(f, l) });
    }

    return results;
}

(function main([path]) {
    const input = readFileByLines(path);

    const result1 = maxSeat(compute(input));
    const result2 = findSeat(compute(input));

    console.log(result1, result2);
})(process.argv.slice(2));
