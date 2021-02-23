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
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.post("/create-checkout-session", async (req, res) => {
  let { line_items } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${FRONTEND_URL}/success`,
    cancel_url: `${FRONTEND_URL}/cancel`,
  });

  res.json({ id: session.id });
});

app.get("/stripe/prices", async (req, res) => {
  res.json(await stripe.prices.list({ expand: ["data.product"] }));
});

app.get("/stripe/prices/:price_id", async (req, res) => {
  let { price_id } = req.params;
  let prices = await stripe.prices.retrieve(price_id, { expand: ["product"] });
  res.json(prices);
});

app.use(express.static("frontend/build"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Example app listening at ${FRONTEND_URL}:${PORT}`);
});
