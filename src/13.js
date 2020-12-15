const { readFileByLines } = require("./io_util");

function compute1(input) {
    const timestamp = parseInt(input[0]);
    const ids = input[1]
        .split(",")
        .filter((v) => v !== "x")
        .map((v) => parseInt(v));

    return ids
        .map((v) => [Math.ceil(timestamp / v) * v - timestamp, v])
        .reduce(
            ([prevDiff, prevValue], [diff, value]) => {
                if (prevDiff > diff) {
                    prevDiff = diff;
                    prevValue = value;
                }

                return [prevDiff, prevValue];
            },
            [Infinity, -1]
        )
        .reduce((prev, cur) => prev * cur, 1);
}

function compute2(input) {
    const ids = input[1].split(",");

    const data = ids.reduce((acc, cur, idx) => {
        if (cur !== "x") {
            acc.push([parseInt(cur), idx]);
        }

        return acc;
    }, []);

    let incr = data[0][0];
    let idx = 1;
    let i = data[0][0];

    for (; idx < data.length; i += incr) {
        if ((i + data[idx][1]) % data[idx][0] === 0) {
            incr *= data[idx][0];
            idx++;
        }
    }

    return i - incr;
}

(function main([path]) {
    const input = readFileByLines(path);

    const result1 = compute1(input);
    const result2 = compute2(input);

    console.info(result1, result2);
})(process.argv.slice(2));
