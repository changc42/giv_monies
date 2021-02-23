let output;

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == "production") {
  output = require("./prod");
} else if (process.env.NODE_ENV == "staging") {
  output = require("./stage");
} else {
  output = require("./dev");
}

export default output;
