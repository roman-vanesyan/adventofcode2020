const { readFileByLines } = require("./io_util");

function compute1(input) {
    const map = {};
    let isAdding = false;

    do {
        isAdding = false;

        for (const line of input) {
            const parts = line.split("contain").map((p) => p.trim());
            const root = parts[0].replace("bags", "").trim();
            const children = parts[1];
            const rules = children.split(", ");

            if (
                rules.some(
                    (r) =>
                        Object.keys(map).some((m) => r.includes(m)) ||
                        r.includes("shiny gold")
                ) &&
                !map[root]
            ) {
                map[root] = true;
                isAdding = true;
            }
        }
    } while (isAdding);

    return Object.keys(map).length;
}

function compute2(input) {
    const map = {};

    for (const line of input) {
        const parts = line.split("contain").map((p) => p.trim());
        const root = parts[0].replace("bags", "").trim();
        const children = parts[1];
        map[root] = children.split(", ").map((p) => {
            const pp = p.split(" ");
            const quantity = parseInt(pp[0]);
            return [
                Number.isNaN(quantity) ? 0 : quantity,
                Number.isNaN(quantity) ? "" : pp.slice(1, -1).join(" "),
            ];
        });
    }

    const queue = [[1, "shiny gold"]];
    let sum = 0;

    while (queue.length > 0) {
        const [factor, elem] = queue.pop();
        const children = map[elem];

        for (const child of children) {
            const [num, name] = child;
            if (num === 0) {
                break;
            }

            sum += factor * num;
            queue.push([factor * num, name]);
        }
    }

    return sum;
}

(function main([path]) {
    const input = readFileByLines(path);

    const result1 = compute1(input);
    const result2 = compute2(input);

    console.log(result1, result2);
})(process.argv.slice(2));
