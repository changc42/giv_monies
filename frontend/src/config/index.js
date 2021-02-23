import dev from "./dev";
import prod from "./prod";
import stage from "./stage";

let output;

if (process.env.NODE_ENV == "production") {
  output = prod;
} else if (process.env.NODE_ENV == "staging") {
  output = stage;
} else {
  output = dev;
}

export default output;
