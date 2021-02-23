import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import config from "./config";
const { BACKEND_URL } = config;
const stripePromise = loadStripe(
  "pk_test_51INpUsKsLndlUUqsA8YqZYxRJ5oYgsfzx0X0qQJIi4L9dGSfB8o0EUnkJzRLHBf0aqx3jJkY3Xud1li6YAJXMxod00DqApkpcP"
);

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
