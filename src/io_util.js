const fs = require("fs");

function readFileByLines(path) {
    return readFileSplitBySeparator(path, "\n");
}

function readFileSplitBySeparator(path, sep) {
    return fs.readFileSync(path, { encoding: "utf8" }).trim().split(sep);
}

module.exports = {
    readFileByLines,
    readFileSplitBySeparator,
};
