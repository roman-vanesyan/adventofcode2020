const { readFileSplitBySeparator } = require("./io_util");

const validationRulesPart1 = {
    byr: () => true,
    iyr: () => true,
    eyr: () => true,
    hgt: () => true,
    hcl: () => true,
    ecl: () => true,
    pid: () => true,
    cid: () => true,
};

const validationRulesPart2 = {
    byr: (val) => {
        const v = parseInt(val);
        if (Number.isNaN(v)) return false;

        return v >= 1920 && v <= 2002;
    },
    iyr: (val) => {
        const v = parseInt(val);
        if (Number.isNaN(v)) return false;

        return v >= 2010 && v <= 2020;
    },
    eyr: (val) => {
        const v = parseInt(val);
        if (Number.isNaN(v)) return false;

        return v >= 2020 && v <= 2030;
    },
    hgt: (val) => {
        if (!(val.endsWith("cm") || val.endsWith("in"))) return false;
        const isCm = val.endsWith("cm");
        const v = parseInt(val.slice(0, -2));

        return isCm ? v >= 150 && v <= 193 : v >= 59 && v <= 76;
    },
    hcl: (val) => {
        if (!val.startsWith("#")) return false;
        const v = parseInt(val.slice(1), 16);

        return !Number.isNaN(v);
    },

    ecl: (val) =>
        ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val),
    pid: (val) => {
        const l = val.length;

        if (!val.startsWith("0") && l !== 9) return false;
        for (let i = 0; i < val.length; i++) {
            const ch = val.charCodeAt(i);
            if (!(ch >= 48 && ch <= 57)) {
                return false;
            }
        }

        return true;
    },

    cid: (val) => true,
};

function compute(input, validationRules) {
    const requiredFields = [
        "byr", // Birth Year
        "iyr", // Issue Year
        "eyr", // Expiration Year
        "hgt", // Height
        "hcl", // Hair Color
        "ecl", // Eye Color
        "pid", // Passport ID
    ];

    const createValidationObject = () => {
        return requiredFields.reduce((acc, val) => {
            acc[val] = false;

            return acc;
        }, Object.create(null));
    };

    const validateObject = (object) => {
        for (const field of requiredFields) {
            if (!object[field]) {
                return false;
            }
        }

        return true;
    };

    let count = 0;
    for (const part of input) {
        const validationObject = createValidationObject();
        const data = part.split(/\s|\n/);

        const l = data.length;

        for (let i = 0; i < l; i++) {
            const entry = data[i].split(":");
            if (entry.length !== 2) {
                count++;
                break;
            }

            const [key, val] = entry;
            validationObject[key] = validationRules[key](val);
        }

        const isValid = validateObject(validationObject);
        if (isValid) {
            count++;
        }
    }

    return count;
}

(function main([path]) {
    const input = readFileSplitBySeparator(path, "\n\n");

    const result1 = compute(input, validationRulesPart1);
    const result2 = compute(input, validationRulesPart2);

    console.log(result1, result2);
})(process.argv.slice(2));
