const { default: prod } = require("./prod");
const stage = require("./stage");
const dev = require("./dev");

let output;

if (process.env.NODE_ENV == "production") {
  output = prod;
} else if (process.env.NODE_ENV == "staging") {
  output = stage;
} else {
  output = dev;
}

module.exports = output;
