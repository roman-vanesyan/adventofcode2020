const { readFileByLines } = require("./io_util");

function compute(input, part) {
    const l = input.length;
    let acc = 0;
    const seen = new Set();
    const jmpSeen = new Set();
    const undo = [];
    let ninput = [...input];

    for (let i = 0; i < l; i++) {
        if (seen.has(i)) {
            if (part === 1) {
                return acc;
            }

            const [idx, instr] = undo.pop();
            ninput = [...input];
            ninput[idx] = `${instr[0] === "jmp" ? "nop" : "jmp"} ${instr[1]}`;
            i = 0;

            // Clear states.
            seen.clear();
            acc = 0;

            continue;
        }

        seen.add(i);
        const [op, rawArg] = ninput[i].split(" ");
        const arg = parseInt(rawArg);
        if (op === "jmp") {
            if (!jmpSeen.has(i)) {
                undo.push([i, [op, arg]]);
                jmpSeen.add(i);
            }

            i += arg - 1;
            if (i < 0 || i >= l) {
                console.error("Out of range");
                return -1;
            }
        } else if (op === "nop") {
            if (!jmpSeen.has(i)) {
                undo.push([i, [op, arg]]);
                jmpSeen.add(i);
            }

            continue;
        } else if (op === "acc") {
            acc += arg;
        }
    }

    return acc;
}

(function main([path]) {
    const input = readFileByLines(path);

    const result1 = compute(input, 1);
    const result2 = compute(input, 2);

    console.log(result1, result2);
})(process.argv.slice(2));
