const { readFileByLines } = require("./io_util");

function printBoard(board) {
    console.info(board.map((line) => line.join("")).join("\n"));
}

function sum(seats) {
    return seats.reduce(
        (acc, val) => {
            if (val === "L") {
                acc[0] += 1;
            } else if (val === "#") {
                acc[1] += 1;
            }

            return acc;
        },
        [0, 0]
    );
}

function areSame(a, b) {
    if (a.length !== b.length) {
        return false;
    }

    if (a.length > 0 && a[0].length !== b[0].length) {
        return false;
    }

    const l = a.length;
    const ll = a[0].length;

    for (let i = 0; i < l; i++) {
        for (let j = 0; j < ll; j++) {
            if (a[i][j] !== b[i][j]) {
                return false;
            }
        }
    }

    return true;
}

function compute(input, part) {
    const h = input.length;
    const w = input[0].length;

    let board = input;

    function getAdjacent(i, j) {
        if (part === 1) {
            const mw = j - 1 >= 0;
            const mxw = j + 1 < w;
            const mh = i - 1 >= 0;
            const mxh = i + 1 < h;

            return [
                mh ? board[i - 1][j] : ".",
                mw ? board[i][j - 1] : ".",
                mxh ? board[i + 1][j] : ".",
                mxw ? board[i][j + 1] : ".",
                mw && mh ? board[i - 1][j - 1] : ".",
                mxw && mh ? board[i - 1][j + 1] : ".",
                mw && mxh ? board[i + 1][j - 1] : ".",
                mxw && mxh ? board[i + 1][j + 1] : ".",
            ];
        }

        const seats = [];

        for (let c = i - 1; c >= 0; c--) {
            seats.push(board[c][j]);
            if (board[c][j] !== ".") break;
        }

        for (let c = i + 1; c < h; c++) {
            seats.push(board[c][j]);
            if (board[c][j] !== ".") break;
        }

        for (let c = j - 1; c >= 0; c--) {
            seats.push(board[i][c]);
            if (board[i][c] !== ".") break;
        }

        for (let c = j + 1; c < w; c++) {
            seats.push(board[i][c]);
            if (board[i][c] !== ".") break;
        }

        for (let ci = i - 1, cj = j - 1; ci >= 0 && cj >= 0; ci--, cj--) {
            seats.push(board[ci][cj]);
            if (board[ci][cj] !== ".") break;
        }

        for (let ci = i + 1, cj = j + 1; ci < h && cj < w; ci++, cj++) {
            seats.push(board[ci][cj]);
            if (board[ci][cj] !== ".") break;
        }

        for (let ci = i - 1, cj = j + 1; ci >= 0 && cj < w; ci--, cj++) {
            seats.push(board[ci][cj]);
            if (board[ci][cj] !== ".") break;
        }

        for (let ci = i + 1, cj = j - 1; ci < h && cj >= 0; ci++, cj--) {
            seats.push(board[ci][cj]);
            if (board[ci][cj] !== ".") break;
        }

        return seats;
    }

    do {
        const nextBoard = board.map((line) => [...line]);
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const adjacent = getAdjacent(i, j);
                const [empty, occupied] = sum(adjacent);

                if (board[i][j] === "L" && occupied === 0) {
                    nextBoard[i][j] = "#";
                }

                if (
                    board[i][j] === "#" &&
                    ((part === 1 && occupied >= 4) || occupied >= 5)
                ) {
                    nextBoard[i][j] = "L";
                }
            }
        }

        console.info("Board 1");
        printBoard(nextBoard);

        if (areSame(board, nextBoard)) {
            break;
        }

        board = nextBoard;
    } while (1);

    return board.flat().reduce((acc, val) => {
        if (val === "#") {
            acc += 1;
        }

        return acc;
    }, 0);
}

(function main([path]) {
    const input = readFileByLines(path).map((line) => line.split(""));

    const result1 = compute(input, 1);
    const result2 = compute(input, 2);

    console.info(result1, result2);
})(process.argv.slice(2));
