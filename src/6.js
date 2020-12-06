const { readFileSplitBySeparator } = require("./io_util");

function compute(input, part) {
    let result = 0;

    for (const group of input) {
        const answers = group.split("");
        const count = {};
        let g = 1; // number of groups

        for (const ans of answers) {
            if (ans === "\n" || ans === " ") {
                g += 1;
                continue;
            }

            count[ans] = (count[ans] ?? 0) + 1;
        }

        const keys = Object.keys(count);
        const l = keys.length;

        if (part === 2) {
            const ll = keys.filter((k) => count[k] === g).length;

            result += ll;
        } else {
            result += l;
        }
    }

    return result;
}

(function main([path]) {
    const input = readFileSplitBySeparator(path, "\n\n");

    const result1 = compute(input, 1);
    const result2 = compute(input, 2);

    console.log(result1, result2);
})(process.argv.slice(2));
