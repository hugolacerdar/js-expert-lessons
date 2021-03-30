const safeRegex = require('safe-regex');

class InvalidRegexError extends Error {
    constructor(exp) {
        super(`The expression ${exp} is unsafe!`);
        this.name = "InvalidRegexError";
    }
};

const evaluateRegex = (exp) => {
    const isSafe = safeRegex(exp);

    if(isSafe) return exp;

    throw new InvalidRegexError(exp);
};

module.exports = { InvalidRegexError, evaluateRegex };