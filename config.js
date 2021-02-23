let output;

if (process.env.NODE_ENV == "production") {
  output = {
    FRONTEND_URL: "https://peaceful-dawn-30217.herokuapp.com",
    BACKEND_URL: "https://peaceful-dawn-30217.herokuapp.com",
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
