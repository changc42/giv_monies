var express = require("express");
var app = express();
const path = require("path");
const { STRIPE_SK } = require("./config/index.js");
const stripe = require("stripe")(STRIPE_SK);
const cors = require("cors");
const bodyParser = require("body-parser");
const { hostname } = require("os");
var Url = require("url-parse");

app.use(cors());
app.use(bodyParser.json());

app.get("/hostname", (req, res) => {
  res.end(req.get("Referer") + "hello");
});

app.get("/test", (req, res) => {
  res.end("<a href='/hostname'>hello</a>");
});

app.post("/create-checkout-session", async (req, res) => {
  let url = new Url(req.get("Referer"));

  console.log(url.protocol + "//" + url.host);
  let { line_items } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${url.protocol + "//" + url.host}/success`,
    cancel_url: `${url.protocol + "//" + url.host}`,
  });

  res.json({ id: session.id });
});

app.get("/stripe/prices", async (req, res) => {
  let prices = await stripe.prices.list({
    active: true,
    expand: ["data.product"],
  });
  res.json(prices);
});

app.get("/stripe/prices/:price_id", async (req, res) => {
  let { price_id } = req.params;
  let prices = await stripe.prices.retrieve(price_id, { expand: ["product"] });
  res.json(prices);
});

app.use(express.static("../frontend/build"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Example app listening at port ${PORT}, NODE_ENV=${process.env.NODE_ENV}`
  );
});
