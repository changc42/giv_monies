var express = require("express");
var app = express();
const path = require("path");
const {
  FRONTEND_URL,
  BACKEND_URL,
  STRIPE_PK,
  STRIPE_SK,
} = require("./config/index.js");
const stripe = require("stripe")(STRIPE_SK);
const cors = require("cors");

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
app.listen(PORT, () => {
  console.log(`Example app listening at ${FRONTEND_URL}:${PORT}`);
});
