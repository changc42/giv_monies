import React from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import config from "../config";
const { BACKEND_URL, STRIPE_PK } = config;
const stripePromise = loadStripe(STRIPE_PK);

export default function ProductCard({ price }) {
  let { product, unit_amount, id: priceId } = price;
  let { name, images } = product;
  let imageUrl = images[0];

  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session

    let line_items = [{ price: priceId, quantity: 1 }];

    const response = await axios.post(
      `${BACKEND_URL}/create-checkout-session`,
      { line_items }
    );

    const session = response.data;

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      console.log(result.error.message);
    }
  };

  return (
    <div style={{ height: "35rem", border: "solid 1px", padding: "10px" }}>
      <img style={{ maxWidth: "20rem" }} src={imageUrl} />
      <p>{name}</p>
      <button onClick={() => handleClick()}>
        Give ${(Number.parseInt(unit_amount) / 100).toFixed(2)}
      </button>
    </div>
  );
}
