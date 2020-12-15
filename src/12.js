const { readFileByLines } = require("./io_util");

function compute(input, part) {
    let currentPos = part === 1 ? [0 /* east */, 0 /* north */] : [10, 1];
    let shipPos = [0, 0];
    let currentCursor = 0; /* 0, 1 */
    let sign = 1;
    let currentDegree = 0;

    function upd() {
        if (currentDegree === 90) {
            sign = 1;
            currentCursor = 1;
        } else if (currentDegree === 180) {
            sign = -1;
            currentCursor = 0;
        } else if (currentDegree === 270) {
            sign = -1;
            currentCursor = 1;
        } else if (currentDegree === 0) {
            sign = 1;
            currentCursor = 0;
        }
    }

    for (const [op, val] of input) {
        if (op === "F") {
            if (part === 1) {
                currentPos[currentCursor] += val * sign;
            } else {
                shipPos[0] += sign * currentPos[0] * val;
                shipPos[1] += sign * currentPos[1] * val;
            }
        } else if (op === "N") {
            currentPos[1] += val;
        } else if (op === "S") {
            currentPos[1] -= val;
        } else if (op === "E") {
            currentPos[0] += val;
        } else if (op === "W") {
            currentPos[0] -= val;
        } else if (op === "R") {
            if (part === 1) {
                currentDegree = (currentDegree - val + 360) % 360;
                upd();
            } else {
                if (val === 90) {
                    [currentPos[0], currentPos[1]] = [
                        currentPos[1],
                        -currentPos[0],
                    ];
                } else if (val === 180) {
                    [currentPos[0], currentPos[1]] = [
                        -currentPos[0],
                        -currentPos[1],
                    ];
                } else if (val === 270) {
                    [currentPos[0], currentPos[1]] = [
                        -currentPos[1],
                        currentPos[0],
                    ];
                }
            }
        } else if (op === "L") {
            if (part === 1) {
                currentDegree = (currentDegree + val) % 360;
                upd();
            } else {
                if (val === 90) {
                    [currentPos[0], currentPos[1]] = [
                        -currentPos[1],
                        currentPos[0],
                    ];
                } else if (val === 180) {
                    [currentPos[0], currentPos[1]] = [
                        -currentPos[0],
                        -currentPos[1],
                    ];
                } else if (val === 270) {
                    [currentPos[0], currentPos[1]] = [
                        currentPos[1],
                        -currentPos[0],
                    ];
                }
            }
        }
    }

    if (part === 1) {
        return Math.abs(currentPos[0]) + Math.abs(currentPos[1]);
    }

    return Math.abs(shipPos[0]) + Math.abs(shipPos[1]);
}

(function main([path]) {
    const input = readFileByLines(path).map((line) => {
        const op = line[0];
        const val = parseInt(line.slice(1));

        return [op, val];
    });

    const result1 = compute(input, 1);
    const result2 = compute(input, 2);

    console.info(result1, result2);
})(process.argv.slice(2));
