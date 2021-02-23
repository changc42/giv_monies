import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import config from "./config";
const { BACKEND_URL, STRIPE_PK } = config;
console.log(config, "config");
const stripePromise = loadStripe(STRIPE_PK);

export default function LandingPage() {
  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch(`${BACKEND_URL}/create-checkout-session`, {
      method: "POST",
    });

    const session = await response.json();

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

  return <button onClick={() => handleClick()}>give a dollar</button>;
}
