var express = require("express");
var app = express();
const path = require("path");
const stripe = require("stripe")(
  "sk_test_51INpUsKsLndlUUqs1ATJ0Z5fyerZ44GNeLz5szCUiSyrYc6DjpODRMwczYdktpaQXCFZk6S7zTOySPLrGWEuFy7R00IFPhQxBV"
);
const cors = require("cors");
const { FRONTEND_URL, BACKEND_URL } = require("./config");

const port = 5000;

app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Joy Of Giving Dollar",
          },
          unit_amount: 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${FRONTEND_URL}/success`,
    cancel_url: `${FRONTEND_URL}/cancel`,
  });

  res.json({ id: session.id });
});

app.use(express.static("frontend/build"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
