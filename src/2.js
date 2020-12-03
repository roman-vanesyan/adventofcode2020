const { readFileByLines } = require("./io_util");

function compute(input, part) {
    let ret = 0;

    for (const { limit, letter, password } of input) {
        const l = password.length;

        if (part === 1) {
            let c = 0;

            for (let i = 0; i < l; i++) {
                if (password[i] === letter) c++;
            }

            if (c >= limit.min && c <= limit.max) ret++;
        } else if (part === 2) {
            const [f, s] = [limit.min - 1, limit.max - 1];
            if (l > f && l <= s) {
                if (password[f] === letter) {
                    ret++;
                    continue;
                }
            } else if (l <= f || l <= s) {
                // Invalid password.
                continue;
            }

            // Letter can be either on position f or s, but not on both positions.
            if (
                !(password[f] === letter && password[s] === letter) &&
                (password[f] === letter || password[s] === letter)
            ) {
                ret++;
            }
        }
    }

    return ret;
}

(function main([path]) {
    const input = readFileByLines(path).map((line) => {
        const [times, letter, password] = line.split(" ");
        const [min, max] = times.split("-").map((e) => parseInt(e));

        return {
            limit: { min, max },
            letter: letter.slice(0, -1), // strip colon symbol,
            password,
        };
    });

    const result1 = compute(input, 1);
    const result2 = compute(input, 2);

    console.info(result1, result2);
})(process.argv.slice(2));
