const fs = require("fs");

function readFileByLines(path) {
    return fs.readFileSync(path, { encoding: "utf8" }).trim().split("\n");
}

module.exports = {
    readFileByLines,
};
