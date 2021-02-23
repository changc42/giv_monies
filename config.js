let output;

if (process.env.NODE_ENV == "production") {
  output = {
    FRONTEND_URL: "http://localhost:5000",
    BACKEND_URL: "http://localhost:5000",
  };
} else if (process.env.NODE_ENV == "staging") {
  output = {
    FRONTEND_URL: "http://localhost:5000",
    BACKEND_URL: "http://localhost:5000",
  };
} else {
  output = {
    FRONTEND_URL: "http://localhost:3000",
    BACKEND_URL: "http://localhost:5000",
  };
}

module.exports = output;
