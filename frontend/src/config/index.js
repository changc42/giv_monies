let output;

if (process.env.NODE_ENV == "production") {
  output = require("./prod");
} else {
  output = require("./dev");
}

export default output;
