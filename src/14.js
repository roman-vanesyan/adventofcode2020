const { readFileByLines } = require("./io_util");

function compute(input, part) {
    const mem = {};
    let mask = "";

    function applyMask1(val) {
        const maskedVal = [];

        for (let i = 0; i < 36; i++) {
            maskedVal.push(mask[i] === "X" ? val[i] : mask[i]);
        }

        return parseInt(maskedVal.join(""), 2);
    }

    function applyMask2(val) {
        let addrs = [""];

        for (let i = 0; i < 36; i++) {
            if (mask[i] === "1") {
                for (let j = 0; j < addrs.length; j++) {
                    addrs[j] = addrs[j] + "1";
                }
            } else if (mask[i] === "0") {
                for (let j = 0; j < addrs.length; j++) {
                    addrs[j] = addrs[j] + val[i];
                }
            } else if (mask[i] === "X") {
                const newAddresses = [];
                for (let j = 0; j < addrs.length; j++) {
                    newAddresses.push(addrs[j] + "1", addrs[j] + "0");
                }

                addrs = newAddresses;
            }
        }

        return addrs;
    }

    for (const op of input) {
        const [instr, val] = op.split(" = ");
        if (instr === "mask") {
            mask = val;
        } else if (instr.includes("mem")) {
            const addr = instr.slice(4, -1);
            if (part === 1) {
                const v = parseInt(val).toString("2").padStart(36, "0");
                mem[addr] = applyMask1(v);
            } else {
                const addrs = applyMask2(
                    parseInt(addr).toString("2").padStart(36, "0")
                );

                const v = parseInt(val);
                for (const addr of addrs) {
                    mem[addr] = v;
                }
            }
        }
    }

    return Object.values(mem).reduce((acc, val) => (acc = acc + val), 0);
}

(function main([path]) {
    const input = readFileByLines(path);

    const result1 = compute(input, 1);
    const result2 = compute(input, 2);

    // console.info(combinations(7))

    console.info(result1, result2);
})(process.argv.slice(2));
